// File: src/parsers/leadClassifier.ts

import type { PageSnapshot } from '../utils/snapshot';
import { leadTypeConfigs } from '../configs/leadTypeConfigs.js';
import { callOpenAIClassifier } from '../utils/gptClassifier.js';

export interface LeadMatch {
  leadType: string;
  confidence: number;
}

export interface Lead {
  matches: LeadMatch[];
  primary: LeadMatch;
}

/**
 * Enhanced classifier: detects multiple matching lead types,
 * scores by keyword frequency, and falls back to GPT if needed.
 */
export async function classifyLead(snapshot: PageSnapshot): Promise<Lead> {
  const { text } = snapshot;
  const lowercaseText = text.toLowerCase();

  const matches: LeadMatch[] = [];

  for (const config of leadTypeConfigs) {
    let frequency = 0;
    for (const keyword of config.keywords) {
      frequency += lowercaseText.split(keyword).length - 1;
    }
    if (frequency > 0) {
      const confidence = Math.min(0.3 + frequency * 0.1, 0.95);
      matches.push({ leadType: config.leadType, confidence });
    }
  }

  if (matches.length === 0) {
    const gptFallback = await callOpenAIClassifier(text);
    matches.push(gptFallback);
  }

  const primary = matches.reduce((a, b) => (a.confidence > b.confidence ? a : b));

  return { matches, primary };
}


/*
Category prioritization rules
→ Add logic to prefer certain categories over others when multiple matches occur (e.g., prioritize “Podcast” over “MediaHost” if both match).

Campaign-specific classifier sets
→ Swap leadTypeConfigs dynamically based on campaign type (e.g., coach_outreach, festival_bookings) to fine-tune detection.
*/
