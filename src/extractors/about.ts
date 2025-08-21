// File: src/extractors/about.ts

/**
 * Attempts to extract a short "About" section from HTML.
 * 
 * This uses a basic heuristic: look for a tag that starts with "about"
 * and try to capture nearby visible text inside a tag.
 * 
 * This is best-effort and will miss sites with JS-rendered content or non-standard markup.
 */
export function extractAbout(html: string): string | null {
  const aboutRegex = /about[^<]{0,100}<[^>]*>([^<]{20,500})<\//i;
  const match = html.match(aboutRegex);
  return match ? match[1].trim() : null;
}

/*
TO DO (optional future upgrades):

- ✅ Add fallback logic: check `<meta name="description">` or Open Graph tags like `<meta property="og:description">`
- 🔄 Normalize or trim whitespace, emojis, and line breaks
- 📜 Consider using Cheerio or DOM parsing for more reliable structure
- 🧠 Use GPT to summarize long About pages into a 1-sentence bio
- 🔍 Look for synonyms like "Our Story", "Who We Are", "Mission", etc.
- 📎 Capture the source URL or tag context for attribution/debugging
- 🧪 Add test coverage for different about-page formats (spa, CMS, static)
- 🔢 Add a confidence score to About extraction (for use in prioritization)
*/
