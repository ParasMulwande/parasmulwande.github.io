import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, BarChart3, Cpu, Eye, Network, Boxes, Search } from 'lucide-react';

export const TechnicalArsenal: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={16} className="text-[#00f0ff]" />;
      case 'BarChart3':
        return <BarChart3 size={16} className="text-[#a3e635]" />;
      case 'Cpu':
        return <Cpu size={16} className="text-[#00f0ff]" />;
      case 'Eye':
        return <Eye size={16} className="text-[#a3e635]" />;
      case 'Network':
        return <Network size={16} className="text-[#00f0ff]" />;
      case 'Boxes':
        return <Boxes size={16} className="text-[#a3e635]" />;
      default:
        return <Code2 size={16} className="text-[#00f0ff]" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.map(cat => {
    if (!filterQuery.trim()) return cat;
    const q = filterQuery.toLowerCase();
    const matchesCategory = cat.title.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q);
    const matchedSkills = cat.skills.filter(s => s.toLowerCase().includes(q));
    if (matchesCategory || matchedSkills.length > 0) {
      return cat;
    }
    return null;
  }).filter(Boolean);

  return (
    <section id="expertise" className="py-12 sm:py-16 border-b border-white/[0.08] relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        
        {/* Section Header */}
        <div className="space-y-2 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-white/50 uppercase">
            <span className="text-[#00f0ff] font-semibold">[02 // CAPABILITIES & RUNTIMES]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f4f4f6] tracking-tight uppercase">
            TECHNICAL ARSENAL
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-body text-sm sm:text-base text-[#8e8e9f] max-w-2xl">
              Systematic operational competencies spanning statistical computation, neural optimization, and scalable backend implementations.
            </p>
            {/* Quick Skill Filter Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter tools / libraries..."
                aria-label="Filter technical tools"
                className="w-full bg-[#111116] border border-white/10 focus:border-[#00f0ff] rounded pl-8 pr-3 py-1.5 text-xs font-mono-tech text-white placeholder-white/40 focus:outline-none transition-colors"
              />
              {filterQuery && (
                <button
                  onClick={() => setFilterQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono-tech cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 6 Cards 3x2 Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredCategories.map((cat) => {
            if (!cat) return null;
            return (
              <div
                key={cat.id}
                id={`skill-card-${cat.id}`}
                className="group rounded-md border border-white/10 bg-[#0c0c11] p-5 sm:p-6 hover:border-[#00f0ff]/50 hover:bg-[#101017] transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle top edge sheen on hover */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  {/* Card Title & Code Tag */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] mb-3">
                    <div className="flex items-center gap-2 font-mono-tech text-sm font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                      {getIcon(cat.iconName)}
                      <span>{cat.title}</span>
                    </div>
                    <span className="font-mono-tech text-[11px] text-white/40">
                      {cat.code}
                    </span>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cat.skills.map((skill) => {
                      const isHighlighted = filterQuery && skill.toLowerCase().includes(filterQuery.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`px-2 py-1 rounded-sm text-[11px] font-mono-tech border transition-colors ${
                            isHighlighted
                              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]'
                              : 'bg-[#15151e] border-white/[0.08] text-[#00f0ff]/90 group-hover:border-white/20'
                          }`}
                        >
                          [ {skill} ]
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Description */}
                <p className="font-body text-xs text-[#8e8e9f] leading-relaxed pt-3 border-t border-white/[0.06]">
                  {cat.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
