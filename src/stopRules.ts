// File: src/stopRules.ts
import type { DomainContext } from './types.js';
import { classifyVendor } from './parsers/vendorClassifier.js';

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

export function recomputeScore(ctx: DomainContext, cfg: any) {
  // Determine vendor type and confidence from extracted signal text
  const { vendorType, confidence } = classifyVendor(
    ctx.signals.map((s) => s.text ?? '')
  );
  ctx.vendorType = vendorType;
  ctx.vendorConfidence = confidence;

  // Basic scoring heuristic
  let score = 0;
  if (ctx.bestContact?.email) score += 0.4;
  if (vendorType && confidence > 0.6) score += 0.2;
  if (ctx.segmentFocus) score += 0.1;
  if (ctx.services) score += 0.1;
  if (ctx.capacityNotes || ctx.location) score += 0.1;
  if (ctx.socialProof || ctx.values) score += 0.1;

  ctx.score = Math.min(score, 1);
}
