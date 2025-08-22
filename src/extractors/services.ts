// File: src/extractors/services.ts

/**
 * Extracts service keywords from HTML based on presence of known service-related terms.
 * Supports vendors and creators across events, wellness, education, podcasts, and more.
 */

export function extractServices(html: string): string[] {
  const text = html.toLowerCase();

  const serviceKeywords = [
    // 🎤 Entertainment & Performance
    'live music', 'band', 'dj', 'musician', 'performer', 'music performance',
    'emcee', 'host', 'spoken word', 'comedy', 'stage show',

    // 🎨 Creative Services
    'photography', 'videography', 'photo booth', 'video editing', 'sound design',
    'graphic design', 'branding', 'copywriting', 'illustration', 'animation',

    // 🎧 Podcasts & Media
    'podcast production', 'podcast editing', 'podcast hosting', 'podcast guesting',
    'media appearances', 'press coverage', 'interview series', 'radio show',

    // 📚 Education & Training
    'online course', 'webinar', 'workshop', 'masterclass', 'coaching program',
    'certification', 'training', 'seminar', 'educational resources',

    // 🌿 Wellness & Retreats
    'retreat', 'healing session', 'sound bath', 'yoga class', 'massage therapy',
    'reiki', 'energy healing', 'craniosacral therapy', 'wellness coaching', 'breathwork',
    'somatic therapy', 'mindfulness training', 'meditation',

    // 🧠 Consulting & Strategy
    'consulting', 'business coaching', 'marketing strategy', 'brand strategy',
    'leadership coaching', 'executive coaching', 'fundraising support',

    // 📣 Public Speaking & Facilitation
    'keynote speaking', 'speaker', 'panelist', 'moderator', 'facilitation',
    'event emcee', 'presentation', 'talks', 'lectures', 'conferences',

    // 🎭 Artistic Services
    'art installation', 'murals', 'gallery exhibition', 'performance art',
    'film screening', 'original music', 'theater performance', 'creative writing',

    // 🛠 Technical & Production
    'av production', 'audio visual', 'lighting', 'stage design',
    'tech support', 'equipment rental', 'recording studio', 'video production',

    // 🍽 Events & Hospitality
    'event planning', 'wedding planning', 'corporate events', 'private events',
    'event design', 'decor', 'floral design', 'flowers',
    'catering', 'bartending', 'food truck', 'dining experience',
    'rentals', 'furniture rental', 'tent rental', 'tableware rental',
    'valet', 'transportation', 'shuttle', 'concierge',

    // 🏢 Organizational & Nonprofit
    'grantmaking', 'fiscal sponsorship', 'fundraising', 'community organizing',
    'program development', 'event sponsorship', 'arts funding', 'capacity building',

    // 🖥 Platforms & Tech
    'platform hosting', 'directory listing', 'vendor portal', 'marketplace',
    'content management', 'web development', 'app design', 'UX consulting',

    // 🤝 Agencies & Networks
    'talent booking', 'event staffing', 'creative agency', 'management', 'booking agent',

    // 🎫 Marketing & Promotion
    'brand partnerships', 'sponsorship', 'press relations', 'digital marketing',
    'email marketing', 'influencer marketing', 'social media strategy',
  ];

  const found = serviceKeywords.filter(keyword => text.includes(keyword));
  return [...new Set(found)];
}

/*
TO DO (optional future upgrades):

- 🧠 Add GPT-powered classification for edge cases (e.g. “luxury immersive experiences” → experiential events)
- 💬 Group keywords into categories (e.g. AV, food, decor) for richer message personas
- ✨ Add semantic or fuzzy match (e.g. via embedding or Levenshtein distance)
- 🔎 Highlight where on the page the services were mentioned (for scoring/debugging)
- 🔁 Track services per page and roll up to domain-level
- 🌍 Localize keyword list for international language support
- 📄 Include canonical service name + source phrase match for better debug output
*/
