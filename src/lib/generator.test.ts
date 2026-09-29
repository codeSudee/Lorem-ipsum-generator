import { describe, expect, it } from "vitest";
import {
  MIN_CUSTOM_WORDS,
  applyCase,
  blockSeparator,
  countWords,
  extractCustomWords,
  formatSegment,
  generate,
  type AmountUnit,
  type OutputFormat,
  type TextCase,
} from "./generator";
import { THEMES, type ThemeKey } from "./wordBanks";

const THEME_KEYS = Object.keys(THEMES) as ThemeKey[];
const FORMATS: OutputFormat[] = ["plain", "html", "markdown"];
const CASES: TextCase[] = ["sentence", "lower", "upper", "title"];

const POEM = `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date.`;

/** Count real words in a phrase (bank entries can contain spaces). */
const wordsIn = (s: string) => s.trim().split(/\s+/).length;

describe("existing units", () => {
  it.each(THEME_KEYS)("paragraphs/sentences/words work for %s", (theme) => {
    for (const format of FORMATS) {
      const p = generate({ theme, unit: "paragraphs", amount: 4, startWithLorem: true, format });
      expect(p.segments).toHaveLength(4);
      expect(p.segmentKind).toBe("paragraph");
      expect(p.text).toBe(p.segments.map((s) => formatSegment(s, format)).join(blockSeparator("paragraph", format)));

      const s = generate({ theme, unit: "sentences", amount: 6, startWithLorem: false, format });
      expect(s.segments).toHaveLength(6);
      s.segments.forEach((seg) => expect(seg).toMatch(/\.$/));

      const w = generate({ theme, unit: "words", amount: 25, startWithLorem: false, format: "plain" });
      expect(w.segmentKind).toBeNull();
      expect(w.wordCount).toBeGreaterThanOrEqual(25); // multi-word bank entries count as >1
    }
  });

  it("opener is still used by default in classic", () => {
    const r = generate({ theme: "classic", unit: "paragraphs", amount: 1, startWithLorem: true, format: "plain" });
    expect(r.text.startsWith("Lorem ipsum dolor sit amet consectetur adipiscing elit.")).toBe(true);
  });
});

describe("exact character count", () => {
  const themes = [...THEME_KEYS, "custom"] as const;
  it.each(themes)("is exact for every case and length (%s)", (theme) => {
    for (const textCase of CASES) {
      for (const amount of [1, 2, 3, 7, 50, 137, 500, 5000]) {
        for (const startWithLorem of [true, false]) {
          const r = generate({
            theme,
            unit: "characters",
            amount,
            startWithLorem,
            format: "plain",
            textCase,
            customText: POEM,
          });
          expect(r.text.length).toBe(amount);
          expect(r.characterCount).toBe(amount);
        }
      }
    }
  });

  it("applyCase is length-preserving even for special case mappings", () => {
    const tricky = "straße ǆ ŉ İstanbul ﬁne";
    for (const c of CASES) expect(applyCase(tricky, c).length).toBe(tricky.length);
  });
});

describe("case transformation", () => {
  it("transforms all themes, and never touches HTML tags", () => {
    for (const theme of THEME_KEYS) {
      const lower = generate({ theme, unit: "paragraphs", amount: 2, startWithLorem: true, format: "html", textCase: "lower" });
      expect(lower.text).toBe(lower.text.toLowerCase());
      expect(lower.text).toMatch(/^<p>/);

      const upper = generate({ theme, unit: "sentences", amount: 3, startWithLorem: true, format: "html", textCase: "upper" });
      expect(upper.text.startsWith("<p>")).toBe(true);
      expect(upper.text.slice(3, -4)).toBe(upper.text.slice(3, -4).toUpperCase());

      const title = generate({ theme, unit: "sentences", amount: 3, startWithLorem: false, format: "plain", textCase: "title" });
      for (const word of title.text.split(/\s+/)) expect(word[0]).toBe(word[0].toUpperCase());
    }
  });

  it("title case capitalizes words but leaves the rest alone; sentence is identity", () => {
    expect(applyCase("farm-to-table umami, ci/cd.", "title")).toBe("Farm-to-table Umami, Ci/cd.");
    expect(applyCase("Keep As Is.", "sentence")).toBe("Keep As Is.");
  });
});

