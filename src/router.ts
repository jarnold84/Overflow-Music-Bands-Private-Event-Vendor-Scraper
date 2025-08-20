// File: src/router.ts
import { log, Router } from 'crawlee';
import { buildSnapshot } from './utils/snapshot';
import { runExtractors } from './extractors/runExtractors';
import { persistAndPush } from './output';
import { stopRulesMet } from './stopRules';
import type { DomainContext, CampaignMode } from './utils/types';

export const router = Router.create();
const domainContexts = new Map<string, DomainContext>();

export async function routerHandler(ctx: any, mode: CampaignMode) {
  const { request, page } = ctx;
  const url = request.url;
  const domain = new URL(url).hostname;

  if (!domainContexts.has(domain)) {
    domainContexts.set(domain, {
      domain,
      seedUrl: url,
      pagesVisited: new Set(),
      signals: [],
      score: 0,
    });
  }

  const context = domainContexts.get(domain)!;
  if (context.pagesVisited.has(url)) {
    log.info(`Already visited: ${url}`);
    return;
  }

  context.pagesVisited.add(url);
  const snapshot = await buildSnapshot(page, url);
  await runExtractors(snapshot, context, mode);

  if (stopRulesMet(context)) {
    await persistAndPush(context, {});
  }
}
