import React, { useState, useEffect } from 'react';
import { translations } from './data/translations';
import { usePortfolio } from './context/PortfolioContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Participations from './components/Participations';
import Services from './components/Services';
import PhotoGallery from './components/PhotoGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CvModal from './components/CvModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const { isAdminLoggedIn } = usePortfolio();
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('dark');
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const t = translations[lang] || translations.ar;
  const isRtl = t.dir === 'rtl';

  useEffect(() => {
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang, t.dir]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAdminTrigger = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className={`min-h-screen relative font-sans ${theme} ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      
      {/* 3D Canvas Background */}
      <ParticleBackground theme={theme} />

      {/* Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        t={t}
        openCvModal={() => setIsCvModalOpen(true)}
        openAdmin={handleAdminTrigger}
      />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero t={t} openCvModal={() => setIsCvModalOpen(true)} />
        <Experience t={t} />
        <Projects t={t} lang={lang} />
        <Certificates t={t} lang={lang} />
        <Participations t={t} />
        <Services t={t} />
        <PhotoGallery t={t} lang={lang} />
        <Contact t={t} />
      </main>

      {/* Footer */}
      <Footer t={t} openAdmin={handleAdminTrigger} />

      {/* Modals & AI Chat Drawer */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        t={t}
        lang={lang}
      />


      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

    </div>
  );
}
