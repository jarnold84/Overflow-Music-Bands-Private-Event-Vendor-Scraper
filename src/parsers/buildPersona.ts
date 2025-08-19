// File: src/parsers/buildPersona.ts
import type { Lead, MessagePersona } from '../types';

/**
 * Builds a compact persona summary from a scraped Lead.
 * This is used to feed GPT message generation.
 */
export function buildPersonaFromLead(lead: Lead): MessagePersona {
  return {
    domain: lead.domain,
    vendorType: lead.vendorType ?? '',
    segmentFocus: lead.segmentFocus ?? '',
    eventTypes: lead.eventTypes ?? [],
    services: lead.services ?? [],
    styleVibe: lead.styleVibe ?? [],
    location: {
      metro: lead.metro ?? '',
      city: lead.city ?? '',
      state: lead.state ?? '',
      country: lead.country ?? '',
    },
    opsNotes: {
      clienteleProfile: lead.clienteleProfile ?? '',
      capacity: lead.capacity ?? '',
      serviceRadius: lead.serviceRadius ?? '',
      values: lead.values ?? '',
      socialProof: lead.socialProof ?? '',
      fnbMinimumUSD: lead.fnbMinimumUSD ?? null,
      revMinimumUSD: lead.revMinimumUSD ?? null,
      bookingLink: lead.bookingLink ?? '',
    },
    people: lead.people ?? [],
    bestHookIdeas: [], // Will be populated later in GPT
  };
}
