import React from 'react';
import { Globe, Heart, Award, Sparkles } from 'lucide-react';

export default function Participations({ t }) {
  return (
    <section id="participations" className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-3">
            <Globe className="w-4 h-4" />
            <span>{t.participations.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.participations.subtitle}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.participations.desc}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border hover:border-rose-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              مشاريع Erasmus+ الأوروبية
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              المشاركة في برامج التبادل الشبابي والثقافي وتنمية المهارات القيادية والتواصل الدولي في أوروبا.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border hover:border-sky-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              العمل التطوعي والمبادرات
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              التطوع في تنظيم المؤتمرات والفعاليات الشبابية وإدارة الفرق الإعلامية والتقنية بكفاءة.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              التبادل الثقافي والتطوير
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              بناء جسور التواصل بين الشباب العربي والدولي لتبادل الخبرات وتطوير المهارات التقنية الحياتية.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
