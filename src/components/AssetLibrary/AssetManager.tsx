import React, { useState } from 'react';
import { 
  FolderGit2, 
  Upload, 
  Search, 
  Filter, 
  Music, 
  Image, 
  Video, 
  Camera, 
  Sparkles, 
  FileText, 
  Download, 
  Trash2, 
  Check, 
  ExternalLink,
  Tag
} from 'lucide-react';
import { Asset, AssetCategory, Release } from '../../types';
import { formatDate } from '../../lib/utils';

interface AssetManagerProps {
  assets: Asset[];
  releases: Release[];
  onUploadAsset: (asset: Asset) => void;
  onDeleteAsset: (assetId: string) => void;
  onOpenUploadModal: () => void;
}

const categoryIcons: Record<AssetCategory, React.ComponentType<{ className?: string }>> = {
  audio: Music,
  artwork: Image,
  video: Video,
  press_photo: Camera,
  brand_kit: Sparkles,
  legal_doc: FileText,
};

const categoryLabels: Record<AssetCategory, string> = {
  audio: 'Master Audio & Stems',
  artwork: 'Cover Artwork & DSP Packs',
  video: 'Video & 3D Motion',
  press_photo: 'Press Photos (Hi-Res)',
  brand_kit: 'Brand Kits & Logos',
  legal_doc: 'Contracts & Split Sheets',
};

export const AssetManager: React.FC<AssetManagerProps> = ({
  assets,
  releases,
  onDeleteAsset,
  onOpenUploadModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      asset.fileType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Creative Asset Library & Vault
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            Protected storage for 24-bit audio masters, 3000x3000px cover art, 3D motion files, and split sheets.
          </p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Master Asset</span>
        </button>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === 'all' 
                ? 'bg-[#9B1B1B] text-white' 
                : 'bg-[#141414] text-[#9A9A9A] hover:text-[#F0F0F0] border border-[#282828]'
            }`}
          >
            All Files ({assets.length})
          </button>
          {(['audio', 'artwork', 'video', 'press_photo', 'brand_kit', 'legal_doc'] as AssetCategory[]).map((cat) => {
            const Icon = categoryIcons[cat];
            const count = assets.filter(a => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat 
                    ? 'bg-[#9B1B1B] text-white' 
                    : 'bg-[#141414] text-[#9A9A9A] hover:text-[#F0F0F0] border border-[#282828]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{categoryLabels[cat].split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#9A9A9A]" />
          <input
            type="text"
            placeholder="Search tags, names, formats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-[#282828] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#F0F0F0] focus:outline-none focus:border-[#9B1B1B]"
          />
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const Icon = categoryIcons[asset.category];
          const linkedRelease = releases.find(r => r.id === asset.releaseId);

          return (
            <div
              key={asset.id}
              className="bg-[#141414] border border-[#282828] hover:border-[#3A3A3A] rounded-xl p-4 flex flex-col justify-between transition group shadow-sm"
            >
              <div>
                {/* Media Preview or Icon */}
                <div className="aspect-video rounded-lg overflow-hidden bg-[#0A0A0A] border border-[#282828] mb-3 relative flex items-center justify-center">
                  {asset.thumbnailUrl || (asset.category === 'artwork' && asset.url.startsWith('http')) ? (
                    <img 
                      src={asset.thumbnailUrl || asset.url} 
                      alt={asset.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#9A9A9A]">
                      <Icon className="w-8 h-8 text-[#9B1B1B]" />
                      <span className="text-[11px] font-mono uppercase">{asset.fileType}</span>
                    </div>
                  )}

                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs rounded text-[10px] font-mono text-[#F5A623]">
                    {asset.fileSize}
                  </div>
                  {asset.dimensionsOrDuration && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs rounded text-[10px] font-mono text-[#F0F0F0]">
                      {asset.dimensionsOrDuration}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#F5A623] px-1.5 py-0.5 bg-[#0A0A0A] rounded border border-[#282828]">
                      {asset.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-[#9A9A9A]">v{asset.version}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#F0F0F0] truncate group-hover:text-[#F5A623] transition">
                    {asset.title}
                  </h3>
                  {linkedRelease && (
                    <p className="text-xs text-[#9A9A9A] font-mono truncate">
                      Linked to: <span className="text-[#F0F0F0] font-medium">{linkedRelease.title}</span>
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {asset.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 bg-[#1C1C1C] text-[#9A9A9A] rounded border border-[#282828]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#282828] flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-[#9A9A9A]">{formatDate(asset.createdAt)}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => alert(`Downloading "${asset.title}" (${asset.fileSize})`)}
                    className="p-1.5 bg-[#1C1C1C] hover:bg-[#9B1B1B] text-[#F0F0F0] hover:text-white rounded border border-[#282828] transition"
                    title="Download original file"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteAsset(asset.id)}
                    className="p-1.5 bg-[#1C1C1C] hover:bg-red-950 text-[#9A9A9A] hover:text-red-400 rounded border border-[#282828] transition"
                    title="Delete asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="p-12 text-center bg-[#141414] border border-[#282828] rounded-xl text-[#9A9A9A] space-y-3">
          <FolderGit2 className="w-10 h-10 mx-auto text-[#9B1B1B]" />
          <p className="text-sm font-medium text-[#F0F0F0]">No assets found in this category.</p>
          <p className="text-xs">Upload master audio, artworks, or press documents to populate your vault.</p>
        </div>
      )}
    </div>
  );
};
