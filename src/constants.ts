export const BLOCKED_DOMAINS = [
    'weddingwire.com','theknot.com','yelp.com','zola.com','eventective.com','linkedin.com','facebook.com','reddit.com','eventbrite.com','ziprecruiter.com','weddingrule.com','quora.com','thebash.com','gigsalad.com','indeed.com'
];

export const BLOCKED_PATH_SNIPPETS = [
  '/blog','/jobs','/careers','/post','/news','/faq','/login','/cart','/privacy','/terms'
];

export const ALLOWED_PATH_HINTS = [
  '/about','/contact','/team','/services','/weddings','/wedding','/events','/meetings',
  '/corporate','/portfolio','/gallery','/rfp','/floorplan','/capacities','/banquet'
];

// very light regexes just for MVP
export const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
export const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/g;
