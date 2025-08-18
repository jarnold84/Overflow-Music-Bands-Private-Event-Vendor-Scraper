// Extracts style or vibe descriptors for wedding vendors
export function extractStyleVibe(html: string): string[] {
    const vibes: string[] = [];
    const keywords = [
        'elegant', 'industrial', 'garden', 'rustic', 'modern', 'boho',
        'vintage', 'romantic', 'artistic', 'chic', 'classic', 'urban',
        'whimsical', 'barn', 'estate', 'historic'
    ];

    keywords.forEach(word => {
        if (html.toLowerCase().includes(word)) {
            vibes.push(word);
        }
    });

    return vibes;
}
