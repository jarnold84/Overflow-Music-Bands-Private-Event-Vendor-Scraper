// Detects keywords related to services offered
export function extractServices(html: string): string[] {
    const services: string[] = [];
    const serviceKeywords = [
        'wedding planning', 'corporate events', 'photography', 'dj', 'band',
        'floral design', 'catering', 'event rentals', 'av production',
        'transportation', 'makeup', 'venue', 'decor', 'invitations'
    ];
