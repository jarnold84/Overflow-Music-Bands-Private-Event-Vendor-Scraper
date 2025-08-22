// File: src/parsers/buildPersona.ts

import type { Lead, MessagePersona } from '../utils/types';

export function buildMessagePersona(lead: Lead): MessagePersona {
  return {
    leadTypes: lead.leadTypes ?? [], // ✅ Multi-match support
    leadName: lead.leadName,
    businessName: lead.businessName,
    segmentFocus: lead.segmentFocus,
    eventTypes: lead.eventTypes ?? [],
    styleVibe: lead.styleVibe ?? [],
    clienteleProfile: lead.clienteleProfile,
    services: lead.services ?? [],
    capacity: lead.capacityNotes,
    location: formatLocation(lead),
    serviceRadius: lead.serviceRadius,
    values: normalizeArray(lead.values),
    socialProof: normalizeArray(lead.socialProof),
    fnbMinimumUSD: lead.fnbMinimumUSD ?? null,
    revMinimumUSD: lead.revMinimumUSD ?? null,
    bookingLink: lead.bookingLink ?? null,
    people: lead.people ?? [],
    socials: lead.socials ?? {},
    bestHookIdeas: [], // 💡 To be generated later via GPT
  };
}

function normalizeArray(val?: string | string[]): string[] {
  if (Array.isArray(val)) return val;
  if (val) return [val];
  return [];
}

function formatLocation(lead: Lead): string | undefined {
  const parts = [lead.city, lead.state, lead.country].filter(Boolean);
  return parts.length ? parts.join(', ') : undefined;
}
