import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Disc, 
  FileText, 
  FolderGit2, 
  TrendingUp, 
  Sparkles, 
  Megaphone, 
  Briefcase, 
  BookOpen, 
  Bell, 
  Search, 
  Plus, 
  Layers, 
  ChevronDown, 
  Play, 
  Music,
  ExternalLink,
  ShieldAlert,
  Zap
} from 'lucide-react';

import { 
  Workspace, 
  Release, 
  Asset, 
  ContentItem, 
  StudioRequest, 
  MomentumSignal, 
  EPKProfile, 
  SplitSheet, 
  BrandCampaign, 
  CreatorDeal,
  Track,
  ContentStatus
} from './types';

import { 
  mockWorkspaces, 
  mockReleases, 
  mockAssets, 
  mockContentItems, 
  mockStudioRequests, 
  mockMomentumSignals, 
  mockEPKProfile, 
  mockSplitSheets, 
  mockBrandCampaigns, 
  mockCreatorDeals 
} from './data/mockData';

import { MomentumDeck } from './components/MomentumDeck';
import { ReleaseWorkspace } from './components/ArtistOS/ReleaseWorkspace';
import { ReleaseModal } from './components/ArtistOS/ReleaseModal';
import { NewReleaseModal } from './components/ArtistOS/NewReleaseModal';
import { EPKView } from './components/ArtistOS/EPKView';
import { AssetManager } from './components/AssetLibrary/AssetManager';
import { UploadAssetModal } from './components/AssetLibrary/UploadAssetModal';
import { ContentPlanner } from './components/ContentEngine/ContentPlanner';
import { NewContentModal } from './components/ContentEngine/NewContentModal';
import { StudioHub } from './components/Studio/StudioHub';
import { NewStudioRequestModal } from './components/Studio/NewStudioRequestModal';
import { StudioRequestDetailModal } from './components/Studio/StudioRequestDetailModal';
import { BrandModule } from './components/BrandCreatorBusiness/BrandModule';
import { CreatorModule } from './components/BrandCreatorBusiness/CreatorModule';
import { BusinessModule } from './components/BrandCreatorBusiness/BusinessModule';
import { BlueprintDocsView } from './components/BlueprintDocsView';
import { CommandPalette } from './components/CommandPalette';
import { NotificationsModal } from './components/NotificationsModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';

type MainView = 
  | 'momentum' 
  | 'artist_releases' 
  | 'artist_epk' 
  | 'asset_library' 
  | 'content_engine' 
  | 'studio_hub' 
  | 'brand_os' 
  | 'creator_os' 
  | 'business_os' 
  | 'blueprint_docs';

