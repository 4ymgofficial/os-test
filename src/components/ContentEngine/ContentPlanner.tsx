import React, { useState } from 'react';
import { 
  TrendingUp, 
  Plus, 
  Calendar, 
  Video, 
  Instagram, 
  Youtube, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Tag,
  ChevronRight,
  Kanban,
  CalendarDays,
  Hash
} from 'lucide-react';
import { ContentItem, ContentPlatform, ContentStatus, Release } from '../../types';
import { formatDate } from '../../lib/utils';

interface ContentPlannerProps {
  contentItems: ContentItem[];
  releases: Release[];
  onOpenNewContentModal: () => void;
  onUpdateContentStatus: (id: string, newStatus: ContentStatus) => void;
}

const platformIcons: Record<ContentPlatform, React.ComponentType<{ className?: string }>> = {
  tiktok: Video,
  reels: Instagram,
  instagram: Instagram,
  youtube: Youtube,
  x: Hash,
  newsletter: Sparkles
};

const statuses: { key: ContentStatus; label: string }[] = [
  { key: 'idea', label: 'Ideas & Hooks' },
  { key: 'scripting', label: 'Scripting' },
  { key: 'recording', label: 'Shooting' },
  { key: 'editing', label: 'Editing' },
  { key: 'ready', label: 'Ready for Review' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'published', label: 'Published' }
];

