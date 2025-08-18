import type { Lead, MessagePersona } from '../types';

// Builds compact persona object from lead signals
export function buildPersona(lead: Lead): MessagePersona {
    return {
        company: lead.company || null,
        vendorType: lead.vendorType || null,
        segmentFocus: lead.segmentFocus || [],
        eventTypes: lead.eventTypes || [],
        orgType: 'boutique',
        teamSize: 'small',
        styleVibe: lead.styleVibe || [],
        clienteleProfile: lead.clienteleProfile || [],
        services: lead.services || [],
        capacitySummary: lead.capacity ? JSON.stringify(lead.capacity) : null,
        location: {
            city: lead.city,
            state: lead.state,
            country: lead.country,
            metro: lead.metro,
        },
        serviceRadius: lead.serviceRadius || null,
        values: lead.values || [],
        socialProof: lead.socialProof || {},
        ops: {
            fnbMinimumUSD: lead.fnbMinimumUSD,
            revMinimumUSD: lead.revMinimumUSD,
            rfpUrl: lead.rfpUrl,
            bookingLink: lead.bookingLink,
        },
        contactSuggestion: lead.people?.[0] || null,
        bestHookIdeas: ['Elegant venue with awards', 'Capacity for conferences', 'Stylish photos in gallery'],
    };
}
