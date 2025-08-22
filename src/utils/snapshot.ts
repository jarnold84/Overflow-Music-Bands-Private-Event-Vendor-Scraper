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
 * Unified snapshot builder. Use `snapshotPage()` for crawler ctx,
 * or `buildSnapshot()` for standalone Playwright page + URL.
 */

/**
 * Main crawler-friendly snapshot function.
 * Accepts Crawlee context and extracts full snapshot.
 */
export async function snapshotPage(ctx): Promise<PageSnapshot> {
  try {
    const html = await ctx.page.content();
    const title = await ctx.page.title();
    const text = await ctx.page.evaluate(() => document.body?.innerText || '');

    return {
      url: ctx.request.url,
      html,
      title,
      text,
    };
  } catch (err) {
    console.warn(`⚠️ Failed to snapshot ${ctx.request.url}:`, err);
    return {
      url: ctx.request.url,
      html: '',
      title: '',
      text: '',
    };
  }
}

/**
 * Alternative snapshot builder for raw Playwright `page` and custom URL.
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
🔧 TO DO (optional future upgrades):
- Add DOM hash or content checksum for deduplication
- Strip out script/style tags from raw HTML if unnecessary
- Add timestamp or crawlId to support versioning
- Capture structured metadata (e.g. Open Graph, Schema.org) into snapshot
- Add page type guesser (e.g. isHomePage, isAboutPage, isContactPage)
- Capture screenshot or visual snapshot (optional for debugging)
- Track viewport size or mobile/desktop mode used
*/
