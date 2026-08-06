import React, { useState } from 'react';
import { Sparkles, Plus, Cpu, SlidersHorizontal, Download, ArrowRight, ShieldCheck, HeartPulse, Camera } from 'lucide-react';
import { TabType, TransformationResult } from '../types';

interface HomeTabProps {
  onSelectTab: (tab: TabType) => void;
  onUploadClick: () => void;
  onCameraClick: () => void;
  transformation: TransformationResult;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onSelectTab,
  onUploadClick,
  onCameraClick,
  transformation,
}) => {
  const [activePreview, setActivePreview] = useState<'transformed' | 'original'>('transformed');

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center pt-2 sm:pt-6 gap-4">
        {/* Glow backdrop */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#7c3aed]/15 via-transparent to-transparent blur-3xl rounded-full" />

        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#d2bbff]/20 bg-[#d2bbff]/10 text-[#d2bbff] text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#d2bbff] animate-spin-slow" />
          <span>AI Age Progression • SMU Active Longevity</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#e8dfee] tracking-tight leading-tight max-w-2xl">
          See Your Future Self <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#d2bbff] via-[#adc6ff] to-[#ffb784] bg-clip-text text-transparent">
            in Seconds
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#ccc3d8] max-w-lg leading-relaxed">
          Experience ultra-realistic AI age progression with active vitality analysis. Featuring SMU Professor Sungjong Roh's age progression model.
        </p>

        {/* Primary Camera & Upload CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
          <button
            onClick={onCameraClick}
            className="w-full sm:w-auto bg-gradient-to-r from-[#7c3aed] to-[#0566d9] text-white font-extrabold text-sm py-3.5 px-7 rounded-full shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Camera className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span>Take Live Photo</span>
          </button>

          <button
            onClick={onUploadClick}
            className="w-full sm:w-auto glass-panel text-[#e8dfee] hover:text-white font-bold text-sm py-3.5 px-7 rounded-full border border-white/20 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5 text-[#d2bbff]" />
            <span>Upload Image</span>
          </button>
        </div>

        <p className="text-xs text-[#958da1]">
          Live Camera Capture or file import (WEBP, JPG, PNG up to 10MB)
        </p>
      </section>

      {/* Hero Interactive Comparison Card */}
      <section className="relative w-full max-w-xl mx-auto rounded-3xl glass-card p-2 sm:p-3 overflow-hidden shadow-2xl">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
          <img
            src={
              activePreview === 'transformed'
                ? transformation.transformedImage
                : transformation.originalImage
            }
            alt="Age progression preview"
            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-102"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Toggle pill buttons at bottom */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10 px-4">
            <button
              onClick={() => setActivePreview('original')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                activePreview === 'original'
                  ? 'bg-[#1E293B]/90 text-white border-[#d2bbff] shadow-[0_0_15px_rgba(210,187,255,0.3)]'
                  : 'bg-[#1E293B]/60 text-[#ccc3d8] border-white/10 hover:border-white/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activePreview === 'original' ? 'bg-[#d2bbff]' : 'bg-[#958da1]'}`} />
              Original
            </button>

            <button
              onClick={() => setActivePreview('transformed')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                activePreview === 'transformed'
                  ? 'bg-[#1E293B]/90 text-white border-[#adc6ff] shadow-[0_0_15px_rgba(173,198,255,0.3)]'
                  : 'bg-[#1E293B]/60 text-[#ccc3d8] border-white/10 hover:border-white/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activePreview === 'transformed' ? 'bg-[#adc6ff]' : 'bg-[#958da1]'}`} />
              Transformed ({transformation.preset.label})
            </button>
          </div>
        </div>

        {/* Quick action bar below image */}
        <div className="flex justify-between items-center px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs text-[#ccc3d8]">
            <HeartPulse className="w-4 h-4 text-[#ffb784]" />
            <span>Vitality Score: <strong className="text-[#d2bbff]">{transformation.preset.vitalityScore}%</strong></span>
          </div>
          <button
            onClick={() => onSelectTab('showcase')}
            className="text-xs font-bold text-[#d2bbff] hover:text-white flex items-center gap-1 group"
          >
            <span>Open Interactive Slider</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
        {/* Card 1: Premium Models */}
        <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-[#d2bbff]/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#7c3aed]/15 flex items-center justify-center text-[#d2bbff]">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#e8dfee]">Premium Models</h3>
          <p className="text-sm text-[#ccc3d8] leading-relaxed">
            Start with Aura Nano for fast results, or go Pro for sharper detail, realistic facial skin texture, and enhanced quality.
          </p>
        </div>

        {/* Card 2: Instant Filters */}
        <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-[#adc6ff]/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#0566d9]/15 flex items-center justify-center text-[#adc6ff]">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#e8dfee]">Instant Filters</h3>
          <p className="text-sm text-[#ccc3d8] leading-relaxed">
            Switch instantly between Teen, Young Adult, Middle Age, and Senior looks in one tap with full parameter control.
          </p>
        </div>

        {/* Card 3: HD Downloads & Privacy */}
        <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 md:col-span-2 relative overflow-hidden hover:border-[#ffb784]/40 transition-colors">
          <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none">
            <Download className="w-32 h-32 text-white" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#a15100]/20 flex items-center justify-center text-[#ffb784]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#e8dfee]">HD Downloads & Privacy Guaranteed</h3>
          <p className="text-sm text-[#ccc3d8] leading-relaxed max-w-xl">
            Get high-definition age transformations every time. No watermarks, no paywalls, no hidden fees, and absolute privacy processing.
          </p>
        </div>
      </section>
    </div>
  );
};
