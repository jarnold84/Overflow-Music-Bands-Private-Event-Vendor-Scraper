# Overflow Music Bands Private Event Vendor Scraper

This Apify actor scrapes **high-value contact and messaging intelligence** from websites of vendors who serve **wedding and corporate/private events** — including venues, planners, photographers, caterers, DJs, florists, and more.

It’s designed specifically for **music bands, ensembles, or agencies** looking to connect with private event vendors for booking opportunities.

---

## 💡 Use Case

This actor powers **automated, personalized outreach** to event vendors by extracting:

- Clean **emails**, contact pages, or RFP links
- **Vendor type** (e.g. venue, planner, caterer)
- **Segment focus** (wedding, corporate, social)
- **Services, style/vibe, capacity**
- **Event types supported**
- **Location & metro region**
- **Key people** (e.g. Event Manager, Owner)
- **Socials, testimonials, awards**

Outputs are optimized for downstream lead generation, enrichment, and GPT-driven cold message writing.

---

## 🛠️ Input

This actor accepts:

```ts
interface ActorInput {
  startUrls: string[];             // List of vendor website root URLs
  campaignMode?: "wedding" | "corporate" | "mixed"; // Optional: default = "mixed"
}
You can call this actor from a Make (Integromat) scenario or directly through the Apify API.
