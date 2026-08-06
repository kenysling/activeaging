import React from 'react';
import { Home, Camera, Sliders, Grid, Sparkles, Activity } from 'lucide-react';
import { TabType } from '../types';

interface DesktopSidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, desc: 'Overview & Features' },
    { id: 'generate', label: 'Generate', icon: <Camera className="w-5 h-5" />, desc: 'AI Age progression studio' },
    { id: 'showcase', label: 'Showcase', icon: <Sliders className="w-5 h-5" />, desc: 'Comparison & Edits' },
    { id: 'explore', label: 'Explore', icon: <Grid className="w-5 h-5" />, desc: 'AI Longevity Tools' },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#1E293B]/70 backdrop-blur-xl border-r border-white/10 pt-24 px-5 flex-col justify-between z-40 pb-8">
      <div className="flex flex-col gap-2">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#958da1]">
          Navigation
        </div>

        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                isActive
                  ? 'bg-gradient-to-r from-[#7c3aed]/25 to-[#0566d9]/25 text-[#d2bbff] border border-[#7c3aed]/40 shadow-[0_0_20px_rgba(124,58,237,0.25)] font-bold'
                  : 'text-[#ccc3d8] hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-[#7c3aed]/30 text-[#d2bbff]' : 'text-[#958da1] group-hover:text-[#d2bbff]'}`}>
                {tab.icon}
              </div>
              <div>
                <div className="text-sm font-semibold">{tab.label}</div>
                <div className="text-[11px] text-[#958da1] font-normal">{tab.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sidebar Longevity Card */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-[#7c3aed]/20 rounded-full blur-xl" />
        <div className="flex items-center gap-2 text-xs font-bold text-[#d2bbff] mb-1">
          <Sparkles className="w-4 h-4 text-[#d2bbff]" />
          <span>Active Aging AI</span>
        </div>
        <p className="text-xs text-[#ccc3d8] leading-relaxed">
          Simulate realistic age milestones with personalized vitality recommendations.
        </p>
      </div>
    </aside>
  );
};
