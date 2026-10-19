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
    { href: "#certificates", label: t.nav.certificates },
    { href: "#services", label: t.nav.services },
    { href: "#contact", label: t.nav.contact },
  ];

  const languages = [
    { code: 'ar', label: 'العربية 🇸🇦' },
    { code: 'en', label: 'English 🇬🇧' },
    { code: 'tr', label: 'Türkçe 🇹🇷' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-slate-950/80 dark:bg-slate-950/85 bg-white/85 backdrop-blur-xl border-b border-slate-700/30 shadow-lg' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-sky-400 font-bold text-lg">
                <Code2 className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight gradient-text leading-tight">
                محمد طه القشار
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">
                Software Engineer
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

          {/* Right Action Icons & Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Admin Panel Button */}
            <button
              onClick={openAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                  : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:border-sky-500/40 hover:text-sky-400'
              }`}
              title="لوحة تحكم الأدمن"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAdminLoggedIn ? 'لوحة التحكم' : 'دخول الأدمن'}</span>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-800/40 dark:bg-slate-800/50 border border-slate-700/40 text-slate-300 text-xs font-semibold hover:border-sky-500/40 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span className="uppercase">{lang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 py-1 bg-slate-900 dark:bg-slate-900 bg-white rounded-xl shadow-xl border border-slate-700/40 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-right dir-rtl px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-sky-500/10 hover:text-sky-400 transition-colors ${
                        lang === l.code ? 'text-sky-400 font-bold bg-sky-500/10' : 'text-slate-300 dark:text-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={openAdmin}
              className="p-2 rounded-full bg-slate-800/60 border border-slate-700/40 text-amber-400"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40 text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <span>لوحة تحكم الأدمن</span>
              </button>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Language:</span>
                <div className="flex gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        lang === l.code ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {l.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Theme:</span>
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
