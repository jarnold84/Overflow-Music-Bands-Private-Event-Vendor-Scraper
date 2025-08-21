// File: src/extractors/styleVibe.ts

// Extracts style or vibe descriptors for leads (e.g., 'rustic', 'elegant', 'modern')
export function extractStyleVibe(html: string): string[] {
    const vibes: string[] = [];

    // Style/vibe keywords that hint at aesthetic or brand tone
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

/* 
🛠️ TO DO – Optional Future Enhancements:
----------------------------------------

🔍 1. Add support for emerging or niche style words:
    - Examples: 'intimate', 'sacred', 'luxury', 'DIY', 'eclectic', 'wellness', 'minimalist', 'soulful', 'earthy'

🧠 2. Add GPT-based fuzzy extractor fallback:
    - Use GPT to extract descriptive adjectives from the homepage or About page
    - Useful when words like “refined,” “playful,” or “magical” are used that aren’t in keyword list

🎯 3. Assign a confidence score per keyword (e.g., frequency, emphasis, section context)

📄 4. Consider page-prioritized extraction:
    - About, Home, and Services might hold more meaningful style descriptions than Blog or FAQ

⚖️ 5. Normalize / group synonyms:
    - e.g., 'rustic', 'barn', 'farmhouse' → 'rustic'
    - e.g., 'chic', 'modern', 'minimalist' → 'contemporary'
*/
