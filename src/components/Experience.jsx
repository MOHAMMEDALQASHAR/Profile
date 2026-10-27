import React from 'react';
import { Briefcase, Code2, Layers, Database, Users, Sparkles } from 'lucide-react';

const iconMap = {
  Code2,
  Layers,
  Database,
  Users
};

export default function Experience({ t }) {
  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
            <Briefcase className="w-4 h-4" />
            <span>{t.experience.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t.experience.subtitle}
          </h2>
        </div>

        {/* Roles Grid (2x2 square layout on mobile) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {t.experience.roles.map((role, idx) => {
            const IconComp = iconMap[role.icon] || Code2;
            return (
              <div 
                key={idx}
                className="glass-panel p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 mb-2.5 sm:mb-6">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                      <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center text-emerald-400">
                        <IconComp className="w-5 h-5 sm:w-7 sm:h-7" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-xl font-bold text-white line-clamp-1 sm:line-clamp-none">
                        {role.title}
                      </h3>
                      <span className="text-[9px] sm:text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{t.experience.mainField}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-[11px] sm:text-sm sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {role.desc}
                  </p>
                </div>

                <div className="hidden sm:flex mt-8 pt-4 border-t border-slate-700/30 items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>{t.experience.domain}</span>
                  <span className="text-sky-400">{t.experience.practicalExp}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
