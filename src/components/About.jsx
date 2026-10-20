import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { UserCheck, Award, Calendar, BookOpen, HeartHandshake, MapPin } from 'lucide-react';

export default function About({ t, lang }) {
  const { bioInfo } = usePortfolio();

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-3">
            <UserCheck className="w-4 h-4" />
            <span>{t.about.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.about.subtitle}
          </h2>
        </div>

        {/* Bio Cards Grid with Profile Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Profile Picture Box */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-sky-500 to-purple-600 shadow-xl border border-slate-800">
              <img
                src="/mohamed-profile.png"
                alt="م. محمد طه القشار"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover rounded-[22px]"
              />
            </div>
          </div>

          {/* Main Story Box */}
          <div className="lg:col-span-8 glass-panel p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-8 bg-gradient-to-b from-sky-400 to-indigo-600 rounded-full inline-block" />
              <h3 className="text-2xl font-bold text-white">
                نبذة عني (About Mohamed Taha)
              </h3>
            </div>

            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p className="font-semibold text-white text-lg">
                {bioInfo.bioText1 || t.about.bioText1}
              </p>
              <p>
                {bioInfo.bioText2 || t.about.bioText2}
              </p>
              <p>
                {t.about.bioText3}
              </p>
            </div>

            {/* Quick Details Badges */}
            <div className="mt-8 pt-6 border-t border-slate-700/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/40 dark:bg-slate-900/50 border border-slate-700/30">
                <BookOpen className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">الجامعة والكلية</span>
                  <span className="text-xs font-bold text-slate-200">{bioInfo.university || "جامعة بارتن - هندسة البرمجيات"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/40 dark:bg-slate-900/50 border border-slate-700/30">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">البلد والأصول</span>
                  <span className="text-xs font-bold text-slate-200">اليمن 🇾🇪 / تركيا 🇹🇷</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Timeline Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white gradient-text">
              {t.about.timelineTitle}
            </h3>
          </div>

          <div className="relative border-r-2 border-slate-700/50 dark:border-slate-700/50 mr-4 sm:mr-32 space-y-10">
            {t.about.timeline.map((item, idx) => (
              <div key={idx} className="relative pr-8 sm:pr-10 group">
                
                {/* Dot */}
                <div className="absolute -right-3 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-sky-400 group-hover:bg-sky-400 group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-sky-400 group-hover:bg-slate-950" />
                </div>

                {/* Card */}
                <div className="glass-card p-6 rounded-2xl border border-slate-700/40 hover:border-sky-500/50 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-extrabold text-xs">
                      {item.year}
                    </span>
                    <span className="text-xs font-semibold text-purple-400">
                      {item.institution}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h4>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
