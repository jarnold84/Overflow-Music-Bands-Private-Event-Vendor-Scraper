// File: src/extractors/services.ts

/**
 * Extracts service keywords from HTML based on presence of known service-related terms.
 * Supports broader vendor categories for weddings and corporate/private events.
 */

export function extractServices(html: string): string[] {
  const text = html.toLowerCase();

  const serviceKeywords = [
    'wedding planning', 'event planning', 'corporate events', 'private events',
    'photography', 'videography', 'dj', 'band', 'live music',
    'floral design', 'flowers', 'catering', 'bartending',
    'event rentals', 'furniture rental', 'tent rental',
    'av production', 'audio visual', 'lighting', 'event design',
    'transportation', 'shuttle', 'valet', 'makeup', 'hair',
    'venue', 'decor', 'invitations', 'stationery', 'calligraphy'
  ];

  const found = serviceKeywords.filter(keyword => text.includes(keyword));
  return [...new Set(found)];
}

/*
TO DO (optional future upgrades):

- 🧠 Add GPT-powered classification for edge cases (e.g. “luxury immersive experiences” → experiential events)
- 💬 Group keywords into categories (e.g. AV, food, decor) for richer message personas
- ✨ Add semantic or fuzzy match (e.g. via embedding or Levenshtein distance)
- 🔎 Highlight where on the page the services were mentioned (for scoring/debugging)
- 🔁 Track services per page and roll up to domain-level
- 🌍 Localize keyword list for international language support
- 📄 Include canonical service name + source phrase match for better debug output
*/
