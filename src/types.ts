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

// Core page signals extracted from a single page visit
export interface PageSignals {
  url: string;
  title?: string;
  emails?: string[];
  phoneCandidates?: string[];
  contactUrl?: string | null;
  rfpUrl?: string | null;
}

// Context maintained across all pages for a domain
export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  email?: string;
  phones?: string[];
  vendorName?: string;
  vendorType?: string;
  vendorConfidence?: number;
  contactUrl?: string;
  rfpUrl?: string;
  company?: string;
  services?: string[];
  styleVibe?: string[];
  socials?: Record<string, string>;
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  address?: string;
  people?: any[];
  capacity?: any;
  aboutText?: string;
  aboutSummary?: string;
  clienteleProfile?: string[];
  segmentFocus?: string[];
  eventTypes?: string[];
  values?: string[];
  portfolio?: any;
  socialProof?: any;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  restrictions?: string[];
  bookingLink?: string;
  contactPage?: string;
  formOnly?: boolean;
  rfpOnly?: boolean;
  serviceRadius?: string;
  travelPolicy?: string;
  score: number;
  stopReason?: string;
  evidence?: string[]; // Titles, key phrases, links, etc.
}

// Final output structure pushed to Dataset
export interface Lead {
  domain: string;
  seedUrl: string;
  email?: string;
  phones?: string[];
  vendorName?: string;
  vendorType?: string;
  vendorConfidence?: number;
  contactUrl?: string;
  rfpUrl?: string;
  contactPage?: string;
  formOnly?: boolean;
  rfpOnly?: boolean;
  company?: string;
  services?: string[];
  styleVibe?: string[];
  socials?: Record<string, string>;
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  address?: string;
  people?: any[];
  capacity?: any;
  aboutText?: string;
  aboutSummary?: string;
  clienteleProfile?: string[];
  segmentFocus?: string[];
  eventTypes?: string[];
  values?: string[];
  portfolio?: any;
  socialProof?: any;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  restrictions?: string[];
  bookingLink?: string;
  serviceRadius?: string;
  travelPolicy?: string;
  evidence?: string[];
  crawlRunId: string;
  ts: string;
}

// Final persona object for downstream messaging
export interface MessagePersona {
  company?: string;
  vendorType?: string;
  segmentFocus?: string[];
  eventTypes?: string[];
  orgType?: string;
  teamSize?: string;
  styleVibe?: string[];
  clienteleProfile?: string[];
  services?: string[];
  capacitySummary?: string | null;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    metro?: string;
  };
  serviceRadius?: string | null;
  values?: string[];
  socialProof?: any;
  ops?: {
    fnbMinimumUSD?: number;
    revMinimumUSD?: number;
    rfpUrl?: string;
    bookingLink?: string;
  };
  contactSuggestion?: any;
  bestHookIdeas?: string[];
}
