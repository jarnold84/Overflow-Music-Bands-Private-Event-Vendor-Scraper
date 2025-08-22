// File: src/router.ts

import { log, Router } from 'crawlee';
import { buildSnapshot } from './utils/snapshot.js';
import { runExtractors } from './extractors/runExtractors.js';
import { persistAndPush } from './output.js';
import { stopRulesMet } from './stopRules.js';
import type { DomainContext, CampaignMode } from './utils/types.js';

export const router = Router.create();
const domainContexts = new Map<string, DomainContext>();

/**
 * Primary handler for each crawled page. Runs snapshot, extraction,
 * stop-rule logic, and dataset push if appropriate.
 */
export const routerHandler = async (
  ctx: any,
  mode: CampaignMode,
  _request?: any,
  _page?: any
) => {
  const { request, page } = ctx;
  const url = request.url;
  const domain = new URL(url).hostname;

  const FORCE_PUSH = true; // For dev/test; may remove or parameterize in prod

  log.info(`🔍 RouterHandler triggered for URL: ${url}`);

  // Initialize context if first visit to domain
  if (!domainContexts.has(domain)) {
    domainContexts.set(domain, {
      domain,
      seedUrl: url,
      pagesVisited: new Set(),
      signals: [],
      score: 0,
    });
    log.info(`🚀 Initialized domain context for: ${domain}`);
  }

  const context = domainContexts.get(domain)!;

  // Avoid reprocessing already-visited pages
  if (context.pagesVisited.has(url)) {
    log.info(`⏩ Already visited: ${url}`);
    return;
  }

  context.pagesVisited.add(url);
  log.info(`📸 Building snapshot for: ${url}`);

  const snapshot = await buildSnapshot(page, url);
  log.info(`✅ Snapshot complete. Running extractors.`);

  await runExtractors(snapshot, context, mode, ctx.input);
  log.info(`🔍 Extractors finished. Checking stop rules.`);

  if (FORCE_PUSH || stopRulesMet(context)) {
    log.info(`🛑 Stop rules met. Persisting and pushing context.`);
    await persistAndPush(context, {});
  } else {
    log.info(`🔄 Continuing crawl. Score: ${context.score}`);
  }
};

/*
TO DO (optional upgrades):
- Add logic to persist domainContexts map across pages for large crawls (e.g. via Dataset or KeyValueStore)
- Use Apify's `pushData` per-page for streamed output instead of batch-level
- Add signal for early exit (e.g. stop after N signals found)
- Modularize domain context initialization into helper function
- Add per-domain max depth or max pages for crawl throttling
- Include retry handling or fallbacks if extractors crash
- Log total time spent per domain for performance metrics
*/
