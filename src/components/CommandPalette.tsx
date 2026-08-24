import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Disc, 
  FolderGit2, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Plus, 
  X, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Release, Asset, StudioRequest } from '../types';
import { blueprintDocs } from '../data/blueprintDocs';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  releases: Release[];
  assets: Asset[];
  studioRequests: StudioRequest[];
  onNavigate: (view: string, targetId?: string) => void;
  onOpenCreateRelease: () => void;
  onOpenUploadAsset: () => void;
  onOpenNewStudioRequest: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  releases,
  assets,
  studioRequests,
  onNavigate,
  onOpenCreateRelease,
  onOpenUploadAsset,
  onOpenNewStudioRequest,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    return {
      releases: releases.filter(r => r.title.toLowerCase().includes(q) || r.genre.toLowerCase().includes(q)),
      assets: assets.filter(a => a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))),
      studioRequests: studioRequests.filter(s => s.title.toLowerCase().includes(q) || s.serviceType.toLowerCase().includes(q)),
      docs: blueprintDocs.filter(d => d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q) || d.category.toLowerCase().includes(q))
    };
  }, [query, releases, assets, studioRequests]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#282828] gap-3">
          <Search className="w-5 h-5 text-[#9A9A9A] shrink-0" />
          <input
            type="text"
            placeholder="Type a command, release name, asset, or blueprint document..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#F0F0F0] placeholder-[#9A9A9A] text-sm focus:outline-none"
          />
          {query ? (
            <button onClick={() => setQuery('')} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="px-2 py-0.5 text-[11px] font-mono bg-[#1C1C1C] text-[#9A9A9A] border border-[#282828] rounded">ESC</kbd>
          )}
        </div>

        {/* Results / Suggestions Container */}
        <div className="overflow-y-auto p-3 space-y-4 text-sm">
          {!query && (
            <>
              <div>
                <p className="text-[11px] font-mono uppercase text-[#9A9A9A] px-2 mb-1.5">Quick Actions</p>
                <div className="space-y-1">
                  <button
                    onClick={() => { onClose(); onOpenCreateRelease(); }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#1C1C1C] text-[#F0F0F0] text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-[#9B1B1B]/20 text-[#C0392B] flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Create New Music Release</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A9A9A] opacity-0 group-hover:opacity-100 transition" />
                  </button>

                  <button
                    onClick={() => { onClose(); onOpenUploadAsset(); }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#1C1C1C] text-[#F0F0F0] text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Upload Master Asset or Artwork</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A9A9A] opacity-0 group-hover:opacity-100 transition" />
                  </button>

                  <button
                    onClick={() => { onClose(); onOpenNewStudioRequest(); }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#1C1C1C] text-[#F0F0F0] text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-[#9B1B1B]/20 text-[#F5A623] flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Request Studio Production (3D/Art/Motion)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A9A9A] opacity-0 group-hover:opacity-100 transition" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase text-[#9A9A9A] px-2 mb-1.5">Navigate OS Workspaces</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => { onClose(); onNavigate('releases'); }}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-[#1C1C1C]/50 hover:bg-[#1C1C1C] text-left border border-[#282828]/50"
                  >
                    <Disc className="w-4 h-4 text-[#9B1B1B]" />
                    <span>Artist OS & Releases</span>
                  </button>
                  <button 
                    onClick={() => { onClose(); onNavigate('content'); }}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-[#1C1C1C]/50 hover:bg-[#1C1C1C] text-left border border-[#282828]/50"
                  >
                    <TrendingUp className="w-4 h-4 text-[#F5A623]" />
                    <span>Content Engine</span>
                  </button>
                  <button 
                    onClick={() => { onClose(); onNavigate('studio'); }}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-[#1C1C1C]/50 hover:bg-[#1C1C1C] text-left border border-[#282828]/50"
                  >
                    <Sparkles className="w-4 h-4 text-[#C0392B]" />
                    <span>Keedohub Studio</span>
                  </button>
                  <button 
                    onClick={() => { onClose(); onNavigate('blueprint'); }}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-[#1C1C1C]/50 hover:bg-[#1C1C1C] text-left border border-[#282828]/50"
                  >
                    <BookOpen className="w-4 h-4 text-[#F5A623]" />
                    <span>Blueprint Docs</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {filteredResults && (
            <div className="space-y-4">
              {filteredResults.releases.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#9A9A9A] px-2 mb-1.5">Releases</p>
                  {filteredResults.releases.map(r => (
                    <button
                      key={r.id}
                      onClick={() => { onClose(); onNavigate('releases', r.id); }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#1C1C1C] text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Disc className="w-4 h-4 text-[#9B1B1B]" />
                        <span className="text-[#F0F0F0] font-medium">{r.title}</span>
                        <span className="text-xs text-[#9A9A9A]">({r.type})</span>
                      </div>
                      <span className="text-xs font-mono uppercase px-2 py-0.5 bg-[#1C1C1C] text-[#F5A623] rounded">{r.status}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredResults.assets.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#9A9A9A] px-2 mb-1.5">Asset Library</p>
                  {filteredResults.assets.map(a => (
                    <button
                      key={a.id}
                      onClick={() => { onClose(); onNavigate('assets', a.id); }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#1C1C1C] text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <FolderGit2 className="w-4 h-4 text-[#F5A623]" />
                        <span className="text-[#F0F0F0] font-medium">{a.title}</span>
                      </div>
                      <span className="text-xs text-[#9A9A9A] font-mono">{a.fileSize}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredResults.docs.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#9A9A9A] px-2 mb-1.5">Blueprint Specifications</p>
                  {filteredResults.docs.slice(0, 4).map(d => (
                    <button
                      key={d.id}
                      onClick={() => { onClose(); onNavigate('blueprint', d.id); }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#1C1C1C] text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-[#9A9A9A]" />
                        <span className="text-[#F0F0F0]">{d.title}</span>
                      </div>
                      <span className="text-xs text-[#9A9A9A] font-mono">{d.category}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredResults.releases.length === 0 &&
               filteredResults.assets.length === 0 &&
               filteredResults.docs.length === 0 &&
               filteredResults.studioRequests.length === 0 && (
                <div className="p-6 text-center text-[#9A9A9A]">
                  <p>No results found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
