// File: src/parsers/buildPersona.ts
import type { Lead, MessagePersona } from '../types';

/**
 * Builds a compact persona summary from a scraped Lead.
 * This is used to feed GPT message generation.
 */

export function buildMessagePersona(lead: Lead): MessagePersona {
return {
vendorType: lead.vendor?.type || 'vendor',
name: lead.vendor?.name || '',
location: ([
lead.location?.metro,
lead.location?.city,
lead.location?.state,
lead.location?.country,
].filter(Boolean) as string[]).join(', '),
styleVibe: lead.styleVibe?.join(', ') || '',
values: Array.isArray(lead.values)
? (lead.values.filter(Boolean) as string[])
: [lead.values].filter(Boolean) as string[],
socialProof: Array.isArray(lead.socialProof)
? (lead.socialProof.filter(Boolean) as string[])
: [lead.socialProof].filter(Boolean) as string[],
};
}
