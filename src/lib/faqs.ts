// Shared FAQ content — used both for the visible FAQ section (FAQ.astro)
// and the FAQPage JSON-LD structured data (Layout.astro), so the two never
// drift out of sync (a requirement for valid FAQ rich results).

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "What is a Lorem Ipsum generator?",
    a: "A Lorem Ipsum generator is a tool that creates placeholder \u201cgreek text\u201d on demand so designers, developers, and writers can fill a layout before real content is ready. This tool lets you choose paragraphs, sentences, words, or an exact character count, pick a classic Latin or themed word bank, and export the result as plain text, HTML, or Markdown.",
  },
  {
    q: "How do I create Lorem Ipsum text?",
    a: "Pick a unit (paragraphs, sentences, words, or characters), enter how much you need, choose a word bank such as classic Latin, Corporate, Tech, Foodie, Cat, or Funny, and the generator instantly builds fresh text. Toggle \u201cStart with Lorem Ipsum\u201d if you want the output to begin with the familiar \u201cLorem ipsum dolor sit amet\u201d opener, then copy it with one click.",
  },
  {
    q: "How can I generate Lorem Ipsum text?",
    a: "Use the generator form above: set the amount and unit you need (for example, 5 paragraphs or 500 characters), select a theme, and the text is generated live in your browser \u2014 no page reload, sign-up, or waiting. Click the copy button to send the result straight to your clipboard as plain text, HTML, or Markdown.",
  },
  {
    q: "Is Lorem Ipsum just dummy text?",
    a: "Yes. Lorem Ipsum is dummy, or placeholder, text with no real meaning. It exists purely to occupy space in a layout so that reviewers judge typography, spacing, and structure instead of getting distracted by actual content, which is why it's the standard filler text used across design, publishing, and web development.",
  },
  {
    q: "Is Lorem Ipsum fake in Latin?",
    a: "Lorem Ipsum is derived from real classical Latin \u2014 a scrambled passage from Cicero's <em>de Finibus Bonorum et Malorum</em>, written around 45 BC \u2014 but the words have been altered, reordered, and in places invented so the passage has no coherent meaning. It looks like genuine Latin at a glance, which is exactly why it works as neutral filler text.",
  },
  {
    q: "What is the full Lorem Ipsum text?",
    a: "The standard opening is \u201cLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\u201d There isn't a single fixed \u201cfull\u201d version, though \u2014 it's a passage that gets extended, reshuffled, and regenerated to fill however much space is needed. Use the generator above to produce any length you need, from one sentence to many paragraphs, with the classic opener included if you enable it.",
  },
  {
    q: "What does Ipsum mean?",
    a: "\u201cIpsum\u201d is Latin for \u201citself\u201d or \u201cvery.\u201d In the original Cicero text the phrase was part of \u201cdolorem ipsum,\u201d roughly \u201cpain itself,\u201d before the passage was scrambled into the filler text we now call Lorem Ipsum. The word carries no special meaning in the placeholder text itself \u2014 it's simply part of the recognizable opening phrase.",
  },
  {
    q: "Why do people use Lorem Ipsum?",
    a: "Lorem Ipsum has a roughly normal distribution of letters and word lengths, so it reads like real language at a glance without pulling focus from the actual design. Designers and developers use it to mock up layouts, test typography, check line wrapping and spacing, and demo templates before real copy exists \u2014 all without a client or reviewer getting hung up on the wording.",
  },
  {
    q: "Can you provide me with 100 words of Lorem Ipsum?",
    a: "Yes \u2014 set the unit to Words and the amount to 100 in the generator above, then click generate. The tool produces exactly 100 words of Lorem Ipsum (or a themed alternative like Corporate or Funny), with a live word counter so you can confirm the count before copying.",
  },
  {
    q: "Can you provide me with 500 words of Lorem Ipsum?",
    a: "Yes \u2014 switch the unit to Words, enter 500, and the generator builds 500 words of placeholder text instantly. You can also use Characters mode if you need an exact character count instead, such as a lorem ipsum generator 500 characters request for a meta description or a fixed-width field.",
  },
  {
    q: "How long is Lorem Ipsum?",
    a: "Lorem Ipsum has no fixed length \u2014 it's however long you need it to be. This generator lets you specify the exact amount as paragraphs, sentences, words, or characters, so you can produce anything from a single short sentence for a button label to many paragraphs for a full content mockup.",
  },
  {
    q: "What should I look for in a Lorem Ipsum generator?",
    a: "Look for control over the exact output length (paragraphs, words, or characters), more than one word bank, and export in the format you actually need. This site offers paragraph, sentence, word, and exact character-count modes, five themed word banks (Corporate, Tech, Foodie, Cat, and a funny option) alongside classic Latin, and one-click export as plain text, HTML, or Markdown — all running instantly in your browser with no sign-up required.",
  },
];
