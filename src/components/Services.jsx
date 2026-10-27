import React from 'react';
import { 
  Globe, 
  LayoutDashboard, 
  Cpu, 
  Database, 
  Code, 
  Eye, 
  Compass, 
  Wrench,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const icons = [Globe, LayoutDashboard, Cpu, Database, Code, Eye, Compass, Wrench];

export default function Services({ t }) {
  return (
    <section id="services" className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>{t.services.title}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-4">
            {t.services.subtitle}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {t.services.items.map((service, idx) => {
            const IconComp = icons[idx % icons.length];
            return (
              <div 
                key={idx}
                className="glass-card p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:border-sky-500/50 transition-all group"
              >
                <div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2.5 sm:mb-4 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <IconComp className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-sky-400 transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-slate-300 leading-snug sm:leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-3 sm:mt-6 pt-2 sm:pt-3 border-t border-slate-700/30 flex items-center justify-between text-[10px] sm:text-xs font-bold text-sky-400">
                  <a href="#contact" className="hover:underline flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{t.services.requestService || t.contact.requestService || 'طلب الخدمة'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
