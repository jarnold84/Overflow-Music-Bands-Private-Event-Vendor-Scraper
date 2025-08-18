// Builds a compact summary for personalized outreach
import type { DomainContext } from '../types';

export function buildMessagePersona(ctx: DomainContext): Record<string, any> {
    return {
        domain: ctx.domain,
        vendorType: ctx.vendorType,
        vendorName: ctx.vendorName,
        email: ctx.bestEmail,
        segmentFocus: ctx.segmentFocus, // assume added later in pipeline
        styleVibe: ctx.styleVibe,
        services: ctx.services,
        location: {
            city: ctx.city,
            state: ctx.state,
            metro: ctx.metro,
        },
        contactPage: ctx.contactPage,
        rfpUrl: ctx.rfpUrl,
        socials: ctx.socials,
        bestHookIdeas: ctx.evidence?.slice(0, 3) || [],
    };
}
