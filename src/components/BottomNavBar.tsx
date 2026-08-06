import React from 'react';
import { Home, Camera, Sliders, Grid } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'generate', label: 'Generate', icon: <Camera className="w-5 h-5" /> },
    { id: 'showcase', label: 'Showcase', icon: <Sliders className="w-5 h-5" /> },
    { id: 'explore', label: 'Explore', icon: <Grid className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-[#1E293B]/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] md:hidden">
      <div className="flex justify-around items-center h-20 px-3 pb-safe">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-[#7c3aed]/20 text-[#d2bbff] border border-[#7c3aed]/40 shadow-[0_0_12px_rgba(124,58,237,0.3)]'
                  : 'text-[#958da1] hover:text-[#d2bbff]'
              }`}
            >
              <div className={isActive ? 'text-[#d2bbff]' : ''}>{tab.icon}</div>
              <span className={`text-[11px] font-semibold mt-1 tracking-tight ${isActive ? 'text-[#d2bbff]' : 'text-[#958da1]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
