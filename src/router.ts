// src/crawler.ts
import { PlaywrightCrawler, log } from 'crawlee';
import { Actor } from 'apify';
import type { ActorInput } from './utils/types.js';
import { routerHandler } from './router.js';

export async function createCrawler(input: ActorInput) {
  const proxy = input.proxyConfiguration
    ? await Actor.createProxyConfiguration(input.proxyConfiguration as any)
    : undefined;

  return new PlaywrightCrawler({
    requestHandler: async (ctx) => {
      log.info(`Handling ${ctx.request.url}`);
      await routerHandler(ctx, input.mode);
    },
    headless: true,
    maxConcurrency: input.maxConcurrency ?? 10,
    proxyConfiguration: proxy,
    preNavigationHooks: [
      async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
      },
    ],
    postNavigationHooks: [
      async ({ page }) => {
        await page.waitForLoadState('networkidle');
      },
    ],
    requestHandlerTimeoutSecs: 60,
  });
}
