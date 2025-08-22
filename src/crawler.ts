// File: src/crawler.ts

import { PlaywrightCrawler, log } from 'crawlee';
import { Actor } from 'apify';
import type { ActorInput } from './utils/types.js';
import { detectStructureMode } from './analyzers/detectStructureMode.js';
import { snapshotPage } from './utils/snapshot.js';

export async function createCrawler(input: ActorInput) {
  const proxy = input.proxyConfiguration
    ? await Actor.createProxyConfiguration(input.proxyConfiguration as any)
    : undefined;

  const crawler = new PlaywrightCrawler({
    headless: true,
    maxConcurrency: input.maxConcurrency ?? 10,
    proxyConfiguration: proxy,
    requestHandlerTimeoutSecs: 60,

    // 🧠 Request handler uses campaign-aware + structure-aware router
    requestHandler: async (ctx) => {
      log.info(`🌐 Handling: ${ctx.request.url}`);

      // Inject structureMode if not already present
      if (!ctx.request.userData.structureMode) {
        const snapshot = await snapshotPage(ctx.page, ctx.request.url);
        const structureMode = detectStructureMode(snapshot);
        ctx.request.userData.structureMode = structureMode;
        log.info(`🏗️ Detected structureMode: ${structureMode}`);
      }

      await (await import('./router.js')).routerHandler(
        ctx,
        input.campaignMode,
        ctx.request.userData.structureMode
      );
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
🛠️ TO DO: Optional Future Upgrades

🔁 Rotating user agents to reduce anti-bot detection

📦 Session pooling for login/CAPTCHA-prone environments

🍪 Cookie management system for DM-only fallback or gated content

🔄 Retry handler for permanently failed or redirected URLs

📊 Log summary stats per domain: pages visited, contacts found, crawl duration

📈 Integrate with Apify run logs to expose crawl-level metrics

📱 Add mobile emulation fallback for sites that hide email/contact on desktop

🧠 Enable structureMode-based routing paths (e.g., skip nav pages for single-page, expand team-directory depth)

*/
