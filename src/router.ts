// File: src/router.ts

import { Dataset, log, Router } from 'crawlee';
import { buildSnapshot } from './utils/snapshot';
import { runExtractors } from './extractors/runExtractors';
import { persistAndPush } from './output';
import { stopRulesMet } from './stopRules';
import type { DomainContext } from './utils/types';

// ✅ Use correct instantiation for Crawlee Router
export const router = Router.create();

const domainContexts = new Map<string, DomainContext>();

router.addDefaultHandler(async (ctx) => {
  const { request, page } = ctx;
  const url = request.url;
  const domain = new URL(url).hostname;

  // Create domain context if not already present
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

  // Skip if we've already seen this page
  if (context.pagesVisited.has(url)) {
    log.info(`Already visited: ${url}`);
    return;
  }

  context.pagesVisited.add(url);

  // 🧠 Extract data from page
  const snapshot = await buildSnapshot(page, url);
  await runExtractors(snapshot, context, 'wedding'); // 🔁 Mode should be parameterized later

  // 🛑 Check if stop conditions are met
  if (stopRulesMet(context)) {
    await persistAndPush(context, {}); // 👈 Pass dummy config if needed
  }
});
