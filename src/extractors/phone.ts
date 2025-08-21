// File: src/extractors/phone.ts

/**
 * Extracts phone numbers from visible HTML text.
 * Attempts to match common North American formats and deduplicate.
 * Skips obviously fake/test numbers like "555".
 */

export function extractPhones(html: string): string[] {
  const phoneRegex = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

  const matches = html.match(phoneRegex) || [];

  const filtered = matches
    .map(p => p.trim())
    .filter(p =>
      // Avoid "555" test numbers and very short junk
      !p.includes('555') &&
      p.replace(/\D/g, '').length >= 10
    );

  return [...new Set(filtered)];
}
/*
TO DO (optional future upgrades):
- Normalize phone numbers to E.164 format for easier downstream processing
  e.g., using `libphonenumber-js` or a similar lightweight library
- Add support for international formats with +XX country codes
- Parse phone numbers found in `tel:` links separately for higher confidence
- Distinguish between mobile, office, and fax (if text context allows)
- Score phone confidence level (e.g. found in footer vs. buried in random text)
*/
