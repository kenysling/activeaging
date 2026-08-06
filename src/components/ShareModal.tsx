import React, { useState } from 'react';
import { Share2, Copy, Check, Download, X, Sparkles, HeartPulse } from 'lucide-react';
import { TransformationResult } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  transformation: TransformationResult;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, transformation }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `Check out my AI Active Aging transformation for ${transformation.preset.label} stage! Active Vitality Score: ${transformation.preset.vitalityScore}% ✨`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-md w-full rounded-3xl p-6 space-y-5 border border-white/20 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[#958da1] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex p-3 rounded-full bg-[#7c3aed]/20 text-[#d2bbff] mb-1">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#e8dfee]">Share Transformation</h3>
          <p className="text-xs text-[#ccc3d8]">
            Inspire family and friends with your active aging visualization!
          </p>
        </div>

        {/* Share Card Preview */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <img
            src={transformation.transformedImage}
            alt="Share transformation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#d2bbff]" />
              <span>Active Aging App</span>
            </div>
            <div className="bg-[#7c3aed] px-2.5 py-1 rounded-full">
              {transformation.preset.label} Stage
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <button
            onClick={handleCopyLink}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#0566d9] text-white font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Text Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Share Summary</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full glass-panel text-[#ccc3d8] font-semibold text-xs hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
