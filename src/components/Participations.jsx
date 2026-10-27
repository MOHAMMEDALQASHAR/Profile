import React from 'react';
import { Globe, Heart, Award, Sparkles } from 'lucide-react';

export default function Participations({ t }) {
  return (
    <section id="participations" className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-3">
            <Globe className="w-4 h-4" />
            <span>{t.participations.title}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-4">
            {t.participations.subtitle}
          </h2>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            {t.participations.desc}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          
          <div className="glass-panel p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border hover:border-rose-500/50 transition-all flex flex-col">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-2.5 sm:mb-4">
              <Globe className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2">
              {t.participations.card1Title}
            </h3>
            <p className="text-[10px] sm:text-sm text-slate-300 leading-snug sm:leading-relaxed">
              {t.participations.card1Desc}
            </p>
          </div>

          <div className="glass-panel p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border hover:border-sky-500/50 transition-all flex flex-col">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2.5 sm:mb-4">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2">
              {t.participations.card2Title}
            </h3>
            <p className="text-[10px] sm:text-sm text-slate-300 leading-snug sm:leading-relaxed">
              {t.participations.card2Desc}
            </p>
          </div>

          <div className="glass-panel p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border hover:border-purple-500/50 transition-all col-span-2 md:col-span-1 flex flex-col">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2.5 sm:mb-4">
              <Award className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2">
              {t.participations.card3Title}
            </h3>
            <p className="text-[10px] sm:text-sm text-slate-300 leading-snug sm:leading-relaxed">
              {t.participations.card3Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
