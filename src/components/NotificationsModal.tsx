import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Sparkles, X, ArrowRight } from 'lucide-react';
import { MomentumSignal } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  signals: MomentumSignal[];
  onActionClick: (targetView: string, targetId?: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  signals,
  onActionClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/50 backdrop-blur-xs" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-right-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#282828]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#F5A623]" />
            <h3 className="font-display font-semibold text-sm text-[#F0F0F0]">Notifications & Engine Signals</h3>
            <span className="px-1.5 py-0.5 bg-[#9B1B1B]/30 text-[#F5A623] text-[11px] font-mono rounded">
              {signals.length} active
            </span>
          </div>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-3 space-y-3">
          {signals.map((sig) => (
            <div 
              key={sig.id} 
              className={`p-3 rounded-lg border text-left transition ${
                sig.priority === 'urgent' 
                  ? 'bg-[#9B1B1B]/10 border-[#9B1B1B]/30' 
                  : sig.priority === 'high' 
                  ? 'bg-[#F5A623]/10 border-[#F5A623]/30' 
                  : 'bg-[#1C1C1C] border-[#282828]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  {sig.priority === 'urgent' ? (
                    <AlertCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                  ) : sig.priority === 'high' ? (
                    <Sparkles className="w-4 h-4 text-[#F5A623] shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#9A9A9A] shrink-0" />
                  )}
                  <h4 className="font-semibold text-xs text-[#F0F0F0]">{sig.title}</h4>
                </div>
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  sig.priority === 'urgent' 
                    ? 'bg-[#9B1B1B] text-white' 
                    : sig.priority === 'high'
                    ? 'bg-[#F5A623] text-black font-semibold'
                    : 'bg-[#282828] text-[#9A9A9A]'
                }`}>
                  {sig.priority}
                </span>
              </div>
              <p className="text-xs text-[#9A9A9A] mb-2.5 leading-relaxed">{sig.description}</p>
              <button
                onClick={() => {
                  onClose();
                  onActionClick(sig.targetView, sig.targetId);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#1C1C1C] hover:bg-[#282828] text-xs text-[#F0F0F0] font-medium rounded border border-[#282828] transition group"
              >
                <span>{sig.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          ))}

          <div className="p-3 bg-[#1C1C1C]/40 border border-[#282828]/60 rounded-lg text-xs text-[#9A9A9A]">
            <p className="font-mono text-[11px] text-[#F5A623] mb-1">⚡️ CREATIVE MOMENTUM RULE</p>
            <p>Signals are dynamically derived from release deadlines, missing required master stems, DSP curator pitch windows, and Studio review states.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
