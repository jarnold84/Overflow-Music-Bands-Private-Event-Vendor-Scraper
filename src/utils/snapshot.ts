// File: src/utils/snapshot.ts

import { Page } from 'playwright';

/**
 * A structured snapshot of a web page, capturing key content and metadata.
 */
export interface PageSnapshot {
  url: string;
  title: string;
  html: string;
  text: string;
}

/**
 * Builds a snapshot of the current page, including its HTML content,
 * visible text, title, and URL.
 *
 * @param page - The Playwright Page object
 * @param url - The canonical URL for the page (typically request.url)
 * @returns A PageSnapshot object
 */
export async function buildSnapshot(page: Page, url: string): Promise<PageSnapshot> {
  try {
    const html = await page.content();
    const title = await page.title();
    const text = await page.evaluate(() => document.body?.innerText || '');

    return {
      url,
      title,
      html,
      text,
    };
  } catch (err) {
    console.warn(`⚠️ Failed to build snapshot for ${url}:`, err);
    return {
      url,
      title: '',
      html: '',
      text: '',
    };
  }
}

/*
TO DO (optional future upgrades):
- Add DOM hash or content checksum for deduplication
- Strip out script/style tags from raw HTML if unnecessary
- Add timestamp or crawlId to support versioning
- Capture structured metadata (e.g. Open Graph, Schema.org) into snapshot
- Add page type guesser (e.g. isHomePage, isAboutPage, isContactPage)
- Capture screenshot or visual snapshot (optional for debugging)
- Track viewport size or mobile/desktop mode used
*/
