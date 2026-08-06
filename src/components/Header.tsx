import React from 'react';
import { Sparkles, User, Activity } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  hasCustomApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, hasCustomApiKey }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#1E293B]/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_40px_rgba(210,187,255,0.15)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5">
        <button
          onClick={() => onSelectTab('home')}
          aria-label="Active Aging Home"
          className="flex items-center justify-center p-2 rounded-full glass-panel text-[#d2bbff] hover:opacity-80 active:scale-95 transition-all duration-200"
        >
          <Sparkles className="w-5 h-5 text-[#d2bbff] animate-pulse" />
        </button>

        <div 
          onClick={() => onSelectTab('home')}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#0566d9] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-[#d2bbff] via-[#e8dfee] to-[#adc6ff] bg-clip-text text-transparent tracking-tight">
            Active Aging App
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasCustomApiKey && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Gemini AI Active
            </span>
          )}
          <button
            onClick={() => onSelectTab('explore')}
            aria-label="Profile"
            className="flex items-center justify-center p-2 rounded-full glass-panel text-[#ccc3d8] hover:text-[#d2bbff] hover:opacity-90 active:scale-95 transition-all duration-200"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
