import React, { useState } from 'react';
import { Search, Heart, Palette, Eye, Brush, HeartPulse, Sparkles, ArrowRight, Check } from 'lucide-react';
import { AITool, TabType } from '../types';
import { EXPLORE_TOOLS } from '../data';

interface ExploreTabProps {
  onSelectTool: (tool: AITool) => void;
  onNavigateToGenerate: () => void;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({ onSelectTool, onNavigateToGenerate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'colorize-photo': true,
  });
  const [activeModalTool, setActiveModalTool] = useState<AITool | null>(null);

  const categories = ['All', 'Popular', 'Enhance', 'Creative', 'Active Wellness'];

  const toggleFavorite = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [toolId]: !prev[toolId] }));
  };

  const filteredTools = EXPLORE_TOOLS.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-20">
      {/* Header */}
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e8dfee]">
          Explore Tools
        </h2>
        <p className="text-sm text-[#ccc3d8]">
          Discover powerful AI models to transform your media and visualize active aging.
        </p>
      </section>

      {/* Search Input */}
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#958da1]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search AI tools..."
          className="w-full bg-[#1d1a24] border border-white/10 text-[#e8dfee] placeholder:text-[#958da1] rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none text-sm transition-all glass-panel"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'glass-panel text-[#ccc3d8] hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => (
          <article
            key={tool.id}
            onClick={() => setActiveModalTool(tool)}
            className="glass-panel rounded-2xl overflow-hidden flex flex-col group cursor-pointer hover:border-[#d2bbff]/40 transition-all duration-300 hover:shadow-xl"
          >
            {/* Card Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent pointer-events-none" />

              {/* Tool Category Badge */}
              <div className="absolute top-3 left-3 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 border border-white/10 bg-[#1E293B]/80 text-xs font-bold text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#d2bbff]" />
                <span>{tool.badge}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col gap-2 flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base text-[#e8dfee] group-hover:text-[#d2bbff] transition-colors">
                  {tool.title}
                </h3>
                <button
                  onClick={(e) => toggleFavorite(e, tool.id)}
                  aria-label="Favorite tool"
                  className="p-1 text-[#958da1] hover:text-[#ffb4ab] transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites[tool.id] ? 'fill-[#ffb4ab] text-[#ffb4ab]' : ''
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-[#ccc3d8] leading-relaxed line-clamp-2">
                {tool.description}
              </p>

              <div className="mt-auto pt-3 flex items-center justify-between text-xs font-bold text-[#d2bbff] group-hover:translate-x-1 transition-transform">
                <span>Try Model</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal for Tool Details & Execution */}
      {activeModalTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 space-y-5 border border-white/20 relative shadow-2xl">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
              <img
                src={activeModalTool.image}
                alt={activeModalTool.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                {activeModalTool.badge}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#e8dfee] mb-1">
                {activeModalTool.title}
              </h3>
              <p className="text-sm text-[#ccc3d8] leading-relaxed">
                {activeModalTool.description}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectTool(activeModalTool);
                  setActiveModalTool(null);
                  onNavigateToGenerate();
                }}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#0566d9] text-white font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply in Age Studio</span>
              </button>

              <button
                onClick={() => setActiveModalTool(null)}
                className="px-5 py-3.5 rounded-full glass-panel text-[#ccc3d8] font-bold text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
