// File: src/parsers/leadClassifier.ts

import type { PageSnapshot } from '../utils/snapshot';

export interface Lead {
  type: string;
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
    Florist: ['floral design', 'flower arrangements', 'bouquet', 'centerpiece', 'florist'],
    Venue: ['wedding venue', 'event space', 'banquet hall', 'ceremony site', 'reception location'],
    Planner: ['wedding planning', 'event coordinator', 'planner', 'timeline', 'logistics'],
    Caterer: ['catering', 'chef', 'menu', 'hors d\'oeuvres', 'buffet', 'plated dinner'],
    Photographer: ['wedding photography', 'photo gallery', 'portraits', 'shot list'],
    DJ: ['dj', 'music', 'dance floor', 'emcee', 'playlist', 'sound system'],
    Band: ['live band', 'jazz trio', 'string quartet', 'reception music', 'dance music'],
    AV: ['audiovisual', 'sound', 'lighting', 'projection', 'microphones'],
    DMC: ['destination management', 'local tours', 'event logistics'],
    Hotel: ['guest rooms', 'suite', 'accommodation', 'check-in', 'amenities'],
    ConferenceCenter: ['conference', 'meeting space', 'ballroom', 'projector', 'podium'],
    ExperientialAgency: ['brand activation', 'immersive experience', 'event marketing', 'experiential'],
  };

  for (const [leadType, keywords] of Object.entries(keywordsMap)) {
    for (const keyword of keywords) {
      if (lowercaseText.includes(keyword)) {
        return {
          type: leadType,
          confidence: 0.9,
        };
      }
    }
  }

  return {
    type: 'Unknown',
    confidence: 0.2,
  };
}
// TO DO: update keywords for universal use
