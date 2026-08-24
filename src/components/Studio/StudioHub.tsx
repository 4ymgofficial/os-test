import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Palette, 
  Video, 
  FileCode, 
  ShieldCheck, 
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { StudioRequest, StudioServiceType, Release, Asset } from '../../types';
import { formatDate } from '../../lib/utils';

interface StudioHubProps {
  studioRequests: StudioRequest[];
  releases: Release[];
  onOpenNewRequest: () => void;
  onSelectRequest: (req: StudioRequest) => void;
}

const serviceCatalog: {
  type: StudioServiceType;
  description: string;
  startingPrice: number;
  deliveryDays: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}[] = [
  {
    type: 'Artwork & Packaging',
    description: '3000x3000px DSP-ready cover artwork, Apple Music animated motion art, and deluxe physical vinyl/cassette layout.',
    startingPrice: 350,
    deliveryDays: '3-5 days',
    icon: Palette,
    tags: ['DSP Validated', '3000x3000px', 'Animated Cover']
  },
  {
    type: '3D & Motion Visualizer',
    description: 'Seamless 9:16 vertical looping Spotify Canvases, TikTok visualizers, and full-length 4K YouTube sound reactive visuals.',
    startingPrice: 450,
    deliveryDays: '4-7 days',
    icon: Video,
    tags: ['9:16 Canvas', '4K Master', 'Sound Reactive']
  },
  {
    type: 'Brand Identity Kit',
    description: 'Complete visual identity system: Custom logotype, typography guidelines, vector mark suite, color tokens, and press style guide.',
    startingPrice: 650,
    deliveryDays: '7-10 days',
    icon: Sparkles,
    tags: ['Vector Kit', 'Brand Tokens', 'Press Identity']
  },
  {
    type: 'Release Toolkit',
    description: 'Turnkey rollout package: Teaser templates, tracklist reveal cards, countdown story animations, and billboard mockups.',
    startingPrice: 500,
    deliveryDays: '4-6 days',
    icon: Layers,
    tags: ['Story Countdowns', 'Tracklist Reveal', 'Billboards']
  },
  {
    type: 'EPK & Web Showcase',
    description: 'Custom verified electronic press kit portal with streaming embeds, booking calendar routing, and responsive press vault.',
    startingPrice: 600,
    deliveryDays: '5-8 days',
    icon: FileCode,
    tags: ['Interactive EPK', 'Custom Domain', 'Press Hub']
  },
  {
    type: 'Lyric Video Production',
    description: 'Kinetic typography and stylistic aesthetic motion lyric video timed perfectly to your master audio syllables.',
    startingPrice: 400,
    deliveryDays: '4-7 days',
    icon: Video,
    tags: ['Kinetic Type', '1080p/4K', 'Syllable Synced']
  }
];

export const StudioHub: React.FC<StudioHubProps> = ({
  studioRequests,
  releases,
  onOpenNewRequest,
  onSelectRequest
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'active_projects'>('services');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1B1B]/20 flex items-center justify-center text-[#F5A623]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Keedohub Studio — Human Creative Production
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            Professional 3D motion designers, art directors, and brand architects integrated directly into your workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-[#141414] border border-[#282828] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                activeTab === 'services' ? 'bg-[#9B1B1B] text-white' : 'text-[#9A9A9A] hover:text-[#F0F0F0]'
              }`}
            >
              Services Catalog
            </button>
            <button
              onClick={() => setActiveTab('active_projects')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'active_projects' ? 'bg-[#9B1B1B] text-white' : 'text-[#9A9A9A] hover:text-[#F0F0F0]'
              }`}
            >
              <span>Active Orders</span>
              <span className="px-1.5 py-0.2 bg-[#1C1C1C] text-[10px] font-mono text-[#F5A623] rounded">
                {studioRequests.length}
              </span>
            </button>
          </div>

          <button
            onClick={onOpenNewRequest}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Request Creative Service</span>
          </button>
        </div>
      </div>

      {/* Services Catalog Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-[#141414] to-[#1C1C1C] border border-[#282828] rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#F5A623] shrink-0" />
              <div className="text-xs">
                <h4 className="font-semibold text-[#F0F0F0]">The Keedohub Studio Guarantee</h4>
                <p className="text-[#9A9A9A] mt-0.5">
                  All deliverables automatically sync to your workspace Asset Library. Includes 3 revision loops and full commercial rights.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenNewRequest}
              className="px-3.5 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs font-semibold rounded-lg whitespace-nowrap transition"
            >
              Start Order
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceCatalog.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.type}
                  className="bg-[#141414] border border-[#282828] hover:border-[#383838] rounded-xl p-5 flex flex-col justify-between transition group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#282828] flex items-center justify-center text-[#9B1B1B] group-hover:text-[#F5A623] transition">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-[#9A9A9A]">From</span>
                        <p className="font-mono font-bold text-base text-[#F5A623]">${service.startingPrice}</p>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-base text-[#F0F0F0] mb-1.5 group-hover:text-[#F5A623] transition">
                      {service.type}
                    </h3>
                    <p className="text-xs text-[#9A9A9A] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.tags.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-[#0A0A0A] text-[#9A9A9A] rounded border border-[#282828]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#282828] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#9A9A9A] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {service.deliveryDays}
                    </span>
                    <button
                      onClick={onOpenNewRequest}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#F5A623] hover:text-white transition"
                    >
                      <span>Request Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Orders Tab */}
      {activeTab === 'active_projects' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {studioRequests.map((req) => {
              const linkedRelease = releases.find(r => r.id === req.releaseId);

              return (
                <div
                  key={req.id}
                  onClick={() => onSelectRequest(req)}
                  className="bg-[#141414] border border-[#282828] hover:border-[#383838] rounded-xl p-5 flex flex-col justify-between cursor-pointer transition group shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#9B1B1B]/20 text-[#F5A623] rounded border border-[#9B1B1B]/40">
                        {req.serviceType}
                      </span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        req.status === 'completed' 
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/40' 
                          : req.status === 'in_production'
                          ? 'bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40'
                          : 'bg-[#1C1C1C] text-[#9A9A9A]'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-[#F0F0F0] mb-1 group-hover:text-[#F5A623] transition">
                      {req.title}
                    </h3>
                    <p className="text-xs text-[#9A9A9A] line-clamp-2 leading-relaxed mb-3">
                      {req.brief}
                    </p>

                    {linkedRelease && (
                      <p className="text-[11px] font-mono text-[#9B1B1B] bg-[#9B1B1B]/10 px-2 py-1 rounded border border-[#9B1B1B]/30 mb-3 truncate">
                        Linked Release: {linkedRelease.title}
                      </p>
                    )}

                    <div className="p-2.5 bg-[#0A0A0A] rounded-lg border border-[#282828] text-xs font-mono space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#9A9A9A]">Tier & Budget:</span>
                        <span className="text-[#F0F0F0] font-bold">{req.tier} • ${req.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9A9A9A]">Revisions Used:</span>
                        <span className="text-[#F5A623]">{req.revisionsUsed} of {req.revisionsAllowed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9A9A9A]">Target Delivery:</span>
                        <span className="text-[#F0F0F0]">{formatDate(req.deadline)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#282828] mt-4 flex items-center justify-between text-xs">
                    <span className="text-[#9A9A9A] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {req.comments.length} comments
                    </span>
                    <button className="flex items-center gap-1 font-semibold text-[#F5A623] group-hover:text-white transition">
                      <span>Inspect Deliverables</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
