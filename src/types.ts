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
  vendorType?: string;
  vendorConfidence?: number;
  email?: string;
  phones?: string[];
  contactPage?: string | null;
  rfpUrl?: string | null;
  services?: string[];
  styleVibe?: string[];
  city?: string; state?: string; country?: string; metro?: string;
  socials?: Record<string, string>;
  evidence?: string[];
  crawlRunId: string;
  ts: string;
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  bestEmail?: string;
  vendorType?: string;
  vendorConfidence?: number;
  score: number; // 0..1
  stopReason?: string;
}
