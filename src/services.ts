// Extracts vendor services keywords (e.g. 'catering', 'DJ', 'event production')
const SERVICE_KEYWORDS = ['venue', 'planner', 'photographer', 'dj', 'band', 'florist', 'caterer', 'av', 'event production', 'dmc'];

export function extractServices(text: string): string[] {
    const found = SERVICE_KEYWORDS.filter(keyword => text.toLowerCase().includes(keyword));
    return [...new Set(found)];
}
