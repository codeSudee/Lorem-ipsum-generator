// Word banks for Lorem Ipsum Generator.
// Each themed bank supplies a flat word list used to build sentences that
// mimic natural language rhythm (article/noun/verb-ish mixing is not
// grammatical — like classic lorem ipsum, it's evocative filler text).

export type ThemeKey = "classic" | "corporate" | "tech" | "foodie" | "cat" | "funny";

export interface ThemeDefinition {
  key: ThemeKey;
  label: string;
  description: string;
  words: string[];
  /** The canonical "standard opening" sentence, split into words. */
  opener: string[];
}

const CLASSIC_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et",
  "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis",
  "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex",
  "ea", "commodo", "consequat", "duis", "aute", "irure", "in",
  "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat",
  "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non",
  "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit",
  "anim", "id", "est", "laborum", "sed", "ut", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium",
  "doloremque", "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa",
  "quae", "ab", "illo", "inventore", "veritatis", "quasi", "architecto",
  "beatae", "vitae", "dicta", "explicabo", "nemo", "ipsam", "quia",
  "voluptas", "aspernatur", "aut", "odit", "fugit", "consequuntur", "magni",
  "dolores", "eos", "ratione", "sequi", "nesciunt", "neque", "porro",
  "quisquam", "dolorem", "adipisci", "numquam", "eius", "modi", "tempora",
  "incidunt", "magnam", "quaerat", "minima", "nostrum", "exercitationem",
  "ullam", "corporis", "suscipit", "laboriosam", "aliquid", "commodi",
  "quis", "autem", "vel", "eum", "iure", "reprehenderit", "molestiae",
  "vel", "illum", "fugiat", "nulla", "pariatur",
];

const CORPORATE_WORDS = [
  "synergy", "leverage", "stakeholder", "bandwidth", "actionable",
  "deliverable", "paradigm", "scalable", "roadmap", "onboarding",
  "alignment", "circle back", "touchpoint", "value-add", "core",
  "competency", "disrupt", "ecosystem", "framework", "growth", "hacking",
  "ideate", "incentivize", "iterate", "kpi", "learnings", "low-hanging",
  "fruit", "mindshare", "monetize", "north star", "optimize", "pivot",
  "proactive", "quarterly", "reinvent", "revenue", "robust", "runway",
  "seamless", "silo", "solutioning", "streamline", "synergize", "takeaway",
  "target", "thought leader", "throughput", "traction", "transparency",
  "unlock", "utilize", "value", "vertical", "vision", "win-win",
  "workflow", "workstream", "bottom line", "buy-in", "capacity", "cascade",
  "champion", "client-facing", "cross-functional", "deep dive", "empower",
  "engagement", "enterprise", "execute", "forward-thinking", "holistic",
  "innovate", "insight", "landscape", "leadership", "metrics", "mission",
  "momentum", "narrative", "operationalize", "outcome", "ownership",
  "partnership", "performance", "pipeline", "portfolio", "priority",
  "process", "productivity", "regroup", "resource", "results", "scope",
  "stack", "strategic", "strategy", "sync", "synergistic", "tactical",
  "talent", "transformation", "trend", "velocity", "visibility",
];

const TECH_WORDS = [
  "startup", "founder", "runway", "pitch", "deck", "seed", "round",
  "unicorn", "disrupt", "algorithm", "api", "backend", "frontend",
  "blockchain", "cloud", "cache", "commit", "container", "dashboard",
  "dataset", "deploy", "devops", "endpoint", "framework", "fullstack",
  "gpu", "growth", "hackathon", "infra", "iterate", "kubernetes",
  "latency", "launch", "machine", "learning", "metrics", "microservice",
  "mvp", "neural", "network", "node", "onboarding", "open-source",
  "pipeline", "pivot", "platform", "product-market", "fit", "prototype",
  "pull request", "python", "refactor", "repo", "roadmap", "sandbox",
  "scalable", "server", "serverless", "sprint", "stack", "standup",
  "startup", "stealth", "sync", "token", "unicorn", "user", "ux",
  "valuation", "venture", "viral", "webhook", "wireframe", "agile",
  "async", "automation", "beta", "bootstrap", "bug", "build", "byte",
  "ci/cd", "client", "compute", "config", "cron", "dark mode", "data",
  "debug", "edge", "feature", "flag", "git", "grid", "hardware", "hosting",
  "hypergrowth", "incubator", "integration", "interface", "kanban",
  "keynote", "lean", "logic", "merge", "module", "network", "no-code",
  "notification", "npm", "orbit", "package", "parse", "payload", "query",
  "release", "runtime", "schema", "script", "seed", "shipping", "signal",
  "software", "sprint", "ssh", "staging", "sync", "syntax", "terminal",
  "throughput", "toolkit", "traction", "unicorn", "upgrade", "vector",
  "venture", "version", "webhook", "widget", "yaml",
];

const FOODIE_WORDS = [
  "umami", "artisanal", "drizzle", "garnish", "simmer", "saute", "braise",
  "caramelize", "compote", "confit", "crumble", "curate", "delectable",
  "emulsify", "farm-to-table", "fermented", "flambe", "fusion", "garnish",
  "glaze", "gourmet", "handcrafted", "harvest", "heirloom", "infuse",
  "julienne", "marinate", "medley", "mouthwatering", "organic", "palate",
  "pickled", "plating", "poach", "reduction", "rustic", "savory",
  "seasonal", "sear", "shallot", "signature", "simmer", "smoked",
  "sourdough", "spice", "succulent", "tangy", "tapas", "tasting", "menu",
  "terroir", "truffle", "velvety", "whisk", "zest", "bisque", "brine",
  "brioche", "brulee", "charcuterie", "chutney", "citrus", "compound",
  "butter", "crostini", "drizzled", "essence", "fillet", "flaky", "foraged",
  "freshly", "ground", "garden", "glazed", "hearty", "house-made",
  "infusion", "layered", "marbled", "medallion", "morsel", "pairing",
  "pantry", "pastry", "piquant", "platter", "preserve", "roasted",
  "sizzling", "slow-cooked", "smoky", "spiced", "steeped", "stone-ground",
  "stuffed", "sweet", "tender", "toasted", "wood-fired", "zesty",
];

