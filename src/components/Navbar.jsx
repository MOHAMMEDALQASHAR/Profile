import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Globe, 
  Sun, 
  Moon, 
  FileText, 
  Menu, 
  X, 
  Code2,
  ChevronDown,
  Lock,
  Sparkles
} from 'lucide-react';

export default function Navbar({ lang, setLang, theme, toggleTheme, t, openCvModal, openAdmin }) {
  const { isAdminLoggedIn, bioInfo } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleCvClick = () => {
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
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#services", label: t.nav.services },
    { href: "#contact", label: t.nav.contact },
  ];

  const languages = [
    { code: 'ar', label: 'العربية 🇸🇦', flag: '🇸🇦', short: 'عربي' },
    { code: 'en', label: 'English 🇬🇧', flag: '🇬🇧', short: 'EN' },
    { code: 'tr', label: 'Türkçe 🇹🇷', flag: '🇹🇷', short: 'TR' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2.5 sm:py-3 bg-slate-950/85 dark:bg-slate-950/90 bg-white/90 backdrop-blur-xl border-b border-slate-700/30 shadow-lg' 
        : 'py-3 sm:py-5 bg-slate-950/50 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-slate-800/40 sm:border-b-0'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group min-w-0 shrink">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-sky-400 font-bold text-base sm:text-lg">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-xs sm:text-lg tracking-tight gradient-text leading-tight truncate">
                {t.navbar?.name || t.hero?.name || "Mohamed Taha Al-Qashar"}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-400 font-medium truncate">
                {t.navbar?.role || "Software Engineer"}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/40 dark:bg-slate-900/50 bg-slate-100/70 p-1.5 rounded-full border border-slate-700/30">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-slate-300 dark:text-slate-300 text-slate-700 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-slate-800/50 dark:hover:bg-slate-800/60 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons for Desktop */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Prominent Language Switcher Pill */}
            <div className="flex items-center bg-slate-900/90 dark:bg-slate-900/90 p-1 rounded-full border border-sky-500/40 shadow-md">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    lang === l.code
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-105'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  title={l.label}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span className="font-extrabold">{l.short}</span>
                </button>
              ))}
            </div>

            {/* Admin Panel Button */}
            <button
              onClick={openAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                  : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:border-sky-500/40 hover:text-sky-400'
              }`}
              title={isAdminLoggedIn ? (t.nav.adminDashboard || 'لوحة التحكم') : (t.nav.adminLogin || 'دخول الأدمن')}
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAdminLoggedIn ? (t.nav.adminDashboard || 'لوحة التحكم') : (t.nav.adminLogin || 'دخول الأدمن')}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-800/40 dark:bg-slate-800/50 border border-slate-700/40 text-slate-300 hover:text-amber-400 transition-all"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* CV Download Modal Button */}
            <button
              onClick={handleCvClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.nav.downloadCv}</span>
            </button>
          </div>

          {/* Mobile Right Controls: Prominent Language Switcher + Menu */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            {/* Prominent Language Switcher on Mobile (Always visible at the top) */}
            <div className="flex items-center bg-slate-900/95 dark:bg-slate-900/95 border border-sky-500/50 p-0.5 rounded-xl shadow-lg shadow-sky-500/10">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 ${
                    lang === l.code
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={l.label}
                >
                  <span className="text-xs">{l.flag}</span>
                  <span className="uppercase text-[10px]">{l.code}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-200 hover:text-white hover:bg-slate-700 transition-all shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-4 pb-6 mt-3 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800/80 hover:text-sky-400"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdmin();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
              >
                <Lock className="w-4 h-4" />
                <span>{isAdminLoggedIn ? (t.nav.adminDashboard || 'لوحة التحكم') : (t.nav.adminLogin || 'دخول الأدمن')}</span>
              </button>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'اللغة' : lang === 'tr' ? 'Dil' : 'Language'}:</span>
                <div className="flex gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        lang === l.code ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.short}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'المظهر' : lang === 'tr' ? 'Tema' : 'Theme'}:</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCvClick();
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-md text-center flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{t.nav.downloadCv}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
