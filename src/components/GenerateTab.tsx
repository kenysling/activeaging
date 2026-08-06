import React, { useState, useRef } from 'react';
import { Camera, ImagePlus, CheckCircle, Wand2, Sparkles, RefreshCw, Upload, FileText, ChevronDown } from 'lucide-react';
import { AgePreset, AIModelOption, TabType } from '../types';
import { AGE_PRESETS, AI_MODELS } from '../data';

interface GenerateTabProps {
  selectedPreset: AgePreset;
  onSelectPreset: (preset: AgePreset) => void;
  selectedModel: AIModelOption;
  onSelectModel: (model: AIModelOption) => void;
  uploadedImage: string;
  onImageChange: (imageUrl: string) => void;
  customPrompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const GenerateTab: React.FC<GenerateTabProps> = ({
  selectedPreset,
  onSelectPreset,
  selectedModel,
  onSelectModel,
  uploadedImage,
  onImageChange,
  customPrompt,
  onPromptChange,
  onGenerate,
  isGenerating,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'prompt'>('presets');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 pb-16">
      {/* Header Text */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d2bbff]">
          AI Age Progression
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e8dfee]">
          Time Travel, Visualized.
        </h2>
        <p className="text-sm text-[#ccc3d8] max-w-md mx-auto leading-relaxed">
          Upload a photo to see ultra-realistic AI age transformations across different life stages.
        </p>
      </div>

      {/* Upload Zone */}
      <section className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#d2bbff]/30 hover:border-[#d2bbff]/60 transition-colors relative overflow-hidden group cursor-pointer min-h-[220px]">
        {uploadedImage ? (
          <div className="relative w-full flex flex-col items-center">
            <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#d2bbff] shadow-xl mb-3">
              <img src={uploadedImage} alt="Uploaded source" className="w-full h-full object-cover" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="absolute inset-0 bg-black/40 hover:bg-black/60 transition-colors flex flex-col items-center justify-center text-white text-xs font-semibold gap-1 opacity-0 group-hover:opacity-100"
              >
                <RefreshCw className="w-5 h-5 text-[#d2bbff]" />
                <span>Change Image</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#d2bbff] font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Photo Ready for AI Progression</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="bg-[#2c2833] rounded-full p-4 mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300 text-[#d2bbff]">
              <ImagePlus className="w-8 h-8 text-[#d2bbff]" />
            </div>
            <h3 className="text-base font-bold text-[#e8dfee] mb-1">
              Tap to Upload Image
            </h3>
            <p className="text-xs text-[#ccc3d8]">
              Supports WEBP, JPG, PNG up to 10MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </section>

      {/* Configuration Panel */}
      <section className="space-y-6">
        {/* Switcher Tabs (Age Presets vs Custom Prompt) */}
        <div className="flex p-1 bg-[#1d1a24] rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2.5 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'presets'
                ? 'bg-[#2c2833] text-[#e8dfee] shadow-md font-bold'
                : 'text-[#ccc3d8] hover:text-[#e8dfee]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d2bbff]" />
            <span>Age Presets</span>
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 py-2.5 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'prompt'
                ? 'bg-[#2c2833] text-[#e8dfee] shadow-md font-bold'
                : 'text-[#ccc3d8] hover:text-[#e8dfee]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#adc6ff]" />
            <span>Custom Prompt</span>
          </button>
        </div>

        {/* Content for Age Presets */}
        {activeTab === 'presets' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AGE_PRESETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className="flex flex-col gap-2 text-left group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`relative w-full aspect-square rounded-xl overflow-hidden border transition-all ${
                      isSelected
                        ? 'border-[#d2bbff] ring-2 ring-[#d2bbff]/40 shadow-[0_0_15px_rgba(210,187,255,0.3)]'
                        : 'border-white/10 group-hover:border-[#d2bbff]/40'
                    }`}
                  >
                    <img
                      src={preset.image}
                      alt={preset.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#7c3aed] text-white rounded-full p-0.5 shadow-md">
                        <CheckCircle className="w-4 h-4 fill-current text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#d2bbff]' : 'text-[#ccc3d8] group-hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-[#958da1]">{preset.ageRange}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#ccc3d8]">
              Specific Age Transformation Prompt
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="e.g. Add subtle silver highlights, warm smile, active outdoorsy vitality, 75 years old..."
              className="w-full bg-[#1d1a24] border border-white/10 rounded-xl p-3.5 text-sm text-[#e8dfee] placeholder:text-[#958da1] focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none h-28 resize-none"
            />
          </div>
        )}

        {/* AI Model Selection */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#958da1]">
            AI Longevity Model
          </label>
          <div className="relative">
            <select
              value={selectedModel.id}
              onChange={(e) => {
                const found = AI_MODELS.find((m) => m.id === e.target.value);
                if (found) onSelectModel(found);
              }}
              className="w-full bg-[#1d1a24] border border-white/10 text-[#e8dfee] rounded-xl py-3.5 pl-4 pr-10 appearance-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent text-sm font-semibold cursor-pointer outline-none"
            >
              {AI_MODELS.map((model) => (
                <option key={model.id} value={model.id} className="bg-[#15121b] text-white">
                  {model.name} ({model.speed})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#ccc3d8]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#0566d9] to-[#7c3aed] text-white font-extrabold text-base shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 text-white animate-spin" />
              <span>Simulating Age Transformation...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 text-white" />
              <span>Generate Transformation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
