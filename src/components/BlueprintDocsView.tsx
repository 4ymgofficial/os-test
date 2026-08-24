import React, { useState } from 'react';
import { BookOpen, Search, ChevronRight, FileCode, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';
import { blueprintDocs } from '../data/blueprintDocs';

export const BlueprintDocsView: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState(blueprintDocs[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = blueprintDocs.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDoc = blueprintDocs.find(d => d.id === selectedDocId) || blueprintDocs[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1B1B]/20 flex items-center justify-center text-[#F5A623]">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0F0]">
              Keedohub Blueprint & System Specifications
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            "Documentation first. Code second." Verified architecture, brand token specifications, and engine blueprints.
          </p>
        </div>
      </div>

      {/* Docs Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Nav */}
        <div className="bg-[#141414] border border-[#282828] rounded-xl p-4 space-y-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9A9A9A]" />
            <input
              type="text"
              placeholder="Search specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#282828] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#F0F0F0] focus:outline-none focus:border-[#9B1B1B]"
            />
          </div>

          <div className="space-y-1">
            {filteredDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition flex items-center justify-between ${
                  activeDoc.id === doc.id
                    ? 'bg-[#9B1B1B] text-white font-semibold'
                    : 'text-[#9A9A9A] hover:bg-[#1C1C1C] hover:text-[#F0F0F0]'
                }`}
              >
                <div className="truncate">
                  <p className="text-[10px] uppercase opacity-75">{doc.category}</p>
                  <p className="truncate font-sans font-medium">{doc.title}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Markdown/Content Viewer */}
        <div className="md:col-span-3 bg-[#141414] border border-[#282828] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#282828] pb-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-[#F5A623] uppercase">{activeDoc.category}</span>
              <h2 className="font-display font-black text-2xl text-[#F0F0F0] mt-1">{activeDoc.title}</h2>
            </div>
            <span className="text-xs font-mono text-[#9A9A9A] bg-[#0A0A0A] px-2.5 py-1 rounded border border-[#282828]">
              {activeDoc.id}.md
            </span>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#D0D0D0] leading-relaxed whitespace-pre-wrap font-sans">
            {activeDoc.content}
          </div>
        </div>
      </div>
    </div>
  );
};