describe("titles, captions, names", () => {
  const ranges: Record<string, [number, number]> = { titles: [3, 7], captions: [5, 12], names: [1, 3] };

  it.each(THEME_KEYS)("respect word ranges for %s", (theme) => {
    for (const unit of ["titles", "captions", "names"] as AmountUnit[]) {
      const [min, max] = ranges[unit];
      const r = generate({ theme, unit, amount: 40, startWithLorem: false, format: "plain" });
      expect(r.segments).toHaveLength(40);
      expect(r.text.split("\n")).toHaveLength(40); // one per line in plain text
      for (const seg of r.segments) {
        expect(wordsIn(seg)).toBeGreaterThanOrEqual(min);
        expect(wordsIn(seg)).toBeLessThanOrEqual(max);
      }
    }
  });

  it("draws from the selected theme's bank", () => {
    const r = generate({ theme: "foodie", unit: "titles", amount: 20, startWithLorem: false, format: "plain", textCase: "lower" });
    const bank = new Set(THEMES.foodie.words.flatMap((w) => w.split(" ")));
    for (const seg of r.segments) for (const w of seg.split(" ")) expect(bank.has(w)).toBe(true);
  });

  it("shapes each kind appropriately", () => {
    const names = generate({ theme: "tech", unit: "names", amount: 10, startWithLorem: false, format: "plain" });
    // Sentence case (default) only capitalizes the first word of each name,
    // like titles — the case toggle is the only thing that capitalizes further.
    for (const n of names.segments) expect(n[0]).toBe(n[0].toUpperCase());
    const captions = generate({ theme: "cat", unit: "captions", amount: 5, startWithLorem: false, format: "plain" });
    captions.segments.forEach((c) => expect(c).toMatch(/\.$/));
    const titles = generate({ theme: "cat", unit: "titles", amount: 5, startWithLorem: false, format: "plain" });
    titles.segments.forEach((t) => expect(t).not.toMatch(/\.$/));
  });

  it("uses a trimmed opener for the first item", () => {
    const r = generate({ theme: "tech", unit: "titles", amount: 2, startWithLorem: true, format: "plain" });
    expect(r.segments[0]).toBe("Our startup is disrupting"); // trailing "the" dropped
    const html = generate({ theme: "classic", unit: "names", amount: 2, startWithLorem: true, format: "html" });
    expect(html.text).toMatch(/^<p>Lorem ipsum<\/p>\n<p>/); // sentence case: only first word capitalized
  });

  it("case transformation covers names too, not just paragraphs/sentences", () => {
    const upper = generate({ theme: "tech", unit: "names", amount: 10, startWithLorem: false, format: "plain", textCase: "upper" });
    for (const n of upper.segments) expect(n).toBe(n.toUpperCase());

    const lower = generate({ theme: "tech", unit: "names", amount: 10, startWithLorem: false, format: "plain", textCase: "lower" });
    for (const n of lower.segments) expect(n).toBe(n.toLowerCase());

    const title = generate({ theme: "tech", unit: "names", amount: 10, startWithLorem: false, format: "plain", textCase: "title" });
    for (const n of title.segments) for (const w of n.split(" ")) expect(w[0]).toBe(w[0].toUpperCase());
  });
});

describe("custom word bank", () => {
  it("extracts distinct words, stripping punctuation", () => {
    const bank = extractCustomWords(POEM);
    expect(bank.words).toContain("summer's");
    expect(bank.words).toContain("I");
    expect(bank.words).not.toContain("day?");
    expect(new Set(bank.words).size).toBe(bank.words.length);
    expect(bank.opener.slice(0, 3)).toEqual(["shall", "I", "compare"]);
  });

  it("generates from the passage without repeating it verbatim", () => {
    const allowed = new Set(extractCustomWords(POEM).words.map((w) => w.toLowerCase()));
    const r = generate({ theme: "custom", unit: "paragraphs", amount: 3, startWithLorem: false, format: "plain", customText: POEM });
    expect(r.error).toBeUndefined();
    expect(r.segments).toHaveLength(3);
    expect(r.text).not.toContain("Shall I compare thee to a summer's day");
    for (const token of r.text.toLowerCase().match(/[\p{L}']+/gu)!) expect(allowed.has(token)).toBe(true);
  });

  it("asks for more text when there are too few distinct words", () => {
    for (const text of ["", "   ", "the the the the the the the the the the the", "one two three four five six seven eight nine"]) {
      const r = generate({ theme: "custom", unit: "paragraphs", amount: 3, startWithLorem: true, format: "plain", customText: text });
      expect(r.text).toBe("");
      expect(r.segments).toEqual([]);
      expect(r.error).toMatch(new RegExp(`at least ${MIN_CUSTOM_WORDS}`));
    }
    const ok = generate({ theme: "custom", unit: "words", amount: 5, startWithLorem: false, format: "plain", customText: "one two three four five six seven eight nine ten" });
    expect(ok.error).toBeUndefined();
    expect(countWords(ok.text)).toBe(5);
  });

  it("works for every unit", () => {
    for (const unit of ["paragraphs", "sentences", "words", "characters", "titles", "captions", "names"] as AmountUnit[]) {
      const r = generate({ theme: "custom", unit, amount: 5, startWithLorem: true, format: "plain", customText: POEM });
      expect(r.error).toBeUndefined();
      expect(r.text.length).toBeGreaterThan(0);
    }
  });
});
