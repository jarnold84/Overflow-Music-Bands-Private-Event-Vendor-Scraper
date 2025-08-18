import type { DomainContext, PageSignals } from './types.js';
import { getHostname } from './utils/url.js';

const contexts = new Map<string, DomainContext>();

export function getContext(seedUrl: string): DomainContext {
  const domain = getHostname(seedUrl);
  let ctx = contexts.get(domain);
  if (!ctx) {
    ctx = { domain, seedUrl, pagesVisited: new Set(), signals: [], score: 0 };
    contexts.set(domain, ctx);
  }
  return ctx;
}

export function addSignals(ctx: DomainContext, sig: PageSignals) {
  ctx.signals.push(sig);
  // naive bestEmail selection
  const all = ctx.signals.flatMap(s => s.emails ?? []);
  ctx.bestEmail = all.find(e => /events@|groups@|sales@|catering@/i.test(e)) || all[0];
}
