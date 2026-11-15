// Readable English sentences for the "English" theme.
// Unlike the other banks, which shuffle words into lorem-style filler, this
// builds grammatical sentences from simple templates. Everything is in the
// past tense, so subject/verb agreement never has to be worked out.

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function chance(p: number): boolean {
  return Math.random() < p;
}

const NAMES = [
  "Maya", "Oliver", "Priya", "Lucas", "Hannah", "Mateo", "Grace", "Daniel",
  "Amara", "Leo", "Nora", "Samuel", "Ivy", "Theo", "Zara", "Felix",
] as const;

const PEOPLE = [
  "baker", "teacher", "neighbor", "student", "pilot", "gardener", "librarian",
  "fisherman", "painter", "nurse", "farmer", "mechanic", "musician", "chef",
  "photographer", "shopkeeper", "carpenter", "traveler", "detective", "child",
] as const;

const ANIMALS = ["dog", "cat", "fox", "rabbit", "horse", "parrot", "goat", "owl"] as const;

const PERSON_ADJECTIVES = [
  "old", "young", "tired", "curious", "cheerful", "quiet", "busy", "patient",
  "nervous", "friendly", "clever", "brave", "sleepy", "careful",
] as const;

const THINGS = [
  "letter", "umbrella", "bicycle", "map", "notebook", "lantern", "basket",
  "guitar", "camera", "kite", "blanket", "recipe", "suitcase", "painting",
  "key", "envelope", "telescope", "teapot", "postcard", "jar of honey",
  "loaf of bread", "pair of boots", "box of old photos", "bunch of flowers",
] as const;

const THING_ADJECTIVES = [
  "red", "small", "heavy", "broken", "shiny", "wooden", "borrowed", "faded",
  "brand-new", "dusty", "tiny", "strange", "lost", "handmade",
] as const;

const PLACES = [
  "in the garden", "at the train station", "by the river", "on the roof",
  "near the old bridge", "in the kitchen", "at the market", "behind the library",
  "on the beach", "in the attic", "at the bus stop", "across the street",
  "in the park", "on the porch", "inside the bakery", "at the top of the hill",
  "under the big oak tree", "in the hallway", "next to the fountain",
  "at the edge of town",
] as const;

const TIMES = [
  "yesterday", "last night", "this morning", "after lunch", "before sunrise",
  "on Sunday", "last summer", "during the storm", "an hour later",
  "at midnight", "the next day", "late in the afternoon", "every Friday",
  "right after dinner", "early that spring",
] as const;

/** [past tense, base form] of verbs that take an object. */
const TRANSITIVE = [
  ["found", "find"], ["carried", "carry"], ["painted", "paint"], ["fixed", "fix"],
  ["borrowed", "borrow"], ["dropped", "drop"], ["hid", "hide"], ["opened", "open"],
  ["wrapped", "wrap"], ["sold", "sell"], ["bought", "buy"], ["cleaned", "clean"],
  ["packed", "pack"], ["noticed", "notice"], ["returned", "return"],
  ["photographed", "photograph"], ["forgot", "forget"], ["delivered", "deliver"],
  ["mended", "mend"], ["shared", "share"],
] as const;

/** Past-tense verbs (or verb phrases) that need no object. */
const INTRANSITIVE = [
  "laughed", "waited", "sang", "danced", "slept", "whistled", "listened",
  "wandered off", "sat down", "kept walking", "looked around", "smiled",
  "stayed quiet", "fell asleep", "waved", "hurried home", "changed plans",
  "stopped to rest",
] as const;

/** Intransitive verbs that read naturally with an adverb after them. */
const SIMPLE_INTRANSITIVE = [
  "laughed", "waited", "sang", "danced", "slept", "whistled", "listened",
  "smiled", "waved", "worked", "walked",
] as const;

const ADVERBS = [
  "quietly", "slowly", "happily", "carefully", "suddenly", "patiently",
  "loudly", "gently", "nervously", "eagerly", "again", "for a while",
] as const;

const REACTIONS = [
  "nobody noticed", "everyone cheered", "the dog started barking",
  "it began to rain", "the lights flickered", "the room went silent",
  "someone knocked on the door", "the bus finally arrived",
  "the kettle started to whistle", "a bird landed on the fence",
] as const;

function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function subject(): string {
  const roll = Math.random();
  if (roll < 0.35) return pick(NAMES);
  if (roll < 0.55) return `the ${pick(ANIMALS)}`;
  const noun = pick(PEOPLE);
  if (chance(0.5)) return `the ${pick(PERSON_ADJECTIVES)} ${noun}`;
  return chance(0.3) ? `my ${noun}` : `the ${noun}`;
}

function object(): string {
  const noun = pick(THINGS);
  const phrase = chance(0.55) ? `${pick(THING_ADJECTIVES)} ${noun}` : noun;
  return chance(0.6) ? `${article(phrase)} ${phrase}` : `the ${phrase}`;
}

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const TEMPLATES: (() => string)[] = [
  () => `${pick(TIMES)}, ${subject()} ${pick(TRANSITIVE)[0]} ${object()} ${pick(PLACES)}.`,
  () => `${subject()} ${pick(INTRANSITIVE)} ${pick(PLACES)} ${pick(TIMES)}.`,
  () => `${subject()} ${pick(TRANSITIVE)[0]} ${object()}, and ${subject()} ${pick(INTRANSITIVE)}.`,
  () => `${subject()} ${pick(TRANSITIVE)[0]} ${object()} because ${subject()} ${pick(TRANSITIVE)[0]} ${object()}.`,
  () => `${pick(PLACES)}, ${subject()} ${pick(SIMPLE_INTRANSITIVE)} ${pick(ADVERBS)}.`,
  () => `${subject()} wanted to ${pick(TRANSITIVE)[1]} ${object()} before ${pick(REACTIONS)}.`,
  () => `nobody expected ${subject()} to ${pick(TRANSITIVE)[1]} ${object()} ${pick(PLACES)}.`,
  () => `${subject()} ${pick(ADVERBS)} ${pick(TRANSITIVE)[0]} ${object()} ${pick(TIMES)}.`,
  () => `when ${subject()} ${pick(INTRANSITIVE)}, ${pick(REACTIONS)}.`,
  () => `${subject()} ${pick(TRANSITIVE)[0]} ${object()} and ${pick(INTRANSITIVE)} ${pick(PLACES)}.`,
];

/** One random, grammatical English sentence ending in a period. */
export function englishSentence(): string {
  return capitalizeFirst(pick(TEMPLATES)());
}

/** The classic English pangram, used as this theme's standard opener. */
export const ENGLISH_OPENER = ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];

/**
 * Plain vocabulary for the units that are built from single words
 * (exact characters, titles, captions, names).
 */
export const ENGLISH_WORDS = [
  ...new Set([
    ...[...PEOPLE, ...ANIMALS, ...PERSON_ADJECTIVES, ...THING_ADJECTIVES, ...THINGS]
      .flatMap((w) => w.split(" "))
      .filter((w) => w.length > 2 && !["and", "the"].includes(w)),
    "garden", "river", "bridge", "market", "morning", "summer", "evening",
    "harbor", "village", "window", "journey", "story", "bright",
  ]),
];
