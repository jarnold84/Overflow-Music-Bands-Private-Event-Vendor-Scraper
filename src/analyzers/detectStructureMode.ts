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
  const { html, text, url } = snapshot;
  const lcHtml = html.toLowerCase();
  const lcText = text.toLowerCase();

  // 1. Empty or minimal text content → likely JavaScript-rendered
  if (html.length > 10000 && text.length < 2000) {
    return 'js-heavy';
  }

  // 2. React-based SPA
  if (lcHtml.includes('__next_data__') || lcHtml.includes('__react_devtools_global_hook__') || lcHtml.includes('react.createelement')) {
    return 'spa-react';
  }

  // 3. Template builders
  if (lcHtml.includes('wix.com') || lcHtml.includes('squarespace.com') || lcHtml.includes('static.squarespace.com')) {
    return 'template-heavy';
  }

  // 4. Team grid or faculty directory
  if (
    lcHtml.match(/(faculty|team|staff|our people|meet the team)/i) &&
    lcHtml.match(/<img[^>]+src="[^"]+"/g)?.length > 5
  ) {
    return 'team-directory';
  }

  // 5. Single-page site
  if (text.length > 10000 && !lcHtml.includes('<nav') && lcHtml.match(/href="[^"]*#/)?.length > 10) {
    return 'single-page';
  }

  // 6. Multi-page with nav links
  if (lcHtml.includes('<nav') && lcHtml.match(/href="[^"]*(about|contact|services)/i)) {
    return 'multi-page';
  }

  // 7. Form-only contact
  if (lcHtml.includes('<form') && !text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
    return 'form-only';
  }

  return 'unknown';
}

/* Future Enhancements TO DO:
Track DOM stats like number of links, forms, or sections to improve structural pattern detection.

Return a confidence score and explanation for each detected mode to support debugging and fallback logic.

Capture a screenshot of each page and use GPT Vision or image analysis to visually determine layout structure.

Use embeddings or clustering to detect similar page structures based on HTML tag patterns and layout features.

Log structure modes alongside crawl success to identify which patterns yield the best results and refine rules.

Use text analysis to detect if a site feels sacred, commercial, healing, or artistic to align crawler behavior with tone.

Flag seasonal structures like wedding venues for timed re-crawling based on content cycle patterns.

Combine structure mode with campaign intent to dynamically route crawl depth, extraction logic, or messaging style.
*/
