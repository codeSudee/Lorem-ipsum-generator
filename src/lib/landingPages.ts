// Focused generator pages. Each one preloads the generator with a specific
// preset and carries its own guidance and FAQ, so the page answers one
// distinct search intent instead of repeating the homepage.

import type { FAQItem } from "./faqs";

export interface LandingSection {
  heading: string;
  paragraphs: string[];
}

export interface LandingPage {
  slug: string;
  /** Short name for nav/footer/link cards. */
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  preset: { unit: string; amount: number; theme: string; startWithLorem?: boolean };
  sections: LandingSection[];
  faqs: FAQItem[];
  /** ISO date of the last meaningful content change. */
  updated: string;
  /** Slugs of related pages, shown as internal links. */
  related: string[];
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "lorem-ipsum-500-characters",
    label: "500 Characters",
    title: "Lorem Ipsum 500 Characters — Exact Character Count Generator",
    description:
      "Generate lorem ipsum with exactly 500 characters, or any count you choose. Ideal for testing meta descriptions, text fields, and truncation. Free, instant, no sign-up.",
    eyebrow: "Exact length",
    h1: "Lorem Ipsum Generator: 500 Characters",
    intro:
      "This generator is preset to produce exactly 500 characters of lorem ipsum. Change the number to any count you need and the text updates instantly, with a live character counter so you can verify the length before you copy.",
    preset: { unit: "characters", amount: 500, theme: "classic", startWithLorem: true },
    updated: "2026-10-22",
    related: ["lorem-ipsum-100-words", "lorem-ipsum-500-words", "tech-lorem-ipsum-generator"],
    sections: [
      {
        heading: "When an exact character count matters",
        paragraphs: [
          "Paragraph and word counts are fine for page layouts, but many interface constraints are measured in characters. A meta description is trimmed by search engines at a few hundred characters, a text message has a fixed segment size, a database column has a hard limit, and a form field may refuse input past a set length. Testing these with text that is roughly the right size hides the bugs that appear at the boundary.",
          "With an exact count you can paste a string that is precisely at the limit, then one character over it, and see what your interface does. That is how you find truncation that cuts a word in half, a counter that is off by one, or a layout that breaks when a field is filled to the edge.",
        ],
      },
      {
        heading: "How to generate exactly 500 characters",
        paragraphs: [
          "The unit is already set to Characters and the amount to 500. Press Generate to get a fresh string, or type a different number to change the length. The counter beneath the output shows the character total, including spaces and punctuation, so you can confirm the figure matches what you asked for.",
          "Use the copy button to send the text to your clipboard. If you need it in another format, open More options and choose plain text, HTML, or Markdown before copying.",
        ],
      },
      {
        heading: "Useful character lengths to test",
        paragraphs: [
          "Common limits worth checking include 60 characters for a page title, 155 to 160 for a meta description, 280 for a short social post, 500 for a bio or summary field, and 1,000 or more for a long description. Because the generator accepts any count, you can test each limit and the value just above it in a few seconds.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the 500 characters counted with spaces?",
        a: "Yes. The count includes spaces and punctuation, which matches how most text fields, databases, and character counters measure length. The live counter under the output shows the same total.",
      },
      {
        q: "Does the text end in the middle of a word?",
        a: "The output is trimmed to the exact length you request, so the final word can be cut short. That is intentional: it lets you see how your layout handles a string that stops right at the limit.",
      },
      {
        q: "Can I generate a different number of characters?",
        a: "Yes. Change the amount to any value the generator allows and the text regenerates immediately. The preset only decides what you see when the page first loads.",
      },
    ],
  },
  {
    slug: "funny-lorem-ipsum-generator",
    label: "Funny Lorem Ipsum",
    title: "Funny Lorem Ipsum Generator — Humorous Placeholder Text",
    description:
      "Generate funny lorem ipsum filled with absurd, silly words instead of Latin. Copy it as plain text, HTML, or Markdown. Free, instant, no sign-up.",
    eyebrow: "Funny mode",
    h1: "Funny Lorem Ipsum Generator",
    intro:
      "Swap the Latin for absurd, playful filler words. This generator is preset to the Funny word bank, which keeps the natural rhythm of real sentences while using words like kerfuffle, bamboozle, and flapjack.",
    preset: { unit: "paragraphs", amount: 3, theme: "funny", startWithLorem: false },
    updated: "2026-10-22",
    related: ["lorem-ipsum-100-words", "tech-lorem-ipsum-generator", "corporate-lorem-ipsum-generator"],
    sections: [
      {
        heading: "Why use funny placeholder text",
        paragraphs: [
          "Standard lorem ipsum is neutral on purpose, but neutral can also mean forgettable. Funny filler makes a design review lighter, and it has a practical benefit: nobody mistakes it for finished copy. A paragraph about bamboozled flapjacks is obviously a placeholder, so it is far less likely to slip into a live page than text that looks plausible.",
          "It also suits informal projects such as a game, a children's app, a party invitation, a newsletter template, or a portfolio piece where a playful tone is part of the brand.",
        ],
      },
      {
        heading: "How the funny mode works",
        paragraphs: [
          "The Funny word bank is a list of humorous words that the generator arranges into sentences and paragraphs using the same builders as every other theme. Sentence lengths vary and punctuation falls where you would expect, so the result still tests your typography and spacing the way real text would.",
          "The page opens with three paragraphs. Use the amount and unit controls to change that, or switch to words, sentences, titles, or captions when you want something shorter. Titles and captions are useful for mocking up cards, headings, and image labels.",
        ],
      },
      {
        heading: "Keep it out of production",
        paragraphs: [
          "Funny or not, placeholder text belongs in design and development only. Replace it with real content before a page goes live. Published pages that still contain filler give visitors nothing useful, and search engines treat them as low value.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is funny lorem ipsum still Latin?",
        a: "No. The Funny theme uses English words that are chosen to be silly, not Latin ones. The sentences are built the same way as the classic version, so line lengths and spacing behave similarly.",
      },
      {
        q: "Can I get funny text as a single sentence or a short title?",
        a: "Yes. Change the unit to Sentences, Words, Titles, or Captions. The Funny word bank applies to all of them.",
      },
      {
        q: "Is the output different each time?",
        a: "Yes. Each press of Generate builds new sentences from the word bank, so you get fresh text rather than the same fixed block.",
      },
    ],
  },
  {
    slug: "lorem-ipsum-100-words",
    label: "100 Words",
    title: "Lorem Ipsum 100 Words — Generate Exactly 100 Words",
    description:
      "Get exactly 100 words of lorem ipsum, ready to copy. Change the count to any number of words, choose a theme, and export as text, HTML, or Markdown. Free and instant.",
    eyebrow: "Short passage",
    h1: "Lorem Ipsum Generator: 100 Words",
    intro:
      "A hundred words is roughly one solid paragraph. This generator is preset to produce exactly 100 words of classic lorem ipsum, with a word counter so you can confirm the total before you copy.",
    preset: { unit: "words", amount: 100, theme: "classic", startWithLorem: true },
    updated: "2026-10-22",
    related: ["lorem-ipsum-500-words", "lorem-ipsum-500-characters", "funny-lorem-ipsum-generator"],
    sections: [
      {
        heading: "What 100 words is good for",
        paragraphs: [
          "One hundred words fills a typical card description, a product blurb, a short bio, a testimonial, or the intro of an article. It is long enough to wrap across several lines at normal widths, so you can judge line height, paragraph spacing, and how text sits beside an image without scrolling through a wall of filler.",
          "It is also a convenient quantity when you are comparing designs. If every mockup uses the same 100-word block, differences between layouts come from the layout, not from the amount of text.",
        ],
      },
      {
        heading: "Generate your own 100 words",
        paragraphs: [
          "The generator is already set to Words and 100. Press Generate for a new block, or change the number if you need a different length. The word counter updates as the text changes.",
          "If the classic Latin does not suit the project, open More options and pick Corporate, Tech, Foodie, Cat, or Funny. The count stays the same and only the vocabulary changes.",
        ],
      },
      {
        heading: "Tips for realistic mockups",
        paragraphs: [
          "Real content is uneven. Some blocks are short and some run long, so test your layout with several lengths rather than one. A good habit is to try the shortest text you expect, the longest, and something in the middle. A hundred words is a sensible middle value, and the 500-word version covers the long end.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many sentences are in 100 words?",
        a: "It varies, because the generator builds sentences of different lengths. You will typically see somewhere between five and ten sentences in a block of 100 words.",
      },
      {
        q: "Is it exactly 100 words every time?",
        a: "Yes. In Words mode the output contains the number of words you set, and the live word counter shows the total so you can check it.",
      },
      {
        q: "Can I get 100 words in another style?",
        a: "Yes. Choose a different theme under More options. The word count is unaffected by the theme.",
      },
    ],
  },
  {
    slug: "lorem-ipsum-500-words",
    label: "500 Words",
    title: "Lorem Ipsum 500 Words — Long Placeholder Text Generator",
    description:
      "Generate 500 words of lorem ipsum for long-form layouts, article templates, and scroll testing. Choose a theme and export as plain text, HTML, or Markdown. Free.",
    eyebrow: "Long form",
    h1: "Lorem Ipsum Generator: 500 Words",
    intro:
      "Five hundred words is enough to fill a full article body or a long landing page section. This generator is preset to produce exactly 500 words, split into readable paragraphs you can copy in one click.",
    preset: { unit: "words", amount: 500, theme: "classic", startWithLorem: true },
    updated: "2026-10-22",
    related: ["lorem-ipsum-100-words", "lorem-ipsum-500-characters", "corporate-lorem-ipsum-generator"],
    sections: [
      {
        heading: "Why test with 500 words",
        paragraphs: [
          "Short snippets hide layout problems that only appear at length. A long block shows whether your measure (line length) is comfortable, whether paragraph spacing holds up, whether a sticky table of contents tracks the scroll position, and whether images and pull quotes break the flow the way you intended.",
          "It is also the right size for blog and article templates, documentation pages, newsletter bodies, and terms-style text where readers expect a lot of copy.",
        ],
      },
      {
        heading: "Generate and export 500 words",
        paragraphs: [
          "The generator opens on Words with an amount of 500. Press Generate for a new block. When the text is ready, copy it as plain text, or choose HTML to get paragraph tags or Markdown to paste into a static site or documentation tool.",
          "The word and character counters sit under the output, so you can confirm you have the quantity you need.",
        ],
      },
      {
        heading: "Checking readability at length",
        paragraphs: [
          "Body text is usually most readable at around 50 to 75 characters per line. Paste 500 words into your template and look at how many characters actually land on each line at desktop, tablet, and phone widths. If lines run much longer than 75 characters on a wide screen, constrain the column width. If they fall under 40 on a phone, reduce the side padding.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many paragraphs is 500 words?",
        a: "Usually four to eight, depending on how the generator splits the text. If you need a specific number of paragraphs, switch the unit to Paragraphs instead.",
      },
      {
        q: "Can I use this text on a live site?",
        a: "You can, but you should not leave it there. Placeholder text is for design and development. Replace it with real content before launch.",
      },
      {
        q: "Does a longer count slow the page down?",
        a: "No. The text is generated in your browser and nothing is sent to a server, so even large amounts appear instantly.",
      },
    ],
  },
  {
    slug: "corporate-lorem-ipsum-generator",
    label: "Corporate Lorem Ipsum",
    title: "Corporate Lorem Ipsum Generator — Business Placeholder Text",
    description:
      "Generate corporate lorem ipsum in plain business English: stakeholders, synergy, roadmaps, and quarterly goals. Good for decks and B2B mockups. Free and instant.",
    eyebrow: "Corporate theme",
    h1: "Corporate Lorem Ipsum Generator",
    intro:
      "Placeholder copy that sounds like a business. This generator is preset to the Corporate word bank, which draws on the vocabulary of strategy decks, quarterly reports, and B2B product pages.",
    preset: { unit: "paragraphs", amount: 3, theme: "corporate", startWithLorem: false },
    updated: "2026-10-22",
    related: ["tech-lorem-ipsum-generator", "lorem-ipsum-500-words", "funny-lorem-ipsum-generator"],
    sections: [
      {
        heading: "Why use business-flavored filler",
        paragraphs: [
          "Latin filler works well for typography, but clients and stakeholders often react better to a mockup that reads like their own world. A pricing page or dashboard populated with words about stakeholders, deliverables, and quarterly targets looks closer to the finished product, which makes feedback more useful.",
          "It also catches a few real problems. Business writing tends to use longer words and longer phrases than casual text, so it shows how your layout copes with wide words, hyphenation, and tight columns.",
        ],
      },
      {
        heading: "Where it fits",
        paragraphs: [
          "Use it for slide decks, internal tools, CRM and analytics dashboards, enterprise landing pages, investor updates, and proposal templates. For a short label or heading, switch the unit to Titles. For a card description, use Sentences. For a full page, use Paragraphs.",
          "Choose Words or Characters when you have a fixed-size slot to fill and want an exact amount.",
        ],
      },
      {
        heading: "Using it responsibly",
        paragraphs: [
          "Corporate filler looks convincing, which is a double-edged feature. Because it reads like real copy it is easier to forget it is a placeholder, so label draft mockups clearly and do a content pass before anything is published.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the corporate text meaningful?",
        a: "No. The sentences are assembled from a word bank and do not make factual claims. They sound like business writing without saying anything specific.",
      },
      {
        q: "Can I generate a corporate-style title or heading?",
        a: "Yes. Set the unit to Titles to get short heading-style lines using the Corporate vocabulary.",
      },
      {
        q: "Can I switch to a different theme from this page?",
        a: "Yes. Open More options and choose another theme. Your choice applies only to this visit and does not change the preset for the page.",
      },
    ],
  },
  {
    slug: "tech-lorem-ipsum-generator",
    label: "Tech Lorem Ipsum",
    title: "Tech Lorem Ipsum Generator — Startup & Developer Placeholder Text",
    description:
      "Generate tech and startup lorem ipsum with words like API, deploy, and sprint. Ideal for SaaS, developer tools, and app mockups. Free, instant, no sign-up.",
    eyebrow: "Tech / startup theme",
    h1: "Tech Lorem Ipsum Generator",
    intro:
      "Placeholder text in the language of software teams. This generator is preset to the Tech / Startup word bank, built from the vocabulary you see on SaaS landing pages, changelogs, and developer docs.",
    preset: { unit: "paragraphs", amount: 3, theme: "tech", startWithLorem: false },
    updated: "2026-10-22",
    related: ["corporate-lorem-ipsum-generator", "lorem-ipsum-500-characters", "funny-lorem-ipsum-generator"],
    sections: [
      {
        heading: "Filler that looks like your product",
        paragraphs: [
          "A SaaS dashboard filled with Latin never quite looks right. Swapping in words about platforms, pipelines, and deployments makes a mockup feel closer to a real product, which helps teammates and early users give feedback on the design rather than on the strange text.",
          "It also helps when you are building a component library. Cards, tables, and notification toasts populated with startup-style copy show how the components handle realistic phrase lengths.",
        ],
      },
      {
        heading: "Choosing the right unit",
        paragraphs: [
          "Use Titles for feature names and changelog headings, Sentences for card descriptions and tooltips, and Captions for screenshots and diagrams. Names mode produces short name-like strings, which suits user lists, avatars, and comment threads. Paragraphs cover documentation and blog layouts.",
          "When a field has a hard limit, such as a 160-character summary, switch to Characters and enter the exact number.",
        ],
      },
      {
        heading: "Export formats for developers",
        paragraphs: [
          "Open More options to copy the output as plain text, HTML with paragraph tags, or Markdown. The HTML and Markdown options save a step when you are filling a static site, a README, or a documentation template. Everything is generated in your browser, so nothing you configure is sent anywhere.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the tech theme use real technical terms?",
        a: "It uses common product and engineering vocabulary, such as deploy, sprint, and dashboard, arranged into sentences. The sentences are filler and are not technically accurate.",
      },
      {
        q: "Can I generate names for a user list?",
        a: "Yes. Set the unit to Names to get short name-style entries that are handy for tables, avatars, and comment threads.",
      },
      {
        q: "Is this the same as the default on the homepage?",
        a: "The homepage also opens on the Tech theme, but this page is built around that use case and starts at three paragraphs without the classic opener.",
      },
    ],
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
