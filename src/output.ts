// File: src/output.ts
import { Dataset } from 'crawlee';
import type { DomainContext, Lead, MessagePersona } from './types';

export async function persistAndPush(domainCtx: DomainContext, cfg: any) {
    const { domain, evidence = [], ...rest } = domainCtx;

    const lead: Lead = {
        domain,
        seedUrl: domainCtx.seedUrl,
        email: domainCtx.email ?? domainCtx.people?.[0]?.email ?? null,
        phones: domainCtx.phones ?? [],
        vendorName: domainCtx.vendorName ?? null,
        vendorType: domainCtx.vendorType ?? null,
        vendorConfidence: domainCtx.vendorConfidence ?? null,
        contactUrl: domainCtx.contactUrl ?? null,
        rfpUrl: domainCtx.rfpUrl ?? null,
        contactPage: domainCtx.contactPage ?? null,
        formOnly: domainCtx.formOnly ?? null,
        rfpOnly: domainCtx.rfpOnly ?? null,
        company: domainCtx.company ?? null,
        services: domainCtx.services ?? [],
        styleVibe: domainCtx.styleVibe ?? [],
        socials: domainCtx.socials ?? {},
        city: domainCtx.city ?? null,
        state: domainCtx.state ?? null,
        country: domainCtx.country ?? null,
        metro: domainCtx.metro ?? null,
        address: domainCtx.address ?? null,
        people: domainCtx.people ?? [],
        capacity: domainCtx.capacity ?? null,
        aboutText: domainCtx.aboutText ?? null,
        aboutSummary: domainCtx.aboutSummary ?? null,
        clienteleProfile: domainCtx.clienteleProfile ?? [],
        segmentFocus: domainCtx.segmentFocus ?? [],
        eventTypes: domainCtx.eventTypes ?? [],
        values: domainCtx.values ?? [],
        portfolio: domainCtx.portfolio ?? null,
        socialProof: domainCtx.socialProof ?? null,
        fnbMinimumUSD: domainCtx.fnbMinimumUSD ?? null,
        revMinimumUSD: domainCtx.revMinimumUSD ?? null,
        restrictions: domainCtx.restrictions ?? [],
        bookingLink: domainCtx.bookingLink ?? null,
        serviceRadius: domainCtx.serviceRadius ?? null,
        travelPolicy: domainCtx.travelPolicy ?? null,
        evidence,
        crawlRunId: cfg.runId ?? 'dev',
        ts: new Date().toISOString(),
    };

    const persona: MessagePersona = {
        company: lead.company,
        vendorType: lead.vendorType,
        segmentFocus: lead.segmentFocus,
        eventTypes: lead.eventTypes,
        orgType: classifyOrgType(domainCtx),
        teamSize: estimateTeamSize(domainCtx),
        styleVibe: lead.styleVibe,
        clienteleProfile: lead.clienteleProfile,
        services: lead.services,
        capacitySummary: summarizeCapacity(lead.capacity),
        location: {
            city: lead.city,
            state: lead.state,
            country: lead.country,
            metro: lead.metro,
        },
        serviceRadius: lead.serviceRadius,
        values: lead.values,
        socialProof: lead.socialProof,
        ops: {
            fnbMinimumUSD: lead.fnbMinimumUSD,
            revMinimumUSD: lead.revMinimumUSD,
            rfpUrl: lead.rfpUrl,
            bookingLink: lead.bookingLink,
        },
        contactSuggestion: domainCtx.people?.[0] ?? null,
        bestHookIdeas: generateHooks(domainCtx),
    };

    await Dataset.pushData({ lead, persona });
}

function summarizeCapacity(capacity: any): string | null {
    if (!capacity) return null;
    const entries = Object.entries(capacity).filter(([, v]) => v);
    if (entries.length === 0) return null;
    return entries.map(([k, v]) => `${k}: ${v}`).join(', ');
}

function classifyOrgType(ctx: DomainContext): string | null {
    if (!ctx.people?.length) return null;
    const people = ctx.people.map(p => p.role?.toLowerCase() || '');
    if (people.some(r => r.includes('owner') || r.includes('founder'))) return 'solo';
    if (people.some(r => r.includes('team') || r.includes('agency'))) return 'agency';
    if (ctx.vendorType?.includes('venue')) return 'venue';
    if (ctx.vendorType?.includes('hotel')) return 'hotel_resort';
    return 'boutique';
}

function estimateTeamSize(ctx: DomainContext): string | null {
    const count = ctx.people?.length ?? 0;
    if (count <= 1) return 'solo';
    if (count <= 5) return 'small';
    if (count <= 15) return 'medium';
    return 'large';
}

function generateHooks(ctx: DomainContext): string[] {
    const hooks: string[] = [];
    if (ctx.styleVibe?.length && ctx.socialProof?.awards?.length)
        hooks.push(`Award-winning ${ctx.styleVibe[0]} style`);
    if (ctx.capacity?.ballroom || ctx.capacity?.banquet)
        hooks.push(`Ballroom capacity: ${ctx.capacity.ballroom ?? ctx.capacity.banquet}`);
    if (ctx.socialProof?.press?.length)
        hooks.push(`Featured in ${ctx.socialProof.press[0]}`);
    if (ctx.portfolio?.recentEvents?.length)
        hooks.push(`Recent event: ${ctx.portfolio.recentEvents[0]}`);
    return hooks;
}
