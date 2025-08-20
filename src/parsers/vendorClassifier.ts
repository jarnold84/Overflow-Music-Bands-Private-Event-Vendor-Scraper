// File: src/extractors/vendorClassifier.ts

import type { PageSnapshot, PageSignals } from '../types';

/**
 * Extracts vendor-related classification hints from page text.
 * This helps score the vendorType and segmentFocus later.
 */
export function extractVendorClassifier(snapshot: PageSnapshot): PageSignals {
  return {
    text: snapshot.text, // ✅ Feed full text forward for later scoring
    vendorTypeHints: extractVendorHints(snapshot.text),
    // Future: segmentFocus, eventTypes, etc.
  };
}

/**
 * Naive vendor hint extractor — searches text for common vendor types.
 * Improve this over time with NLP or pattern libraries.
 */
function extractVendorHints(text: string): string[] {
  const patterns: Record<string, RegExp> = {
    venue: /\bvenue\b/i,
    planner: /\bplanner\b/i,
    florist: /\bflorist\b/i,
    caterer: /\bcater(er|ing)\b/i,
    dj: /\bDJ\b/i,
    band: /\bband\b/i,
    av: /\bAV\b|\baudio[-\s]?visual\b/i,
    dmc: /\bDMC\b|\bdestination management\b/i,
    photographer: /\bphotographer\b/i,
    hotel: /\bhotel\b|\bresort\b/i,
    conference: /\bconference (center|facility)\b/i,
    agency: /\bbrand agency\b|\bexperiential\b/i,
  };

  return Object.entries(patterns)
    .filter(([, regex]) => regex.test(text))
    .map(([label]) => label);
}