const CAT_WORDS = [
  "meow", "purr", "whiskers", "paw", "kitten", "nap", "yarn", "scratch",
  "pounce", "tail", "fluff", "hairball", "catnip", "treat", "litterbox",
  "windowsill", "sunbeam", "zoomies", "chirp", "hiss", "cardboard", "box",
  "laser", "pointer", "feather", "toy", "mouse", "claw", "curl", "snooze",
  "stretch", "groom", "whisker", "twitch", "loaf", "knead", "chonk",
  "floof", "prowl", "stalk", "leap", "climb", "perch", "curious",
  "mischief", "cuddle", "purrfect", "meowzers", "kibble", "saucer",
  "cream", "tuna", "salmon", "feline", "tabby", "calico", "tuxedo",
  "siamese", "whisk", "swat", "chase", "burrow", "blanket", "napping",
  "sunspot", "grooming", "hunting", "instinct", "territory", "scratcher",
  "perch", "tunnel", "playtime", "purring", "meandering", "sniff",
  "investigate", "pounce", "wiggle", "tiptoe", "silent", "graceful",
  "agile", "independent", "aloof", "affectionate", "companion", "whisker",
  "twitchy", "tail-flick", "ear-flick", "slow-blink", "headbutt", "nuzzle",
];

const FUNNY_WORDS = [
  "banana", "wobble", "flapjack", "kerfuffle", "noodle", "gizmo", "wombat",
  "bamboozle", "snazzy", "doohickey", "flabbergasted", "gobbledygook",
  "hullabaloo", "malarkey", "shenanigans", "widget", "whatchamacallit",
  "thingamajig", "kazoo", "bumfuzzle", "canoodle", "cattywampus",
  "collywobbles", "diddly-squat", "discombobulated", "flummox", "gubbins",
  "higgledy-piggledy", "hodgepodge", "hogwash", "jibber-jabber", "lollygag",
  "nincompoop", "persnickety", "poppycock", "razzmatazz", "rigmarole",
  "skedaddle", "snollygoster", "taradiddle", "whippersnapper", "willy-nilly",
  "wishy-washy", "yahoo", "zonked", "bonkers", "gadzooks", "galumphing",
  "hocus-pocus", "jamboree", "kaput", "kerplunk", "moist", "muffin", "pickle",
  "potato", "quokka", "sasquatch", "spaghetti", "squabble", "squiggle",
  "toboggan", "waffle", "walrus", "yeet", "zoomies", "blorp", "boop", "chonk",
  "derp", "fluffernutter", "gigglesnort", "honk", "kablooey", "meep",
  "nonsense", "oopsie", "pizzazz", "quibble", "razzle", "scootch", "sizzle",
  "splat", "sproing", "squish", "tootle", "twiddle", "vroom", "whatnot",
  "wiggle", "wobbly", "yikes", "zigzag", "zoinks", "abracadabra", "boondoggle",
  "brouhaha", "codswallop", "dingus", "flibbertigibbet", "hobbledehoy",
  "gobsmacked", "hooligan", "jalopy", "knickknack", "lickety-split",
  "mumbo-jumbo", "namby-pamby", "okey-dokey", "pandemonium", "quagmire",
];

export const THEMES: Record<ThemeKey, ThemeDefinition> = {
  classic: {
    key: "classic",
    label: "Classic Latin",
    description: "The original Cicero-derived lorem ipsum text.",
    words: CLASSIC_WORDS,
    opener: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit"],
  },
  corporate: {
    key: "corporate",
    label: "Corporate",
    description: "Business jargon and buzzword-driven filler.",
    words: CORPORATE_WORDS,
    opener: ["synergy", "leverage", "stakeholder", "value-add", "core", "competency", "roadmap", "alignment"],
  },
  tech: {
    key: "tech",
    label: "Tech / Startup",
    description: "Startup pitch decks and dev-standup vocabulary.",
    words: TECH_WORDS,
    opener: ["our", "startup", "is", "disrupting", "the", "algorithm", "driven", "platform"],
  },
  foodie: {
    key: "foodie",
    label: "Foodie",
    description: "Menu-speak and culinary tasting-note vocabulary.",
    words: FOODIE_WORDS,
    opener: ["artisanal", "farm-to-table", "umami", "drizzled", "with", "a", "citrus", "reduction"],
  },
  cat: {
    key: "cat",
    label: "Cat",
    description: "Meows, purrs, and feline mischief.",
    words: CAT_WORDS,
    opener: ["meow", "purr", "whiskers", "twitch", "as", "the", "kitten", "pounces"],
  },
  funny: {
    key: "funny",
    label: "Funny",
    description: "Absurd, humorous filler words instead of Latin.",
    words: FUNNY_WORDS,
    opener: ["banana", "wobble", "flapjack", "kerfuffle", "noodle", "gizmo", "wombat", "bamboozle"],
  },
};

export const THEME_LIST = Object.values(THEMES);
