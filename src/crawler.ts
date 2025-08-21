// File: src/crawler.ts

import { PlaywrightCrawler, log } from 'crawlee';
import { Actor } from 'apify';
import type { ActorInput } from './utils/types.js';

export async function createCrawler(input: ActorInput) {
  const proxy = input.proxyConfiguration
    ? await Actor.createProxyConfiguration(input.proxyConfiguration as any)
    : undefined;

  const crawler = new PlaywrightCrawler({
    headless: true,
    maxConcurrency: input.maxConcurrency ?? 10,
    proxyConfiguration: proxy,
    requestHandlerTimeoutSecs: 60,

    // 🧠 Request handler uses mode-aware router
    requestHandler: async (ctx) => {
      log.info(`🌐 Handling: ${ctx.request.url}`);
      await (await import('./router.js')).routerHandler(ctx, input.mode);
    },

    // 🧭 Optimize browser for scraping
    preNavigationHooks: [
      async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
      },
    ],

    // ⏳ Wait until network is idle for better completeness
    postNavigationHooks: [
      async ({ page }) => {
        await page.waitForLoadState('networkidle');
      },
    ],
  });

  return crawler;
}

/*
TO DO (optional future upgrades):
- Add support for rotating user agents (anti-bot evasion)
- Add session pooling for more stable login or CAPTCHA-prone sites
- Surface cookie management (esp. for future DM-only contact scraping)
- Add a `retryHandler` to flag permanently failed URLs
- Log domain crawl summary at the end of each domain run
- Integrate with Apify logging system for crawl metrics per domain
- Add mobile emulation for sites that hide contact info on desktop
*/
