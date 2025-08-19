// File: src/domainContext.ts
import type { DomainContext, PageSignals } from './types';
import { getHostname } from './utils/url';
import { extractVendorName } from './extractors/name';

const contexts = new Map<string, DomainContext>();

export function getContext(seedUrl: string): DomainContext {
  const domain = getHostname(seedUrl);
  let ctx = contexts.get(domain);
  if (!ctx) {
    ctx = {
      domain,
      seedUrl,
      pagesVisited: new Set(),
      signals: [],
      score: 0,
      evidence: [],
    };
    contexts.set(domain, ctx);
  }
  return ctx;
}

export function addSignals(ctx: DomainContext, sig: PageSignals, html?: string) {
  ctx.signals.push(sig);

  // Deduplicate and update emails
  const allEmails = ctx.signals.flatMap(s => s.emails ?? []);
  ctx.email = allEmails.find(e => /events@|groups@|sales@|catering@/i.test(e)) || allEmails[0] || null;

  // Deduplicate and update phones
  const allPhones = ctx.signals.flatMap(s => s.phoneCandidates ?? []);
  ctx.phones = [...new Set(allPhones)];

  // Set contact page and rfpUrl if present and not already set
  if (!ctx.contactPage && sig.contactUrl) ctx.contactPage = sig.contactUrl;
  if (!ctx.rfpUrl && sig.rfpUrl) ctx.rfpUrl = sig.rfpUrl;

  // Extract vendor name once
  if (!ctx.vendorName && html) {
    ctx.vendorName = extractVendorName(html);
  }

  // Optional: Add evidence hook (can later be modularized)
  if (sig.title?.length && !ctx.evidence.includes(sig.title)) {
    ctx.evidence.push(sig.title);
  }
}
