export function extractServices(html: string): string[] {
    const services: string[] = [];
    const serviceKeywords = [
        'wedding planning', 'corporate events', 'photography', 'dj', 'band',
        'floral design', 'catering', 'event rentals', 'av production',
        'transportation', 'makeup', 'venue', 'decor', 'invitations'
    ];

    serviceKeywords.forEach(keyword => {
        if (html.toLowerCase().includes(keyword)) {
            services.push(keyword);
        }
    });

    return services;
}
