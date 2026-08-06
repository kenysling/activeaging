import React, { useState, useRef, useEffect } from 'react';
import { Download, Share2, RotateCcw, Sliders, Sparkles, Wand2, ShieldCheck, HeartPulse, SlidersHorizontal, Layers } from 'lucide-react';
import { TransformationResult } from '../types';

interface ShowcaseTabProps {
  transformation: TransformationResult;
  onUpdateTransformation: (updated: TransformationResult) => void;
  onShare: () => void;
  onStartOver: () => void;
}

export const ShowcaseTab: React.FC<ShowcaseTabProps> = ({
  transformation,
  onUpdateTransformation,
  onShare,
  onStartOver,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeTool, setActiveTool] = useState<'none' | 'selective' | 'upscale' | 'vitality'>('none');
  const [adjustments, setAdjustments] = useState({
    skinSmoothing: transformation.adjustments?.skinSmoothing ?? 75,
    wrinkleDepth: transformation.adjustments?.wrinkleDepth ?? 60,
    vitalityGlow: transformation.adjustments?.vitalityGlow ?? 85,
    hairDensity: transformation.adjustments?.hairDensity ?? 70,
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  const handleDownload = () => {
    // Create download link for the transformed image
    const link = document.createElement('a');
    link.href = transformation.transformedImage;
    link.download = `active-aging-transformation-${transformation.preset.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 pb-20">
      {/* Header */}
      <div className="mt-2 flex justify-between items-end">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e8dfee]">
            Transformation
          </h2>
          <p className="text-xs sm:text-sm text-[#ccc3d8] mt-1">
            Age Progression Complete ({transformation.preset.label} Preset)
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d2bbff]/30 bg-[#7c3aed]/20 text-[#d2bbff] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#d2bbff]" />
          <span>AI Optimized</span>
        </div>
      </div>

      {/* Interactive Before / After Comparison Slider */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[62vh] rounded-3xl glass-panel p-1 mx-auto overflow-hidden shadow-2xl">
        <div className="relative w-full h-full overflow-hidden rounded-[22px] select-none touch-pan-y">
          {/* Transformed Image (Underneath) */}
          <img
            src={transformation.transformedImage}
            alt="Transformed age progression"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              filter: `contrast(${100 + (adjustments.vitalityGlow - 50) * 0.2}%) brightness(${100 + (adjustments.vitalityGlow - 50) * 0.15}%)`,
            }}
          />

          {/* Original Image (Clipped overlay) */}
          <img
            src={transformation.originalImage}
            alt="Original"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          />

          {/* Divider handle line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#d2bbff] z-10 pointer-events-none shadow-[0_0_10px_rgba(210,187,255,0.8)]"
            style={{ left: `${sliderPos}%` }}
          />

          {/* Handle knob */}
          <div
            className="absolute top-1/2 w-10 h-10 bg-[#1E293B]/90 border-2 border-[#d2bbff] rounded-full -translate-x-1/2 -translate-y-1/2 z-15 flex items-center justify-center text-[#d2bbff] shadow-[0_0_20px_rgba(210,187,255,0.5)] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <SlidersHorizontal className="w-5 h-5 text-[#d2bbff]" />
          </div>

          {/* Range input transparent overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-ew-resize"
          />

          {/* Floating labels */}
          <div className="absolute bottom-4 left-4 glass-panel px-3 py-1 rounded-lg text-xs font-bold text-white shadow-md z-10 pointer-events-none">
            Original
          </div>
          <div className="absolute bottom-4 right-4 glass-panel px-3 py-1 rounded-lg text-xs font-bold text-white shadow-md z-10 pointer-events-none">
            Transformed
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3.5">
        <button
          onClick={handleDownload}
          className="col-span-2 h-14 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#0566d9] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] cursor-pointer"
        >
          <Download className="w-5 h-5 text-white" />
          <span>Download HD</span>
        </button>

        <button
          onClick={onShare}
          className="h-12 rounded-full glass-panel text-[#d2bbff] font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/5 active:scale-98 transition-all cursor-pointer border border-white/10"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        <button
          onClick={onStartOver}
          className="h-12 rounded-full glass-panel text-[#ccc3d8] font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/5 active:scale-98 transition-all cursor-pointer border border-white/10"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </button>
      </div>

      {/* Precise Edits Section */}
      <div className="space-y-3 pt-2">
        <h3 className="text-base font-bold text-[#e8dfee]">Precise Edits & Adjustments</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Tool 1: Selective Edit */}
          <div
            onClick={() => setActiveTool(activeTool === 'selective' ? 'none' : 'selective')}
            className={`glass-panel rounded-2xl p-4 flex flex-col gap-2 hover:bg-white/5 transition-all cursor-pointer border ${
              activeTool === 'selective' ? 'border-[#d2bbff] bg-[#7c3aed]/10' : 'border-white/10'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#d2bbff]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#e8dfee]">Selective Edit</h4>
              <p className="text-[11px] text-[#ccc3d8] mt-0.5">Adjust specific facial areas</p>
            </div>
          </div>

          {/* Tool 2: Upscale 4x */}
          <div
            onClick={() => setActiveTool(activeTool === 'upscale' ? 'none' : 'upscale')}
            className={`glass-panel rounded-2xl p-4 flex flex-col gap-2 hover:bg-white/5 transition-all cursor-pointer border ${
              activeTool === 'upscale' ? 'border-[#adc6ff] bg-[#0566d9]/10' : 'border-white/10'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-[#0566d9]/20 flex items-center justify-center text-[#adc6ff]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#e8dfee]">Upscale 4x</h4>
              <p className="text-[11px] text-[#ccc3d8] mt-0.5">Enhance resolution details</p>
            </div>
          </div>
        </div>

        {/* Fine-Tuning Sliders */}
        {activeTool !== 'none' && (
          <div className="glass-panel rounded-2xl p-4 space-y-4 border border-[#d2bbff]/30">
            <div className="flex justify-between items-center text-xs font-bold text-[#d2bbff]">
              <span>Fine-Tune Parameters</span>
              <button onClick={() => setActiveTool('none')} className="text-[#958da1] hover:text-white">Close</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[#ccc3d8] mb-1">
                  <span>Skin Smoothing</span>
                  <span>{adjustments.skinSmoothing}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={adjustments.skinSmoothing}
                  onChange={(e) => setAdjustments({ ...adjustments, skinSmoothing: Number(e.target.value) })}
                  className="w-full accent-[#7c3aed]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[#ccc3d8] mb-1">
                  <span>Vitality Glow</span>
                  <span>{adjustments.vitalityGlow}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={adjustments.vitalityGlow}
                  onChange={(e) => setAdjustments({ ...adjustments, vitalityGlow: Number(e.target.value) })}
                  className="w-full accent-[#0566d9]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Longevity & Active Vitality Insights Card */}
      {transformation.vitalityInsights && (
        <div className="glass-panel p-5 rounded-2xl border border-[#d2bbff]/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-[#ffb784]" />
              <h3 className="text-sm font-bold text-[#e8dfee]">Active Vitality Assessment</h3>
            </div>
            <span className="text-xs font-extrabold text-[#d2bbff] px-2.5 py-1 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/30">
              {transformation.vitalityInsights.estimatedAge}
            </span>
          </div>

          <p className="text-xs text-[#ccc3d8] leading-relaxed">
            {transformation.vitalityInsights.skinElasticity}
          </p>

          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#958da1]">
              Recommended Active Longevity Routine:
            </span>
            <ul className="space-y-1 text-xs text-[#e8dfee]">
              {transformation.vitalityInsights.wellnessRecommendations.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#d2bbff] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
