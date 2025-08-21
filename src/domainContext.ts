import type { DomainContext, PageSignals } from './utils/types';
import { getHostname } from './utils/url';
import { normalizeLocation } from './parsers/locationNorm';

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
    ctx.vendorName ??= s.vendorName;
    ctx.portfolioLinks ??= s.portfolioLinks;
  }

  if (ctx.location.city || ctx.location.state || ctx.location.country) {
    ctx.location = normalizeLocation(ctx.location);
  }
}
