// File: src/domainContext.ts
import type { DomainContext, PageSignals } from './types.js';
import { getHostname } from './utils/url.js';

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
    };
    contexts.set(domain, ctx);
  }
  return ctx;
}

export function addSignals(ctx: DomainContext, sig: PageSignals) {
  ctx.signals.push(sig);

  // Collect all contacts from signals
  const allContacts = ctx.signals.flatMap((s) => s.contacts ?? []);
  ctx.contacts = allContacts;

  // Select best contact
  const priorityPatterns = [/events/i, /groups/i, /sales/i, /catering/i];
  ctx.bestContact = allContacts.find((c) =>
    priorityPatterns.some((p) => p.test(c.email) || p.test(c.role))
  ) || allContacts[0];

  // Merge other top-level fields from signals
  ctx.email = ctx.bestContact?.email;
  ctx.phone = ctx.bestContact?.phone;
  ctx.contactPage = ctx.bestContact?.contactPage;
  ctx.rfpUrl = ctx.bestContact?.rfpUrl;

  // Merge location and metadata from signals if not already set
  for (const s of ctx.signals) {
    ctx.city ??= s.city;
    ctx.state ??= s.state;
    ctx.country ??= s.country;
    ctx.metro ??= s.metro;
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
    ctx.vendorName ??= s.vendorName;
  }
}
