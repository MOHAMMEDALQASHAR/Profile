import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon } from './Icons';
import { 
  Code2, 
  Terminal, 
  Coffee, 
  Code, 
  FileCode, 
  FileCode2, 
  Database, 
  Atom, 
  Globe, 
  Layout, 
  Palette, 
  Wind, 
  Box, 
  Cpu, 
  Zap, 
  Server, 
  Share2, 
  Flame, 
  HardDrive, 
  Eye, 
  Target, 
  Brain, 
  Sparkles, 
  Camera, 
  GitBranch, 
  Container, 
  Send, 
  Monitor,
  Wrench
} from 'lucide-react';

const iconMap = {
  Code2, Terminal, Coffee, Code, FileCode, FileCode2, Database, Atom, Globe,
  Layout, Palette, Wind, Box, Cpu, Zap, Server, Share2, Flame, HardDrive,
  Eye, Target, Brain, Sparkles, Camera, GitBranch, Github: GithubIcon, Container, Send, Monitor
};

export default function Skills({ t }) {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: t.skills.categories.all },
    { key: 'languages', label: t.skills.categories.languages },
    { key: 'web', label: t.skills.categories.web },
    { key: 'backend', label: t.skills.categories.backend },
    { key: 'database', label: t.skills.categories.database },
    { key: 'ai', label: t.skills.categories.ai },
    { key: 'tools', label: t.skills.categories.tools }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative z-10 bg-slate-900/30 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-3">
            <Wrench className="w-4 h-4" />
            <span>{t.skills.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.skills.subtitle}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 scale-105'
                  : 'bg-slate-800/50 dark:bg-slate-800/50 border border-slate-700/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div 
                key={index} 
                className="glass-card p-5 rounded-2xl flex items-center justify-between group hover:border-sky-500/50 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:text-purple-400 transition-all shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {skill.name}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {skill.badge}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
