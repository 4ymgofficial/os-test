import React, { useState } from 'react';
import { X, Disc, Calendar, Sparkles, Music2, Plus } from 'lucide-react';
import { Release, ReleaseType, ReleaseMilestone } from '../../types';

interface NewReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRelease: (newRelease: Release) => void;
}

export const NewReleaseModal: React.FC<NewReleaseModalProps> = ({
  isOpen,
  onClose,
  onCreateRelease
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ReleaseType>('Single');
  const [artist, setArtist] = useState('Kayo Velo');
  const [genre, setGenre] = useState('Electronic / Synthwave');
  const [releaseDate, setReleaseDate] = useState('2026-10-15');
  const [coverArtUrl, setCoverArtUrl] = useState('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80');
  const [leadTrackTitle, setLeadTrackTitle] = useState('');
  const [distributor, setDistributor] = useState('DistroKid');
  const [budget, setBudget] = useState('2500');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const generatedMilestones: ReleaseMilestone[] = [
      {
        id: `m-${Date.now()}-1`,
        title: 'Master Audio (24-bit 48kHz WAV)',
        daysBefore: -30,
        completed: false,
        category: 'audio',
        description: 'Upload high-resolution mastered audio and check True Peak limits (-1.0 dBTP).'
      },
      {
        id: `m-${Date.now()}-2`,
        title: '3000x3000px Cover Artwork Validation',
        daysBefore: -28,
        completed: false,
        category: 'visual',
        description: 'Verify 3000x3000px square format, RGB color space, and no vendor logos.'
      },
      {
        id: `m-${Date.now()}-3`,
        title: 'DSP Distribution Submission & UPC Locking',
        daysBefore: -21,
        completed: false,
        category: 'distribution',
        description: 'Submit to DSP distributor 3+ weeks before drop to guarantee release date matching.'
      },
      {
        id: `m-${Date.now()}-4`,
        title: 'Spotify for Artists Editorial Curator Pitch',
        daysBefore: -14,
        completed: false,
        category: 'marketing',
        description: 'Pitch priority focus track with subgenres, instruments, and mood tags.'
      },
      {
        id: `m-${Date.now()}-5`,
        title: '9:16 Canvas Video & Social Teaser Push',
        daysBefore: -7,
        completed: false,
        category: 'visual',
        description: 'Render seamless Spotify Canvas loop and publish short-form video hooks.'
      },
      {
        id: `m-${Date.now()}-6`,
        title: 'Launch Day Drop & Streaming Blast',
        daysBefore: 0,
        completed: false,
        category: 'marketing',
        description: 'Execute launch announcement, update smart pre-save to live streaming links.'
      }
    ];

    const newRelease: Release = {
      id: `rel-${Date.now()}`,
      title: title.trim(),
      type,
      artist: artist.trim(),
      genre: genre.trim(),
      releaseDate,
      status: 'draft',
      upc: `79357${Math.floor(1000000 + Math.random() * 9000000)}`,
      coverArtUrl: coverArtUrl.trim(),
      preSaveUrl: `https://ffm.to/${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      budget: Number(budget) || 0,
      distributor,
      tracks: [
        {
          id: `trk-${Date.now()}-1`,
          title: leadTrackTitle.trim() || title.trim(),
          trackNumber: 1,
          duration: '3:15',
          isrc: `US-KAY-26-${Math.floor(10000 + Math.random() * 90000)}`,
          audioState: 'final_mix',
          explicit: false
        }
      ],
      milestones: generatedMilestones
    };

    onCreateRelease(newRelease);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-xl bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#282828]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1B1B]/20 text-[#C0392B] flex items-center justify-center">
              <Disc className="w-4 h-4" />
            </div>
            <h2 className="font-display font-bold text-lg text-[#F0F0F0]">Create New Release Record</h2>
          </div>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1 rounded hover:bg-[#1C1C1C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[#9A9A9A] font-mono mb-1">Release Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. SOLAR ECLIPSE"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-sm text-[#F0F0F0] focus:outline-none focus:border-[#9B1B1B]"
              />
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Release Format</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ReleaseType)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              >
                <option value="Single">Single (1 Track)</option>
                <option value="EP">EP (2-6 Tracks)</option>
                <option value="Album">Album / LP (7+ Tracks)</option>
                <option value="Remix">Remix</option>
                <option value="Mixtape">Mixtape</option>
              </select>
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Target Drop Date</label>
              <input
                type="date"
                required
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Primary Artist / Stage Name</label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Genre / Style</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[#9A9A9A] font-mono mb-1">Cover Artwork Image URL (3000x3000px)</label>
              <input
                type="url"
                value={coverArtUrl}
                onChange={(e) => setCoverArtUrl(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Lead Track Name</label>
              <input
                type="text"
                placeholder="Optional track title"
                value={leadTrackTitle}
                onChange={(e) => setLeadTrackTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Campaign Budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#282828] flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#F5A623] shrink-0" />
            <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
              Upon creating this release, the <strong>Release Engine</strong> will automatically generate 6 deterministic timeline milestones (-30d master audio, -28d artwork, -21d DSP delivery, -14d Spotify pitch).
            </p>
          </div>

          <div className="pt-3 border-t border-[#282828] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1C1C1C] hover:bg-[#282828] text-[#9A9A9A] hover:text-[#F0F0F0] rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white font-semibold rounded-lg transition shadow-md"
            >
              Create Release & Generate Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
