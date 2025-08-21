// File: src/extractors/runExtractors.ts

import type { DomainContext, CampaignMode, ActorInput } from '../utils/types';
import type { PageSnapshot } from '../utils/snapshot';

import { extractEmails } from './email.js';
import { extractPhones } from './phone.js';
import { extractStyleVibe } from './styleVibe.js';
import { extractServices } from './services.js';
import { extractAddress } from './address.js';
import { extractSocials } from './socials.js';
import { extractLeadName } from './leadName.js';
import { extractBusinessName } from './businessName.js';

import { chooseBestContact } from '../parsers/contactChooser.js';
import { normalizeLocation } from '../parsers/locationNorm.js';

export async function runExtractors(
  snapshot: PageSnapshot,
  ctx: DomainContext,
  mode: CampaignMode,
  input: ActorInput
): Promise<void> {
  const { html, text } = snapshot;

  // Basic contacts
  const emails = extractEmails(text);
  const phones = extractPhones(text);
  const contactCount = Math.max(emails.length, phones.length);
  ctx.contacts = Array.from({ length: contactCount })
    .map((_, i) => ({ email: emails[i], phone: phones[i] }))
    .filter((c) => c.email || c.phone);
  ctx.bestContact = chooseBestContact(ctx.contacts);

  // ✨ NEW: Extract lead and business name separately
  ctx.leadName = extractLeadName(html) ?? undefined;
  ctx.businessName = extractBusinessName(html) ?? undefined;

  // Core fields
  ctx.services = extractServices(text);
  ctx.styleVibe = extractStyleVibe(text);

  // Address → normalized location
  const address = extractAddress(text);
  if (address) ctx.location = normalizeLocation(address);

  // ✨ NEW: Expanded social platform support
  ctx.socials = extractSocials(html);

  // ✨ Optional debug or fallback: raw text capture
  if (input.includeRawText) {
    ctx.text = text;
  }

  // (Optional) Mode-specific scoring logic could go here later
}

/*
TO DO:

- 💬 Add `extractValues(text)` and `extractSocialProof(text)` modules
    → for ethical positioning, testimonials, etc.
- 🧠 Add GPT fallback if leadName or businessName are still missing
    → requires snapshot text and context
- 🧑‍🤝‍🧑 Add extraction of team members/people (e.g., from team/staff/about pages)
    → update DomainContext.people: Contact[]
- 🕸️ Add `sourcePage` tagging per signal (e.g. came from /about or /services)
- ✨ Add plugin-style modular extractor loader by signal type
    → e.g. runExtractors becomes dynamically loaded pipeline
- 📊 Add basic signal confidence scoring (e.g., email found in footer = high)
- 🛠️ Create per-use-case extractor configs in future (e.g. RetreatHost, PodcastGuest)

- Improve leadName/businessName distinction using structural cues (e.g. "About" vs "Team" pages)
- Enrich socials with follower counts, handles, bios (future enhancement)
- Allow confidence scoring or field-level provenance tags (e.g. "leadName came from /about")
- Log fallback triggers when leadName/businessName not detected
- De-duplicate signals across pages (e.g. contact blocks)

*/
