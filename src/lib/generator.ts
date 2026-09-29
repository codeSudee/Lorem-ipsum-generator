// Core Lorem Ipsum Generator engine.
// Pure functions — no DOM access — so this can be unit tested and reused
// from any UI (Astro islands, API route, CLI, etc).

import { THEMES, type ThemeKey } from "./wordBanks";

export type AmountUnit =
  | "paragraphs"
  | "sentences"
  | "words"
  | "characters"
  | "titles"
  | "captions"
  | "names";
export type OutputFormat = "plain" | "html" | "markdown";
/** "sentence" is the natural case the generator produces (no transform). */
export type TextCase = "sentence" | "lower" | "upper" | "title";
/** Built-in word banks plus the user-supplied "custom" bank. */
export type GeneratorTheme = ThemeKey | "custom";
/** What each individually-copyable piece of output represents. */
export type SegmentKind = "paragraph" | "sentence" | "title" | "caption" | "name";

export interface GenerateOptions {
  theme: GeneratorTheme;
  unit: AmountUnit;
  amount: number;
  startWithLorem: boolean;
  format: OutputFormat;
  /** Defaults to "sentence" (natural case). */
  textCase?: TextCase;
  /** Source passage for the "custom" theme. Ignored for built-in themes. */
  customText?: string;
}

export interface GenerateResult {
  text: string;
  wordCount: number;
  characterCount: number;
  /**
   * The individual pieces that make up `text` (after case transform, before
   * export formatting). Empty for words/characters, which are a single block.
   */
  segments: string[];
  segmentKind: SegmentKind | null;
  /** Set when output could not be generated (e.g. too little custom text). */
  error?: string;
}

/** Minimum distinct words a custom passage must supply. */
export const MIN_CUSTOM_WORDS = 10;

const MIN_SENTENCE_WORDS = 6;
const MAX_SENTENCE_WORDS = 18;
const MIN_SENTENCES_PER_PARAGRAPH = 3;
const MAX_SENTENCES_PER_PARAGRAPH = 7;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickWord(words: string[]): string {
  return words[randomInt(0, words.length - 1)];
}

function capitalize(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Build a single sentence of roughly wordCount words from the bank. */
function buildSentence(words: string[], wordCount: number): string {
  const picked: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    picked.push(pickWord(words));
  }

  // Occasionally insert a comma clause break for natural rhythm.
  let sentence = picked.join(" ");
  if (wordCount > 8) {
    const commaIndex = randomInt(3, wordCount - 3);
    const wordsArr = sentence.split(" ");
    wordsArr[commaIndex] = wordsArr[commaIndex] + ",";
    sentence = wordsArr.join(" ");
  }

  sentence = capitalize(sentence) + ".";
  return sentence;
}

/** Build N sentences as an array of strings (no paragraph wrapping). */
function buildSentences(
  words: string[],
  count: number,
  openerWords: string[] | null,
): string[] {
  const sentences: string[] = [];

  for (let i = 0; i < count; i++) {
    if (i === 0 && openerWords) {
      sentences.push(capitalize(openerWords.join(" ")) + ".");
    } else {
      const wc = randomInt(MIN_SENTENCE_WORDS, MAX_SENTENCE_WORDS);
      sentences.push(buildSentence(words, wc));
    }
  }

  return sentences;
}

/** Build N paragraphs (arrays of sentences) as an array of paragraph strings. */
function buildParagraphs(
  words: string[],
  count: number,
  openerWords: string[] | null,
): string[] {
  const paragraphs: string[] = [];

  for (let p = 0; p < count; p++) {
    const sentenceCount = randomInt(
      MIN_SENTENCES_PER_PARAGRAPH,
      MAX_SENTENCES_PER_PARAGRAPH,
    );
    const useOpener = p === 0 ? openerWords : null;
    const sentences = buildSentences(words, sentenceCount, useOpener);
    paragraphs.push(sentences.join(" "));
  }

  return paragraphs;
}

