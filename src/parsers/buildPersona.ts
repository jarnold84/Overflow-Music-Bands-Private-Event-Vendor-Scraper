// File: src/parsers/buildPersona.ts
import type { Lead, MessagePersona } from '../types';

/**
 * Builds a compact persona summary from a scraped Lead.
 * This is used to feed GPT message generation.
 */

export function buildPersonaFromLead(lead: Lead): MessagePersona {
  return {
    segmentFocus: lead.segmentFocus ?? 'unknown',
    eventTypes: lead.eventTypes ?? [],
    styleVibe: lead.styleVibe ?? [],
    clienteleProfile: lead.clienteleProfile ?? 'not specified',
    services: lead.services ?? [],
    capacity: lead.capacityNotes ?? 'not specified',
    location: [
      lead.location?.metro,
      lead.location?.city,
      lead.location?.state,
      lead.location?.country,
    ].filter(Boolean).join(', '),
    serviceRadius: lead.serviceRadius ?? 'N/A',
    values: Array.isArray(lead.values) ? lead.values : [lead.values].filter(Boolean),
    socialProof: Array.isArray(lead.socialProof) ? lead.socialProof : [lead.socialProof].filter(Boolean),
    fnbMinimumUSD: lead.fnbMinimumUSD ?? null,
    revMinimumUSD: lead.revMinimumUSD ?? null,
    bookingLink: lead.bookingLink ?? null,
    people: lead.people ?? [],
    company: lead.company ?? lead.vendorName ?? lead.domain,
    bestHookIdeas: [],
  };
}
