// File: src/configs/leadTypeConfigs.ts

export interface LeadTypeConfig {
  leadType: string;
  keywords: string[];
  tags?: string[];           // Optional semantic metadata
  priority?: number;         // Optional: used to break ties or weight categories
  description?: string;      // Optional: for debugging, GPT explanation, or docs
}

// 🎯 Default config for universal scraping
export const defaultLeadTypeConfigs: LeadTypeConfig[] = [
  {
    leadType: 'Podcast',
    keywords: ['podcast', 'episodes', 'listen on spotify', 'guest interviews'],
    tags: ['media', 'speaker outreach', 'thought leadership'],
    priority: 9,
    description: 'Audio series or show, usually with guest interviews or episodes'
  },
  {
    leadType: 'RetreatCenter',
    keywords: ['retreat center', 'yoga retreat', 'healing retreat', 'weekend retreat'],
    tags: ['wellness', 'healing', 'events'],
    priority: 8,
    description: 'A venue or facility offering immersive healing or spiritual retreats'
  },
  {
    leadType: 'EventVenue',
    keywords: ['event space', 'venue rental', 'wedding venue', 'banquet hall', 'conference room'],
    tags: ['booking', 'events'],
    priority: 10,
    description: 'Physical location available for event hosting or rental'
  },
  {
    leadType: 'Festival',
    keywords: ['lineup', 'music festival', 'vendor application', 'performer application'],
    tags: ['music', 'art', 'outreach'],
    priority: 7,
    description: 'Multi-day public or cultural event with performances or exhibitions'
  },
  {
    leadType: 'Coach',
    keywords: ['coaching program', 'mindset coach', 'life coach', 'coaching packages'],
    tags: ['transformation', '1:1 services', 'digital'],
    priority: 6,
    description: 'Personal development or business coach offering sessions or programs'
  },
  {
    leadType: 'Speaker',
    keywords: ['keynote speaker', 'book me to speak', 'talks', 'presentation topics'],
    tags: ['leadership', 'education'],
    priority: 5,
    description: 'Professional speaker offering presentations or keynotes'
  },
  {
    leadType: 'OnlineEducator',
    keywords: ['online course', 'digital curriculum', 'learn at your own pace', 'course platform'],
    tags: ['digital', 'education'],
    priority: 4,
    description: 'Individual or company offering digital learning content or courses'
  },
  {
    leadType: 'HealingPractitioner',
    keywords: ['reiki', 'energy healing', 'craniosacral', 'healing session', 'book a session'],
    tags: ['wellness', '1:1'],
    priority: 5,
    description: 'Practitioner offering hands-on or energetic healing services'
  },
  {
    leadType: 'ArtsOrganization',
    keywords: ['artist residency', 'arts funding', 'community arts', 'nonprofit arts'],
    tags: ['art', 'grants', 'collective'],
    priority: 4,
    description: 'Group or nonprofit supporting community-based or professional arts'
  },
  {
    leadType: 'Author',
    keywords: ['book tour', 'buy my book', 'author event', 'signed copies'],
    tags: ['publishing', 'media', 'thought leadership'],
    priority: 5,
    description: 'Published writer marketing their books or speaking engagements'
  },
  {
    leadType: 'Therapist',
    keywords: ['therapy session', 'counseling', 'mental health support', 'book a session'],
    tags: ['wellness', '1:1'],
    priority: 6,
    description: 'Licensed or alternative mental health practitioner'
  },
  {
    leadType: 'Nonprofit',
    keywords: ['501(c)(3)', 'donate', 'our mission', 'nonprofit organization'],
    tags: ['social impact', 'grants', 'service'],
    priority: 4,
    description: 'Social mission-driven organization seeking funding or engagement'
  }
];

// 🧱 Future: Support for per-campaign configs
export const allLeadTypeConfigs = {
  universal: defaultLeadTypeConfigs,
  // musicCampaign: [...],
  // coachesOnly: [...],
};
