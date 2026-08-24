import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Share2, 
  Check, 
  Music, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Play, 
  Instagram, 
  Youtube,
  Radio,
  Quote
} from 'lucide-react';
import { EPKProfile, Release, Track } from '../../types';

interface EPKViewProps {
  profile: EPKProfile;
  releases: Release[];
  onPlayTrack: (track: Track, releaseTitle: string, coverArtUrl: string) => void;
}

export const EPKView: React.FC<EPKViewProps> = ({
  profile,
  releases,
  onPlayTrack
}) => {
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(profile.pressPhotos[0]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://keedohub.com/epk/${profile.stageName.toLowerCase().replace(/\s+/g, '-')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* EPK Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#282828] p-5 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#9B1B1B]/30 text-[#F5A623] text-xs font-mono rounded">
              PUBLIC EPK GENERATOR
            </span>
            <span className="text-xs text-[#9A9A9A] font-mono">Verified Press Record</span>
          </div>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0] mt-1">
            {profile.stageName} — Official Electronic Press Kit
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#1C1C1C] hover:bg-[#282828] text-[#F0F0F0] text-xs font-semibold rounded-lg border border-[#282828] transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[#F5A623]" />}
            <span>{copied ? 'EPK Link Copied!' : 'Share Public Link'}</span>
          </button>

          <button
            onClick={() => alert('Exporting full Electronic Press Kit ZIP (Bio, 4K Photos, WAV Stems, Rider PDF)...')}
            className="flex items-center gap-2 px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs font-semibold rounded-lg shadow-md transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Media Kit (ZIP)</span>
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-[#0A0A0A] via-[#141414] to-[#1C1C1C] border border-[#282828] p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#282828] shadow-2xl bg-black">
              <img src={activePhoto} alt={profile.stageName} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#F5A623] mb-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
                <span>•</span>
                <span>{profile.genre}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F0F0F0] tracking-tight">
                {profile.stageName}
              </h2>
              <p className="text-sm sm:text-base text-[#9A9A9A] font-medium mt-2 leading-relaxed">
                "{profile.tagline}"
              </p>
            </div>

            {/* Metrics pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#0A0A0A]/80 border border-[#282828] rounded-lg">
                <p className="text-[11px] font-mono text-[#9A9A9A]">MONTHLY LISTENERS</p>
                <p className="text-lg font-bold font-mono text-[#F0F0F0] mt-0.5">
                  {profile.monthlyListeners.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-[#0A0A0A]/80 border border-[#282828] rounded-lg">
                <p className="text-[11px] font-mono text-[#9A9A9A]">CATALOG STREAMS</p>
                <p className="text-lg font-bold font-mono text-[#F5A623] mt-0.5">
                  3.2M+
                </p>
              </div>
              <div className="p-3 bg-[#0A0A0A]/80 border border-[#282828] rounded-lg col-span-2 sm:col-span-1">
                <p className="text-[11px] font-mono text-[#9A9A9A]">SYNC PLACEMENTS</p>
                <p className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                  4 Placements
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F0F0F0] leading-relaxed pt-2">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Discography & Audio Player Showcase */}
      <div className="bg-[#141414] border border-[#282828] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-[#9B1B1B]" />
            <h3 className="font-display font-bold text-lg text-[#F0F0F0]">Highlighted Releases & Stems</h3>
          </div>
          <span className="text-xs font-mono text-[#9A9A9A]">Click to listen</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {releases.map((release) => (
            <div
              key={release.id}
              className="p-4 bg-[#0A0A0A] border border-[#282828] rounded-lg flex items-center justify-between gap-4 hover:border-[#383838] transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#1C1C1C] border border-[#282828] shrink-0">
                  <img src={release.coverArtUrl} alt={release.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-[#F0F0F0] truncate font-display">{release.title}</h4>
                  <p className="text-xs text-[#9A9A9A] font-mono truncate">{release.type} • {release.genre}</p>
                  <p className="text-[11px] text-[#F5A623] font-mono mt-0.5">{release.tracks.length} track(s)</p>
                </div>
              </div>

              {release.tracks[0] && (
                <button
                  onClick={() => onPlayTrack(release.tracks[0], release.title, release.coverArtUrl)}
                  className="w-10 h-10 rounded-full bg-[#9B1B1B] hover:bg-[#C0392B] text-white flex items-center justify-center shrink-0 shadow transition"
                  title="Play priority track"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Press Quotes & High-Res Press Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Press Quotes */}
        <div className="bg-[#141414] border border-[#282828] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-[#F5A623]" />
            <h3 className="font-display font-bold text-base text-[#F0F0F0]">Critical Press & Acclaim</h3>
          </div>

          <div className="space-y-3">
            {profile.pressQuotes.map((q, idx) => (
              <div key={idx} className="p-3.5 bg-[#0A0A0A] border border-[#282828] rounded-lg">
                <p className="text-xs text-[#F0F0F0] italic leading-relaxed mb-2">
                  "{q.quote}"
                </p>
                <p className="text-[11px] font-mono text-[#F5A623]">
                  — {q.publication} <span className="text-[#9A9A9A]">({q.date})</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Press Photos Gallery */}
        <div className="bg-[#141414] border border-[#282828] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-[#F0F0F0]">Hi-Res Press Photos</h3>
            <span className="text-xs font-mono text-[#9A9A9A]">Select thumbnail</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {profile.pressPhotos.map((photo, i) => (
              <div
                key={i}
                onClick={() => setActivePhoto(photo)}
                className={`aspect-[3/4] rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                  activePhoto === photo ? 'border-[#9B1B1B]' : 'border-[#282828] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo} alt={`Press Photo ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#9A9A9A] font-mono text-center">
            Approved for print publications & digital media kits.
          </p>
        </div>
      </div>

      {/* Tech Rider & Contacts */}
      <div className="bg-[#141414] border border-[#282828] rounded-xl p-6">
        <h3 className="font-display font-bold text-base text-[#F0F0F0] mb-4">
          Live Performance Setup & Official Contacts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-[#0A0A0A] border border-[#282828] rounded-lg space-y-2">
            <p className="font-mono text-[11px] text-[#F5A623] uppercase">STAGE RIDER & INPUT LIST</p>
            <p className="text-[#F0F0F0] leading-relaxed font-mono text-[11px]">
              {profile.riderTechInfo}
            </p>
          </div>

          <div className="p-4 bg-[#0A0A0A] border border-[#282828] rounded-lg space-y-3">
            <p className="font-mono text-[11px] text-[#F5A623] uppercase">BOOKING & PRESS ROUTING</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#F0F0F0]">
                <Mail className="w-3.5 h-3.5 text-[#9A9A9A]" />
                <span>Booking: {profile.bookingContact.email} ({profile.bookingContact.name})</span>
              </div>
              <div className="flex items-center gap-2 text-[#F0F0F0]">
                <Mail className="w-3.5 h-3.5 text-[#9A9A9A]" />
                <span>Press: {profile.pressContact.email} ({profile.pressContact.name})</span>
              </div>
              <div className="flex items-center gap-2 text-[#F0F0F0]">
                <Phone className="w-3.5 h-3.5 text-[#9A9A9A]" />
                <span>Direct Line: {profile.bookingContact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
