// File: src/output.ts
import { Dataset } from 'crawlee';
import type { DomainContext, Lead, MessagePersona } from './types.js';
import { buildPersonaFromCtx } from './parsers/buildPersona.js';

export async function persistAndPush(ctx: DomainContext, cfg: any) {
  const { vendorType, vendorConfidence, socials, services, styleVibe, location, crawlRunId, seedUrl, evidence, domain, ts, capacityNotes, contacts, bestContact } = ctx;

  const lead: Lead = {
    domain,
    seedUrl,
    crawlRunId,
    ts,
    vendorType,
    vendorConfidence,
    email: bestContact?.email ?? contacts?.[0]?.email ?? null,
    phones: bestContact?.phones ?? contacts?.[0]?.phones ?? [],
    contactPage: bestContact?.contactPage ?? null,
    rfpUrl: bestContact?.rfpUrl ?? null,
    socials,
    services,
    styleVibe,
    location,
    capacityNotes,
    evidence,
  };

  const persona: MessagePersona = buildPersonaFromCtx(ctx, lead);

  await Dataset.pushData({ lead, persona });
}
