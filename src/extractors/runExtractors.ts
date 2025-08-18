// File: src/extractors/runExtractors.ts

import type { PageSnapshot } from '../utils/snapshot';
import type { DomainContext } from '../types';
import { addSignals } from '../domainContext';

import { extractEmails } from './email';
import { extractPhones } from './phone';
import { extractAddress } from './address';
import { extractAbout } from './about';
import { extractServices } from './services';
import { extractSocials } from './socials';
import { extractStyleVibe } from './styleVibe';
import { extractVendorName } from './name';

export async function runExtractors(
  snapshot: PageSnapshot,
  domainCtx: DomainContext,
  campaignMode: string
) {
  const signals = {
    url: snapshot.url,
    title: snapshot.title,
    emails: extractEmails(snapshot.html),
    phoneCandidates: extractPhones(snapshot.html),
    contactUrl: null, // optional: add logic later
    rfpUrl: null,     // optional: add logic later
  };

  // Core assignments
  addSignals(domainCtx, signals);

  // Side-channel enrichments (add to ctx directly)
  domainCtx.services = extractServices(snapshot.html);
  domainCtx.socials = extractSocials(snapshot.html);
  domainCtx.styleVibe = extractStyleVibe(snapshot.html);
  domainCtx.vendorName = extractVendorName(snapshot.html);
}
