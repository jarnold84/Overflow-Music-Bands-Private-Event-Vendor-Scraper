// File: src/router.ts

import { log, Router } from 'crawlee';
import { buildSnapshot } from './utils/snapshot';
import { runExtractors } from './extractors/runExtractors';
import { persistAndPush } from './output';
import { stopRulesMet } from './stopRules';
import type { DomainContext, CampaignMode } from './utils/types';

// Create a Router (you still need to pass mode from crawler.ts)
export const router = Router.create();

const domainContexts = new Map<string, DomainContext>();

// Shared logic for each route
async function handleRoute(ctx: any, context: DomainContext, mode: CampaignMode) {
  const snapshot = await buildSnapshot(ctx.page, ctx.request.url);
  await runExtractors(snapshot, context, mode);

  if (stopRulesMet(context)) {
    await persistAndPush(context, {});
  }
}

// Main export — this replaces router.addDefaultHandler()
export async function routerHandler(ctx: any, mode: CampaignMode) {
  const { request } = ctx;
  const url = request.url;
  const domain = new URL(url).hostname;

  // Init domain context
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

  // 🧠 Route-specific dispatch
  const pathname = new URL(url).pathname.toLowerCase();

  if (/about/.test(pathname)) {
    log.info(`🔎 Routing to ABOUT handler: ${url}`);
    await handleRoute(ctx, context, mode);
  } else if (/contact|connect|get-in-touch|reach/.test(pathname)) {
    log.info(`📞 Routing to CONTACT handler: ${url}`);
    await handleRoute(ctx, context, mode);
  } else if (/services|offerings|what-we-do/.test(pathname)) {
    log.info(`🛠️ Routing to SERVICES handler: ${url}`);
    await handleRoute(ctx, context, mode);
  } else {
    log.info(`📄 Routing to DEFAULT handler: ${url}`);
    await handleRoute(ctx, context, mode);
  }
}
