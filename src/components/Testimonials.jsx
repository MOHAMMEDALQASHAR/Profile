import React from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { MessageSquare, Quote, Star } from 'lucide-react';

export default function Testimonials({ t, lang }) {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <MessageSquare className="w-4 h-4" />
            <span>{t.testimonials.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t.testimonials.subtitle}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => {
            const name = item.name[lang] || item.name.ar;
            const role = item.role[lang] || item.role.ar;
            const comment = item.comment[lang] || item.comment.ar;

            return (
              <div
                key={item.id}
                className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative hover:border-amber-400/50 transition-all"
              >
                <Quote className="w-8 h-8 text-amber-400/30 absolute top-6 left-6" />

                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                    "{comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/30">
                  <img
                    src={item.avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/40"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {name}
                    </h4>
                    <span className="text-xs text-slate-400 block">
                      {role}
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
