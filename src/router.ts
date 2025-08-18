// File: src/router.ts
import { createRouteHandler } from 'crawlee';
import { buildSnapshot } from './utils/snapshot';
import { getDomainContext } from './domainContext';
import { runExtractors } from './extractors/runExtractors';
import { recomputeScore, shouldStop } from './stopRules';
import { discoverLinks } from './utils/url';
import { persistAndPush } from './utils/output';
import type { ActorInput } from './types';

export const router = createRouteHandler<ActorInput>();

router.addDefaultHandler(async (ctx) => {
    const { request, page, log, input } = ctx;

    log.info(`Visiting: ${request.url}`);
    const snapshot = await buildSnapshot(page, request.url);
    const domainCtx = await getDomainContext(request.url);

    await runExtractors(snapshot, domainCtx, input.campaignMode ?? 'mixed');
    recomputeScore(domainCtx, input);

    if (shouldStop(domainCtx, input)) {
        await persistAndPush(domainCtx, input);
        return;
    }

    const nextLinks = discoverLinks(snapshot.url, input.campaignMode ?? 'mixed');
    await ctx.enqueueLinks({ urls: nextLinks });
});
