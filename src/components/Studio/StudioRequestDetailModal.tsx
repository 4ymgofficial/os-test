import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MessageSquare, 
  Download, 
  CheckCircle2, 
  Clock, 
  Send, 
  Upload, 
  FileCheck, 
  FolderPlus, 
  ArrowRight 
} from 'lucide-react';
import { StudioRequest, Asset } from '../../types';
import { formatDate } from '../../lib/utils';

interface StudioRequestDetailModalProps {
  request: StudioRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (requestId: string, text: string) => void;
  onApproveAndSyncToAssetLibrary: (request: StudioRequest) => void;
  onRequestRevision: (requestId: string, feedback: string) => void;
}

export const StudioRequestDetailModal: React.FC<StudioRequestDetailModalProps> = ({
  request,
  isOpen,
  onClose,
  onAddComment,
  onApproveAndSyncToAssetLibrary,
  onRequestRevision
}) => {
  const [commentText, setCommentText] = useState('');
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  if (!isOpen || !request) return null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(request.id, commentText.trim());
    setCommentText('');
  };

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionFeedback.trim()) return;
    onRequestRevision(request.id, revisionFeedback.trim());
    setRevisionFeedback('');
    setShowRevisionForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-3xl bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#282828] bg-[#0A0A0A]/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#9B1B1B]/20 text-[#F5A623] text-xs font-mono rounded border border-[#9B1B1B]/40">
                {request.serviceType}
              </span>
              <span className="px-2 py-0.5 bg-[#1C1C1C] text-[#9A9A9A] text-xs font-mono rounded uppercase">
                {request.status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="font-display font-bold text-lg text-[#F0F0F0] mt-1">{request.title}</h2>
          </div>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#F0F0F0] p-1 rounded hover:bg-[#1C1C1C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Summary Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-4 bg-[#1C1C1C] rounded-xl border border-[#282828] space-y-3 text-xs">
              <h4 className="font-mono uppercase text-[#F5A623] text-[11px]">Creative Brief & Aesthetic</h4>
              <p className="text-[#F0F0F0] leading-relaxed">{request.brief}</p>
              
              <div>
                <span className="text-[#9A9A9A] font-mono">Visual References: </span>
                <span className="text-[#F0F0F0]">{request.references.join(', ')}</span>
              </div>
            </div>

            <div className="p-4 bg-[#0A0A0A] rounded-xl border border-[#282828] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#9A9A9A]">Production Tier:</span>
                <span className="text-[#F0F0F0] font-bold">{request.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A9A9A]">Production Fee:</span>
                <span className="text-[#F5A623] font-bold">${request.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A9A9A]">Revisions:</span>
                <span className="text-[#F0F0F0]">{request.revisionsUsed} / {request.revisionsAllowed} used</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A9A9A]">Delivery Target:</span>
                <span className="text-[#F0F0F0]">{formatDate(request.deadline)}</span>
              </div>
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-semibold text-sm text-[#F0F0F0] flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#9B1B1B]" />
                <span>Uploaded Studio Deliverables & Proofs ({request.deliverables.length})</span>
              </h4>
              {request.status !== 'completed' && request.deliverables.length > 0 && (
                <button
                  onClick={() => onApproveAndSyncToAssetLibrary(request)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve & Transfer to Asset Library</span>
                </button>
              )}
            </div>

            {request.deliverables.length > 0 ? (
              <div className="space-y-2">
                {request.deliverables.map((deliv) => (
                  <div
                    key={deliv.id}
                    className="p-3 bg-[#0A0A0A] border border-[#282828] rounded-lg flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-[#1C1C1C] text-[#F5A623] font-mono rounded text-[10px]">
                        {deliv.fileType}
                      </span>
                      <div>
                        <p className="font-semibold text-[#F0F0F0]">{deliv.title}</p>
                        <p className="text-[11px] text-[#9A9A9A] font-mono">Rendered on {deliv.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Downloading deliverable "${deliv.title}"`)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] text-[#F0F0F0] rounded border border-[#282828] transition font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Proof</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-[#0A0A0A] border border-dashed border-[#282828] rounded-lg text-center text-xs text-[#9A9A9A]">
                <Clock className="w-6 h-6 mx-auto mb-1.5 text-[#F5A623]" />
                <p className="font-medium text-[#F0F0F0]">Production in progress.</p>
                <p>First visual proof is being prepared by the studio lead.</p>
              </div>
            )}

            {/* Revision feedback trigger */}
            {request.status !== 'completed' && (
              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => setShowRevisionForm(!showRevisionForm)}
                  className="text-xs text-[#F5A623] hover:underline font-mono"
                >
                  {showRevisionForm ? 'Cancel Revision Request' : 'Need adjustments? Request a revision round →'}
                </button>
              </div>
            )}

            {showRevisionForm && (
              <form onSubmit={handleSendRevision} className="p-4 bg-[#0A0A0A] border border-[#F5A623]/30 rounded-xl space-y-3">
                <h5 className="text-xs font-semibold text-[#F0F0F0]">Describe Requested Changes</h5>
                <textarea
                  rows={2}
                  required
                  placeholder="Specify lighting, typography font change, timing adjustments..."
                  value={revisionFeedback}
                  onChange={(e) => setRevisionFeedback(e.target.value)}
                  className="w-full bg-[#141414] border border-[#282828] rounded-lg p-2.5 text-xs text-[#F0F0F0] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#F5A623] hover:bg-[#E09212] text-black font-semibold rounded text-xs transition"
                >
                  Submit Revision Round ({request.revisionsUsed + 1}/{request.revisionsAllowed})
                </button>
              </form>
            )}
          </div>

          {/* Comment & Feedback Thread */}
          <div className="space-y-3 pt-2">
            <h4 className="font-display font-semibold text-sm text-[#F0F0F0] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#F5A623]" />
              <span>Studio Collaboration & Feedback ({request.comments.length})</span>
            </h4>

            <div className="space-y-3 max-h-60 overflow-y-auto p-1">
              {request.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3 rounded-lg border text-xs leading-relaxed ${
                    comment.isStudioTeam
                      ? 'bg-[#1C1C1C] border-[#282828] ml-4'
                      : 'bg-[#0A0A0A] border-[#333] mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <img src={comment.avatar} alt={comment.author} className="w-5 h-5 rounded-full object-cover" />
                      <span className="font-semibold text-[#F0F0F0]">{comment.author}</span>
                      {comment.isStudioTeam && (
                        <span className="px-1.5 py-0.2 bg-[#9B1B1B] text-white text-[9px] font-mono rounded">
                          STUDIO TEAM
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-[#9A9A9A]">{comment.timestamp}</span>
                  </div>
                  <p className="text-[#D0D0D0]">{comment.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendComment} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Reply to the creative director or ask a technical question..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-[#0A0A0A] border border-[#282828] rounded-lg px-3 py-2 text-xs text-[#F0F0F0] focus:outline-none focus:border-[#9B1B1B]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#9B1B1B] hover:bg-[#C0392B] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
