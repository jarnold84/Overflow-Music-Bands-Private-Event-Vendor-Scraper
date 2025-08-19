// File: src/runExtractors.ts

import type { PageSnapshot } from './utils/snapshot';
import type { DomainContext, CampaignMode } from './types';

import { extractEmails } from './extractors/email';
import { extractPhones } from './extractors/phone';
import { extractStyleVibe } from './extractors/styleVibe';
import { extractServices } from './extractors/services';
import { extractAddress } from './extractors/address';
import { extractSocials } from './extractors/socials';
import { extractVendorName } from './extractors/name';
import { chooseBestContact } from './parsers/contactChooser';
import { classifyVendor } from './parsers/vendorClassifier';
import { normalizeLocation } from './parsers/locationNorm';

export async function runExtractors(
  snapshot: PageSnapshot,
  ctx: DomainContext,
  mode: CampaignMode
): Promise<void> {
  const html = snapshot.html;
  const text = snapshot.text;

  // Basic contact extraction
  const emails = extractEmails(text);
  const phones = extractPhones(text);

  ctx.contacts = emails.map((email) => ({ email }));
  ctx.contacts.forEach((c, i) => {
    if (phones[i]) c.phone = phones[i];
  });

  ctx.bestContact = chooseBestContact(ctx.contacts);

  // Vendor classification
  ctx.vendor = classifyVendor(text, mode);
  ctx.vendor.name = extractVendorName(html);

  // Services and style
  ctx.services = extractServices(text);
  ctx.styleVibe = extractStyleVibe(text);

  // Address/location
  const address = extractAddress(text);
  if (address) {
    ctx.location = normalizeLocation(address);
  }

  // Socials
  ctx.socials = extractSocials(html);
}
