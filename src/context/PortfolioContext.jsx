import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectsData as initialProjects } from '../data/projectsData';
import { certificatesData as initialCertificates } from '../data/certificatesData';
import { skillsData as initialSkills } from '../data/skillsData';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('alqashar_admin_logged_in') === 'true';
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('alqashar_admin_password') || 'admin123';
  });

  // Messages State (Saved locally)
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('alqashar_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Helper to ensure projects have gallery and videoUrl populated from defaults if missing
  const enrichProjects = (projList) => {
    if (!Array.isArray(projList)) return initialProjects;
    return projList.map(p => {
      if (p.id === 'data-analytics-dashboard') {
        const cvProj = initialProjects.find(init => init.id === 'cv-email-sender');
        if (cvProj) return cvProj;
      }
      const matchInit = initialProjects.find(init => init.id === (p.customId || p.id));
      if (!matchInit) return p;
      if (matchInit.id === 'ahla-al-ayyam' || matchInit.id === 'smart-ai-attendance' || matchInit.id === 'cv-email-sender') {
        return {
          ...p,
          title: matchInit.title,
          shortDesc: matchInit.shortDesc,
          longDesc: matchInit.longDesc,
          tech: matchInit.tech,
          highlights: matchInit.highlights,
          image: matchInit.image,
          demoUrl: matchInit.demoUrl,
          githubUrl: matchInit.githubUrl,
          gallery: matchInit.gallery,
          videoUrl: matchInit.videoUrl
        };
      }
      const gallery = p.gallery !== undefined
        ? p.gallery
        : (matchInit?.gallery || []);
      const videoUrl = p.videoUrl !== undefined ? p.videoUrl : (matchInit?.videoUrl || '');
      return {
        ...p,
        image: matchInit.image || p.image,
        demoUrl: matchInit.demoUrl || p.demoUrl,
        gallery,
        videoUrl
      };
    });
  };

  // Projects State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('alqashar_projects');
    return saved ? enrichProjects(JSON.parse(saved)) : initialProjects;
  });

  // Helper to ensure certificates have gallery populated from defaults if missing
  const enrichCertificates = (certList) => {
    if (!Array.isArray(certList)) return initialCertificates;
    return certList.map(c => {
      const matchInit = initialCertificates.find(init => init.id === (c.customId || c.id));
      if (!matchInit) return c;
      if (matchInit.id === 'cert-2') {
        return {
          ...c,
          title: matchInit.title,
          issuer: matchInit.issuer,
          badge: matchInit.badge,
          date: matchInit.date,
          pdfUrl: matchInit.pdfUrl,
          image: matchInit.image,
          gallery: matchInit.gallery
        };
      }
      const gallery = (c.gallery && c.gallery.length > 0)
        ? c.gallery
        : (matchInit?.gallery || []);
      return {
        ...c,
        gallery
      };
    });
  };

  // Certificates State
  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('alqashar_certificates');
    return saved ? enrichCertificates(JSON.parse(saved)) : enrichCertificates(initialCertificates);
  });

  // Skills State
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('alqashar_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  // Contact Info State
  const [contactInfo, setContactInfo] = useState(() => {
    const saved = localStorage.getItem('alqashar_contact_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.linkedin || parsed.linkedin === 'mohamed-taha-alqashar') {
          parsed.linkedin = 'mohammed-taha-alqashar-9579422b6';
        }
        if (!parsed.github || parsed.github.toLowerCase() === 'mohamed-taha-alqashar') {
          parsed.github = 'MOHAMMEDALQASHAR';
        }
        if (!parsed.instagram) {
          parsed.instagram = 'alqashar123';
        }
        if (!parsed.youtube) {
          parsed.youtube = 'https://youtube.com/@alqashar?si=BLeQdUXFnnm4Qy0c';
        }
        if (!parsed.whatsapp || parsed.whatsapp === '905526909944' || parsed.whatsapp.includes('552')) {
          parsed.whatsapp = '905357422137';
        }
        if (!parsed.phone || parsed.phone.includes('552')) {
          parsed.phone = '+905357422137';
        }
        delete parsed.telegram;
        return parsed;
      } catch {
        // fallback to defaults
      }
    }
    return {
      email: 'alqashar2002@gmail.com',
      phone: '+905357422137',
      whatsapp: '905357422137',
      linkedin: 'mohammed-taha-alqashar-9579422b6',
      github: 'MOHAMMEDALQASHAR',
      instagram: 'alqashar123',
      youtube: 'https://youtube.com/@alqashar?si=BLeQdUXFnnm4Qy0c'
    };
  });

  // Bio & Intro Info State
  const [bioInfo, setBioInfo] = useState(() => {
    const saved = localStorage.getItem('alqashar_bio_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.bioText1 && parsed.bioText1.includes('أنا Mohamed Taha Al-Qashar، مهندس برمجيات يمني')) {
          parsed.bioText1 = 'متخصص في تطوير تطبيقات الويب، أنظمة الذكاء الاصطناعي، وقواعد البيانات. أسعى لبناء تقنيات تصنع أثرًا حقيقيًا وتلبي تطلعات الأفراد والمؤسسات.';
        }
        if (!parsed.role || parsed.role === 'مهندس برمجيات ومطور حلول رقمية') {
          parsed.role = 'مهندس حاسوب ومطور برمجيات وحلول رقمية';
        }
        if (!parsed.cvUrl || parsed.cvUrl === '') {
          parsed.cvUrl = '/cv.pdf';
          parsed.cvFileName = 'Mohamed_Taha_Alqashar_CV.pdf';
        }
        return parsed;
      } catch {
        // fallback
      }
    }
    return {
      name: 'محمد طه القشار',
      role: 'مهندس حاسوب ومطور برمجيات وحلول رقمية',
      university: 'جامعة بارتن - تركيا',
      bioText1: 'متخصص في تطوير تطبيقات الويب، أنظمة الذكاء الاصطناعي، وقواعد البيانات. أسعى لبناء تقنيات تصنع أثرًا حقيقيًا وتلبي تطلعات الأفراد والمؤسسات.',
      bioText2: 'خلال رحلتي الأكاديمية والعملية عملت على تطوير العديد من المشاريع باستخدام أحدث التقنيات وشاركت في برامج شبابية دولية وErasmus+.',
      cvUrl: '/cv.pdf',
      cvFileName: 'Mohamed_Taha_Alqashar_CV.pdf'
    };
  });

  // LocalStorage Persist Effects
  useEffect(() => {
    try {
      localStorage.setItem('alqashar_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('Could not save projects to localStorage:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('alqashar_certificates', JSON.stringify(certificates));
    } catch (e) {
      console.warn('Could not save certificates to localStorage:', e);
    }
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem('alqashar_skills', JSON.stringify(skills));
    } catch (e) {
      console.warn('Could not save skills to localStorage:', e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem('alqashar_contact_info', JSON.stringify(contactInfo));
    } catch (e) {
      console.warn('Could not save contact info to localStorage:', e);
    }
  }, [contactInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('alqashar_bio_info', JSON.stringify(bioInfo));
    } catch (e) {
      console.warn('Could not save bio info to localStorage:', e);
    }
  }, [bioInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('alqashar_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save messages to localStorage:', e);
    }
  }, [messages]);

  // Auth Functions
  const loginAdmin = (username, password) => {
    if (username.trim() === 'admin' && password === adminPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('alqashar_admin_logged_in', 'true');
      return { success: true };
    }
    return { success: false, message: 'اسم المستخدم أو كلمة السر غير صحيحة' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('alqashar_admin_logged_in');
  };

  const changePassword = (newPassword) => {
    setAdminPassword(newPassword);
    localStorage.setItem('alqashar_admin_password', newPassword);
  };

  // Projects CRUD
  const addProject = (newProj) => {
    const projWithId = {
      ...newProj,
      customId: newProj.customId || `proj-${Date.now()}`
    };
    setProjects(prev => [projWithId, ...prev]);
  };

  const updateProject = (id, updatedData) => {
    setProjects(prev => prev.map(p => 
      (String(p._id) === String(id) || String(p.id) === String(id) || String(p.customId) === String(id)) 
        ? { ...p, ...updatedData } 
        : p
    ));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => 
      String(p._id) !== String(id) && String(p.id) !== String(id) && String(p.customId) !== String(id)
    ));
  };

  // Certificates CRUD
  const addCertificate = (newCert) => {
    const certWithId = {
      ...newCert,
      customId: newCert.customId || `cert-${Date.now()}`
    };
    setCertificates(prev => [certWithId, ...prev]);
  };

  const updateCertificate = (id, updatedData) => {
    setCertificates(prev => prev.map(c => 
      (String(c._id) === String(id) || String(c.id) === String(id) || String(c.customId) === String(id)) 
        ? { ...c, ...updatedData } 
        : c
    ));
  };

  const deleteCertificate = (id) => {
    setCertificates(prev => prev.filter(c => 
      String(c._id) !== String(id) && String(c.id) !== String(id) && String(c.customId) !== String(id)
    ));
  };

  // Skills CRUD
  const addSkill = (newSkill) => {
    setSkills(prev => [newSkill, ...prev]);
  };

  const updateSkill = (idOrName, updatedData) => {
    setSkills(prev => prev.map(s => 
      (String(s._id) === String(idOrName) || String(s.name) === String(idOrName)) 
        ? { ...s, ...updatedData } 
        : s
    ));
  };

  const deleteSkill = (idOrName) => {
    setSkills(prev => prev.filter(s => 
      String(s._id) !== String(idOrName) && String(s.name) !== String(idOrName)
    ));
  };

  // Contact Form Submission
  const sendMessage = async (msgData) => {
    const newMsg = {
      ...msgData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [newMsg, ...prev]);
    return { success: true };
  };

  // Contact / Bio updating
  const updateContactInfo = (newContact) => {
    setContactInfo(newContact);
  };

  const updateBioInfo = (newBio) => {
    setBioInfo(newBio);
  };

  // Reset to Defaults
  const resetAllData = () => {
    setProjects(initialProjects);
    setCertificates(initialCertificates);
    setSkills(initialSkills);
    localStorage.removeItem('alqashar_projects');
    localStorage.removeItem('alqashar_certificates');
    localStorage.removeItem('alqashar_skills');
    localStorage.removeItem('alqashar_contact_info');
    localStorage.removeItem('alqashar_bio_info');
    localStorage.removeItem('alqashar_messages');
  };

  return (
    <PortfolioContext.Provider
      value={{
        isDbConnected: false,
        messages,
        sendMessage,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        changePassword,
        projects,
        addProject,
        updateProject,
        deleteProject,
        certificates,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        contactInfo,
        setContactInfo: updateContactInfo,
        bioInfo,
        setBioInfo: updateBioInfo,
        resetAllData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
