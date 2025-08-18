// Normalizes and infers location info from a raw address string
export function normalizeLocation(address: string): {
    city?: string;
    state?: string;
    country?: string;
    metro?: string;
} {
    const parts = address.split(',').map(p => p.trim());
    const city = parts[0] || undefined;
    const state = parts[1]?.split(' ')[0] || undefined;
    const country = 'USA';

    let metro: string | undefined;
    if (['Philadelphia', 'Allentown', 'Reading'].includes(city || '')) metro = 'Philadelphia Metro';
    else if (['Baltimore'].includes(city || '')) metro = 'Baltimore Metro';
    else if (['Princeton'].includes(city || '')) metro = 'NJ/NYC Metro';

    return { city, state, country, metro };
}
