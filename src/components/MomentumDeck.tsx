import React from 'react';
import { Sparkles, ArrowRight, Zap, CheckCircle, Clock } from 'lucide-react';
import { MomentumSignal, Release } from '../types';
import { getDaysUntil } from '../lib/utils';

interface MomentumDeckProps {
  signals: MomentumSignal[];
  releases: Release[];
  onActionClick: (targetView: string, targetId?: string) => void;
}

export const MomentumDeck: React.FC<MomentumDeckProps> = ({
  signals,
  releases,
  onActionClick
}) => {
  const upcomingRelease = releases.find(r => r.status === 'preparing' || r.status === 'scheduled');
  const daysUntilDrop = upcomingRelease ? getDaysUntil(upcomingRelease.releaseDate) : null;

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#1C1C1C] border border-[#282828] rounded-xl p-5 shadow-lg relative overflow-hidden">
      {/* Visual Accent glow line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9B1B1B] via-[#C0392B] to-[#F5A623]" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#9B1B1B]/20 border border-[#9B1B1B]/40 flex items-center justify-center text-[#F5A623]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-base sm:text-lg text-[#F0F0F0]">
                Creative Momentum Engine
              </h2>
              <span className="px-2 py-0.5 bg-[#9B1B1B]/30 border border-[#9B1B1B]/50 text-[#F5A623] text-[11px] font-mono rounded">
                LIVE DETERMINISTIC SIGNALS
              </span>
            </div>
            <p className="text-xs text-[#9A9A9A] mt-0.5">
              Explainable next actions to keep your release and campaign pipeline moving forward.
            </p>
          </div>
        </div>

        {upcomingRelease && daysUntilDrop !== null && (
          <div className="flex items-center gap-3 bg-[#0A0A0A] border border-[#282828] px-3.5 py-2 rounded-lg shrink-0">
            <Clock className="w-4 h-4 text-[#F5A623]" />
            <div className="text-left">
              <p className="text-[11px] font-mono text-[#9A9A9A]">NEXT RELEASE DROP</p>
              <p className="text-xs font-semibold text-[#F0F0F0]">
                <span className="text-[#F5A623] font-bold">{upcomingRelease.title}</span> in{' '}
                <span className="text-[#C0392B] font-mono font-bold">{daysUntilDrop} days</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {signals.map((sig) => (
          <div
            key={sig.id}
            className="flex flex-col justify-between p-3.5 rounded-lg bg-[#0A0A0A]/60 border border-[#282828] hover:border-[#3A3A3A] transition group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  sig.priority === 'urgent' 
                    ? 'bg-[#9B1B1B] text-white font-bold' 
                    : sig.priority === 'high'
                    ? 'bg-[#F5A623] text-black font-semibold'
                    : 'bg-[#282828] text-[#9A9A9A]'
                }`}>
                  {sig.priority} PRIORITY
                </span>
                <span className="text-[11px] font-mono text-[#9A9A9A]">{sig.type.replace('_', ' ')}</span>
              </div>
              <h3 className="font-semibold text-sm text-[#F0F0F0] mb-1 group-hover:text-[#F5A623] transition">
                {sig.title}
              </h3>
              <p className="text-xs text-[#9A9A9A] leading-relaxed mb-3">
                {sig.description}
              </p>
            </div>

            <button
              onClick={() => onActionClick(sig.targetView, sig.targetId)}
              className="w-full flex items-center justify-between py-2 px-3 bg-[#1C1C1C] hover:bg-[#9B1B1B] hover:text-white text-[#F0F0F0] text-xs font-medium rounded-md border border-[#282828] transition duration-150"
            >
              <span>{sig.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:text-white transition" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
