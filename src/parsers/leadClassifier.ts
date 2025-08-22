// File: src/parsers/leadClassifier.ts

import type { PageSnapshot } from '../utils/snapshot';

export interface Lead {
  leadType: string;
  confidence: number;
}

/**
 * Basic keyword-based classifier that attempts to identify lead type
 * from visible page text.
 */
export function classifyLead(snapshot: PageSnapshot): Lead {
  const { text } = snapshot;
  const lowercaseText = text.toLowerCase();

  const keywordsMap: Record<string, string[]> = {
    EventVenue: ['event space', 'venue rental', 'ballroom', 'banquet hall', 'conference room', 'event venue'],
    EventPlanner: ['event planner', 'event planning', 'wedding planner', 'event design', 'coordinator'],
    Festival: ['festival', 'music fest', 'film fest', 'conference', 'expo', 'summit'],
    Podcast: ['podcast', 'listen on spotify', 'new episode', 'hosted by', 'apple podcasts'],
    RetreatCenter: ['retreat', 'healing center', 'wellness retreat', 'eco lodge', 'sanctuary'],
    MediaHost: ['guest speaker', 'webinar host', 'interview series', 'live show', 'virtual event'],
    Studio: ['yoga studio', 'dance studio', 'movement studio', 'wellness space'],
    Teacher: ['music teacher', 'private lessons', 'faculty', 'instructor', 'classes'],
    CreativeService: ['photography', 'videography', 'dj services', 'catering', 'graphic design', 'web design'],
  };

  for (const [leadType, keywords] of Object.entries(keywordsMap)) {
    for (const keyword of keywords) {
      if (lowercaseText.includes(keyword)) {
        return {
          leadType,
          confidence: 0.9,
        };
      }
    }
  }

  return {
    leadType: 'Unknown',
    confidence: 0.2,
  };
}

// TO DO: 
