import React, { useState } from 'react';
import { X, TrendingUp, Sparkles } from 'lucide-react';
import { ContentItem, ContentPlatform, ContentStatus, Release } from '../../types';

interface NewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  releases: Release[];
  onPlanContent: (newContent: ContentItem) => void;
}

export const NewContentModal: React.FC<NewContentModalProps> = ({
  isOpen,
  onClose,
  releases,
  onPlanContent
}) => {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<ContentPlatform>('tiktok');
  const [format, setFormat] = useState<ContentItem['format']>('Short Video');
  const [status, setStatus] = useState<ContentStatus>('idea');
  const [releaseId, setReleaseId] = useState(releases[0]?.id || '');
  const [hook, setHook] = useState('');
  const [copy, setCopy] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-09-08');
  const [tagsInput, setTagsInput] = useState('#newmusic, #producer, #electronic');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: ContentItem = {
      id: `cnt-${Date.now()}`,
      title: title.trim(),
      platform,
      format,
      status,
      scheduledDate,
      releaseId: releaseId || undefined,
      copy: copy.trim(),
      hook: hook.trim() || undefined,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    };

    onPlanContent(newItem);
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
            <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2 className="font-display font-bold text-lg text-[#F0F0F0]">Plan Campaign Content</h2>
          </div>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1 rounded hover:bg-[#1C1C1C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Content Post Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. 15-Second Synth Layering Breakdown Hook"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-sm text-[#F0F0F0] focus:outline-none focus:border-[#9B1B1B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as ContentPlatform)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              >
                <option value="tiktok">TikTok</option>
                <option value="reels">Instagram Reels</option>
                <option value="youtube">YouTube / Shorts</option>
                <option value="instagram">Instagram Feed / Carousel</option>
                <option value="x">X / Twitter</option>
                <option value="newsletter">Email Newsletter</option>
              </select>
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Content Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as ContentItem['format'])}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              >
                <option value="Short Video">Short Video (9:16)</option>
                <option value="Behind The Scenes">Behind The Scenes (BTS)</option>
                <option value="Audio Teaser">Audio Teaser</option>
                <option value="Carousel">Image Carousel</option>
                <option value="Visualizer">Looping Visualizer</option>
                <option value="Text Post">Text Post</option>
                <option value="Story">Story</option>
              </select>
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Link to Release</label>
              <select
                value={releaseId}
                onChange={(e) => setReleaseId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              >
                <option value="">None (General Content)</option>
                {releases.map(r => (
                  <option key={r.id} value={r.id}>{r.title} ({r.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Scheduled Publish Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">First 3-Second Hook Formulation</label>
            <input
              type="text"
              placeholder="e.g. How I made this subterranean synth lead in 10 minutes..."
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Caption / Copy & Call To Action</label>
            <textarea
              rows={3}
              placeholder="Full post text, pre-save link prompt, and bio reference..."
              value={copy}
              onChange={(e) => setCopy(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg p-3 text-[#F0F0F0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
            />
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
              Add to Content Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