export function App() {
  // Core Domain State
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(mockWorkspaces[0]);
  const [currentView, setCurrentView] = useState<MainView>('momentum');

  const [releases, setReleases] = useState<Release[]>(mockReleases);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [contentItems, setContentItems] = useState<ContentItem[]>(mockContentItems);
  const [studioRequests, setStudioRequests] = useState<StudioRequest[]>(mockStudioRequests);
  const [signals, setSignals] = useState<MomentumSignal[]>(mockMomentumSignals);
  const [epkProfile, setEpkProfile] = useState<EPKProfile>(mockEPKProfile);
  const [splitSheets, setSplitSheets] = useState<SplitSheet[]>(mockSplitSheets);
  const [brandCampaigns, setBrandCampaigns] = useState<BrandCampaign[]>(mockBrandCampaigns);
  const [creatorDeals, setCreatorDeals] = useState<CreatorDeal[]>(mockCreatorDeals);

  // Modal States
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [isNewReleaseModalOpen, setIsNewReleaseModalOpen] = useState(false);
  const [isUploadAssetModalOpen, setIsUploadAssetModalOpen] = useState(false);
  const [isNewContentModalOpen, setIsNewContentModalOpen] = useState(false);
  const [isNewStudioRequestModalOpen, setIsNewStudioRequestModalOpen] = useState(false);
  const [selectedStudioRequest, setSelectedStudioRequest] = useState<StudioRequest | null>(null);

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<{
    track: Track;
    releaseTitle: string;
    coverArtUrl: string;
  } | null>({
    track: mockReleases[0].tracks[0],
    releaseTitle: mockReleases[0].title,
    coverArtUrl: mockReleases[0].coverArtUrl
  });
  const [isPlaying, setIsPlaying] = useState(false);

  // Global hotkeys for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Audio Play Trigger
  const handlePlayTrack = (track: Track, releaseTitle: string, coverArtUrl: string) => {
    setCurrentTrack({ track, releaseTitle, coverArtUrl });
    setIsPlaying(true);
  };

  // Signal Resolution
  const handleResolveSignal = (signalId: string) => {
    setSignals(prev => prev.filter(s => s.id !== signalId));
  };

  // Release Handlers
  const handleCreateRelease = (newRelease: Release) => {
    setReleases(prev => [newRelease, ...prev]);
    setSelectedRelease(newRelease);
  };

  const handleUpdateRelease = (updated: Release) => {
    setReleases(prev => prev.map(r => r.id === updated.id ? updated : r));
    setSelectedRelease(updated);
  };

  const handleToggleMilestone = (releaseId: string, milestoneId: string) => {
    setReleases(prev => prev.map(rel => {
      if (rel.id !== releaseId) return rel;
      return {
        ...rel,
        milestones: rel.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
      };
    }));
  };

  const handleNavigate = (viewStr: string, targetId?: string) => {
    if (viewStr === 'release' || viewStr === 'releases') {
      setCurrentView('artist_releases');
      if (targetId) {
        const found = releases.find(r => r.id === targetId);
        if (found) setSelectedRelease(found);
      }
    } else if (viewStr === 'epk') {
      setCurrentView('artist_epk');
    } else if (viewStr === 'assets' || viewStr === 'asset_library') {
      setCurrentView('asset_library');
    } else if (viewStr === 'content' || viewStr === 'content_engine') {
      setCurrentView('content_engine');
    } else if (viewStr === 'studio' || viewStr === 'studio_hub') {
      setCurrentView('studio_hub');
      if (targetId) {
        const foundReq = studioRequests.find(sr => sr.id === targetId);
        if (foundReq) setSelectedStudioRequest(foundReq);
      }
    } else if (viewStr === 'brand' || viewStr === 'brand_os') {
      setCurrentView('brand_os');
    } else if (viewStr === 'creator' || viewStr === 'creator_os') {
      setCurrentView('creator_os');
    } else if (viewStr === 'business' || viewStr === 'business_os') {
      setCurrentView('business_os');
    } else if (viewStr === 'blueprint' || viewStr === 'blueprint_docs') {
      setCurrentView('blueprint_docs');
    } else if (viewStr === 'momentum') {
      setCurrentView('momentum');
    }
  };

  // Asset Handlers
  const handleUploadAsset = (newAsset: Asset) => {
    setAssets(prev => [newAsset, ...prev]);
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(prev => prev.filter(a => a.id !== assetId));
  };

  // Content Handlers
  const handlePlanContent = (newContent: ContentItem) => {
    setContentItems(prev => [newContent, ...prev]);
  };

  const handleUpdateContentStatus = (id: string, newStatus: ContentStatus) => {
    setContentItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  // Studio Request Handlers
  const handleCreateStudioRequest = (req: StudioRequest) => {
    setStudioRequests(prev => [req, ...prev]);
  };

  const handleAddStudioComment = (requestId: string, text: string) => {
    setStudioRequests(prev => prev.map(req => {
      if (req.id !== requestId) return req;
      return {
        ...req,
        comments: [
          ...req.comments,
          {
            id: `c-${Date.now()}`,
            author: activeWorkspace.name,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            isStudioTeam: false,
            text,
            timestamp: 'Just now'
          }
        ]
      };
    }));
    if (selectedStudioRequest?.id === requestId) {
      setSelectedStudioRequest(prev => prev ? {
        ...prev,
        comments: [
          ...prev.comments,
          {
            id: `c-${Date.now()}`,
            author: activeWorkspace.name,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            isStudioTeam: false,
            text,
            timestamp: 'Just now'
          }
        ]
      } : null);
    }
  };

  const handleRequestRevision = (requestId: string, feedback: string) => {
    setStudioRequests(prev => prev.map(req => {
      if (req.id !== requestId) return req;
      return {
        ...req,
        status: 'revision_requested',
        revisionsUsed: req.revisionsUsed + 1,
        comments: [
          ...req.comments,
          {
            id: `c-${Date.now()}`,
            author: activeWorkspace.name,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            isStudioTeam: false,
            text: `[Revision Request #${req.revisionsUsed + 1}]: ${feedback}`,
            timestamp: 'Just now'
          }
        ]
      };
    }));
    if (selectedStudioRequest?.id === requestId) {
      setSelectedStudioRequest(prev => prev ? {
        ...prev,
        status: 'revision_requested',
        revisionsUsed: prev.revisionsUsed + 1
      } : null);
    }
  };

  const handleApproveAndSyncStudioDeliverable = (req: StudioRequest) => {
    // 1. Mark request as completed
    setStudioRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'completed' } : r));
    
    // 2. Automatically transfer deliverables into Asset Library
    const createdAssets: Asset[] = req.deliverables.map((deliv, idx) => ({
      id: `ast-std-${Date.now()}-${idx}`,
      title: `${req.title} — ${deliv.title}`,
      category: req.serviceType.includes('Artwork') ? 'artwork' : req.serviceType.includes('Motion') ? 'video' : 'brand_kit',
      fileType: deliv.fileType,
      fileSize: '45.0 MB',
      url: deliv.url,
      releaseId: req.releaseId,
      tags: ['Keedohub Studio', 'Approved Deliverable', req.tier],
      createdAt: new Date().toISOString().split('T')[0],
      version: 1
    }));

    setAssets(prev => [...createdAssets, ...prev]);

    if (selectedStudioRequest?.id === req.id) {
      setSelectedStudioRequest(prev => prev ? { ...prev, status: 'completed' } : null);
    }

    alert(`Deliverables approved! ${createdAssets.length} asset(s) synced to your Asset Vault.`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] flex flex-col font-sans selection:bg-[#9B1B1B] selection:text-white pb-28">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#282828] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Workspace Switcher */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => setCurrentView('momentum')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#9B1B1B] to-[#5C1010] flex items-center justify-center shadow-md border border-[#9B1B1B]/40 group-hover:border-[#F5A623] transition">
                <span className="font-display font-black text-lg text-white tracking-wider">K</span>
              </div>
              <div>
                <span className="font-display font-extrabold text-base text-[#F0F0F0] tracking-tight group-hover:text-[#F5A623] transition">
                  KEEDOHUB
                </span>
                <span className="block text-[10px] font-mono text-[#9A9A9A] -mt-1 tracking-widest uppercase">
                  CREATIVE OS
                </span>
              </div>
            </div>

            {/* Workspace Select */}
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[#282828]">
              <select
                value={activeWorkspace.id}
                onChange={(e) => {
                  const ws = workspaces.find(w => w.id === e.target.value);
                  if (ws) setActiveWorkspace(ws);
                }}
                className="bg-[#141414] hover:bg-[#1C1C1C] text-xs font-mono text-[#F0F0F0] border border-[#282828] rounded-lg px-2.5 py-1.5 focus:outline-none transition cursor-pointer"
              >
                {workspaces.map(ws => (
                  <option key={ws.id} value={ws.id}>
                    {ws.name} ({ws.role.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center Search / Command Palette Trigger */}
          <div className="flex-1 max-w-md hidden sm:block">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between bg-[#141414] hover:bg-[#1C1C1C] border border-[#282828] rounded-lg px-3.5 py-1.5 text-xs text-[#9A9A9A] transition"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>Search releases, assets, studio services...</span>
              </span>
              <kbd className="px-1.5 py-0.5 bg-[#0A0A0A] border border-[#282828] rounded text-[10px] font-mono text-[#777]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons & Notifications */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 bg-[#141414] hover:bg-[#1C1C1C] text-[#9A9A9A] hover:text-[#F0F0F0] border border-[#282828] rounded-lg transition"
              title="Momentum Signals & Alerts"
            >
              <Bell className="w-4 h-4" />
              {signals.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9B1B1B] text-white text-[10px] font-mono flex items-center justify-center font-bold">
                  {signals.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsNewReleaseModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs font-semibold rounded-lg shadow transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Release</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Navigation Navigation Bar */}
      <nav className="bg-[#101010] border-b border-[#282828] px-4 sm:px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1">
          {[
            { id: 'momentum', label: 'Momentum Engine', icon: Compass },
            { id: 'artist_releases', label: 'Release Engine', icon: Disc },
            { id: 'artist_epk', label: 'Public EPK', icon: FileText },
            { id: 'asset_library', label: 'Asset Vault', icon: FolderGit2 },
            { id: 'content_engine', label: 'Content Matrix', icon: TrendingUp },
            { id: 'studio_hub', label: 'Keedohub Studio', icon: Sparkles },
            { id: 'brand_os', label: 'Brand OS', icon: Megaphone },
            { id: 'creator_os', label: 'Creator OS', icon: Zap },
            { id: 'business_os', label: 'Split Sheets', icon: Briefcase },
            { id: 'blueprint_docs', label: 'Blueprint Specs', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as MainView)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-[#1C1C1C] text-[#F5A623] border border-[#333] shadow-xs'
                    : 'text-[#9A9A9A] hover:text-[#F0F0F0] hover:bg-[#141414]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#9B1B1B]' : 'text-[#777]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'momentum' && (
          <MomentumDeck
            signals={signals}
            releases={releases}
            onActionClick={handleNavigate}
          />
        )}

        {currentView === 'artist_releases' && (
          <ReleaseWorkspace
            releases={releases}
            onSelectRelease={(rel) => setSelectedRelease(rel)}
            onOpenCreateRelease={() => setIsNewReleaseModalOpen(true)}
            onPlayTrack={handlePlayTrack}
            onToggleMilestone={handleToggleMilestone}
          />
        )}

        {currentView === 'artist_epk' && (
          <EPKView
            profile={epkProfile}
            releases={releases}
            onPlayTrack={handlePlayTrack}
          />
        )}

        {currentView === 'asset_library' && (
          <AssetManager
            assets={assets}
            releases={releases}
            onUploadAsset={handleUploadAsset}
            onDeleteAsset={handleDeleteAsset}
            onOpenUploadModal={() => setIsUploadAssetModalOpen(true)}
          />
        )}

        {currentView === 'content_engine' && (
          <ContentPlanner
            contentItems={contentItems}
            releases={releases}
            onOpenNewContentModal={() => setIsNewContentModalOpen(true)}
            onUpdateContentStatus={handleUpdateContentStatus}
          />
        )}

        {currentView === 'studio_hub' && (
          <StudioHub
            studioRequests={studioRequests}
            releases={releases}
            onOpenNewRequest={() => setIsNewStudioRequestModalOpen(true)}
            onSelectRequest={(req) => setSelectedStudioRequest(req)}
          />
        )}

        {currentView === 'brand_os' && (
          <BrandModule
            campaigns={brandCampaigns}
            onAddCampaign={(camp) => setBrandCampaigns(prev => [camp, ...prev])}
          />
        )}

        {currentView === 'creator_os' && (
          <CreatorModule
            deals={creatorDeals}
            onAddDeal={(deal) => setCreatorDeals(prev => [deal, ...prev])}
          />
        )}

        {currentView === 'business_os' && (
          <BusinessModule
            splitSheets={splitSheets}
            releases={releases}
            onAddSplitSheet={(sheet) => setSplitSheets(prev => [sheet, ...prev])}
          />
        )}

        {currentView === 'blueprint_docs' && (
          <BlueprintDocsView />
        )}
      </main>

      {/* Persistent Audio Player Bar */}
      {currentTrack && (
        <AudioPlayerBar
          currentTrack={currentTrack}
          onClose={() => setCurrentTrack(null)}
        />
      )}

      {/* Global Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        releases={releases}
        assets={assets}
        studioRequests={studioRequests}
        onNavigate={handleNavigate}
        onOpenCreateRelease={() => setIsNewReleaseModalOpen(true)}
        onOpenUploadAsset={() => setIsUploadAssetModalOpen(true)}
        onOpenNewStudioRequest={() => setIsNewStudioRequestModalOpen(true)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        signals={signals}
        onActionClick={handleNavigate}
      />

      <ReleaseModal
        release={selectedRelease}
        isOpen={!!selectedRelease}
        onClose={() => setSelectedRelease(null)}
        onUpdateRelease={handleUpdateRelease}
        onPlayTrack={handlePlayTrack}
        onOpenStudioWithRelease={(relId) => {
          setSelectedRelease(null);
          setCurrentView('studio_hub');
          setIsNewStudioRequestModalOpen(true);
        }}
      />

      <NewReleaseModal
        isOpen={isNewReleaseModalOpen}
        onClose={() => setIsNewReleaseModalOpen(false)}
        onCreateRelease={handleCreateRelease}
      />

      <UploadAssetModal
        isOpen={isUploadAssetModalOpen}
        onClose={() => setIsUploadAssetModalOpen(false)}
        releases={releases}
        onUpload={handleUploadAsset}
      />

      <NewContentModal
        isOpen={isNewContentModalOpen}
        onClose={() => setIsNewContentModalOpen(false)}
        releases={releases}
        onPlanContent={handlePlanContent}
      />

      <NewStudioRequestModal
        isOpen={isNewStudioRequestModalOpen}
        onClose={() => setIsNewStudioRequestModalOpen(false)}
        releases={releases}
        defaultReleaseId={selectedRelease?.id}
        onCreateRequest={handleCreateStudioRequest}
      />

      <StudioRequestDetailModal
        request={selectedStudioRequest}
        isOpen={!!selectedStudioRequest}
        onClose={() => setSelectedStudioRequest(null)}
        onAddComment={handleAddStudioComment}
        onApproveAndSyncToAssetLibrary={handleApproveAndSyncStudioDeliverable}
        onRequestRevision={handleRequestRevision}
      />
    </div>
  );
}
export default App;
