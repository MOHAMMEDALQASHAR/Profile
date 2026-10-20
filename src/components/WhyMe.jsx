import React from 'react';
import { HelpCircle, CheckCircle, ShieldCheck, Zap, Users2 } from 'lucide-react';

const icons = [CheckCircle, ShieldCheck, Zap, Users2];

export default function WhyMe({ t }) {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>{t.whyMe.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t.whyMe.subtitle}
          </h2>
          {t.whyMe.desc && (
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.whyMe.desc}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyMe.cards.map((card, idx) => {
            const IconComp = icons[idx % icons.length];
            return (
              <div 
                key={idx}
                className="glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-indigo-500/50 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-700/30 flex items-center justify-end text-[11px] font-bold text-indigo-400">
                  <span>معيار احترافي</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
