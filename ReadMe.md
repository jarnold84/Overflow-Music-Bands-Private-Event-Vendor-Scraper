# 🌐 Overflow Universal Leads Scraper

An AI-powered, configurable web crawler that extracts high-quality lead data from structured websites — including contact info, persona insights, services, style, and more.

Originally built for wedding and private event vendors, this scraper has evolved into a **universal entity scraper** capable of handling:

- 🌱 Solo Creators (artists, therapists, coaches)
- 🏢 Organizations (venues, schools, nonprofits)
- 🎙️ Personal Brands (podcasters, authors, hybrid identities)

---

## 🎯 Purpose

The goal is to power **soulful, personalized outreach** by gathering context-rich data across multiple channels and use cases — feeding directly into the [Overflow System](https://overflow.io) or your custom CRM/outreach stack.

---

## 🧠 What It Does

- 🔍 Crawls websites starting from a seed URL
- 🧠 Extracts:
  - Emails, contact forms, phone numbers
  - Social handles (Instagram, Facebook, etc.)
  - Services and style/vibe words
  - Bio and persona summaries
  - Location, audience clues, and more
- ⚙️ Operates based on campaign-specific configs:
  - `entityType`: "individual" | "org" | "hybrid"
  - `requiredSignals`: e.g., email, persona
  - `linkPriorityMap` to control crawl behavior
  - `needsSocialFallback`: whether to queue for social scraping later

---

## 📦 Output

Each run pushes a structured JSON object per domain:

```json
# 🌐 Overflow Universal Leads Scraper

An AI-powered, configurable web crawler that extracts high-quality lead data from structured websites — including contact info, persona insights, services, style, and more.

Originally built for wedding and private event vendors, this scraper has evolved into a **universal entity scraper** capable of handling:

- 🌱 Solo Creators (artists, therapists, coaches)
- 🏢 Organizations (venues, schools, nonprofits)
- 🎙️ Personal Brands (podcasters, authors, hybrid identities)

---

## 🎯 Purpose

The goal is to power **soulful, personalized outreach** by gathering context-rich data across multiple channels and use cases — feeding directly into the [Overflow System](https://overflow.io) or your custom CRM/outreach stack.

---

## 🧠 What It Does

- 🔍 Crawls websites starting from a seed URL
- 🧠 Extracts:
  - Emails, contact forms, phone numbers
  - Social handles (Instagram, Facebook, etc.)
  - Services and style/vibe words
  - Bio and persona summaries
  - Location, audience clues, and more
- ⚙️ Operates based on campaign-specific configs:
  - `entityType`: "individual" | "org" | "hybrid"
  - `requiredSignals`: e.g., email, persona
  - `linkPriorityMap` to control crawl behavior
  - `needsSocialFallback`: whether to queue for social scraping later

---

## 📦 Output

Each run pushes a structured JSON object per domain:

```json
{
  "domain": "example.com",
  "seedUrl": "https://example.com/about",
  "businessName": "Sunshine Florists",
  "leadName": "Sally Field",
  "contacts": [
    {
      "type": "email",
      "value": "sally@sunshineflorists.com"
    },
    {
      "type": "phone",
      "value": "(555) 123-4567"
    }
  ],
  "socials": {
    "instagram": {
      "handle": "sunshineflorists",
      "url": "https://instagram.com/sunshineflorists"
    },
    "facebook": {
      "handle": "SunshineFlorists",
      "url": "https://facebook.com/SunshineFlorists"
    },
    "youtube": {
      "handle": "SunshineFloristsTV",
      "url": "https://youtube.com/@SunshineFloristsTV"
    },
    "tiktok": {
      "handle": "sunshine.florists",
      "url": "https://tiktok.com/@sunshine.florists"
    },
    "linkedin": {
      "handle": "sunshineflorists",
      "url": "https://linkedin.com/company/sunshineflorists"
    },
    "x": {
      "handle": "SunshineBlooms",
      "url": "https://x.com/SunshineBlooms"
    },
    "reddit": {
      "handle": "u/SunshineFlorist",
      "url": "https://reddit.com/user/SunshineFlorist"
    },
    "other": [
      {
        "platform": "threads",
        "handle": "sunshineflorists",
        "url": "https://www.threads.net/@sunshineflorists"
      },
      {
        "platform": "pinterest",
        "handle": "sunshinefloristspins",
        "url": "https://pinterest.com/sunshinefloristspins"
      }
    ]
  },
  "services": [ "wedding floral design", "event styling" ],
  "styleVibe": [ "elegant", "natural", "romantic" ],
  "city": "Los Angeles",
  "country": "USA",
  "personaSummary": "Sally is the founder of Sunshine Florists, known for her romantic, nature-inspired floral designs. She caters primarily to upscale weddings in Southern California.",
  "hasValidContact": true,
  "ts": "2025-08-21T16:57:24.761Z"
}

⚙️ Tech Stack

Apify Actors

Crawlee

TypeScript

Playwright

GPT-based enrichment (optional, modular)

Google Sheets, Notion, or webhook integrations via Make

🔮 Coming Soon

Agent-mode social scraping fallback (Instagram, Facebook, etc.)

Unified enrichment and messaging pipeline

Cross-channel deduplication and prioritization

💞 Inspired By

Overflow's mission to help artists, coaches, and change-makers share their gifts — not through spam, but through resonance.



