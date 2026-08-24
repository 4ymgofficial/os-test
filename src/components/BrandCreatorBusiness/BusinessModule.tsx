import React, { useState } from 'react';
import { Briefcase, Plus, Users, DollarSign, Check, Percent, FileText, Download } from 'lucide-react';
import { SplitSheet, Release } from '../../types';

interface BusinessModuleProps {
  splitSheets: SplitSheet[];
  releases: Release[];
  onAddSplitSheet: (sheet: SplitSheet) => void;
}

export const BusinessModule: React.FC<BusinessModuleProps> = ({
  splitSheets,
  releases,
  onAddSplitSheet
}) => {
  const [showModal, setShowModal] = useState(false);
  const [songTitle, setSongTitle] = useState('Midnight Cyber');
  const [contributors, setContributors] = useState([
    { name: 'Kayo Velo', role: 'Artist / Producer', masterShare: 50, publishingShare: 50, pro: 'BMI' },
    { name: 'Marcus Chen', role: 'Songwriter / Vocalist', masterShare: 50, publishingShare: 50, pro: 'ASCAP' }
  ]);

  const totalMaster = contributors.reduce((acc, c) => acc + c.masterShare, 0);
  const totalPub = contributors.reduce((acc, c) => acc + c.publishingShare, 0);

  const handleAddContributor = () => {
    setContributors([
      ...contributors,
      { name: '', role: 'Co-Producer', masterShare: 0, publishingShare: 0, pro: 'BMI' }
    ]);
  };

  const handleUpdateContributor = (idx: number, field: string, value: any) => {
    const next = [...contributors];
    next[idx] = { ...next[idx], [field]: value };
    setContributors(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songTitle.trim()) return;

    onAddSplitSheet({
      id: `split-${Date.now()}`,
      songTitle: songTitle.trim(),
      contributors: contributors.map((c, i) => ({
        id: `c-${i}`,
        name: c.name || 'Collaborator',
        role: c.role,
        masterShare: Number(c.masterShare) || 0,
        publishingShare: Number(c.publishingShare) || 0,
        pro: c.pro,
        signed: true
      })),
      createdDate: new Date().toISOString().split('T')[0],
      status: 'signed'
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1B1B]/20 flex items-center justify-center text-[#F5A623]">
              <Briefcase className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Business OS — Split Sheets & Publishing Rights
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            Master recording royalty splits, publishing shares, PRO registrations (BMI / ASCAP), and legal documentation.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Song Split Sheet</span>
        </button>
      </div>

      {/* Split Sheets Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {splitSheets.map((sheet) => (
          <div
            key={sheet.id}
            className="bg-[#141414] border border-[#282828] rounded-xl p-5 flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-sm font-bold text-[#F0F0F0] font-display">{sheet.songTitle}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-emerald-950/40 text-emerald-400 rounded border border-emerald-500/40">
                  {sheet.status} (100% Locked)
                </span>
              </div>

              <div className="space-y-2 mt-4">
                <p className="text-[11px] font-mono text-[#9A9A9A] uppercase">Royalty Contributors</p>
                {sheet.contributors.map((c, idx) => (
                  <div
                    key={c.id || `contrib-${sheet.id}-${idx}`}
                    className="p-3 bg-[#0A0A0A] border border-[#282828] rounded-lg flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <p className="text-[#F0F0F0] font-bold">{c.name}</p>
                      <p className="text-[11px] text-[#9A9A9A]">{c.role} • PRO: {c.pro || c.proAffiliation || 'None'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F5A623] font-bold">Master: {c.masterShare ?? c.sharePercent ?? 0}%</p>
                      <p className="text-[#9A9A9A]">Publishing: {c.publishingShare ?? c.sharePercent ?? 0}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#282828] mt-4 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9A9A9A]">Signed on {sheet.createdDate}</span>
              <button
                onClick={() => alert(`Exporting signed Split Sheet PDF for "${sheet.songTitle}"`)}
                className="flex items-center gap-1 text-xs font-semibold text-[#F5A623] hover:text-white transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF Contract</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl bg-[#141414] border border-[#282828] rounded-xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display font-bold text-lg text-[#F0F0F0]">Create Song Split Agreement</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#9A9A9A] font-mono mb-1">Song / Track Title *</label>
                <input
                  type="text"
                  required
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#F0F0F0]">Songwriters & Master Owners</span>
                  <button
                    type="button"
                    onClick={handleAddContributor}
                    className="text-xs text-[#F5A623] hover:underline"
                  >
                    + Add Contributor
                  </button>
                </div>

                {contributors.map((c, i) => (
                  <div key={i} className="p-3 bg-[#0A0A0A] border border-[#282828] rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={c.name}
                      onChange={(e) => handleUpdateContributor(i, 'name', e.target.value)}
                      className="bg-[#141414] border border-[#282828] rounded px-2 py-1 text-[#F0F0F0] col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={c.role}
                      onChange={(e) => handleUpdateContributor(i, 'role', e.target.value)}
                      className="bg-[#141414] border border-[#282828] rounded px-2 py-1 text-[#F0F0F0]"
                    />
                    <select
                      value={c.pro}
                      onChange={(e) => handleUpdateContributor(i, 'pro', e.target.value)}
                      className="bg-[#141414] border border-[#282828] rounded px-2 py-1 text-[#F0F0F0]"
                    >
                      <option value="BMI">BMI</option>
                      <option value="ASCAP">ASCAP</option>
                      <option value="SESAC">SESAC</option>
                      <option value="PRS">PRS</option>
                      <option value="SOCAN">SOCAN</option>
                    </select>
                    <div>
                      <label className="text-[10px] text-[#9A9A9A] font-mono">Master %</label>
                      <input
                        type="number"
                        value={c.masterShare}
                        onChange={(e) => handleUpdateContributor(i, 'masterShare', e.target.value)}
                        className="w-full bg-[#141414] border border-[#282828] rounded px-2 py-1 text-[#F0F0F0]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#9A9A9A] font-mono">Pub %</label>
                      <input
                        type="number"
                        value={c.publishingShare}
                        onChange={(e) => handleUpdateContributor(i, 'publishingShare', e.target.value)}
                        className="w-full bg-[#141414] border border-[#282828] rounded px-2 py-1 text-[#F0F0F0]"
                      />
                    </div>
                  </div>
                ))}

                <div className="flex justify-between p-2 bg-[#1C1C1C] rounded font-mono text-xs">
                  <span>Total Master: <strong className={totalMaster === 100 ? 'text-emerald-400' : 'text-red-400'}>{totalMaster}%</strong></span>
                  <span>Total Publishing: <strong className={totalPub === 100 ? 'text-emerald-400' : 'text-red-400'}>{totalPub}%</strong></span>
                </div>
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
                  disabled={totalMaster !== 100 || totalPub !== 100}
                  className="px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] disabled:opacity-50 text-white font-semibold rounded-lg"
                >
                  Sign & Lock Split Agreement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
