// File: src/extractors/about.ts

/**
 * Attempts to extract a summary "About" snippet from HTML using regex.
 * Includes multiple fallbacks and normalized output.
 */

export function extractAbout(html: string): string | null {
  const lowered = html.toLowerCase();

  const candidates: RegExp[] = [
    /about[^<]{0,100}<[^>]*>([^<]{20,500})<\//i,
    /who\s+we\s+are[^<]{0,100}<[^>]*>([^<]{20,500})<\//i,
    /our\s+story[^<]{0,100}<[^>]*>([^<]{20,500})<\//i,
    /mission[^<]{0,100}<[^>]*>([^<]{20,500})<\//i,
    /<meta\s+name=["']description["']\s+content=["']([^"']{20,300})["']/i,
    /<meta\s+property=["']og:description["']\s+content=["']([^"']{20,300})["']/i,
  ];

  for (const pattern of candidates) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return normalizeAboutText(match[1]);
    }
  }

  return null;
}

/**
 * Clean up and normalize extracted About text.
 */
function normalizeAboutText(text: string): string {
  return text
    .replace(/\s+/g, ' ')      // collapse whitespace
    .replace(/[\r\n\t]+/g, ' ') // remove line breaks/tabs
    .trim();
}

/*
TO DO (optional future upgrades):

- 🔍 Use Cheerio or DOM parsing to traverse structured elements (e.g. <section>, <article>)
- 🧠 Add a summarization option using GPT for very long About sections
- 💬 Add language detection to handle non-English About sections
- 🔁 Cache or store which strategy succeeded (meta vs. about tag vs. who we are)
- 🧪 Add unit tests for known About-section patterns across industries
- 📄 Store original source (tag or meta) for debugging or scoring
- 🎯 Add semantic scoring to rank candidate Abouts if multiple are found
*/
