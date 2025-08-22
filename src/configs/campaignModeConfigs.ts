// File: src/configs/campaignModeConfigs.ts

import { universalLeadTypes } from './leadTypeConfigs.js';
import type { StopRulesConfig } from '../stopRules.js';
import type { LeadTypeConfig } from './leadTypeConfigs.js';

export interface CampaignModeConfig {
  leadTypeWhitelist: string[]; // Allowable lead types for this campaign
  stopRules?: StopRulesConfig; // Optional custom thresholds
  selectors?: string[];        // Optional prioritized selectors
  notes?: string;              // Optional notes for messaging/persona tuning
}

export const campaignModeConfigs: Record<string, CampaignModeConfig> = {
  private_events: {
    leadTypeWhitelist: [
      'EventVenue',
      'EventPlanner',
      'RetreatCenter',
      'Festival',
    ],
    stopRules: {
      leadConfidenceThreshold: 0.6,
      scoreThreshold: 0.6,
    },
    selectors: ['about', 'services', 'contact', 'team'],
    notes: 'Focus on vendor-type leads for wedding and corporate gigs',
  },

  music_faculty: {
    leadTypeWhitelist: ['Teacher', 'ArtsOrganization'],
    stopRules: {
      leadConfidenceThreshold: 0.5,
      scoreThreshold: 0.5,
    },
    selectors: ['faculty', 'people', 'team', 'about'],
    notes: 'Target professors, ensembles, and department chairs',
  },

  coaches: {
    leadTypeWhitelist: ['Coach', 'Therapist', 'HealingPractitioner'],
    stopRules: {
      leadConfidenceThreshold: 0.55,
      scoreThreshold: 0.5,
    },
    selectors: ['about', 'services', 'booking', 'programs'],
    notes: 'Leads should offer coaching packages or sessions',
  },

  festivals: {
    leadTypeWhitelist: ['Festival'],
    selectors: ['lineup', 'vendor', 'apply', 'about'],
    notes: 'Prioritize performer and vendor application info',
  },

  podcasts: {
    leadTypeWhitelist: ['Podcast', 'MediaHost'],
    selectors: ['episodes', 'about', 'host', 'contact'],
    notes: 'Find outreach opportunities to be a podcast guest',
  },

  retreat_centers: {
    leadTypeWhitelist: ['RetreatCenter'],
    selectors: ['retreats', 'schedule', 'host a retreat', 'booking'],
    notes: 'Find retreat centers for collaboration or hosting',
  },

  authors: {
    leadTypeWhitelist: ['Author'],
    notes: 'For book tour collabs, endorsements, speaking',
  },

  nonprofit_partners: {
    leadTypeWhitelist: ['Nonprofit', 'ArtsOrganization'],
    selectors: ['mission', 'team', 'programs', 'donate'],
    notes: 'Find potential values-aligned partners or clients',
  },
};

/**
 * Returns the config for a given campaignMode. If not found, returns default universal config.
 */
export function getCampaignConfig(mode?: string): CampaignModeConfig {
  return campaignModeConfigs[mode ?? ''] || {
    leadTypeWhitelist: universalLeadTypes.map((t) => t.leadType),
    notes: 'Default universal config — all lead types allowed',
  };
}
