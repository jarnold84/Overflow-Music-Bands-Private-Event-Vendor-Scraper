// File: src/configs/leadTypeConfigs.ts

export interface LeadTypeConfig {
  leadType: string;
  keywords: string[];
  tags?: string[]; // Optional metadata (e.g. use cases, industry segments)
}

export const universalLeadTypes: LeadTypeConfig[] = [
  {
    leadType: 'Podcast',
    keywords: ['podcast', 'episodes', 'listen on spotify', 'guest interviews'],
    tags: ['media', 'speaker outreach', 'thought leadership']
  },
  {
    leadType: 'RetreatCenter',
    keywords: ['retreat center', 'yoga retreat', 'healing retreat', 'weekend retreat'],
    tags: ['wellness', 'healing', 'events']
  },
  {
    leadType: 'EventVenue',
    keywords: ['event space', 'venue rental', 'wedding venue', 'banquet hall', 'conference room'],
    tags: ['booking', 'events']
  },
  {
    leadType: 'Festival',
    keywords: ['lineup', 'music festival', 'vendor application', 'performer application'],
    tags: ['music', 'art', 'outreach']
  },
  {
    leadType: 'Coach',
    keywords: ['coaching program', 'mindset coach', 'life coach', 'coaching packages'],
    tags: ['transformation', '1:1 services', 'digital']
  },
  {
    leadType: 'Speaker',
    keywords: ['keynote speaker', 'book me to speak', 'talks', 'presentation topics'],
    tags: ['leadership', 'education']
  },
  {
    leadType: 'OnlineEducator',
    keywords: ['online course', 'digital curriculum', 'learn at your own pace', 'course platform'],
    tags: ['digital', 'education']
  },
  {
    leadType: 'HealingPractitioner',
    keywords: ['reiki', 'energy healing', 'craniosacral', 'healing session', 'book a session'],
    tags: ['wellness', '1:1']
  },
  {
    leadType: 'ArtsOrganization',
    keywords: ['artist residency', 'arts funding', 'community arts', 'nonprofit arts'],
    tags: ['art', 'grants', 'collective']
  },
  {
    leadType: 'Author',
    keywords: ['book tour', 'buy my book', 'author event', 'signed copies'],
    tags: ['publishing', 'media', 'thought leadership']
  },
  {
    leadType: 'Therapist',
    keywords: ['therapy session', 'counseling', 'mental health support', 'book a session'],
    tags: ['wellness', '1:1']
  },
  {
    leadType: 'Nonprofit',
    keywords: ['501(c)(3)', 'donate', 'our mission', 'nonprofit organization'],
    tags: ['social impact', 'grants', 'service']
  }
];
