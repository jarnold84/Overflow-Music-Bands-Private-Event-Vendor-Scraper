// File: src/stopRules.ts

import type { DomainContext } from './utils/types.js';
import { classifyVendor } from './parsers/vendorClassifier.js';

export type StopRulesConfig = {
  vendorConfidenceThreshold?: number; // default 0.6
  scoreThreshold?: number;            // default 0.6
};

/**
 * Decide if we've scraped enough info to stop.
 * Restores your original 'hasContext' semantics (services truthy, not length),
 * keeps null-safety, and supports configurable thresholds.
 */
export function shouldStop(ctx: DomainContext, cfg: StopRulesConfig = {}): boolean {
  const vendorConfidenceThreshold = cfg.vendorConfidenceThreshold ?? 0.6;
  const scoreThreshold = cfg.scoreThreshold ?? 0.6;

  const hasContact =
    !!ctx.bestContact?.email || !!ctx.bestContact?.contactPage || !!ctx.bestContact?.rfpUrl;

  const hasVendor =
    !!ctx.vendorType && (ctx.vendorConfidence ?? 0) > vendorConfidenceThreshold;

  // ORIGINAL SEMANTICS: treat services as context if present at all
  const hasContext =
    !!(ctx.segmentFocus || ctx.services || ctx.capacityNotes || ctx.location);

  if (hasContact && hasVendor && hasContext && (ctx.score ?? 0) > scoreThreshold) {
    ctx.stopReason = 'enough-info';
    return true;
  }
  return false;
}

/**
 * Recalculate score and infer vendor type from the most recent text signal.
 * Keeps the classifier-field fix (type -> vendorType). Weights match your original.
 */
export function recomputeScore(ctx: DomainContext, cfg: StopRulesConfig = {}): void {
  const vendorConfidenceThreshold = cfg.vendorConfidenceThreshold ?? 0.6;

  // Classify from latest text
  const lastText = [...ctx.signals].reverse().find((s) => s.text)?.text;
  if (lastText) {
    const { type, confidence } = classifyVendor({ url: ctx.seedUrl, html: '', title: '', text: lastText });
    ctx.vendorType = type;
    ctx.vendorConfidence = confidence;
  }

  // Score (original weights, but null-safe)
  let score = 0;
  if (ctx.bestContact?.email) score += 0.4;
  if (ctx.vendorType && (ctx.vendorConfidence ?? 0) > vendorConfidenceThreshold) score += 0.2;
  if (ctx.segmentFocus) score += 0.1;
  if (ctx.services) score += 0.1; // truthy, not length
  if (ctx.capacityNotes || ctx.location) score += 0.1;
  if (ctx.socialProof || ctx.values) score += 0.1;
  ctx.score = Math.min(score, 1);
}

/** Recompute first, then decide — safer for early-exit. */
export function stopRulesMet(ctx: DomainContext, cfg: StopRulesConfig = {}): boolean {
  recomputeScore(ctx, cfg);
  return shouldStop(ctx, cfg);
}
