import React, { useState } from 'react';
import { Sparkles, Megaphone, Plus, Calendar, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrandCampaign } from '../../types';
import { formatDate } from '../../lib/utils';

interface BrandModuleProps {
  campaigns: BrandCampaign[];
  onAddCampaign: (campaign: BrandCampaign) => void;
}

export const BrandModule: React.FC<BrandModuleProps> = ({ campaigns, onAddCampaign }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState('Aura Soundwear');
  const [budget, setBudget] = useState('18000');
  const [deliverablesInput, setDeliverablesInput] = useState('Product Launch Video, Lookbook 3D, Press Release');
  const [kpis, setKpis] = useState('50k impressions, 2.5k pre-orders');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-10-15');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddCampaign({
      id: `cmp-${Date.now()}`,
      title: title.trim(),
      brandName: brandName.trim(),
      status: 'active',
      budget: Number(budget) || 0,
      deliverables: deliverablesInput.split(',').map(d => d.trim()).filter(Boolean),
      startDate,
      endDate,
      kpis: kpis.trim()
    });

    setShowModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1B1B]/20 flex items-center justify-center text-[#F5A623]">
              <Megaphone className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Brand OS — Campaigns & Launch Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            Structured creative campaigns, lookbooks, product drop lifecycles, and brand kit compliance.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Brand Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-[#141414] border border-[#282828] rounded-xl p-5 flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#9B1B1B]/20 text-[#F5A623] rounded border border-[#9B1B1B]/40">
                  {camp.brandName}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-emerald-950/40 text-emerald-400 rounded border border-emerald-500/40">
                  {camp.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#F0F0F0] mb-2">{camp.title}</h3>

              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#282828] text-xs font-mono space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-[#9A9A9A]">Campaign Budget:</span>
                  <span className="text-[#F5A623] font-bold">${camp.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A9A9A]">Timeline:</span>
                  <span className="text-[#F0F0F0]">{formatDate(camp.startDate)} — {formatDate(camp.endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A9A9A]">Target KPIs:</span>
                  <span className="text-[#F0F0F0] truncate max-w-[200px]">{camp.kpis}</span>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-mono uppercase text-[#9A9A9A] mb-1.5">Deliverables</h4>
                <div className="space-y-1">
                  {camp.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#F0F0F0]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#282828] mt-4 flex items-center justify-between">
              <span className="text-xs text-[#9A9A9A] font-mono">Brand Identity Sync: Active</span>
              <button 
                onClick={() => alert(`Opening Brand Campaign Workspace for "${camp.title}"`)}
                className="text-xs font-semibold text-[#F5A623] hover:text-white flex items-center gap-1 transition"
              >
                <span>Campaign Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-[#141414] border border-[#282828] rounded-xl p-6 shadow-2xl space-y-4">
            <h2 className="font-display font-bold text-lg text-[#F0F0F0]">Create Brand Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#9A9A9A] font-mono mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter 2026 Headphone Drop"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#9A9A9A] font-mono mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#9A9A9A] font-mono mb-1">Budget ($)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#9A9A9A] font-mono mb-1">Deliverables (comma-separated)</label>
                <input
                  type="text"
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#9A9A9A] font-mono mb-1">Primary KPIs</label>
                <input
                  type="text"
                  value={kpis}
                  onChange={(e) => setKpis(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
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
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
