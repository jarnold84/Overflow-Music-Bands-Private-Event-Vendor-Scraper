// File: src/router.ts
import { Page } from 'playwright';
import { buildSnapshot } from './utils/snapshot';
import { getDomainContext } from './domainContext';
import { runExtractors } from './extractors';
import { recomputeScore, shouldStop } from './stopRules';
import { discoverLinks } from './utils/url';
import { persistAndPush } from './utils/output';

export async function handlePage({ page, request, campaignMode, cfg }: any) {
    const snapshot = await buildSnapshot(page, request.url);
    const domainCtx = await getDomainContext(request.url);

    await runExtractors(snapshot, domainCtx, campaignMode);
    recomputeScore(domainCtx, cfg);

    if (shouldStop(domainCtx, cfg)) {
        await persistAndPush(domainCtx, cfg);
        return;
    }

    const nextLinks = discoverLinks(snapshot.url, campaignMode);
    await page.context().addCookies([]); // placeholder for cookie logic
    await Promise.all(nextLinks.map(url => page.goto(url)));
}
