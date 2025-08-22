// File: src/router.ts

import { log, Router } from 'crawlee';
import { buildSnapshot } from './utils/snapshot.js';
import { runExtractors } from './extractors/runExtractors.js';
import { persistAndPush } from './output.js';
import { stopRulesMet } from './stopRules.js';
import { detectStructureMode } from './analyzers/detectStructureMode.js';
import type { DomainContext, CampaignMode } from './utils/types.js';

export const router = Router.create();
const domainContexts = new Map<string, DomainContext>();

/**
 * Initializes a new domain context object if it's the first time visiting this domain.
 */
function initDomainContext(domain: string, url: string): DomainContext {
  const context: DomainContext = {
    domain,
    seedUrl: url,
    pagesVisited: new Set(),
    signals: [],
    score: 0,
  };
  domainContexts.set(domain, context);
  log.info(`🚀 Initialized domain context for: ${domain}`);
  return context;
}

/**
 * Primary handler for each crawled page. Runs snapshot, extraction,
 * stop-rule logic, and dataset push if appropriate.
 */
export const routerHandler = async (
  ctx: any,
  campaignMode: CampaignMode,
  _request?: any,
  _page?: any
) => {
  const { request, page } = ctx;
  const url = request.url;
  const domain = new URL(url).hostname;

  const FORCE_PUSH = true; // For dev/test; toggle false in prod

  log.info(`🔍 RouterHandler triggered for URL: ${url}`);

  // Initialize context if first visit to domain
  const context =
    domainContexts.get(domain) || initDomainContext(domain, url);

  // Avoid reprocessing already-visited pages
  if (context.pagesVisited.has(url)) {
    log.info(`⏩ Already visited: ${url}`);
    return;
  }

  context.pagesVisited.add(url);
  log.info(`📸 Building snapshot for: ${url}`);

  const snapshot = await buildSnapshot(page, url);
  log.info(`✅ Snapshot complete. Detecting structure mode.`);

  const structureMode = detectStructureMode(snapshot);
  context.structureMode = structureMode;
  log.info(`🏗 Structure mode detected: ${structureMode}`);

  log.info(`🔧 Running extractors (mode: ${campaignMode}).`);
  await runExtractors(snapshot, context, structureMode, campaignMode);
  log.info(`🔍 Extractors finished. Checking stop rules.`);

  if (FORCE_PUSH || await stopRulesMet(context)) {
    log.info(`🛑 Stop rules met. Persisting and pushing context.`);
    await persistAndPush(context, {});
  } else {
    log.info(`🔄 Continuing crawl. Score: ${context.score}`);
  }
};

/*
🧠 TO DO (Optional Future Enhancements):

- Persist `domainContexts` using KeyValueStore to support long crawls or resume
- Modularize routing by structureMode (e.g. team-directory vs. single-page)
- Add retry or fallback signals if extractors crash or fail to extract minimum info
- Enable per-domain maxDepth or maxPages throttling
- Add crawler stats summary at end of run (time spent, pages visited, final score)
- Push signal logs per page for transparency/debugging
- Add campaignMode to pushed output for traceability
*/
