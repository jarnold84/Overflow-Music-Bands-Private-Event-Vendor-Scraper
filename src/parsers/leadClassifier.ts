// File: src/parsers/leadClassifier.ts

import type { PageSnapshot } from '../utils/snapshot';
import type { LeadTypeConfig } from '../configs/leadTypeConfigs.js';
import { defaultLeadTypeConfigs } from '../configs/leadTypeConfigs.js';
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
 * Accepts optional config for campaign-specific classification.
 */
export async function classifyLead(
  snapshot: PageSnapshot,
  configs: LeadTypeConfig[] = defaultLeadTypeConfigs
): Promise<Lead> {
  const { text } = snapshot;
  const lowercaseText = text.toLowerCase();

  const matches: LeadMatch[] = [];

  for (const config of configs) {
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
🧠 Future Enhancements:

- ✅ [DONE] Modular config: supports campaign-specific classifier configs
- 🧠 Campaign mode router: Pass campaign-specific configs from `router.ts` or `actor.ts`
- 🧠 Category prioritization: If multiple high-confidence types, prefer based on hierarchy (e.g. Podcast > MediaHost)
- 🧠 Confidence boosting for cross-signal reinforcement (e.g., matching values + services)
- 🧠 Log keyword hits per category for transparency and debugging
- 🧠 Export debug version with per-keyword match counts
*/
