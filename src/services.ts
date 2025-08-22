// File: src/services.ts
// Extracts lead services keywords (e.g. 'catering', 'DJ', 'event production')
const SERVICE_KEYWORDS = ['venue', 'planner', 'photographer', 'dj', 'band', 'florist', 'caterer', 'av', 'event production', 'dmc'];

export function extractServices(text: string): string[] {
    const found = SERVICE_KEYWORDS.filter(keyword => text.toLowerCase().includes(keyword));
    return [...new Set(found)];
}

/*
🔧 TO DO:
- Expand or restructure `SERVICE_KEYWORDS` for broader use cases (e.g. coaches, therapists, artists)
- Possibly load keywords from config or external file
- Add fuzzy matching or GPT fallback to detect non-obvious synonyms (e.g. “sound” = “DJ”)
*/
