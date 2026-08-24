import React, { useState } from 'react';
import { Video, DollarSign, Plus, Calendar, CheckCircle2, Handshake, ArrowRight } from 'lucide-react';
import { CreatorDeal } from '../../types';
import { formatDate } from '../../lib/utils';

interface CreatorModuleProps {
  deals: CreatorDeal[];
  onAddDeal: (deal: CreatorDeal) => void;
}

export const CreatorModule: React.FC<CreatorModuleProps> = ({ deals, onAddDeal }) => {
  const [showModal, setShowModal] = useState(false);
  const [brand, setBrand] = useState('Universal Audio');
  const [payout, setPayout] = useState('3500');
  const [deliverable, setDeliverable] = useState('1x Dedicated YouTube review + 2x TikTok integration reels');
  const [deadline, setDeadline] = useState('2026-09-20');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.trim()) return;

    onAddDeal({
      id: `cdeal-${Date.now()}`,
      brand: brand.trim(),
      platform: 'youtube',
      payout: Number(payout) || 0,
      status: 'approved',
      deliverable: deliverable.trim(),
      deadline
    });

    setShowModal(false);
  };

  const totalPipeline = deals.reduce((acc, d) => acc + d.payout, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
              <Handshake className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Creator OS — Brand Deals & Sponsor Pipeline
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            Track video integrations, sponsorship deliverables, contract requirements, and payout milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#141414] border border-[#282828] rounded-lg text-xs font-mono">
            <span className="text-[#9A9A9A]">Active Pipeline: </span>
            <span className="text-[#F5A623] font-bold">${totalPipeline.toLocaleString()}</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Sponsor Deal</span>
          </button>
        </div>
      </div>

      {/* Deals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-[#141414] border border-[#282828] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-[#F0F0F0] font-display">{deal.brand}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#F5A623]/20 text-[#F5A623] rounded border border-[#F5A623]/40">
                  {deal.status.replace('_', ' ')}
                </span>
              </div>

              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#282828] space-y-1.5 text-xs font-mono mb-3">
                <div className="flex justify-between">
                  <span className="text-[#9A9A9A]">Contract Payout:</span>
                  <span className="text-emerald-400 font-bold">${deal.payout.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A9A9A]">Target Deadline:</span>
                  <span className="text-[#F0F0F0]">{formatDate(deal.deadline)}</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono text-[#9A9A9A] uppercase mb-1">Contract Deliverable</p>
                <p className="text-xs text-[#F0F0F0] leading-relaxed">{deal.deliverable}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#282828] mt-4 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9A9A9A] uppercase">{deal.platform} Sponsorship</span>
              <button 
                onClick={() => alert(`Opening deal workflow with ${deal.brand}`)}
                className="text-xs font-semibold text-[#F5A623] hover:text-white flex items-center gap-1 transition"
              >
                <span>Manage Deliverables</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#141414] border border-[#282828] rounded-xl p-6 shadow-2xl space-y-4">
            <h2 className="font-display font-bold text-lg text-[#F0F0F0]">Add Sponsor Deal</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#9A9A9A] font-mono mb-1">Sponsor / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#9A9A9A] font-mono mb-1">Contract Payout ($)</label>
                  <input
                    type="number"
                    value={payout}
                    onChange={(e) => setPayout(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#9A9A9A] font-mono mb-1">Delivery Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#9A9A9A] font-mono mb-1">Deliverable Requirements</label>
                <textarea
                  rows={2}
                  value={deliverable}
                  onChange={(e) => setDeliverable(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg p-2.5 text-[#F0F0F0] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#1C1C1C] text-[#9A9A9A] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9B1B1B] text-white font-semibold rounded-lg"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
