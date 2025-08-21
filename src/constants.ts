// File: src/constants.ts

// ❌ Domains to avoid crawling — aggregators, job boards, social sites, etc.
export const BLOCKED_DOMAINS = [
  'weddingwire.com',
  'theknot.com',
  'yelp.com',
  'zola.com',
  'eventective.com',
  'linkedin.com',
  'facebook.com',
  'reddit.com',
  'eventbrite.com',
  'ziprecruiter.com',
  'weddingrule.com',
  'quora.com',
  'thebash.com',
  'gigsalad.com',
  'indeed.com',
];

// ❌ Skip these sub-paths within otherwise valid domains
export const BLOCKED_PATH_SNIPPETS = [
  '/blog',
  '/jobs',
  '/careers',
  '/post',
  '/news',
  '/faq',
  '/login',
  '/cart',
  '/privacy',
  '/terms',
  '/newsletter',
  '/cookies',
  '/sitemap',
];

// ✅ Paths likely to contain useful information
export const ALLOWED_PATH_HINTS = [
  '/about',
  '/contact',
  '/team',
  '/staff',
  '/services',
  '/weddings',
  '/wedding',
  '/events',
  '/event',
  '/meetings',
  '/corporate',
  '/portfolio',
  '/gallery',
  '/rfp',
  '/floorplan',
  '/capacities',
  '/banquet',
  '/venue',
  '/spaces',
  '/book',
  '/inquiry',
];

// 📧 Email regex — matches most valid email formats
export const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// ☎️ Phone number regex — handles international, formatted, or raw numbers
export const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/g;

/*
TO DO:
- IMPORTANT: Update keywords for universal use
- 🌐 Externalize BLOCKED/ALLOWED lists to a JSON file or config to allow user overrides
- 🧠 Train or GPT-generate dynamic path whitelists based on observed structure of useful content
- 🔍 Add domain-specific overrides (e.g. allow /blog on a site known to use it for bios)
- 🧼 Add normalized domain/path filters for fuzzy matching (e.g. trailing slashes, hash routes)
- 📊 Log path skips to dataset for future tuning of allowed/blocked rules
- ✨ Use context-aware scoring (e.g. “services” mentioned 5 times on page vs once in footer)
*/
