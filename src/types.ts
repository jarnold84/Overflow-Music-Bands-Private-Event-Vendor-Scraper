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

export interface PageSignals {
  url: string;
  title?: string;
  emails?: string[];
  phoneCandidates?: string[];
  rfpUrl?: string | null;
  contactUrl?: string | null;
}

export interface Lead {
  domain: string;
  seedUrl: string;
  company?: string;
  email?: string;
  phones?: string[];
  contactPage?: string | null;
  rfpUrl?: string | null;
  vendorType?: string;
  vendorConfidence?: number;
  services?: string[];
  styleVibe?: string[];
  segmentFocus?: string[];
  eventTypes?: string[];
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  socials?: Record<string, string>;
  people?: any[];
  portfolio?: any;
  values?: string[];
  socialProof?: any;
  capacity?: any;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  address?: string;
  serviceRadius?: string;
  travelPolicy?: string;
  restrictions?: string[];
  formOnly?: boolean;
  rfpOnly?: boolean;
  evidence?: string[];
  crawlRunId: string;
  ts: string;
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  email?: string;
  phones?: string[];
  contactPage?: string | null;
  rfpUrl?: string | null;
  company?: string;
  vendorType?: string;
  vendorConfidence?: number;
  services?: string[];
  styleVibe?: string[];
  segmentFocus?: string[];
  eventTypes?: string[];
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  socials?: Record<string, string>;
  people?: any[];
  portfolio?: any;
  values?: string[];
  socialProof?: any;
  capacity?: any;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  address?: string;
  serviceRadius?: string;
  travelPolicy?: string;
  restrictions?: string[];
  formOnly?: boolean;
  rfpOnly?: boolean;
  evidence?: string[];
  score: number;
  stopReason?: string;
}
