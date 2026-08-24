import React, { useState } from 'react';
import { X, Sparkles, DollarSign, Calendar, FileText, Check } from 'lucide-react';
import { StudioRequest, StudioServiceType, StudioTier, Release } from '../../types';

interface NewStudioRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  releases: Release[];
  defaultReleaseId?: string;
  onCreateRequest: (req: StudioRequest) => void;
}

const tierPrices: Record<StudioTier, number> = {
  Standard: 350,
  Pro: 550,
  Signature: 950
};

export const NewStudioRequestModal: React.FC<NewStudioRequestModalProps> = ({
  isOpen,
  onClose,
  releases,
  defaultReleaseId,
  onCreateRequest
}) => {
  const [serviceType, setServiceType] = useState<StudioServiceType>('3D & Motion Visualizer');
  const [tier, setTier] = useState<StudioTier>('Pro');
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [referencesInput, setReferencesInput] = useState('Cyberpunk 2077 aesthetic, deep red & gold lighting, dark chrome');
  const [releaseId, setReleaseId] = useState(defaultReleaseId || releases[0]?.id || '');
  const [deadline, setDeadline] = useState('2026-09-08');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !brief.trim()) return;

    const newRequest: StudioRequest = {
      id: `std-${Date.now()}`,
      serviceType,
      tier,
      status: 'submitted',
      title: title.trim(),
      brief: brief.trim(),
      references: referencesInput.split(',').map(r => r.trim()).filter(Boolean),
      deadline,
      price: tierPrices[tier],
      revisionsUsed: 0,
      revisionsAllowed: tier === 'Signature' ? 5 : tier === 'Pro' ? 3 : 2,
      deliverables: [],
      comments: [
        {
          id: `c-${Date.now()}`,
          author: 'Keedohub Studio Dispatch',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          isStudioTeam: true,
          text: `Request received and assigned to the ${serviceType} specialist pod. Initial concepts will be uploaded within 48-72 hours.`,
          timestamp: 'Just now'
        }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      releaseId: releaseId || undefined
    };

    onCreateRequest(newRequest);
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
            <div className="w-8 h-8 rounded-lg bg-[#9B1B1B]/20 text-[#F5A623] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-display font-bold text-lg text-[#F0F0F0]">Request Studio Production</h2>
          </div>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1 rounded hover:bg-[#1C1C1C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Service Type *</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value as StudioServiceType)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
            >
              <option value="Artwork & Packaging">Artwork & Packaging (3000x3000px + Animated)</option>
              <option value="3D & Motion Visualizer">3D & Motion Visualizer (9:16 Canvas + 4K)</option>
              <option value="Brand Identity Kit">Brand Identity Kit & Vector System</option>
              <option value="Release Toolkit">Release Toolkit (Story Countdowns & Adverts)</option>
              <option value="EPK & Web Showcase">EPK & Web Showcase Portal</option>
              <option value="Lyric Video Production">Lyric Video Production (Kinetic Typography)</option>
              <option value="Merch & Print Suite">Merch & Print Suite</option>
            </select>
          </div>

          {/* Tier Selection */}
          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1.5">Select Production Tier</label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Standard', 'Pro', 'Signature'] as StudioTier[]).map((t) => (
                <div
                  key={t}
                  onClick={() => setTier(t)}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition ${
                    tier === t 
                      ? 'border-[#9B1B1B] bg-[#9B1B1B]/15 text-[#F0F0F0]' 
                      : 'border-[#282828] bg-[#0A0A0A] text-[#9A9A9A] hover:border-[#383838]'
                  }`}
                >
                  <p className="font-semibold text-xs text-[#F0F0F0]">{t}</p>
                  <p className="font-mono font-bold text-sm text-[#F5A623] mt-0.5">${tierPrices[t]}</p>
                  <p className="text-[10px] text-[#9A9A9A] mt-1">
                    {t === 'Standard' ? '2 Revisions' : t === 'Pro' ? '3 Revisions' : '5 Revisions + 4K'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Midnight Cyber 3D Vertical Canvas Loop"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-sm text-[#F0F0F0] focus:outline-none focus:border-[#9B1B1B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Link to Release</label>
              <select
                value={releaseId}
                onChange={(e) => setReleaseId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              >
                <option value="">None (Standalone Project)</option>
                {releases.map(r => (
                  <option key={r.id} value={r.id}>{r.title} ({r.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Target Delivery Deadline</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Creative Brief & Vision *</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the desired visual aesthetic, mood, typography style, color palette, or audio timestamp cues..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg p-3 text-[#F0F0F0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Visual References (Moodboard keywords, URLs)</label>
            <input
              type="text"
              value={referencesInput}
              onChange={(e) => setReferencesInput(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#282828] flex items-center justify-between">
            <span className="text-xs text-[#9A9A9A]">Total Studio Production Fee:</span>
            <span className="text-base font-bold font-mono text-[#F5A623]">${tierPrices[tier]}</span>
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
              Submit Creative Brief
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
