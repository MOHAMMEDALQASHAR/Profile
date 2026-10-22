import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FolderGit2, 
  FileText, 
  Send, 
  GraduationCap, 
  Award, 
  Globe2, 
  Sparkles,
  Heart,
  Cpu,
  CheckCircle2
} from 'lucide-react';

export default function Hero({ t, openCvModal }) {
  const { bioInfo, projects, certificates } = usePortfolio();

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Glow background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-glow" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Main Content (Text & CTAs) */}
          <div className="flex-1 text-center lg:text-start flex flex-col items-center lg:items-start">
            
            {/* Greeting */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-400 mb-2">
              {t.hero.greeting}
            </h2>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white">
              <span className="gradient-text">{bioInfo.name || t.hero.name}</span>
            </h1>

            {/* Subtitle / Role */}
            <div className="mb-6 text-xl sm:text-2xl font-bold text-slate-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
                {bioInfo.role || t.hero.role}
              </span>
            </div>

            {/* Bio Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              {t.hero.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#projects"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <FolderGit2 className="w-5 h-5" />
                <span>{t.hero.btnProjects}</span>
              </a>

              <button
                onClick={() => {
                  if (bioInfo?.cvUrl) {
                    const link = document.createElement('a');
                    link.href = bioInfo.cvUrl;
                    link.download = bioInfo.cvFileName || 'Mohamed_Taha_Alqashar_CV.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } else {
                    openCvModal();
                  }
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900/80 dark:bg-slate-900/90 bg-white border border-slate-700/60 text-slate-200 dark:text-slate-200 text-slate-800 font-bold text-sm sm:text-base hover:border-sky-500/50 hover:bg-slate-800/90 hover:-translate-y-1 transition-all duration-300 shadow-md"
              >
                <FileText className="w-5 h-5 text-sky-400" />
                <span>{t.hero.btnCv}</span>
              </button>

              <a
                href="#contact"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-purple-600/20 dark:bg-purple-600/20 border border-purple-500/40 text-purple-300 dark:text-purple-300 text-purple-800 font-bold text-sm sm:text-base hover:bg-purple-600/30 hover:-translate-y-1 transition-all duration-300"
              >
                <Send className="w-5 h-5 text-purple-400" />
                <span>{t.hero.btnContact}</span>
              </a>
            </div>

          </div>

          {/* Right Visual Frame: Circular Profile Image */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">

            <div className="relative flex flex-col items-center">

              {/* Spinning gradient ring */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">

                {/* Outer animated glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 animate-spin shadow-2xl shadow-sky-500/40" style={{ animationDuration: '6s' }} />

                {/* White spacer ring */}
                <div className="absolute inset-[3px] rounded-full bg-slate-950" />

                {/* Inner gradient ring */}
                <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-purple-600/30" />

                {/* Profile Image */}
                <img
                  src="/mohamed-profile.jpg"
                  alt="م. محمد طه القشار"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="absolute inset-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />

                {/* Online badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 backdrop-blur-sm shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-bold text-emerald-400">متاح للعمل</span>
                </div>
              </div>

              {/* Name card below */}
              <div className="mt-6 px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-md shadow-xl text-center">
                <h4 className="font-extrabold text-white text-base">محمد طه القشار</h4>
                <span className="text-xs text-sky-400 font-semibold">مهندس برمجيات • جامعة بارتن 🎓</span>
              </div>

            </div>

          </div>

        </div>

        {/* Quick Highlights Counter Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
            <GraduationCap className="w-7 h-7 text-sky-400 mb-2" />
            <span className="text-xs font-bold text-slate-300 dark:text-slate-300 text-slate-700">{t.hero.stats.degree}</span>
            <span className="text-[10px] text-sky-400 mt-1">{bioInfo.university || t.hero.stats.university}</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
            <Cpu className="w-7 h-7 text-purple-400 mb-2" />
            <span className="text-xl font-extrabold text-white gradient-text">+{projects.length}</span>
            <span className="text-xs text-slate-400 mt-0.5">{t.hero.stats.projects}</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
            <Globe2 className="w-7 h-7 text-emerald-400 mb-2" />
            <span className="text-xs font-bold text-slate-300 dark:text-slate-300 text-slate-700">{t.hero.stats.international}</span>
            <span className="text-[10px] text-emerald-400 mt-1">International Programs</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
            <Sparkles className="w-7 h-7 text-indigo-400 mb-2" />
            <span className="text-xs font-bold text-slate-300 dark:text-slate-300 text-slate-700">{t.hero.stats.erasmus}</span>
            <span className="text-[10px] text-indigo-400 mt-1">Youth Exchange</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
            <Heart className="w-7 h-7 text-rose-400 mb-2" />
            <span className="text-xs font-bold text-slate-300 dark:text-slate-300 text-slate-700">{t.hero.stats.volunteer}</span>
            <span className="text-[10px] text-rose-400 mt-1">Community Leader</span>
          </div>

        </div>

      </div>
    </section>
  );
}
