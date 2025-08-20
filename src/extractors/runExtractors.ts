// File: src/extractors/runExtractors.ts

import type { PageSnapshot } from '../utils/snapshot';
import type { DomainContext, CampaignMode } from '../utils/types';

import { extractEmails } from './email';
import { extractPhones } from './phone';
import { extractStyleVibe } from './styleVibe';
import { extractServices } from './services';
import { extractAddress } from './address';
import { extractSocials } from './socials';
import { extractVendorName } from './name';

import { chooseBestContact } from '../parsers/contactChooser';
import { classifyVendor } from '../parsers/vendorClassifier';
import { normalizeLocation } from '../parsers/locationNorm';

export async function runExtractors(
  snapshot: PageSnapshot,
  ctx: DomainContext,
  mode: CampaignMode
): Promise<void> {
  const { html, text } = snapshot;

  // Contact extraction
  const emails = extractEmails(text);
  const phones = extractPhones(text);

  // Combine emails and phones into contacts intelligently
  const contactCount = Math.max(emails.length, phones.length);
  ctx.contacts = Array.from({ length: contactCount }).map((_, i) => ({
    email: emails[i],
    phone: phones[i],
  })).filter(c => c.email || c.phone); // remove empty rows

  ctx.bestContact = chooseBestContact(ctx.contacts);

  ctx.vendorName = extractVendorName(html);

  // Services & style
  ctx.services = extractServices(text);
  ctx.styleVibe = extractStyleVibe(text);

  // Address → normalized location
  const address = extractAddress(text);
  if (address) {
    ctx.location = normalizeLocation(address);
  }

  // Socials
  ctx.socials = extractSocials(html);
}
