// File: src/analyzers/detectStructureMode.ts

import type { PageSnapshot } from '../utils/snapshot';

export type StructureMode =
  | 'single-page'
  | 'multi-page'
  | 'team-directory'
  | 'form-only'
  | 'js-heavy'
  | 'spa-react'
  | 'template-heavy'
  | 'unknown';

/**
 * Detects structural pattern of the website to guide extraction strategy.
 */
export function detectStructureMode(snapshot: PageSnapshot): StructureMode {
  const { html = '', text = '', url = '' } = snapshot;
  const lcHtml = html.toLowerCase();
  const lcText = text.toLowerCase();

  // 1. JavaScript-heavy: long HTML, short visible text
  if (html.length > 10000 && text.length < 2000) {
    return 'js-heavy';
  }

  // 2. React SPA: React signatures
  if (
    lcHtml.includes('__next_data__') ||
    lcHtml.includes('__react_devtools_global_hook__') ||
    lcHtml.includes('react.createelement')
  ) {
    return 'spa-react';
  }

  // 3. Template builders (Wix, Squarespace, etc.)
  if (
    lcHtml.includes('wix.com') ||
    lcHtml.includes('squarespace.com') ||
    lcHtml.includes('static.squarespace.com')
  ) {
    return 'template-heavy';
  }

  // 4. Team or faculty directory (image grid + label)
  const hasTeamKeywords = /(faculty|team|staff|our people|meet the team)/i.test(lcHtml);
  const imageMatches = lcHtml.match(/<img[^>]+src="[^"]+"/g);
  if (hasTeamKeywords && imageMatches && imageMatches.length > 5) {
    return 'team-directory';
  }

  // 5. Single-page sites: long text, many anchor links, no nav
  const anchorLinks = lcHtml.match(/href="[^"]*#/) ?? [];
  if (text.length > 10000 && !lcHtml.includes('<nav') && anchorLinks.length > 10) {
    return 'single-page';
  }

  // 6. Multi-page sites: standard nav patterns
  if (lcHtml.includes('<nav') && lcHtml.match(/href="[^"]*(about|contact|services)/i)) {
    return 'multi-page';
  }

  // 7. Form-only contact page: form tag, no visible email
  const hasForm = lcHtml.includes('<form');
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  if (hasForm && !hasEmail) {
    return 'form-only';
  }

  return 'unknown';
}

/* ✅ DETECT STRUCTURE MODE — TO DO (Future Enhancements)

🎯 Recently Completed:
- [x] Added `structureMode` output field for all leads
- [x] Implemented early-exit logic based on structureMode
- [x] Supports React SPAs, template builders, JS-heavy pages, team directories, and single-page anchors

🚀 Next-Level Enhancements:
1. 🧠 Return confidence score + rationale per detected mode (for diagnostics and fallback logic)
2. 📊 Track DOM metrics: number of nav links, images, sections, forms (for structure heuristics)
3. 🖼️ Capture screenshots → GPT Vision or layout-based structure detection
4. 🧬 Use HTML embeddings or tag-clustering to detect similar structural archetypes
5. 📈 Log structureMode with crawl outcome success to refine detection rules over time
6. 💡 Detect site *tone*: sacred / commercial / healing / artistic → influence crawl/messaging behavior
7. 🗓️ Add seasonal pattern detection (e.g. wedding venue re-crawls in spring/summer)
8. 🔀 Combine structureMode + campaign intent to dynamically set crawl strategy (depth, page types, persona style)

*/
