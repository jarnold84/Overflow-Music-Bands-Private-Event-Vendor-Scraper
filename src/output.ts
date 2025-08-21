// File: src/output.ts

import { Dataset } from 'crawlee';
import { buildMessagePersona } from './parsers/buildPersona.js';
import type { DomainContext } from './utils/types.js';

export async function persistAndPush(ctx: DomainContext, _input: any) {
  const dataset = await Dataset.open();

  const lead = {
    domain: ctx.domain,
    seedUrl: ctx.seedUrl,

    // Lead identity
    leadType: ctx.leadType,
    leadConfidence: ctx.leadConfidence,
    leadName: ctx.leadName,
    company: ctx.company,

    // Contact info
    bestContact: ctx.bestContact,
    contacts: ctx.contacts,
    email: ctx.bestContact?.email,
    phone: ctx.bestContact?.phone,
    contactPage: ctx.bestContact?.contactPage,
    rfpUrl: ctx.bestContact?.rfpUrl,

    // Location
    city: ctx.location?.city,
    state: ctx.location?.state,
    country: ctx.location?.country,
    metro: ctx.location?.metro,

    // Qualitative signals
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

    // Crawl metadata
    crawlRunId: ctx.crawlRunId,
    ts: ctx.ts ?? new Date().toISOString(),

    // Socials (structured format)
    socials: ctx.socials ?? {},

    // 🧪 Conditional: include raw text for debugging or GPT fallback
    ...(shouldIncludeRawText(ctx) && { rawText: ctx.text }),

    // Optional notes for debugging / QA review
    debugNotes: ctx.stopReason ? `Stopped: ${ctx.stopReason}` : undefined,
  };

  console.log('🧠 Pushing to dataset:', JSON.stringify(lead, null, 2));

  const personaInput = {
    ...lead,
    bestContact: lead.bestContact
      ? { email: lead.bestContact.email, phone: lead.bestContact.phone }
      : undefined,
  };

  const messagePersona = buildMessagePersona(personaInput as any);
  await dataset.pushData({ lead, messagePersona });
}

function shouldIncludeRawText(ctx: DomainContext): boolean {
  return (
    process.env.NODE_ENV === 'development' ||
    ctx.domain.includes('example.com') ||
    ctx.domain.includes('localhost')
  );
}

/* 
🛠️ TO DO (Optional Future Enhancements)
- ⏳ Add run duration or number of pages visited to aid performance metrics
- 🧠 Include GPT summary field if using fallback classification in future
- 🗃️ Tag data with campaign ID or user ID for multi-client SaaS use
- 🧪 Add crawl version tag for schema tracking and debugging
*/
