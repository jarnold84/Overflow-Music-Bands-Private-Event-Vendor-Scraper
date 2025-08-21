// Extracts social media links and handles from HTML content
export function extractSocials(html: string): Record<string, { handle?: string; url: string }> {
  const socials: Record<string, { handle?: string; url: string }> = {};

  // Define social platforms and matching patterns
  const platformPatterns: Record<string, RegExp> = {
    instagram: /https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_.-]+)/gi,
    facebook: /https?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_.-]+)/gi,
    linkedin: /https?:\/\/(?:[a-z]+\.)?linkedin\.com\/(?:in|company)\/([a-zA-Z0-9_-]+)/gi,
    youtube: /https?:\/\/(?:www\.)?youtube\.com\/(channel|user|c)\/([a-zA-Z0-9_-]+)/gi,
    tiktok: /https?:\/\/(?:www\.)?tiktok\.com\/@([a-zA-Z0-9_.-]+)/gi,
    twitter: /https?:\/\/(?:www\.)?(twitter|x)\.com\/([a-zA-Z0-9_]+)/gi,
    pinterest: /https?:\/\/(?:www\.)?pinterest\.com\/([a-zA-Z0-9_/.-]+)/gi,
    threads: /https?:\/\/(?:www\.)?threads\.net\/@([a-zA-Z0-9_.-]+)/gi,
    reddit: /https?:\/\/(?:www\.)?reddit\.com\/user\/([a-zA-Z0-9_-]+)/gi,
  };

  for (const [platform, pattern] of Object.entries(platformPatterns)) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const handle = match[1] || match[2];
      const fullUrl = match[0];
      if (!socials[platform]) {
        socials[platform] = {
          handle: handle.startsWith('@') ? handle : `@${handle}`,
          url: fullUrl,
        };
      }
    }
  }

  return socials;
}
/*
TO DO (optional enhancements):
- Add detection for platform-specific variants:
  - Instagram bio scraping (from meta tags or embedded JSON)
  - Twitter/X bios or follower counts (if available in HTML)
- Add fallback heuristics:
  - Parse social icons using surrounding <a> tag classes or <svg> references
  - Match platform-specific phrases like “Follow us on Instagram” even if the link is missing
- Normalize handles (e.g. strip `@` or trailing slashes consistently)
- Detect multiple accounts per platform (e.g., main + brand pages)
- Integrate known platforms from previous crawls to match aliases or old handles
- Auto-tag priority channel (e.g. use social link if no valid email exists)
- Score trust level (e.g., based on verified icon, follower counts, or .edu/.org links)
- Add emerging platforms: Bluesky, Mastodon, Lemon8, etc.
- Support non-Latin character handles (e.g., Japanese, Cyrillic)
*/
