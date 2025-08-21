// src/output.ts
import { Dataset } from 'crawlee';
import { buildMessagePersona } from './parsers/buildPersona.js';
import type { DomainContext } from './utils/types.js';

export async function persistAndPush(ctx: DomainContext, _input: any) {
  const dataset = await Dataset.open();

  const lead = {
    domain: ctx.domain,
    seedUrl: ctx.seedUrl,
    vendorType: ctx.vendorType,
    vendorConfidence: ctx.vendorConfidence,
    vendorName: ctx.vendorName,
    bestContact: ctx.bestContact,
    contacts: ctx.contacts,
    email: ctx.bestContact?.email,
    phone: ctx.bestContact?.phone,
    contactPage: ctx.bestContact?.contactPage,
    rfpUrl: ctx.bestContact?.rfpUrl,
    city: ctx.location?.city,
    state: ctx.location?.state,
    country: ctx.location?.country,
    metro: ctx.location?.metro,
    segmentFocus: ctx.segmentFocus,
    eventTypes: ctx.eventTypes,
    styleVibe: ctx.styleVibe,
    services: ctx.services,
    clienteleProfile: ctx.clienteleProfile,
    serviceRadius: ctx.serviceRadius,
    values: ctx.values,
    socialProof: ctx.socialProof,
    fnbMinimumUSD: ctx.fnbMinimumUSD,
    revMinimumUSD: ctx.revMinimumUSD,
    bookingLink: ctx.bookingLink,
    people: ctx.people,
    capacityNotes: ctx.capacityNotes,
    portfolioLinks: ctx.portfolioLinks,
    crawlRunId: ctx.crawlRunId,
    ts: ctx.ts ?? new Date().toISOString(),
  };

  // Narrow bestContact shape for persona builder to match its expected type
  const personaInput = {
    ...lead,
    bestContact: lead.bestContact
      ? { email: lead.bestContact.email, phone: lead.bestContact.phone }
      : undefined,
  };

  const messagePersona = buildMessagePersona(personaInput as any);
  await dataset.pushData({ lead, messagePersona });
}
