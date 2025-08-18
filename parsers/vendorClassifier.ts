// Classifies vendor type based on extracted services and text
export function classifyVendor(services: string[]): { vendorType: string, confidence: number } {
    if (services.includes('venue')) return { vendorType: 'venue', confidence: 0.9 };
    if (services.includes('dj') || services.includes('band')) return { vendorType: 'dj_band', confidence: 0.85 };
    return { vendorType: 'other', confidence: 0.5 };
}
