import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc3, X, SkipForward, SkipBack } from 'lucide-react';
import { Track } from '../types';

interface AudioPlayerBarProps {
  currentTrack: { track: Track; releaseTitle: string; coverArtUrl: string } | null;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ currentTrack, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!currentTrack) return;
    setIsPlaying(true);
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTrack, isPlaying]);

  if (!currentTrack) return null;

  return (
    <div id="persistent-audio-player" className="fixed bottom-0 left-0 right-0 z-40 bg-[#141414]/95 backdrop-blur-md border-t border-[#282828] px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#1C1C1C] border border-[#282828] shrink-0">
            <img 
              src={currentTrack.coverArtUrl} 
              alt={currentTrack.track.title} 
              className={`w-full h-full object-cover ${isPlaying ? 'scale-105 transition-transform duration-1000' : ''}`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-[#F5A623] animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-[#F0F0F0] truncate font-display">{currentTrack.track.title}</p>
            <p className="text-xs text-[#9A9A9A] truncate font-mono">
              {currentTrack.releaseTitle} • <span className="text-[#F5A623] font-medium uppercase">{currentTrack.track.audioState}</span>
            </p>
          </div>
        </div>

        {/* Player Controls & Waveform Simulation */}
        <div className="flex-1 max-w-xl flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setProgress(0)}
              className="text-[#9A9A9A] hover:text-[#F0F0F0] transition p-1"
              title="Restart track"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-[#9B1B1B] hover:bg-[#C0392B] text-white flex items-center justify-center transition shadow-lg shadow-[#9B1B1B]/30"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button 
              onClick={() => setProgress((p) => Math.min(100, p + 15))}
              className="text-[#9A9A9A] hover:text-[#F0F0F0] transition p-1"
              title="Skip 15s"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#9A9A9A] w-9 text-right">
              {Math.floor((progress / 100) * 204 / 60)}:{String(Math.floor((progress / 100) * 204 % 60)).padStart(2, '0')}
            </span>
            <div 
              className="flex-1 h-2 bg-[#1C1C1C] rounded-full overflow-hidden cursor-pointer relative border border-[#282828]"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-[#9B1B1B] to-[#F5A623] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-[#9A9A9A] w-9">{currentTrack.track.duration}</span>
          </div>
        </div>

        {/* Audio Meta & Close */}
        <div className="flex items-center gap-3 min-w-[180px] justify-end">
          {currentTrack.track.bpm && (
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#1C1C1C] text-[#9A9A9A] border border-[#282828] rounded text-[11px] font-mono">
              {currentTrack.track.bpm} BPM
            </span>
          )}
          {currentTrack.track.key && (
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#1C1C1C] text-[#F5A623] border border-[#282828] rounded text-[11px] font-mono">
              {currentTrack.track.key}
            </span>
          )}
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="text-[#9A9A9A] hover:text-[#F0F0F0] transition p-1"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#9B1B1B]" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={onClose} 
            className="text-[#9A9A9A] hover:text-[#F0F0F0] hover:bg-[#1C1C1C] p-1.5 rounded transition"
            title="Dismiss Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
