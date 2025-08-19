// File: src/output.ts
import { Dataset } from 'crawlee';
import { buildPersonaFromCtx } from './parsers/buildPersona';
import type { DomainContext } from './types';

export async function persistAndPush(domainCtx: DomainContext, cfg: any) {
    const { domain, seedUrl, pagesVisited, signals, score, ...rest } = domainCtx;

    const lead = {
        domain,
        seedUrl,
        company: domainCtx.company ?? null,
        vendorName: domainCtx.vendorName ?? null,
        vendorType: domainCtx.vendorType ?? null,
        vendorConfidence: domainCtx.vendorConfidence ?? null,
        segmentFocus: domainCtx.segmentFocus ?? [],
        eventTypes: domainCtx.eventTypes ?? [],
        services: domainCtx.services ?? [],
        styleVibe: domainCtx.styleVibe ?? [],
        clienteleProfile: domainCtx.clienteleProfile ?? [],
        capacity: domainCtx.capacity ?? null,
        fnbMinimumUSD: domainCtx.fnbMinimumUSD ?? null,
        revMinimumUSD: domainCtx.revMinimumUSD ?? null,
        restrictions: domainCtx.restrictions ?? [],
        aboutText: domainCtx.aboutText ?? null,
        aboutSummary: domainCtx.aboutSummary ?? null,
        socialProof: domainCtx.socialProof ?? null,
        values: domainCtx.values ?? [],
        portfolio: domainCtx.portfolio ?? null,
        contactPage: domainCtx.contactPage ?? null,
        rfpUrl: domainCtx.rfpUrl ?? null,
        rfpOnly: domainCtx.rfpOnly ?? null,
        bookingLink: domainCtx.bookingLink ?? null,
        email: domainCtx.bestEmail ?? null,
        phones: domainCtx.phones ?? [],
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
