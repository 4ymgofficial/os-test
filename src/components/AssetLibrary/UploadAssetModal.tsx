import React, { useState } from 'react';
import { X, Upload, FolderGit2, Sparkles, Check } from 'lucide-react';
import { Asset, AssetCategory, Release } from '../../types';

interface UploadAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  releases: Release[];
  onUpload: (newAsset: Asset) => void;
}

export const UploadAssetModal: React.FC<UploadAssetModalProps> = ({
  isOpen,
  onClose,
  releases,
  onUpload
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AssetCategory>('audio');
  const [releaseId, setReleaseId] = useState(releases[0]?.id || '');
  const [fileType, setFileType] = useState('WAV (48kHz/24-bit)');
  const [fileSize, setFileSize] = useState('38.4 MB');
  const [tagsInput, setTagsInput] = useState('Master, 24-bit, Final');
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAsset: Asset = {
      id: `ast-${Date.now()}`,
      title: title.trim(),
      category,
      fileType,
      fileSize,
      url: url || '#',
      thumbnailUrl: category === 'artwork' || category === 'press_photo' ? (url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80') : undefined,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      releaseId: releaseId || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      version: 1
    };

    onUpload(newAsset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#282828]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <h2 className="font-display font-bold text-lg text-[#F0F0F0]">Upload Creative Asset</h2>
          </div>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1 rounded hover:bg-[#1C1C1C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Drag and drop mock zone */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];
                setTitle(file.name.replace(/\.[^/.]+$/, ''));
                setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
              }
            }}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
              isDragging ? 'border-[#F5A623] bg-[#F5A623]/10' : 'border-[#282828] bg-[#0A0A0A] hover:border-[#383838]'
            }`}
          >
            <Upload className="w-8 h-8 text-[#9B1B1B] mx-auto mb-2" />
            <p className="font-semibold text-[#F0F0F0] text-sm">Drag & drop lossless audio, cover art, or vectors</p>
            <p className="text-[#9A9A9A] text-[11px] mt-1 font-mono">Supports WAV, FLAC, PNG 3000x3000px, MP4 ProRes, SVG, PDF</p>
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Asset Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Midnight Cyber - Final Master Stems"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-sm text-[#F0F0F0] focus:outline-none focus:border-[#9B1B1B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              >
                <option value="audio">Audio Master / Stem</option>
                <option value="artwork">Artwork & Cover Design</option>
                <option value="video">3D Motion / Video</option>
                <option value="press_photo">Press Photo (Hi-Res)</option>
                <option value="brand_kit">Brand Kit / Logo</option>
                <option value="legal_doc">Split Sheet / Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Link to Release</label>
              <select
                value={releaseId}
                onChange={(e) => setReleaseId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              >
                <option value="">None (Global Asset)</option>
                {releases.map(r => (
                  <option key={r.id} value={r.id}>{r.title} ({r.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">Format Specification</label>
              <input
                type="text"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9A9A9A] font-mono mb-1">File Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. Master, 24-bit, Dolby Atmos, Single"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-[#F0F0F0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9A9A9A] font-mono mb-1">Preview / Media URL (Optional)</label>
            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              Upload Asset to Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