/** Build N standalone words (flat list), optionally starting with the opener. */
function buildWords(
  words: string[],
  count: number,
  openerWords: string[] | null,
): string[] {
  const result: string[] = [];

  if (openerWords) {
    result.push(...openerWords.slice(0, count));
  }

  while (result.length < count) {
    result.push(pickWord(words));
  }

  return result.slice(0, count);
}

/**
 * Build a string of exactly `count` characters of lorem-style text.
 * Words are appended (space-separated) until the target length is reached,
 * then the result is trimmed to the exact character count. The output is
 * capitalized and, if there is room, terminated with a period.
 */
function buildCharacters(
  words: string[],
  count: number,
  openerWords: string[] | null,
): string {
  if (count <= 0) return "";

  const pool: string[] = [];
  if (openerWords) {
    pool.push(...openerWords);
  }

  let text = "";
  let poolIndex = 0;

  // Add whole words one at a time, stopping as soon as the next word would
  // overshoot the target so the output never gets cut off mid-word.
  while (true) {
    const word = poolIndex < pool.length ? pool[poolIndex] : pickWord(words);
    const candidate = text.length === 0 ? word : `${text} ${word}`;
    if (candidate.length > count) break;
    text = candidate;
    poolIndex++;
  }

  text = capitalize(text);

  // If we came up short of the target (e.g. count is smaller than the first
  // whole word), pad with filler letters rather than leaving it short.
  if (text.length < count) {
    text = text.padEnd(count, "x");
  }

  // Reserve the final character for punctuation for a natural ending,
  // unless the string is too short for that to make sense.
  if (count > 1) {
    text = text.slice(0, count - 1) + ".";
  } else {
    text = text.slice(0, count);
  }

  return text;
}

// ---------------------------------------------------------------------------
// Short-phrase units: titles, captions, names
// ---------------------------------------------------------------------------

type PhraseUnit = "titles" | "captions" | "names";

/** Word-count range per phrase unit (counted in real words, not bank entries). */
const PHRASE_WORD_RANGES: Record<PhraseUnit, [min: number, max: number]> = {
  titles: [3, 7],
  captions: [5, 12],
  names: [1, 3],
};

/** How many opener words seed the first phrase when the opener toggle is on. */
const PHRASE_OPENER_LENGTH: Record<PhraseUnit, number> = {
  titles: 5,
  captions: 8,
  names: 2,
};

/** Words that read badly as the last word of a truncated opener ("…disrupting the"). */
const TRAILING_FILLERS = new Set(["the", "a", "an", "as", "with", "is", "of", "and", "to", "in"]);

function entryWordCount(entry: string): number {
  return entry.split(" ").length;
}

/**
 * Pick bank entries until a random target word count within [min, max] is hit.
 * Some bank entries are multi-word ("north star"), so the budget is tracked in
 * actual words. Avoids repeating an entry within one phrase when the bank is
 * large enough to allow it.
 */
function buildPhraseWords(words: string[], min: number, max: number): string[] {
  const target = randomInt(min, max);
  const picked: string[] = [];
  let total = 0;
  let attempts = 0;

  while (total < target && attempts < 60) {
    attempts++;
    const entry = pickWord(words);
    const n = entryWordCount(entry);
    if (total + n > max) continue;
    if (picked.includes(entry) && attempts < 30) continue;
    picked.push(entry);
    total += n;
  }

  return picked;
}

function openerPhrase(openerWords: string[], length: number): string[] {
  const words = openerWords.slice(0, length);
  while (words.length > 1 && TRAILING_FILLERS.has(words[words.length - 1].toLowerCase())) {
    words.pop();
  }
  return words;
}

