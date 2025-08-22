# 🌐 Overflow Universal Leads Scraper

An AI-powered, campaign-aware web crawler that extracts high-quality lead data, personas, and messaging signals from websites — designed to fuel soulful, personalized outreach.

Originally built for wedding and private event vendors, it has evolved into a **universal, modular scraper** for creators, educators, and organizations.

---

## 🎯 Purpose

Power [Overflow](https://overflow.io) or your own CRM with warm, context-rich leads — without relying on ad platforms, scraping directories, or cold LinkedIn spam.

---

## 🧠 Key Features

- ✅ Campaign-aware configurations: `wedding`, `corporate`, `universal`, etc.
- 🔍 Crawls websites starting from a seed URL
- 🧠 Extracts:
  - Emails, phones, contact pages, RFP links
  - Socials (Instagram, Facebook, YouTube, TikTok, LinkedIn, more)
  - Services, values, and style/vibe descriptors
  - Bio/persona summaries and segment focus
  - Business type + inferred lead type
  - City, state, metro, country (normalized)
- 🧠 Uses GPT for fallback classification
- ⚙️ Modular architecture with campaign configs

---

## 🧪 Campaign Modes

Set campaign mode in your input config:

```json
{
  "campaignMode": "wedding"
}
Supported modes (via campaignModeConfigs.ts):

"wedding"

"corporate"

"universal" (default)

Each mode can route to different:

Classifiers

Extractor preferences

Stop rules

Messaging personas

📤 Output Format

Each domain produces a JSON object with rich signals:

{
  "domain": "example.com",
  "leadType": "EventVenue",
  "businessName": "Sunshine Florists",
  "leadName": "Sally Field",
  "contacts": [
    { "email": "sally@sunshineflorists.com" },
    { "phone": "(555) 123-4567" }
  ],
  "socials": {
    "instagram": { "handle": "sunshineflorists", "url": "https://instagram.com/sunshineflorists" },
    ...
  },
  "services": [ "wedding floral design", "event styling" ],
  "styleVibe": [ "elegant", "natural", "romantic" ],
  "segmentFocus": "weddings",
  "city": "Los Angeles",
  "country": "USA",
  "personaSummary": "...",
  "ts": "2025-08-21T16:57:24.761Z"
}

⚙️ Tech Stack

Apify Actors

Crawlee

TypeScript

Playwright

OpenAI GPT (optional fallback classifier)

JSON/CSV/Webhook output

Integrations via Make.com
 (Notion, Sheets, etc)

📁 Input Schema (via UI)
{
  "startUrls": ["https://example.com"],
  "startUrls": [
    "https://example.com",
    { "url": "https://another.com" }
  ],
  "campaignMode": "wedding",
  "maxConcurrency": 10,
  "includeRawText": false
}


You can test directly in the Apify UI.

🔮 Coming Soon

Agent-mode fallback (social scraping if contact not found)

Per-campaign extractor logic

Auto-generated message personas and email drafts

End-to-end Overflow integration

💞 Inspired By

Overflow’s mission to help artists, healers, and change-makers share their gifts through resonance, not coercion.
