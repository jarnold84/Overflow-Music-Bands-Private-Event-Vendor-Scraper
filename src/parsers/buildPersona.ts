// File: src/parsers/buildPersona.ts

import type { Lead, MessagePersona } from '../utils/types';

export function buildMessagePersona(lead: Lead): MessagePersona {
  return {
    segmentFocus: lead.segmentFocus,
    eventTypes: lead.eventTypes ?? [],
    styleVibe: lead.styleVibe ?? [],
    clienteleProfile: lead.clienteleProfile,
    services: lead.services ?? [],
    capacity: lead.capacityNotes,
    location: lead.location ?? undefined,
    serviceRadius: lead.serviceRadius,
    values: Array.isArray(lead.values)
      ? lead.values
      : lead.values
      ? [lead.values]
      : [],
    socialProof: Array.isArray(lead.socialProof)
      ? lead.socialProof
      : lead.socialProof
      ? [lead.socialProof]
      : [],
    fnbMinimumUSD: lead.fnbMinimumUSD ?? null,
    revMinimumUSD: lead.revMinimumUSD ?? null,
    bookingLink: lead.bookingLink ?? null,
    people: lead.people ?? [],
    company: lead.company,
    bestHookIdeas: [], // To be populated later by scoring
  };
}