function finishPhrase(unit: PhraseUnit, phraseWords: string[]): string {
  const joined = phraseWords.join(" ");
  switch (unit) {
    // Captions read as short sentences; titles/headlines and names take no period.
    case "captions":
      return capitalize(joined) + ".";
    case "titles":
    case "names":
    default:
      return capitalize(joined);
  }
}

function buildPhrases(
  unit: PhraseUnit,
  words: string[],
  count: number,
  openerWords: string[] | null,
): string[] {
  const [min, max] = PHRASE_WORD_RANGES[unit];
  const phrases: string[] = [];

  for (let i = 0; i < count; i++) {
    const phraseWords =
      i === 0 && openerWords
        ? openerPhrase(openerWords, PHRASE_OPENER_LENGTH[unit])
        : buildPhraseWords(words, min, max);
    phrases.push(finishPhrase(unit, phraseWords));
  }

  return phrases;
}

// ---------------------------------------------------------------------------
// Case transformation
// ---------------------------------------------------------------------------

/**
 * Map a string character-by-character, keeping the original character when a
 * case mapping would change its length (e.g. "ß".toUpperCase() === "SS").
 * This guarantees case transforms never alter the character count, which the
 * exact-character mode depends on.
 */
function mapCharsPreservingLength(text: string, fn: (ch: string) => string): string {
  let out = "";
  for (const ch of text) {
    const mapped = fn(ch);
    out += mapped.length === ch.length ? mapped : ch;
  }
  return out;
}

/** Apply a case transform. Always length-preserving. */
export function applyCase(text: string, textCase: TextCase): string {
  switch (textCase) {
    case "lower":
      return mapCharsPreservingLength(text, (ch) => ch.toLowerCase());
    case "upper":
      return mapCharsPreservingLength(text, (ch) => ch.toUpperCase());
    case "title": {
      let atWordStart = true;
      return mapCharsPreservingLength(text, (ch) => {
        if (/\s/.test(ch)) {
          atWordStart = true;
          return ch;
        }
        const mapped = atWordStart ? ch.toUpperCase() : ch;
        atWordStart = false;
        return mapped;
      });
    }
    case "sentence":
    default:
      return text;
  }
}

// ---------------------------------------------------------------------------
// Custom (user-supplied) word bank
// ---------------------------------------------------------------------------

