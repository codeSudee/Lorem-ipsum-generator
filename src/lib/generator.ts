// Core Lorem Ipsum Generator engine.
// Pure functions — no DOM access — so this can be unit tested and reused
// from any UI (Astro islands, API route, CLI, etc).

import { THEMES, type ThemeKey } from "./wordBanks";

export type AmountUnit = "paragraphs" | "sentences" | "words" | "characters";
export type OutputFormat = "plain" | "html" | "markdown";

export interface GenerateOptions {
  theme: ThemeKey;
  unit: AmountUnit;
  amount: number;
  startWithLorem: boolean;
  format: OutputFormat;
}

export interface GenerateResult {
  text: string;
  wordCount: number;
  characterCount: number;
}

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

function formatPlain(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

function formatHtml(paragraphs: string[]): string {
  return paragraphs.map((p) => `<p>${p}</p>`).join("\n");
}

function formatMarkdown(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

function applyFormat(paragraphs: string[], format: OutputFormat): string {
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
  const themeDef = THEMES[theme];
  const words = themeDef.words;
  const opener = startWithLorem ? themeDef.opener : null;
  const safeAmount = Math.max(1, Math.floor(amount) || 1);

  let paragraphsForOutput: string[];

  if (unit === "words") {
    const flatWords = buildWords(words, safeAmount, opener);
    const sentence = capitalize(flatWords.join(" ")) + ".";
    paragraphsForOutput = [sentence];
  } else if (unit === "sentences") {
    const sentences = buildSentences(words, safeAmount, opener);
    paragraphsForOutput = [sentences.join(" ")];
  } else if (unit === "characters") {
    paragraphsForOutput = [buildCharacters(words, safeAmount, opener)];
  } else {
    paragraphsForOutput = buildParagraphs(words, safeAmount, opener);
  }

  const text = applyFormat(paragraphsForOutput, format);

  return {
    text,
    wordCount: countWords(text),
    characterCount: countCharacters(text),
  };
}
