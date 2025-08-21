// src/router.ts
import { log, Router } from 'crawlee';
import { buildSnapshot } from './utils/snapshot.js';
import { runExtractors } from './extractors/runExtractors.js';
import { persistAndPush } from './output.js';
import { stopRulesMet } from './stopRules.js';
import type { DomainContext, CampaignMode } from './utils/types.js';

export const router = Router.create();
const domainContexts = new Map<string, DomainContext>();

export const routerHandler = async (ctx: any, mode: CampaignMode) => {
  const { request, page } = ctx;
  const url = request.url;
  const domain = new URL(url).hostname;

  log.info(`🔍 RouterHandler triggered for URL: ${url}`);

  if (!domainContexts.has(domain)) {
    domainContexts.set(domain, {
      domain,
      seedUrl: url,
      pagesVisited: new Set(),
      signals: [],
      score: 0,
    });
    log.info(`🆕 Initialized domain context for: ${domain}`);
  }

  const context = domainContexts.get(domain)!;

  if (context.pagesVisited.has(url)) {
    log.info(`⏭️ Already visited: ${url}`);
    return;
  }

  context.pagesVisited.add(url);
  log.info(`📸 Building snapshot for: ${url}`);

  const snapshot = await buildSnapshot(page, url);
  log.info(`✅ Snapshot complete. Running extractors.`);

  await runExtractors(snapshot, context, mode);
  log.info(`🔍 Extractors finished. Checking stop rules.`);

  if (stopRulesMet(context)) {
    log.info(`🚦 Stop rules met. Persisting and pushing context.`);
    await persistAndPush(context, {});
  } else {
    log.info(`🧭 Continuing crawl. Score: ${context.score}`);
  }
};
