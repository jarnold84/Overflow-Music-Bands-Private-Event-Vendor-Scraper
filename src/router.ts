// File: src/router.ts
import { Router } from 'crawlee';
import { buildSnapshot } from './utils/snapshot';
import { getContext } from './domainContext';
import { runExtractors } from './extractors/runExtractors';
import { recomputeScore, shouldStop } from './stopRules';
import { discoverLinks } from './utils/url'; // Adjust if using `selectors.ts`
import { persistAndPush } from './output';
import { Actor } from 'apify';
import type { ActorInput } from './types';

export const router = createRouteHandler<ActorInput>();

router.addDefaultHandler(async (ctx) => {
    const { request, page, log, input } = ctx;
    const url = request.url;

    log.info(`Visiting: ${url}`);
    const domainCtx = getContext(url);

    // Skip duplicate visits
    if (domainCtx.pagesVisited.has(url)) {
        log.info(`Skipping already visited URL: ${url}`);
        return;
    }
    domainCtx.pagesVisited.add(url);

    const snapshot = await buildSnapshot(page, url);
    await runExtractors(snapshot, domainCtx, input.campaignMode ?? 'mixed');
    recomputeScore(domainCtx, input);

    if (shouldStop(domainCtx, input)) {
        const runId = Actor.config.get('actorRunId') ?? 'dev';
        await persistAndPush(domainCtx, { ...input, runId });
        return;
    }

    const nextLinks = discoverLinks(snapshot.url, input.campaignMode ?? 'mixed');
    await ctx.enqueueLinks({ urls: nextLinks });
});
