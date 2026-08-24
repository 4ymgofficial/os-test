import React, { useState } from 'react';
import { 
  X, 
  Disc, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Play, 
  ExternalLink, 
  FileText, 
  Music, 
  Check, 
  Plus, 
  Layers, 
  Sparkles,
  Link,
  DollarSign
} from 'lucide-react';
import { Release, Track, ReleaseMilestone } from '../../types';
import { formatDate, getDaysUntil } from '../../lib/utils';

interface ReleaseModalProps {
  release: Release | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateRelease: (updated: Release) => void;
  onPlayTrack: (track: Track, releaseTitle: string, coverArtUrl: string) => void;
  onOpenStudioWithRelease?: (releaseId: string) => void;
}

export const ReleaseModal: React.FC<ReleaseModalProps> = ({
  release,
  isOpen,
  onClose,
  onUpdateRelease,
  onPlayTrack,
  onOpenStudioWithRelease
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tracks' | 'milestones' | 'distribution'>('overview');
  const [selectedTrackLyrics, setSelectedTrackLyrics] = useState<string | null>(null);

  if (!isOpen || !release) return null;

  const toggleMilestone = (mId: string) => {
    const updatedMilestones = release.milestones.map(m => 
      m.id === mId ? { ...m, completed: !m.completed } : m
    );
    onUpdateRelease({ ...release, milestones: updatedMilestones });
  };

  const handleStatusChange = (newStatus: Release['status']) => {
    onUpdateRelease({ ...release, status: newStatus });
  };

  const completedCount = release.milestones.filter(m => m.completed).length;
  const progressPercent = release.milestones.length > 0 ? Math.round((completedCount / release.milestones.length) * 100) : 0;
  const daysRemaining = getDaysUntil(release.releaseDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#282828] bg-[#0A0A0A]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#282828] shrink-0">
              <img src={release.coverArtUrl} alt={release.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-[#F0F0F0]">{release.title}</h2>
                <span className="px-2 py-0.5 bg-[#9B1B1B]/30 text-[#F5A623] text-xs font-mono rounded">
                  {release.type}
                </span>
              </div>
              <p className="text-xs text-[#9A9A9A] font-mono">
                {release.artist} • UPC: {release.upc || 'Unassigned'} • Drop Date: {formatDate(release.releaseDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={release.status}
              onChange={(e) => handleStatusChange(e.target.value as Release['status'])}
              className="bg-[#1C1C1C] border border-[#282828] text-xs font-mono text-[#F5A623] px-3 py-1.5 rounded-lg focus:outline-none"
            >
              <option value="draft">Status: Draft</option>
              <option value="preparing">Status: Preparing</option>
              <option value="ready">Status: Ready</option>
              <option value="scheduled">Status: Scheduled</option>
              <option value="released">Status: Released</option>
              <option value="sustaining">Status: Sustaining</option>
              <option value="archived">Status: Archived</option>
            </select>
            <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1 rounded hover:bg-[#1C1C1C]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#282828] px-6 bg-[#0A0A0A]/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'overview' ? 'border-[#9B1B1B] text-[#F0F0F0] font-semibold' : 'border-transparent text-[#9A9A9A] hover:text-[#F0F0F0]'
            }`}
          >
            Overview & Readiness ({progressPercent}%)
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'tracks' ? 'border-[#9B1B1B] text-[#F0F0F0] font-semibold' : 'border-transparent text-[#9A9A9A] hover:text-[#F0F0F0]'
            }`}
          >
            Tracklist & Audio Stems ({release.tracks.length})
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'milestones' ? 'border-[#9B1B1B] text-[#F0F0F0] font-semibold' : 'border-transparent text-[#9A9A9A] hover:text-[#F0F0F0]'
            }`}
          >
            Deterministic Checklist ({completedCount}/{release.milestones.length})
          </button>
          <button
            onClick={() => setActiveTab('distribution')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'distribution' ? 'border-[#9B1B1B] text-[#F0F0F0] font-semibold' : 'border-transparent text-[#9A9A9A] hover:text-[#F0F0F0]'
            }`}
          >
            Distribution & Pre-Save
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1C1C1C] border border-[#282828] relative group">
                  <img src={release.coverArtUrl} alt={release.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-4 text-center">
                    <span className="text-xs font-mono text-[#F0F0F0]">3000 x 3000 px • RGB Ready</span>
                  </div>
                </div>

                <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#282828] space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#9A9A9A]">Release Type:</span>
                    <span className="text-[#F0F0F0]">{release.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9A9A9A]">Genre:</span>
                    <span className="text-[#F0F0F0]">{release.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9A9A9A]">Distributor:</span>
                    <span className="text-[#F0F0F0]">{release.distributor || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9A9A9A]">Budget:</span>
                    <span className="text-[#F5A623]">${release.budget?.toLocaleString() || 0}</span>
                  </div>
                </div>

                {onOpenStudioWithRelease && (
                  <button
                    onClick={() => onOpenStudioWithRelease(release.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#9B1B1B]/20 hover:bg-[#9B1B1B] text-[#F5A623] hover:text-white border border-[#9B1B1B]/40 rounded-lg text-xs font-medium transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Order Studio Artwork / Motion</span>
                  </button>
                )}
              </div>

              <div className="md:col-span-2 space-y-5">
                {/* Readiness summary */}
                <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#282828]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-sm text-[#F0F0F0]">
                      Release Engine Milestone Progress
                    </h3>
                    <span className="text-xs font-mono text-[#F5A623] font-bold">
                      {progressPercent}% Complete
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#282828] mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#9B1B1B] to-[#F5A623] transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#9A9A9A] leading-relaxed">
                    {progressPercent === 100 
                      ? 'All release engine validations complete! Ready for live drop deployment.' 
                      : `Currently completing essential release assets and promotion prep. Target drop in ${daysRemaining} days.`}
                  </p>
                </div>

                {/* Notes & Strategy */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#9A9A9A] mb-1.5">Creative Strategy Notes</h4>
                  <div className="p-3 bg-[#0A0A0A] border border-[#282828] rounded-lg text-xs text-[#F0F0F0] leading-relaxed">
                    {release.notes || 'No strategic notes added yet.'}
                  </div>
                </div>

                {/* Next Milestone preview */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#9A9A9A] mb-1.5">Upcoming Milestones</h4>
                  <div className="space-y-2">
                    {release.milestones.slice(0, 3).map((m) => (
                      <div 
                        key={m.id}
                        onClick={() => toggleMilestone(m.id)}
                        className="flex items-start gap-3 p-2.5 bg-[#0A0A0A] hover:bg-[#1C1C1C] border border-[#282828] rounded-lg cursor-pointer transition text-xs"
                      >
                        <button className="mt-0.5 text-[#9A9A9A] hover:text-[#F5A623]">
                          {m.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#9A9A9A]" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${m.completed ? 'line-through text-[#9A9A9A]' : 'text-[#F0F0F0]'}`}>
                            {m.title}
                          </p>
                          <p className="text-[11px] text-[#9A9A9A] mt-0.5">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#9A9A9A] font-mono">
                  Master tracks with assigned ISRC codes and audio verification states.
                </p>
              </div>

              <div className="space-y-2">
                {release.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="p-3 bg-[#1C1C1C] border border-[#282828] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onPlayTrack(track, release.title, release.coverArtUrl)}
                        className="w-8 h-8 rounded-full bg-[#9B1B1B] hover:bg-[#C0392B] text-white flex items-center justify-center shrink-0 transition shadow-sm"
                        title="Play audio preview"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#F5A623]">#{track.trackNumber}</span>
                          <h4 className="font-semibold text-sm text-[#F0F0F0]">{track.title}</h4>
                          {track.explicit && (
                            <span className="px-1 py-0.2 bg-[#282828] text-[#9A9A9A] text-[10px] font-mono rounded">
                              EXPLICIT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#9A9A9A] font-mono mt-0.5">
                          ISRC: {track.isrc} • {track.duration} {track.bpm ? `• ${track.bpm} BPM` : ''} {track.key ? `• ${track.key}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <span className="px-2 py-0.5 bg-[#0A0A0A] border border-[#282828] text-[#F5A623] text-xs font-mono rounded">
                        State: {track.audioState.toUpperCase()}
                      </span>
                      {track.lyrics && (
                        <button
                          onClick={() => setSelectedTrackLyrics(selectedTrackLyrics === track.id ? null : track.id)}
                          className="px-2.5 py-1 bg-[#282828] hover:bg-[#383838] text-xs text-[#F0F0F0] rounded font-mono transition"
                        >
                          {selectedTrackLyrics === track.id ? 'Hide Lyrics' : 'View Lyrics'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedTrackLyrics && (
                <div className="p-4 bg-[#0A0A0A] border border-[#282828] rounded-xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-mono text-xs text-[#F5A623] uppercase">Track Lyrics & Vocal Stems</h5>
                    <button onClick={() => setSelectedTrackLyrics(null)} className="text-[#9A9A9A] hover:text-[#F0F0F0] text-xs">
                      Close
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-[#F0F0F0] whitespace-pre-wrap leading-relaxed">
                    {release.tracks.find(t => t.id === selectedTrackLyrics)?.lyrics}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <p className="text-xs text-[#9A9A9A] font-mono">
                Deterministic lifecycle milestones calculated from the scheduled release date ({formatDate(release.releaseDate)}).
              </p>

              <div className="space-y-2.5">
                {release.milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(m.id)}
                    className={`p-3.5 rounded-lg border flex items-start justify-between gap-3 cursor-pointer transition ${
                      m.completed 
                        ? 'bg-[#0A0A0A]/80 border-emerald-900/40 text-[#9A9A9A]' 
                        : 'bg-[#1C1C1C] border-[#282828] hover:border-[#3A3A3A] text-[#F0F0F0]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {m.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#9A9A9A]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`font-semibold text-sm ${m.completed ? 'line-through text-[#9A9A9A]' : 'text-[#F0F0F0]'}`}>
                            {m.title}
                          </h4>
                          <span className="px-1.5 py-0.5 bg-[#0A0A0A] text-[10px] font-mono uppercase text-[#F5A623] rounded">
                            {m.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#9A9A9A] mt-1 leading-relaxed">{m.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono text-[#F5A623] bg-[#0A0A0A] px-2 py-1 rounded border border-[#282828]">
                        {m.daysBefore < 0 ? `${Math.abs(m.daysBefore)}d before` : m.daysBefore === 0 ? 'Drop Day' : `${m.daysBefore}d after`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'distribution' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#282828] space-y-4">
                <h4 className="font-display font-semibold text-sm text-[#F0F0F0]">
                  Streaming DSP Links & Smart Pre-Save
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#9A9A9A] font-mono mb-1">Pre-Save Landing Page (Feature.fm / Toneden)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={release.preSaveUrl || 'https://ffm.to/preview-link'}
                        className="flex-1 bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] font-mono"
                      />
                      <a
                        href={release.preSaveUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white rounded-lg flex items-center gap-1 font-medium transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit</span>
                      </a>
                    </div>
                  </div>

                  {release.spotifyUrl && (
                    <div>
                      <label className="block text-[#9A9A9A] font-mono mb-1">Spotify Release URI</label>
                      <input
                        type="text"
                        readOnly
                        value={release.spotifyUrl}
                        className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
