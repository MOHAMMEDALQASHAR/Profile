import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';

export default function Footer({ t }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-sky-400 font-bold">
                <Code2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">
                {t.footer?.name || t.navbar?.name || t.hero?.name || "Mohamed Taha Al-Qashar"}
              </span>
              <span className="text-xs text-slate-400">
                {t.footer.rights}
              </span>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-sky-400 hover:border-sky-500/50 transition-all text-xs font-bold"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>
    </footer>
  );
}
