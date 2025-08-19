// File: src/output.ts
import { Dataset } from 'crawlee';
import type { DomainContext } from './types';
import { buildPersonaFromCtx } from './parsers/buildPersona';

export async function persistAndPush(domainCtx: DomainContext, cfg: any) {
    const { domain, evidence, ...rest } = domainCtx;

    const primaryEmail = domainCtx.bestEmail ?? domainCtx.people?.[0]?.email ?? null;

    const lead = {
        domain,
        seedUrl: domainCtx.seedUrl,
        company: domainCtx.company ?? null,
        aboutText: domainCtx.aboutText ?? null,
        aboutSummary: domainCtx.aboutSummary ?? null,
        vendorType: domainCtx.vendorType ?? null,
        vendorConfidence: domainCtx.vendorConfidence ?? null,
        segmentFocus: domainCtx.segmentFocus ?? [],
        eventTypes: domainCtx.eventTypes ?? [],
        services: domainCtx.services ?? [],
        styleVibe: domainCtx.styleVibe ?? [],
        clienteleProfile: domainCtx.clienteleProfile ?? [],
        portfolio: domainCtx.portfolio ?? null,
        values: domainCtx.values ?? [],
        socialProof: domainCtx.socialProof ?? null,
        capacity: domainCtx.capacity ?? null,
        fnbMinimumUSD: domainCtx.fnbMinimumUSD ?? null,
        revMinimumUSD: domainCtx.revMinimumUSD ?? null,
        restrictions: domainCtx.restrictions ?? [],
        bookingLink: domainCtx.bookingLink ?? null,
        rfpUrl: domainCtx.rfpUrl ?? null,
        rfpOnly: domainCtx.rfpOnly ?? null,
        email: primaryEmail,
        phones: domainCtx.phones ?? [],
        contactPage: domainCtx.contactPage ?? null,
        formOnly: domainCtx.formOnly ?? null,
        address: domainCtx.address ?? null,
        city: domainCtx.city ?? null,
        state: domainCtx.state ?? null,
        country: domainCtx.country ?? null,
        metro: domainCtx.metro ?? null,
        serviceRadius: domainCtx.serviceRadius ?? null,
        travelPolicy: domainCtx.travelPolicy ?? null,
        socials: domainCtx.socials ?? {},
        people: domainCtx.people ?? [],
        evidence: domainCtx.evidence ?? [],
        crawlRunId: cfg.runId ?? 'dev',
        ts: new Date().toISOString(),
    };

    const persona = buildPersonaFromCtx(domainCtx);

    await Dataset.pushData({ lead, persona });
}
