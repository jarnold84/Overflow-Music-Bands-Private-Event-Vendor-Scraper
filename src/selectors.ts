// File: src/selectors.ts

import { PseudoUrl } from 'crawlee';

/**
 * PseudoURLs for discovering structured routes across wedding, corporate,
 * and general vendor websites. These guide crawler link-following behavior.
 */
export const ROUTE_PATTERNS = {
  about: new PseudoUrl('[.*\\/about.*]'),             // About us / Our story
  contact: new PseudoUrl('[.*\\/contact.*]'),         // Contact info, forms
  services: new PseudoUrl('[.*\\/services.*]'),       // Service offerings
  team: new PseudoUrl('[.*\\/(team|staff).*]'),       // Team or staff pages
  portfolio: new PseudoUrl('[.*\\/(portfolio|gallery).*]'), // Work samples
  events: new PseudoUrl('[.*\\/(events|weddings|meetings|banquet).*]'), // Event details
  rfp: new PseudoUrl('[.*\\/(rfp|inquiry|request).*]'), // Lead forms
  bio: new PseudoUrl('[.*\\/(bio|founder|leadership).*]'), // Owner bio pages
  default: new PseudoUrl('[.*]'),                     // Fallback catch-all
};

/*
TO DO:

- 🧠 Add `weight` or `priority` field to each pattern for scoring route value
- ⚙️ Dynamically generate PseudoUrls based on ALLOWED_PATH_HINTS in constants.ts
- 🌐 Allow override by user-supplied input (e.g. `{ pseudoUrlOverrides: [...] }`)
- 📊 Track which route types are most successful to refine crawling heuristics
- 🧹 Add normalization layer to strip trailing slashes, query params, fragments
*/
