import React, { useState } from 'react';
import { 
  Disc, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Play, 
  ExternalLink, 
  Layers, 
  BarChart3, 
  AlertCircle, 
  FileText,
  ChevronRight,
  Music2
} from 'lucide-react';
import { Release, Track, ReleaseStatus } from '../../types';
import { formatDate, getDaysUntil } from '../../lib/utils';

interface ReleaseWorkspaceProps {
  releases: Release[];
  onSelectRelease: (release: Release) => void;
  onOpenCreateRelease: () => void;
  onPlayTrack: (track: Track, releaseTitle: string, coverArtUrl: string) => void;
  onToggleMilestone: (releaseId: string, milestoneId: string) => void;
}

const statusBadgeStyles: Record<ReleaseStatus, { label: string; bg: string; text: string }> = {
  draft: { label: 'Draft', bg: 'bg-[#282828]', text: 'text-[#9A9A9A]' },
  preparing: { label: 'Preparing', bg: 'bg-[#9B1B1B]/20 border border-[#9B1B1B]/40', text: 'text-[#F5A623]' },
  ready: { label: 'Ready', bg: 'bg-[#F5A623]/20 border border-[#F5A623]/40', text: 'text-[#F5A623]' },
  scheduled: { label: 'Scheduled', bg: 'bg-emerald-950/40 border border-emerald-500/40', text: 'text-emerald-400' },
  released: { label: 'Released', bg: 'bg-blue-950/40 border border-blue-500/40', text: 'text-blue-400' },
  sustaining: { label: 'Sustaining', bg: 'bg-purple-950/40 border border-purple-500/40', text: 'text-purple-400' },
  archived: { label: 'Archived', bg: 'bg-[#1C1C1C]', text: 'text-[#777]' }
};

export const ReleaseWorkspace: React.FC<ReleaseWorkspaceProps> = ({
  releases,
  onSelectRelease,
  onOpenCreateRelease,
  onPlayTrack,
  onToggleMilestone
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'released'>('all');

  const filteredReleases = releases.filter(r => {
    if (filter === 'active') return ['draft', 'preparing', 'ready', 'scheduled'].includes(r.status);
    if (filter === 'released') return ['released', 'sustaining'].includes(r.status);
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1B1B]/20 flex items-center justify-center text-[#C0392B]">
              <Disc className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Release Engine & Music Workspace
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            Deterministic milestones, master audio validation, ISRC management, and delivery preparation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Pills */}
          <div className="flex items-center bg-[#141414] border border-[#282828] p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded-md transition font-medium ${
                filter === 'all' ? 'bg-[#9B1B1B] text-white' : 'text-[#9A9A9A] hover:text-[#F0F0F0]'
              }`}
            >
              All Releases ({releases.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-xs rounded-md transition font-medium ${
                filter === 'active' ? 'bg-[#9B1B1B] text-white' : 'text-[#9A9A9A] hover:text-[#F0F0F0]'
              }`}
            >
              In Pipeline
            </button>
            <button
              onClick={() => setFilter('released')}
              className={`px-3 py-1 text-xs rounded-md transition font-medium ${
                filter === 'released' ? 'bg-[#9B1B1B] text-white' : 'text-[#9A9A9A] hover:text-[#F0F0F0]'
              }`}
            >
              Released / Catalog
            </button>
          </div>

          <button
            onClick={onOpenCreateRelease}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg shadow-[#9B1B1B]/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Release</span>
          </button>
        </div>
      </div>

      {/* Releases Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredReleases.map((release) => {
          const completedMilestones = release.milestones.filter(m => m.completed).length;
          const totalMilestones = release.milestones.length;
          const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
          const daysLeft = getDaysUntil(release.releaseDate);
          const badge = statusBadgeStyles[release.status];

          return (
            <div
              key={release.id}
              className="bg-[#141414] border border-[#282828] hover:border-[#383838] rounded-xl p-5 flex flex-col justify-between transition shadow-md group"
            >
              <div>
                {/* Header with artwork and basic meta */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#1C1C1C] border border-[#282828] shrink-0 shadow">
                    <img
                      src={release.coverArtUrl}
                      alt={release.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 rounded text-[10px] font-mono text-[#F5A623]">
                      {release.type}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs font-mono text-[#9A9A9A] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(release.releaseDate)}
                      </span>
                    </div>

                    <h2 
                      onClick={() => onSelectRelease(release)}
                      className="font-display font-bold text-lg text-[#F0F0F0] mt-1.5 truncate group-hover:text-[#F5A623] cursor-pointer transition"
                    >
                      {release.title}
                    </h2>
                    <p className="text-xs text-[#9A9A9A] truncate font-mono">
                      {release.artist} • <span className="text-[#F0F0F0]">{release.genre}</span>
                    </p>
                  </div>
                </div>

                {/* Milestone Progress Bar */}
                <div className="mb-4 bg-[#1C1C1C] p-3 rounded-lg border border-[#282828]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#9A9A9A] font-mono">
                      Release Readiness: <strong className="text-[#F0F0F0]">{progressPercent}%</strong>
                    </span>
                    <span className="text-[11px] font-mono text-[#F5A623]">
                      {completedMilestones}/{totalMilestones} Tasks
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#282828]">
                    <div
                      className="h-full bg-gradient-to-r from-[#9B1B1B] to-[#F5A623] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Tracks preview */}
                <div className="space-y-1.5 mb-4">
                  <p className="text-[11px] font-mono text-[#9A9A9A] uppercase tracking-wider">
                    Tracks ({release.tracks.length})
                  </p>
                  {release.tracks.slice(0, 3).map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between py-1.5 px-2.5 bg-[#0A0A0A]/50 rounded-md border border-[#282828]/50 text-xs hover:border-[#3A3A3A] transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={() => onPlayTrack(track, release.title, release.coverArtUrl)}
                          className="w-6 h-6 rounded-full bg-[#1C1C1C] hover:bg-[#9B1B1B] text-[#F0F0F0] flex items-center justify-center shrink-0 transition"
                          title="Preview Audio"
                        >
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </button>
                        <span className="font-mono text-[#9A9A9A] text-[11px]">#{track.trackNumber}</span>
                        <span className="font-medium text-[#F0F0F0] truncate">{track.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1C1C] text-[#F5A623]">
                          {track.audioState}
                        </span>
                        <span className="font-mono text-[#9A9A9A] text-[11px]">{track.duration}</span>
                      </div>
                    </div>
                  ))}
                  {release.tracks.length > 3 && (
                    <p className="text-[11px] text-[#9A9A9A] font-mono text-center pt-1">
                      + {release.tracks.length - 3} more tracks
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#282828] flex items-center justify-between gap-3">
                <div className="text-xs font-mono text-[#9A9A9A]">
                  {release.distributor && <span>Distributor: {release.distributor}</span>}
                </div>
                <button
                  onClick={() => onSelectRelease(release)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#9B1B1B] text-[#F0F0F0] hover:text-white text-xs font-medium rounded-lg border border-[#282828] transition"
                >
                  <span>Open Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
