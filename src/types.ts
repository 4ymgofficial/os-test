export type WorkspaceRole = 'artist' | 'brand' | 'creator' | 'business' | 'studio';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  role: WorkspaceRole;
  avatar: string;
  handle: string;
  genreOrNiche?: string;
  memberCount: number;
}

export type ReleaseType = 'Single' | 'EP' | 'Album' | 'Remix' | 'Mixtape';
export type ReleaseStatus = 'draft' | 'preparing' | 'ready' | 'scheduled' | 'released' | 'sustaining' | 'archived';

export interface Track {
  id: string;
  title: string;
  trackNumber: number;
  duration: string;
  isrc: string;
  audioState: 'demo' | 'rough_mix' | 'final_mix' | 'mastered';
  bpm?: number;
  key?: string;
  lyrics?: string;
  explicit: boolean;
  producers?: string[];
  collaborators?: string[];
  audioUrl?: string;
}

export interface ReleaseMilestone {
  id: string;
  title: string;
  daysBefore: number; // e.g. -30, -21, -14, -7, 0, 7
  completed: boolean;
  category: 'audio' | 'visual' | 'distribution' | 'marketing' | 'epk';
  description: string;
}

export interface Release {
  id: string;
  title: string;
  type: ReleaseType;
  artist: string;
  genre: string;
  releaseDate: string;
  status: ReleaseStatus;
  upc: string;
  coverArtUrl: string;
  tracks: Track[];
  milestones: ReleaseMilestone[];
  preSaveUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  budget?: number;
  notes?: string;
  distributor?: string;
}

export type AssetCategory = 'audio' | 'artwork' | 'video' | 'press_photo' | 'brand_kit' | 'legal_doc';

export interface Asset {
  id: string;
  title: string;
  category: AssetCategory;
  fileType: string;
  fileSize: string;
  url: string;
  thumbnailUrl?: string;
  tags: string[];
  releaseId?: string;
  createdAt: string;
  dimensionsOrDuration?: string;
  version: number;
}

export type ContentPlatform = 'tiktok' | 'reels' | 'youtube' | 'instagram' | 'x' | 'newsletter';
export type ContentStatus = 'idea' | 'scripting' | 'recording' | 'editing' | 'ready' | 'scheduled' | 'published';

export interface ContentItem {
  id: string;
  title: string;
  platform: ContentPlatform;
  format: 'Short Video' | 'Carousel' | 'Behind The Scenes' | 'Visualizer' | 'Story' | 'Text Post' | 'Audio Teaser';
  status: ContentStatus;
  scheduledDate?: string;
  releaseId?: string;
  copy: string;
  hook?: string;
  tags: string[];
  mediaPreview?: string;
  metrics?: { views: number; likes: number; shares: number };
}

export type StudioServiceType = 
  | 'Artwork & Packaging'
  | '3D & Motion Visualizer'
  | 'Brand Identity Kit'
  | 'Release Toolkit'
  | 'EPK & Web Showcase'
  | 'Lyric Video Production'
  | 'Merch & Print Suite';

export type StudioTier = 'Standard' | 'Pro' | 'Signature';
export type StudioStatus = 'draft' | 'submitted' | 'in_review' | 'in_production' | 'revisions' | 'revision_requested' | 'delivered' | 'completed';

export interface StudioRequest {
  id: string;
  serviceType: StudioServiceType;
  tier: StudioTier;
  status: StudioStatus;
  title: string;
  brief: string;
  references: string[];
  deadline: string;
  price: number;
  revisionsUsed: number;
  revisionsAllowed: number;
  deliverables: {
    id: string;
    title: string;
    url: string;
    fileType: string;
    date: string;
  }[];
  comments: {
    id: string;
    author: string;
    avatar: string;
    isStudioTeam: boolean;
    text: string;
    timestamp: string;
  }[];
  createdAt: string;
  releaseId?: string;
}

export interface MomentumSignal {
  id: string;
  type: 'missing_asset' | 'upcoming_release' | 'content_gap' | 'studio_review' | 'milestone_due';
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium';
  actionLabel: string;
  targetView: string;
  targetId?: string;
}

export interface EPKProfile {
  artistName: string;
  stageName: string;
  tagline: string;
  bio: string;
  genre: string;
  location: string;
  monthlyListeners: number;
  socials: {
    spotify?: string;
    appleMusic?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    x?: string;
  };
  pressQuotes: { quote: string; publication: string; date: string }[];
  highlightReleases: string[]; // release IDs
  pressPhotos: string[];
  riderTechInfo: string;
  bookingContact: { name: string; email: string; phone?: string };
  pressContact: { name: string; email: string };
}

export interface BrandCampaign {
  id: string;
  title: string;
  brandName: string;
  status: 'planning' | 'active' | 'review' | 'completed';
  budget: number;
  deliverables: string[];
  startDate: string;
  endDate: string;
  kpis: string;
}

export interface CreatorDeal {
  id: string;
  brand: string;
  platform: ContentPlatform;
  payout: number;
  status: 'pitch' | 'negotiation' | 'approved' | 'in_production' | 'published' | 'paid';
  deliverable: string;
  deadline: string;
}

export interface SplitSheetContributor {
  id?: string;
  name: string;
  role: string;
  sharePercent?: number;
  masterShare?: number;
  publishingShare?: number;
  pro?: string;
  proAffiliation?: string;
  email?: string;
  signed?: boolean;
}

export interface SplitSheet {
  id: string;
  songTitle: string;
  isrc?: string;
  contributors: SplitSheetContributor[];
  status: 'draft' | 'pending_signatures' | 'finalized' | 'signed';
  createdDate: string;
}

export interface BlueprintDocItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
}
