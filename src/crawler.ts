// File: src/crawler.ts

import { PlaywrightCrawler, log } from 'crawlee';
import { routerHandler } from './router'; // ✅ updated import
import type { ActorInput } from './utils/types';

export function createCrawler(input: ActorInput) {
    return new PlaywrightCrawler({
        requestHandler: async (ctx) => {
            log.info(`Handling ${ctx.request.url}`);
            await routerHandler(ctx, input.mode); // ✅ updated call
        },
        headless: true,
        maxConcurrency: input.maxConcurrency ?? 10,
        proxyConfiguration: input.proxyConfiguration,
        preNavigationHooks: [
            async ({ page }) => {
                await page.setViewportSize({ width: 1200, height: 800 });
                await page.setExtraHTTPHeaders({
                    'Accept-Language': 'en-US,en;q=0.9',
                });
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
