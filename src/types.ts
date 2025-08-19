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
  contactPage?: string;
  rfpUrl?: string;
}

export interface PageSignals {
  url: string;
  title?: string;
  html?: string;
  text?: string;
  contacts?: Contact[];
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  services?: string[];
  styleVibe?: string[];
  capacityNotes?: string;
  serviceRadius?: string;
  socialProof?: string[];
  values?: string[];
  bookingLink?: string;
  people?: Contact[];
  vendorName?: string;
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  bestContact?: Contact;
  contacts?: Contact[];
  vendorType?: string;
  vendorConfidence?: number;
  vendorName?: string;
  score: number;
  stopReason?: string;

  // Additional fields merged post-extraction
  company?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
    metro?: string;
  };
  serviceRadius?: string;
  values?: string[] | string;
  socialProof?: string[] | string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  capacityNotes?: string;
  portfolioLinks?: string[];
  crawlRunId?: string;
  ts?: string;
}

export interface Lead {
  domain: string;
  seedUrl: string;
  vendorType?: string;
  vendorConfidence?: number;
  vendorName?: string;
  email?: string;
  phone?: string;
  contactPage?: string | null;
  rfpUrl?: string | null;
  services?: string[];
  styleVibe?: string[];
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  socials?: Record<string, string>;
  evidence?: string[];
  segmentFocus?: string;
  eventTypes?: string[];
  clienteleProfile?: string;
  capacityNotes?: string;
  serviceRadius?: string;
  values?: string[] | string;
  socialProof?: string[] | string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  company?: string;
  crawlRunId: string;
  ts: string;
}

export interface MessagePersona {
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
  capacity?: string;
  location?: string;
  serviceRadius?: string;
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number | null;
  revMinimumUSD?: number | null;
  bookingLink?: string | null;
  people?: Contact[];
  company?: string;
  bestHookIdeas: string[];
}
