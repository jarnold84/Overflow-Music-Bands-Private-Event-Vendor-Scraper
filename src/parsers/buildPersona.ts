import type { DomainContext, Lead, MessagePersona } from '../types';

export function buildPersonaFromCtx(ctx: DomainContext): MessagePersona {
    return {
        company: ctx.company ?? null,
        vendorType: ctx.vendorType ?? null,
        segmentFocus: ctx.segmentFocus ?? [],
        eventTypes: ctx.eventTypes ?? [],
        orgType: classifyOrgType(ctx),
        teamSize: estimateTeamSize(ctx),
        styleVibe: ctx.styleVibe ?? [],
        clienteleProfile: ctx.clienteleProfile ?? [],
        services: ctx.services ?? [],
        capacitySummary: summarizeCapacity(ctx.capacity),
        location: {
            city: ctx.city,
            state: ctx.state,
            country: ctx.country,
            metro: ctx.metro,
        },
        serviceRadius: ctx.serviceRadius ?? null,
        values: ctx.values ?? [],
        socialProof: ctx.socialProof ?? {},
        ops: {
            fnbMinimumUSD: ctx.fnbMinimumUSD ?? null,
            revMinimumUSD: ctx.revMinimumUSD ?? null,
            rfpUrl: ctx.rfpUrl ?? null,
            bookingLink: ctx.bookingLink ?? null,
        },
        contactSuggestion: ctx.people?.[0] ?? null,
        bestHookIdeas: generateHooks(ctx),
    };
}

export function buildPersonaFromLead(lead: Lead): MessagePersona {
    return {
        company: lead.company ?? null,
        vendorType: lead.vendorType ?? null,
        segmentFocus: lead.segmentFocus ?? [],
        eventTypes: lead.eventTypes ?? [],
        orgType: classifyOrgType(lead),
        teamSize: estimateTeamSize(lead),
        styleVibe: lead.styleVibe ?? [],
        clienteleProfile: lead.clienteleProfile ?? [],
        services: lead.services ?? [],
        capacitySummary: summarizeCapacity(lead.capacity),
        location: {
            city: lead.city,
            state: lead.state,
            country: lead.country,
            metro: lead.metro,
        },
        serviceRadius: lead.serviceRadius ?? null,
        values: lead.values ?? [],
        socialProof: lead.socialProof ?? {},
        ops: {
            fnbMinimumUSD: lead.fnbMinimumUSD ?? null,
            revMinimumUSD: lead.revMinimumUSD ?? null,
            rfpUrl: lead.rfpUrl ?? null,
            bookingLink: lead.bookingLink ?? null,
        },
        contactSuggestion: lead.people?.[0] ?? null,
        bestHookIdeas: [
            'Elegant venue with awards',
            'Capacity for conferences',
            'Stylish photos in gallery',
        ],
    };
}

// === Helpers (shared) ===
function summarizeCapacity(capacity: any): string | null {
    if (!capacity) return null;
    const entries = Object.entries(capacity).filter(([, v]) => v);
    return entries.map(([k, v]) => `${k}: ${v}`).join(', ') || null;
}

function classifyOrgType(obj: Partial<DomainContext | Lead>): string | null {
    if (!obj.people?.length) return null;
    const roles = obj.people.map(p => p.role?.toLowerCase() || '');
    if (roles.some(r => r.includes('owner') || r.includes('founder'))) return 'solo';
    if (roles.some(r => r.includes('team') || r.includes('agency'))) return 'agency';
    if (obj.vendorType?.includes('venue')) return 'venue';
    if (obj.vendorType?.includes('hotel')) return 'hotel_resort';
    return 'boutique';
}

function estimateTeamSize(obj: Partial<DomainContext | Lead>): string | null {
    const count = obj.people?.length ?? 0;
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
