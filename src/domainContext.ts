// File: src/domainContext.ts

import type { DomainContext, PageSignals } from './utils/types.js';
import { getHostname } from './utils/url.js';
import { normalizeLocation } from './parsers/locationNorm.js';

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

  const allContacts = ctx.signals.flatMap((s) => s.contacts ?? []);
  ctx.contacts = allContacts;

  const priorityPatterns = [/events/i, /groups/i, /sales/i, /catering/i];
  ctx.bestContact =
    allContacts.find((c) => priorityPatterns.some((p) => p.test(c.email ?? '') || p.test(c.role ?? ''))) ||
    allContacts[0] ||
    null;

  ctx.email = ctx.bestContact?.email;
  ctx.phone = ctx.bestContact?.phone;
  ctx.contactPage = ctx.bestContact?.contactPage;
  ctx.rfpUrl = ctx.bestContact?.rfpUrl;

  ctx.location ??= {};
  ctx.socials ??= {};

  for (const s of ctx.signals) {
    ctx.location.city ??= s.city;
    ctx.location.state ??= s.state;
    ctx.location.country ??= s.country;
    ctx.location.metro ??= s.metro;
    ctx.segmentFocus ??= s.segmentFocus;
    ctx.eventTypes ??= s.eventTypes;
    ctx.services ??= s.services;
    ctx.styleVibe ??= s.styleVibe;
    ctx.capacityNotes ??= s.capacityNotes;
    ctx.serviceRadius ??= s.serviceRadius;
    ctx.socialProof ??= s.socialProof;
    ctx.values ??= s.values;
    ctx.bookingLink ??= s.bookingLink;
    ctx.people ??= s.people;
    ctx.leadName ??= s.leadName;
    ctx.company ??= s.company;
    ctx.portfolioLinks ??= s.portfolioLinks;

    if (s.socials) {
      ctx.socials = { ...ctx.socials, ...s.socials };
    }
  }

  if (ctx.location.city || ctx.location.state || ctx.location.country) {
    ctx.location = normalizeLocation(ctx.location);
  }
}
/*
🧠 TO DO – Future Upgrades
These are optional enhancements to consider post-Phase 1a:
✅ Context Merging Strategy: Add prioritization weights or ordering (e.g., prefer About page signals over Home)
✅ Page Visit Source Metadata: Track which page each signal came from (sig.sourcePage)
✅ Overwrite Control: Allow config-driven control of when to overwrite vs merge (e.g., if company was already set, should we update it?)
✅ Temporal Merging: Consider merging logic by crawl order (early signals more trusted, or vice versa)
✅ Add source URL tracking per signal:
interface PageSignals { sourceUrl?: string; ... }
*/