export const ContentPlanner: React.FC<ContentPlannerProps> = ({
  contentItems,
  releases,
  onOpenNewContentModal,
  onUpdateContentStatus
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedPlatform, setSelectedPlatform] = useState<ContentPlatform | 'all'>('all');

  const filteredItems = contentItems.filter(item => 
    selectedPlatform === 'all' || item.platform === selectedPlatform
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Content Engine & Release Campaign Matrix
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            Deterministic short-form hooks, TikTok/Reels teasers, Behind-the-Scenes vlogs, and release rollouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-[#141414] border border-[#282828] p-1 rounded-lg">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
                viewMode === 'kanban' ? 'bg-[#9B1B1B] text-white' : 'text-[#9A9A9A] hover:text-[#F0F0F0]'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
                viewMode === 'list' ? 'bg-[#9B1B1B] text-white' : 'text-[#9A9A9A] hover:text-[#F0F0F0]'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Timeline List</span>
            </button>
          </div>

          <button
            onClick={onOpenNewContentModal}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Plan Content</span>
          </button>
        </div>
      </div>

      {/* Platform Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedPlatform('all')}
          className={`px-3 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition ${
            selectedPlatform === 'all' ? 'bg-[#9B1B1B] text-white' : 'bg-[#141414] text-[#9A9A9A] border border-[#282828] hover:text-[#F0F0F0]'
          }`}
        >
          All Platforms ({contentItems.length})
        </button>
        {(['tiktok', 'reels', 'youtube', 'instagram', 'x', 'newsletter'] as ContentPlatform[]).map((plat) => {
          const Icon = platformIcons[plat];
          const count = contentItems.filter(c => c.platform === plat).length;
          return (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition uppercase font-mono ${
                selectedPlatform === plat ? 'bg-[#9B1B1B] text-white' : 'bg-[#141414] text-[#9A9A9A] border border-[#282828] hover:text-[#F0F0F0]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{plat}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {statuses.slice(0, 5).map((col) => {
            const itemsInCol = filteredItems.filter(item => item.status === col.key);

            return (
              <div key={col.key} className="bg-[#141414] border border-[#282828] rounded-xl p-3.5 flex flex-col min-w-[240px]">
                <div className="flex items-center justify-between pb-3 border-b border-[#282828] mb-3">
                  <h3 className="font-mono text-xs uppercase text-[#F0F0F0] font-semibold">{col.label}</h3>
                  <span className="px-1.5 py-0.5 bg-[#1C1C1C] text-[11px] font-mono text-[#F5A623] rounded">
                    {itemsInCol.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                  {itemsInCol.map((item) => {
                    const Icon = platformIcons[item.platform];
                    const linkedRelease = releases.find(r => r.id === item.releaseId);

                    return (
                      <div
                        key={item.id}
                        className="bg-[#0A0A0A] border border-[#282828] hover:border-[#383838] p-3 rounded-lg space-y-2.5 transition shadow-xs group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-[#F5A623] px-1.5 py-0.5 bg-[#1C1C1C] rounded">
                            <Icon className="w-3 h-3" />
                            {item.platform}
                          </span>
                          <span className="text-[10px] font-mono text-[#9A9A9A]">{item.format}</span>
                        </div>

                        <h4 className="font-semibold text-xs text-[#F0F0F0] leading-snug group-hover:text-[#F5A623] transition">
                          {item.title}
                        </h4>

                        {item.hook && (
                          <div className="p-2 bg-[#1C1C1C] rounded border border-[#282828] text-[11px] text-[#F0F0F0] italic">
                            "{item.hook}"
                          </div>
                        )}

                        <p className="text-[11px] text-[#9A9A9A] line-clamp-2 leading-relaxed">
                          {item.copy}
                        </p>

                        {linkedRelease && (
                          <div className="text-[10px] font-mono text-[#9B1B1B] bg-[#9B1B1B]/10 px-1.5 py-0.5 rounded border border-[#9B1B1B]/30 truncate">
                            Drop: {linkedRelease.title}
                          </div>
                        )}

                        {/* Status Mover */}
                        <div className="pt-2 border-t border-[#282828] flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#9A9A9A]">
                            {item.scheduledDate ? formatDate(item.scheduledDate) : 'Unscheduled'}
                          </span>
                          <select
                            value={item.status}
                            onChange={(e) => onUpdateContentStatus(item.id, e.target.value as ContentStatus)}
                            className="bg-[#1C1C1C] text-[10px] font-mono text-[#F5A623] border border-[#282828] rounded px-1.5 py-0.5 focus:outline-none"
                          >
                            <option value="idea">Idea</option>
                            <option value="scripting">Scripting</option>
                            <option value="recording">Shooting</option>
                            <option value="editing">Editing</option>
                            <option value="ready">Ready</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}

                  {itemsInCol.length === 0 && (
                    <div className="p-6 text-center text-[#777] text-xs border border-dashed border-[#282828] rounded-lg">
                      No items in {col.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Timeline List View */
        <div className="bg-[#141414] border border-[#282828] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#282828] bg-[#0A0A0A]/50">
            <h3 className="font-display font-semibold text-sm text-[#F0F0F0]">Scheduled Content Matrix</h3>
          </div>
          <div className="divide-y divide-[#282828]">
            {filteredItems.map((item) => {
              const Icon = platformIcons[item.platform];
              const linkedRelease = releases.find(r => r.id === item.releaseId);

              return (
                <div key={item.id} className="p-4 hover:bg-[#1C1C1C]/50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#282828] flex items-center justify-center text-[#F5A623] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-[#F0F0F0]">{item.title}</h4>
                        <span className="px-1.5 py-0.5 bg-[#0A0A0A] text-[10px] font-mono text-[#F5A623] rounded border border-[#282828] uppercase">
                          {item.platform}
                        </span>
                      </div>
                      <p className="text-xs text-[#9A9A9A] mt-1">{item.copy}</p>
                      {linkedRelease && (
                        <p className="text-[11px] font-mono text-[#9B1B1B] mt-1">Release campaign: {linkedRelease.title}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-xs font-mono text-[#9A9A9A] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.scheduledDate)}
                    </span>
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateContentStatus(item.id, e.target.value as ContentStatus)}
                      className="bg-[#0A0A0A] text-xs font-mono text-[#F5A623] border border-[#282828] rounded-lg px-2.5 py-1.5 focus:outline-none"
                    >
                      <option value="idea">Idea</option>
                      <option value="scripting">Scripting</option>
                      <option value="recording">Shooting</option>
                      <option value="editing">Editing</option>
                      <option value="ready">Ready</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