// Letters/digits, allowing internal apostrophes (don't, it’s) and hyphens
// (well-known). Punctuation, symbols, and markup are discarded.
const WORD_PATTERN = /[\p{L}\p{N}]+(?:['’][\p{L}]+)*(?:-[\p{L}\p{N}]+)*/gu;

function normalizeToken(token: string): string {
  const lower = token.toLowerCase();
  // Keep the pronoun "I" (and I'm, I'll, …) capitalized mid-sentence.
  if (/^i(?:['’]|$)/.test(lower)) return "I" + lower.slice(1);
  return lower;
}

export interface CustomWordBank {
  /** Distinct words, in first-seen order. */
  words: string[];
  /** The passage's first words, used as the "standard opener". */
  opener: string[];
}

/** Extract a word bank from arbitrary pasted text. */
export function extractCustomWords(text: string): CustomWordBank {
  const tokens = (text.match(WORD_PATTERN) ?? []).map(normalizeToken);
  return {
    words: [...new Set(tokens)],
    opener: tokens.slice(0, 8),
  };
}

export function customWordsError(found: number): string {
  if (found === 0) {
    return `Paste some text above to build a custom word bank — it needs at least ${MIN_CUSTOM_WORDS} different words.`;
  }
  return `Add a bit more text — the custom word bank needs at least ${MIN_CUSTOM_WORDS} different words to produce natural-sounding variation (found ${found}).`;
}

function formatPlain(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

function formatHtml(paragraphs: string[]): string {
  return paragraphs.map((p) => `<p>${p}</p>`).join("\n");
}

function formatMarkdown(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

/**
 * @param lineSeparated For list-style units (titles, captions, names): plain
 *   text puts one item per line instead of a blank line between items.
 */
function applyFormat(paragraphs: string[], format: OutputFormat, lineSeparated = false): string {
  if (lineSeparated && format === "plain") {
    return paragraphs.join("\n");
  }
  switch (format) {
    case "html":
      return formatHtml(paragraphs);
    case "markdown":
      return formatMarkdown(paragraphs);
    case "plain":
    default:
      return formatPlain(paragraphs);
  }
}

/**
 * The separator placed between block segments in the exported text, so a UI
 * rendering segments individually can mirror the exact spacing of `text`.
 */
export function blockSeparator(kind: SegmentKind | null, format: OutputFormat): "\n" | "\n\n" {
  const lineSeparated = kind === "title" || kind === "caption" || kind === "name";
  const probe = applyFormat(["a", "b"], format, lineSeparated);
  return probe.includes("\n\n") ? "\n\n" : "\n";
}

export function countWords(text: string): number {
  const stripped = text.replace(/<[^>]*>/g, " ");
  const matches = stripped.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

export function countCharacters(text: string): number {
  return text.length;
}

/**
 * Generate lorem-ipsum-style text according to the given options.
 * Returns the formatted text plus live word/character counts.
 */
export function generate(options: GenerateOptions): GenerateResult {
  const { theme, unit, amount, startWithLorem, format } = options;
  const textCase = options.textCase ?? "sentence";

  let words: string[];
  let openerSource: string[];

  if (theme === "custom") {
    const bank = extractCustomWords(options.customText ?? "");
    if (bank.words.length < MIN_CUSTOM_WORDS) {
      return {
        text: "",
        wordCount: 0,
        characterCount: 0,
        segments: [],
        segmentKind: null,
        error: customWordsError(bank.words.length),
      };
    }
    words = bank.words;
    openerSource = bank.opener;
  } else {
    const themeDef = THEMES[theme] ?? THEMES.classic;
    words = themeDef.words;
    openerSource = themeDef.opener;
  }

  const opener = startWithLorem ? openerSource : null;
  const safeAmount = Math.max(1, Math.floor(amount) || 1);
  // Case is applied to the raw pieces before export formatting, so HTML tags
  // are never transformed. applyCase is length-preserving, so the exact
  // character-count mode is unaffected.
  const cased = (s: string) => applyCase(s, textCase);

  let paragraphsForOutput: string[];
  let segments: string[] = [];
  let segmentKind: SegmentKind | null = null;
  let lineSeparated = false;

  if (unit === "words") {
    const flatWords = buildWords(words, safeAmount, opener);
    const sentence = capitalize(flatWords.join(" ")) + ".";
    paragraphsForOutput = [cased(sentence)];
  } else if (unit === "sentences") {
    const sentences = buildSentences(words, safeAmount, opener).map(cased);
    paragraphsForOutput = [sentences.join(" ")];
    segments = sentences;
    segmentKind = "sentence";
  } else if (unit === "characters") {
    paragraphsForOutput = [cased(buildCharacters(words, safeAmount, opener))];
  } else if (unit === "titles" || unit === "captions" || unit === "names") {
    paragraphsForOutput = buildPhrases(unit, words, safeAmount, opener).map(cased);
    segments = paragraphsForOutput;
    segmentKind = unit === "titles" ? "title" : unit === "captions" ? "caption" : "name";
    lineSeparated = true;
  } else {
    paragraphsForOutput = buildParagraphs(words, safeAmount, opener).map(cased);
    segments = paragraphsForOutput;
    segmentKind = "paragraph";
  }

  const text = applyFormat(paragraphsForOutput, format, lineSeparated);

  return {
    text,
    wordCount: countWords(text),
    characterCount: countCharacters(text),
    segments,
    segmentKind,
  };
}

/** Format a single segment on its own, for per-piece copying. */
export function formatSegment(segment: string, format: OutputFormat): string {
  return applyFormat([segment], format);
}
