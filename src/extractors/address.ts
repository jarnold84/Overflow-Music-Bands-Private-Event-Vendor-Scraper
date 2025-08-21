// File: src/extractors/address.ts

/**
 * Attempts to extract a plausible street address from HTML text.
 * This is a basic heuristic matcher; real-world accuracy varies.
 * Meant as a fallback for sites without structured schema data.
 */

export function extractAddress(html: string): string | null {
  // Looks for patterns like: "123 Main St", "123 Main Street, Springfield", etc.
  const addressRegex = /\d{1,6}\s[\w\s.'-]+(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Lane|Ln|Drive|Dr|Way|Court|Ct|Circle|Cir|Parkway|Pkwy|Place|Pl|Square|Sq)\b[\w\s.,-]*/i;

  const match = html.match(addressRegex);
  return match ? match[0].trim() : null;
}
/*
TO DO (optional future upgrades):
- Add structured parsing using a library like `parse-address` or Google Maps API
- Match full addresses including zip code, city, and state where possible
- Use multiple regex passes to parse city/state/zip separately for location normalization
- Add support for international addresses and localization options
- Extract from microdata / JSON-LD (e.g. schema.org "PostalAddress") if available
- Track which page the address was extracted from in `sourcePages`
*/
