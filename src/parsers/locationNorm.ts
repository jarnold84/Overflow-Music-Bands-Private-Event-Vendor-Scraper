// File: src/parsers/locationNorm.ts

/**
 * Normalizes and infers geographic info from a raw address string
 * or partial structured object. Adds default country + inferred metro.
 */
export function normalizeLocation(
  input: string | { city?: string; state?: string; country?: string; metro?: string }
): { city?: string; state?: string; country?: string; metro?: string } {
  if (typeof input !== 'string') {
    const country = input.country ?? 'USA';
    return { ...input, country };
  }

  const address = input.trim();
  const parts = address.split(',').map((p) => p.trim());

  const city = parts[0] || undefined;
  const state = parts[1]?.split(' ')[0] || undefined;
  const country = 'USA';

  let metro: string | undefined;
  if (['Philadelphia', 'Allentown', 'Reading'].includes(city || '')) metro = 'Philadelphia Metro';
  else if (['Baltimore'].includes(city || '')) metro = 'Baltimore Metro';
  else if (['Princeton'].includes(city || '')) metro = 'NJ/NYC Metro';
  else if (['New York', 'Brooklyn', 'Queens', 'Bronx', 'Manhattan'].includes(city || '')) metro = 'NYC Metro';
  else if (['Los Angeles', 'Santa Monica', 'Pasadena'].includes(city || '')) metro = 'LA Metro';
  else if (['San Francisco', 'Oakland', 'Berkeley'].includes(city || '')) metro = 'Bay Area';
  else if (['Chicago'].includes(city || '')) metro = 'Chicago Metro';
  else if (['Atlanta'].includes(city || '')) metro = 'Atlanta Metro';

  return { city, state, country, metro };
}
/*
TO DO (optional future upgrades):
- Add a fuzzy GPT fallback or use 3rd-party address parsers like Google Maps API or libpostal
- Extract zip code and street-level detail if available
- Infer metro areas using state/city pairs and a mapping dictionary
- Add logic to prioritize About/Contact page address over Footer address if available
- Support international cities + country-specific metro clusters
- Move metro logic to a shared lookup utility to reduce repetition
*/
