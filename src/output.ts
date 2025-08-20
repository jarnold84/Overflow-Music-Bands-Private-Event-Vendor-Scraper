// File: src/output.ts
import { ActorInput } from './types';
import { createDataset } from 'crawlee';
import { buildPersonaFromLead } from './parsers/buildPersona';
import type { DomainContext } from './types';

/**
 * Persists the final lead + messagePersona into the dataset.
 * 
 * This runs when stopRules.ts determines we're done with this domain.
 */
export async function persistAndPush(ctx: DomainContext, input: ActorInput) {
  const dataset = await createDataset();

  // Build flat lead structure from context
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

  const messagePersona = buildPersonaFromLead(lead);

  await dataset.pushData({ lead, messagePersona });
}
