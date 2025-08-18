// Extracts social media links from HTML
export function extractSocials(html: string): Record<string, string> {
    const socials: Record<string, string> = {};

    if (html.includes('instagram.com')) socials.instagram = 'instagram.com';
    if (html.includes('facebook.com')) socials.facebook = 'facebook.com';
    if (html.includes('tiktok.com')) socials.tiktok = 'tiktok.com';
    if (html.includes('youtube.com')) socials.youtube = 'youtube.com';
    if (html.includes('linkedin.com')) socials.linkedin = 'linkedin.com';

    return socials;
}
