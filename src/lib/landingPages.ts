// Focused generator pages. Each one preloads the generator with a specific
// preset and carries its own guidance and FAQ, so the page answers one
// distinct search intent instead of repeating the homepage.

import type { FAQItem } from "./faqs";

export interface LandingSection {
  heading: string;
  paragraphs: string[];
  /** Optional external resources, listed after the paragraphs. */
  links?: { label: string; href: string; note: string }[];
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
      "Generate exactly 500 characters of lorem ipsum, or any count up to 5,000. Test meta descriptions, text fields, and truncation. Free, instant, no sign-up.",
    eyebrow: "Exact length",
    h1: "Lorem Ipsum Generator: 500 Characters",
    intro:
      "This generator is preset to produce exactly 500 characters of lorem ipsum. Change the number to any count you need and the text updates instantly, with a live character counter so you can verify the length before you copy.",
    preset: { unit: "characters", amount: 500, theme: "classic", startWithLorem: true },
    updated: "2026-11-03",
    related: ["100-characters-text", "lorem-ipsum-100-words", "lorem-ipsum-500-words"],
    sections: [
      {
        heading: "When an exact character count matters",
        paragraphs: [
          "Paragraph and word counts are fine for page layouts, but many interface constraints are measured in characters. A meta description is usually cut off in search results at around 155 to 160 characters, a text message has a fixed segment size, a database column has a hard limit, and a form field may refuse input past a set length. Testing these with text that is roughly the right size hides the bugs that appear at the boundary.",
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
    title: "Funny Lorem Ipsum Generator + Other Silly Filler Text",
    description:
      "Generate funny lorem ipsum with absurd, silly words instead of Latin, plus other themed filler generators to try. Free, instant, no sign-up.",
    eyebrow: "Funny mode",
    h1: "Funny Lorem Ipsum Generator",
    intro:
      "Swap the Latin for absurd, playful filler words. This generator is preset to the Funny word bank, which keeps the natural rhythm of real sentences while using words like kerfuffle, bamboozle, and flapjack.",
    preset: { unit: "paragraphs", amount: 3, theme: "funny", startWithLorem: false },
    updated: "2026-11-03",
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
        heading: "Other funny lorem ipsum generators to try",
        paragraphs: [
          "Most people searching for funny filler text want a few styles to choose from, and the word banks here will not suit every project. These independent generators each commit to a single theme. They are not affiliated with this site.",
        ],
        links: [
          { label: "Bacon Ipsum", href: "https://baconipsum.com/", note: "meat-themed filler text" },
          { label: "Cupcake Ipsum", href: "https://cupcakeipsum.com/", note: "dessert-themed filler text" },
          { label: "Hipster Ipsum", href: "https://hipsum.co/", note: "artisanal, hipster-flavored filler text" },
          { label: "Pirate Ipsum", href: "https://pirateipsum.me/", note: "filler text in pirate slang" },
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
      "Get exactly 100 words of lorem ipsum, ready to copy. Change the count, choose a theme, and export as text, HTML, or Markdown. Free and instant.",
    eyebrow: "Short passage",
    h1: "Lorem Ipsum Generator: 100 Words",
    intro:
      "A hundred words is roughly one solid paragraph. This generator is preset to produce exactly 100 words of classic lorem ipsum, with a word counter so you can confirm the total before you copy.",
    preset: { unit: "words", amount: 100, theme: "classic", startWithLorem: true },
    updated: "2026-11-03",
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
        a: "It varies, because the generator builds sentences of different lengths. You will typically see 7 to 10 sentences in a block of 100 words.",
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
    title: "Lorem Ipsum 500 Words — Copy & Paste Placeholder Text",
    description:
      "Get exactly 500 words of lorem ipsum in readable paragraphs for article templates and scroll tests. Copy as plain text, HTML, or Markdown. Free.",
    eyebrow: "Long form",
    h1: "Lorem Ipsum Generator: 500 Words",
    intro:
      "Five hundred words is enough to fill a full article body or a long landing page section. This generator is preset to produce exactly 500 words, split into readable paragraphs you can copy in one click.",
    preset: { unit: "words", amount: 500, theme: "classic", startWithLorem: true },
    updated: "2026-11-03",
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
          "Body text is usually most readable at around 45 to 75 characters per line. Paste 500 words into your template and look at how many characters actually land on each line at desktop, tablet, and phone widths. If lines run much longer than 75 characters on a wide screen, constrain the column width. If they fall under 40 on a phone, reduce the side padding.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many paragraphs is 500 words?",
        a: "Usually five to seven, depending on how the generator splits the text. If you need a specific number of paragraphs, switch the unit to Paragraphs instead.",
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
      "Generate corporate lorem ipsum in business English: stakeholders, synergy, roadmaps, and quarterly goals. Good for decks and B2B mockups. Free.",
    eyebrow: "Corporate theme",
    h1: "Corporate Lorem Ipsum Generator",
    intro:
      "Placeholder copy that sounds like a business. This generator is preset to the Corporate word bank, which draws on the vocabulary of strategy decks, quarterly reports, and B2B product pages.",
    preset: { unit: "paragraphs", amount: 3, theme: "corporate", startWithLorem: false },
    updated: "2026-11-03",
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
    title: "Tech Lorem Ipsum Generator — Startup Placeholder Text",
    description:
      "Generate tech and startup lorem ipsum with words like API, deploy, and sprint. Ideal for SaaS, developer tools, and app mockups. Free, instant, no sign-up.",
    eyebrow: "Tech / startup theme",
    h1: "Tech Lorem Ipsum Generator",
    intro:
      "Placeholder text in the language of software teams. This generator is preset to the Tech / Startup word bank, built from the vocabulary you see on SaaS landing pages, changelogs, and developer docs.",
    preset: { unit: "paragraphs", amount: 3, theme: "tech", startWithLorem: false },
    updated: "2026-11-03",
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
  {
    slug: "dummy-text-generator",
    label: "Dummy Text Generator",
    title: "Dummy Text Generator — Copy & Paste Placeholder Text",
    description:
      "Free dummy text generator for web design, print, and app mockups. Get Latin or readable English filler by paragraph, word, or character. Copy in one click.",
    eyebrow: "Dummy text",
    h1: "Dummy Text Generator",
    intro:
      "Generate dummy text for any layout that needs words before the real copy is ready. The tool opens on three paragraphs of classic lorem ipsum, and you can switch to readable English or a themed word bank in one click.",
    preset: { unit: "paragraphs", amount: 3, theme: "classic", startWithLorem: true },
    updated: "2026-11-15",
    related: ["random-sentence-generator", "100-characters-text", "lorem-ipsum-500-words"],
    sections: [
      {
        heading: "What dummy text is for",
        paragraphs: [
          "Dummy text is temporary copy that fills a design so you can judge the layout before the final words exist. Designers use it in website mockups, brochures, app screens, and slide templates. Developers use it to test how components handle short and long content, and to seed databases with something more realistic than “test test test”.",
          "The most common dummy text is lorem ipsum, scrambled Latin taken from a text by Cicero. Its words have a natural mix of lengths, so it fills a page the way real writing does, and because most readers cannot understand it they look at the design rather than the content. The “What lorem ipsum means” link at the bottom of this page explains where it came from.",
        ],
      },
      {
        heading: "Latin or English dummy text?",
        paragraphs: [
          "Latin filler is the safe default for visual design. Nobody mistakes it for finished copy, so it rarely ends up on a live page by accident.",
          "Readable English is better when people will actually read the mockup, for example in a usability test, a client review, or a prototype where word length and reading rhythm matter. Open More options and choose Readable English to get grammatical sentences instead of Latin. The Corporate, Tech, Foodie, Cat, and Funny banks give the filler a specific tone.",
        ],
      },
      {
        heading: "Getting the amount right",
        paragraphs: [
          "Choose Paragraphs for articles and page sections, Sentences for cards and descriptions, Words when a brief gives you a word count, and Characters when a field has a hard limit. Words go up to 1,000 and characters up to 5,000, so you can fill anything from a button label to a long-form page.",
          "Copy the result as plain text, HTML with paragraph tags, or Markdown. Everything is generated in your browser and nothing is sent to a server.",
        ],
      },
      {
        heading: "Dummy text in Word, Google Docs, and Figma",
        paragraphs: [
          "Microsoft Word can insert its own filler: type =lorem() or =rand() on a new line and press Enter. =lorem(3,5) gives three paragraphs of five sentences each, and =rand() inserts English sample sentences instead of Latin. Google Docs and Figma have no built-in command, so most people paste text from a generator like this one or install a plugin.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is dummy text the same as lorem ipsum?",
        a: "Lorem ipsum is the best-known kind of dummy text. Dummy text is any placeholder copy, and it can be Latin, English, or themed words, as long as it is replaced before the design goes live.",
      },
      {
        q: "Can I get dummy text in English?",
        a: "Yes. Open More options and choose Readable English. You get grammatical English sentences that are still clearly filler, which suits usability tests and client reviews.",
      },
      {
        q: "Is the dummy text free to use?",
        a: "Yes. The text is generated in your browser, there is no sign-up, and you can use the output in any project, commercial or personal.",
      },
      {
        q: "How do I add dummy text in Microsoft Word?",
        a: "Type =lorem() on an empty line and press Enter for Latin filler, or =rand() for English sample text. Add numbers in the brackets, such as =lorem(2,4), to set paragraphs and sentences.",
      },
    ],
  },
  {
    slug: "100-characters-text",
    label: "100 Characters Text",
    title: "100 Characters Text — Copy & Paste Exactly 100 Characters",
    description:
      "Copy text that is exactly 100 characters long, spaces included. Generate fresh 100-character strings or any length up to 5,000 to test fields and limits.",
    eyebrow: "Exact length",
    h1: "100 Characters Text Generator",
    intro:
      "This page is preset to produce text that is exactly 100 characters long, counting spaces and punctuation. Copy it as it is, generate a fresh string, or type any other length and watch the counter confirm it.",
    preset: { unit: "characters", amount: 100, theme: "classic", startWithLorem: true },
    updated: "2026-11-15",
    related: ["lorem-ipsum-500-characters", "lorem-ipsum-100-words", "dummy-text-generator"],
    sections: [
      {
        heading: "What 100 characters looks like",
        paragraphs: [
          "100 characters is about one long sentence, or 15 to 20 words of ordinary English. Here is a sample that is exactly 100 characters including spaces: “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.” That sample has 15 words.",
          "The generator above gives you a new 100-character string each time you press Generate. The last word may be cut short so the total lands exactly on 100, which is what you want when you are testing a limit.",
        ],
      },
      {
        heading: "Why people need exactly 100 characters",
        paragraphs: [
          "Most of the time it is for testing. A form field with a 100-character limit should accept a 100-character value and refuse the 101st character. A table column, a card title, or a notification preview should handle text of that length without breaking the layout. Pasting a string of known length is the quickest way to check.",
          "Other common uses are checking how a short bio, a product summary, or an alt text will look at full length, and filling a database column to its limit before a release.",
        ],
      },
      {
        heading: "Other lengths worth testing",
        paragraphs: [
          "Limits you will meet often include 30 characters for a Google Ads headline and 90 for an ad description, about 60 for a page title in search results, 150 for an Instagram bio, 160 for a single SMS message, and 280 for a post on X. Change the number in the generator to any of these, or to 1,000 characters for a longer field, and the text updates instantly.",
          "Test the limit itself and the value one above it. Most bugs show up at the boundary.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does 100 characters include spaces?",
        a: "Yes. The generator counts every character, including spaces and punctuation, which matches how text fields, databases, and most character counters measure length.",
      },
      {
        q: "How many words is 100 characters?",
        a: "Usually between 15 and 20 words, depending on how long the words are. Text with short words fits more of them into 100 characters.",
      },
      {
        q: "Can I get 100 characters of English instead of Latin?",
        a: "Yes. Open More options and choose another word bank, such as Readable English, Tech, or Funny. The length stays at exactly 100 characters.",
      },
      {
        q: "Can I generate 200, 500, or 1,000 characters?",
        a: "Yes. Type any number up to 5,000 in the amount box and the text regenerates at that exact length.",
      },
    ],
  },
  {
    slug: "random-sentence-generator",
    label: "Random Sentences",
    title: "Random Sentence Generator — Readable English Sentences & Paragraphs",
    description:
      "Generate random English sentences or paragraphs that read naturally. Pick how many you need, copy them in one click. Free, instant, no sign-up.",
    eyebrow: "Readable English",
    h1: "Random Sentence Generator",
    intro:
      "Get random sentences in plain, grammatical English. The generator is preset to five sentences from the Readable English bank. Switch the unit to Paragraphs when you need longer random text.",
    preset: { unit: "sentences", amount: 5, theme: "english", startWithLorem: false },
    updated: "2026-11-15",
    related: ["dummy-text-generator", "funny-lorem-ipsum-generator", "lorem-ipsum-100-words"],
    sections: [
      {
        heading: "How the sentences are made",
        paragraphs: [
          "Each sentence is built from a set of sentence patterns filled with everyday people, animals, objects, places, and times. Because everything is written in the past tense, the grammar holds together, and you get lines like “Early that spring, Priya found a faded postcard near the old bridge.” The combinations are random, so some sentences are a little odd, but they always read as English.",
          "Press Generate for a new batch. Use the copy button next to a sentence to grab just that one, or copy the whole set at once.",
        ],
      },
      {
        heading: "Random paragraphs",
        paragraphs: [
          "Change the unit to Paragraphs to get blocks of three to seven random sentences, up to 50 paragraphs at a time. Choose Words to get an exact word count, which helps when a template or assignment asks for a specific length. Turn on the standard opener and the first sentence becomes the pangram “The quick brown fox jumps over the lazy dog.”",
        ],
      },
      {
        heading: "What people use random sentences for",
        paragraphs: [
          "Designers use readable English when a mockup will be shown to users or clients, because Latin filler makes people ask what it means. Developers use it to fill test data, chat interfaces, and comment threads with text that looks real. Writers and teachers use random sentences as warm-up prompts, and typing practice is easier with text that reads naturally.",
          "If you want filler with a particular tone, try the Funny, Corporate, or Tech word banks under More options. They shuffle themed words instead of building full sentences.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the sentences grammatically correct?",
        a: "Yes. They follow simple English sentence patterns in the past tense. The pairings of people and objects are random, so the meaning can be unusual, but the grammar is correct.",
      },
      {
        q: "Can I generate random paragraphs instead of sentences?",
        a: "Yes. Change the unit to Paragraphs and set how many you want, up to 50. Each paragraph has three to seven sentences.",
      },
      {
        q: "Will I get the same sentences twice?",
        a: "Each press of Generate builds new sentences from thousands of possible combinations, so repeats within a batch are rare.",
      },
      {
        q: "Can I use the sentences in my own work?",
        a: "Yes. The text is generated in your browser and is free to use in any project.",
      },
    ],
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
