// Attempts to extract a lead (person) name from bio-like HTML content
export function extractLeadName(html: string): string | null {
    // Match common "Hi, I'm NAME" or "My name is NAME" patterns
    const namePattern = /(?:Hi|Hello)[^a-zA-Z0-9]{1,10}I['’]m\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i;
    const nameMatch = html.match(namePattern);
    if (nameMatch) return nameMatch[1].trim();

    const altPattern = /my name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i;
    const altMatch = html.match(altPattern);
    if (altMatch) return altMatch[1].trim();

    // Bonus: try looking for Person schema
    const schemaMatch = html.match(/"@type":\s*"Person".*?"name":\s*"([^"]+)"/i);
    if (schemaMatch) return schemaMatch[1].trim();

    return null;
}

/*
🔮 TO DO:
- Add logic to avoid company names (e.g., "Jane Doe Studio")
- Add page-prioritized extraction (About → Contact → Team)
- Add fuzzy GPT fallback (if nothing obvious found)
*/
