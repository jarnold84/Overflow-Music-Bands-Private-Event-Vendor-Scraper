// File: src/stopRules.ts

import type { DomainContext } from './utils/types';
import { classifyVendor } from './parsers/vendorClassifier';

/**
 * Decide if we've scraped enough info to stop.
 */
export function shouldStop(ctx: DomainContext, cfg: any): boolean {
  const hasContact = !!ctx.bestContact?.email || !!ctx.bestContact?.contactPage || !!ctx.bestContact?.rfpUrl;
  const hasVendor = !!ctx.vendorType && (ctx.vendorConfidence ?? 0) > 0.6;
  const hasContext = ctx.segmentFocus || ctx.services || ctx.capacityNotes || ctx.location;

  if (hasContact && hasVendor && hasContext && ctx.score > 0.6) {
    ctx.stopReason = 'enough-info';
    return true;
  }
  return false;
}

/**
 * Recalculate score and infer vendor type from all signals.
 */
export function recomputeScore(ctx: DomainContext, cfg: any) {
  // Use last available full signal text for classification
  const lastText = [...ctx.signals]
    .reverse()
    .find((s) => s.text)?.text;

  if (lastText) {
    const { vendorType, confidence } = classifyVendor({ url: ctx.seedUrl, html: '', title: '', text: lastText });
    ctx.vendorType = vendorType;
    ctx.vendorConfidence = confidence;
  }

  // Score based on field completeness
  let score = 0;
  if (ctx.bestContact?.email) score += 0.4;
  if (ctx.vendorType && ctx.vendorConfidence && ctx.vendorConfidence > 0.6) score += 0.2;
  if (ctx.segmentFocus) score += 0.1;
  if (ctx.services) score += 0.1;
  if (ctx.capacityNotes || ctx.location) score += 0.1;
  if (ctx.socialProof || ctx.values) score += 0.1;

  ctx.score = Math.min(score, 1);
}

// ✅ Export alias for convenience
export const stopRulesMet = shouldStop;
