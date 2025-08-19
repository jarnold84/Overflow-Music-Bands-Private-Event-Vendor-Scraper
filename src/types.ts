// File: src/types.ts

export type CampaignMode = 'wedding' | 'corporate' | 'mixed';

export interface ActorInput {
  startUrls: string[];
  campaignMode?: CampaignMode;
  includePaths?: string[];
  maxDepth?: number;
  maxRequestsPerDomain?: number;
  perHostConcurrency?: number;
  maxConcurrency?: number;
  useGptFallback?: boolean;
  takeScreenshots?: boolean;
  saveHtmlSnippets?: boolean;
  parseSmallPdfs?: boolean;
  stopOnScore?: number; // 0..1
  proxyConfiguration?: any;
}

export interface Contact {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  evidence?: string[];
}

export interface PageSignals {
  url: string;
  title?: string;
  emails?: string[];
  phones?: string[];
  socials?: Record<string, string>;
  contacts?: Contact[];
  services?: string[];
  styleVibe?: string[];
  location?: string;
  capacityNotes?: string;
  portfolioUrls?: string[];
  company?: string;
  rfpUrl?: string;
  bookingLink?: string;
  values?: string[];
  testimonials?: string[];
  clienteleProfile?: string;
  eventTypes?: string[];
  segmentFocus?: string;
  serviceRadius?: string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  score: number;
  stopReason?: string;

  // Flattened merged fields
  bestContact?: Contact;
  company?: string;
  vendorName?: string;
  vendorType?: string;
  vendorConfidence?: number;
  email?: string;
  phones?: string[];
  contactPage?: string | null;
  rfpUrl?: string | null;
  bookingLink?: string | null;
  services?: string[];
  styleVibe?: string[];
  location?: string;
  capacityNotes?: string;
  socials?: Record<string, string>;
  people?: Contact[];
  metro?: string;
  city?: string;
  state?: string;
  country?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  clienteleProfile?: string;
  serviceRadius?: string;
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  evidence?: string[];
}

export interface Lead {
  domain: string;
  seedUrl: string;
  vendorName?: string;
  vendorType?: string;
  vendorConfidence?: number;
  company?: string;
  email?: string;
  phones?: string[];
  contactPage?: string | null;
  rfpUrl?: string | null;
  bookingLink?: string | null;
  services?: string[];
  styleVibe?: string[];
  location?: string;
  capacityNotes?: string;
  socials?: Record<string, string>;
  people?: Contact[];
  metro?: string;
  city?: string;
  state?: string;
  country?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  clienteleProfile?: string;
  serviceRadius?: string;
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  evidence?: string[];
  crawlRunId: string;
  ts: string;
}

export interface MessagePersona {
  domain: string;
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
  opsNotes?: string[];
  location?: string;
  metro?: string;
  values?: string[];
  bestHookIdeas?: string[];
}
