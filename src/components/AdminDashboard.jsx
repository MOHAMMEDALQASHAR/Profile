import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FolderGit2, 
  Award, 
  Wrench, 
  Mail, 
  User, 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  Save, 
  X, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Link,
  Upload,
  Image as ImageIcon,
  FileCheck,
  Video,
  Images,
  Film,
  Play,
  FileText,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose }) {
  const {
    logoutAdmin,
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
    deleteSkill,
    contactInfo,
    setContactInfo,
    bioInfo,
    setBioInfo,
    resetAllData
  } = usePortfolio();

  const contentBodyRef = useRef(null);

  const scrollToForm = () => {
    if (contentBodyRef.current) {
      contentBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [activeTab, setActiveTab] = useState('projects');
  const [successBanner, setSuccessBanner] = useState('');

  // Project Form State
  const [projForm, setProjForm] = useState({
    id: null,
    titleAr: '',
    titleEn: '',
    shortDescAr: '',
    longDescAr: '',
    category: 'web',
    techStr: '',
    demoUrl: '',
    githubUrl: '',
    image: '',
    videoUrl: '',
    gallery: []
  });

  // Certificate Form State
  const [certForm, setCertForm] = useState({
    id: null,
    titleAr: '',
    issuer: '',
    date: '2026',
    category: 'engineering',
    badge: 'شهادة معتمدة',
    pdfUrl: '',
    image: '',
    gallery: []
  });

  // Skill Form State
  const [skillForm, setSkillForm] = useState({
    id: null,
    originalName: '',
    name: '',
    category: 'languages',
    level: 90,
    badge: 'تخصص رئيسي'
  });

  // Contact Form State
  const [contactFormState, setContactFormState] = useState(contactInfo);
  useEffect(() => { setContactFormState(contactInfo); }, [contactInfo]);

  // Bio Form State
  const [bioFormState, setBioFormState] = useState(bioInfo);
  useEffect(() => { setBioFormState(bioInfo); }, [bioInfo]);

  if (!isOpen) return null;

  const showNotification = (msg) => {
    setSuccessBanner(msg);
    setTimeout(() => setSuccessBanner(''), 3000);
  };

  // Helper to handle image file upload, compress with Canvas & convert to optimized DataURL
  const handleImageFileUpload = (e, setFormState) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image to lightweight web-friendly JPEG (~50KB)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        setFormState(prev => ({ ...prev, image: compressedBase64 }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Helper to handle CV file upload (PDF / Docs)
  const handleCvFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('حجم الملف كبير جداً. يرجى اختيار ملف أقل من 15 ميجابايت.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      setBioFormState(prev => ({
        ...prev,
        cvUrl: base64Data,
        cvFileName: file.name
      }));
      showNotification(`تم إرفاق ملف السيرة الذاتية: ${file.name}`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Helper to handle multiple photo gallery uploads for projects & certificates
  const handleGalleryFileUpload = (e, setFormState) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setFormState(prev => ({
            ...prev,
            gallery: [...(prev.gallery || []), compressedBase64]
          }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // Helper to handle PDF file upload
  const handlePdfFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCertForm(prev => ({ ...prev, pdfUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Projects Submit
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const techArray = projForm.techStr.split(',').map(s => s.trim()).filter(Boolean);

    const projectPayload = {
      category: projForm.category,
      title: { ar: projForm.titleAr, en: projForm.titleEn || projForm.titleAr, tr: projForm.titleAr },
      shortDesc: { ar: projForm.shortDescAr, en: projForm.shortDescAr, tr: projForm.shortDescAr },
      longDesc: { ar: projForm.longDescAr || projForm.shortDescAr, en: projForm.shortDescAr, tr: projForm.shortDescAr },
      tech: techArray.length ? techArray : ['React', 'FastAPI', 'SQL'],
      highlights: [projForm.shortDescAr],
      demoUrl: projForm.demoUrl || 'https://github.com/mohamed-taha-alqashar',
      githubUrl: projForm.githubUrl || 'https://github.com/mohamed-taha-alqashar',
      image: projForm.image || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
      videoUrl: projForm.videoUrl || '',
      gallery: projForm.gallery || []
    };

    if (projForm.id) {
      updateProject(projForm.id, projectPayload);
      showNotification('تم تحديث بيانات المشروع بنجاح!');
    } else {
      addProject(projectPayload);
      showNotification('تمت إضافة مشروع جديد بنجاح!');
    }

    setProjForm({
      id: null, titleAr: '', titleEn: '', shortDescAr: '', longDescAr: '', category: 'web', techStr: '', demoUrl: '', githubUrl: '', image: '', videoUrl: '', gallery: []
    });
  };

  // Certificate Submit
  const handleCertSubmit = (e) => {
    e.preventDefault();

    const certPayload = {
      title: { ar: certForm.titleAr, en: certForm.titleAr, tr: certForm.titleAr },
      issuer: certForm.issuer,
      date: certForm.date,
      category: certForm.category,
      badge: certForm.badge,
      pdfUrl: certForm.pdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      image: certForm.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      gallery: certForm.gallery || []
    };

    if (certForm.id) {
      updateCertificate(certForm.id, certPayload);
      showNotification('تم تحديث الشهادة بنجاح!');
    } else {
      addCertificate(certPayload);
      showNotification('تمت إضافة شهادة جديدة بنجاح!');
    }

    setCertForm({
      id: null, titleAr: '', issuer: '', date: '2026', category: 'engineering', badge: 'شهادة معتمدة', pdfUrl: '', image: '', gallery: []
    });
  };

  // Skill Submit
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!skillForm.name) return;

    const skillPayload = {
      name: skillForm.name,
      category: skillForm.category,
      icon: 'Code2',
      level: Number(skillForm.level),
      badge: skillForm.badge
    };

    if (skillForm.id || skillForm.originalName) {
      updateSkill(skillForm.id || skillForm.originalName, skillPayload);
      showNotification('تم تحديث المهارة بنجاح!');
    } else {
      addSkill(skillPayload);
      showNotification('تمت إضافة المهارة بنجاح!');
    }

    setSkillForm({ id: null, originalName: '', name: '', category: 'languages', level: 90, badge: 'تخصص رئيسي' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-3 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm sm:text-xl font-extrabold text-white truncate">
                لوحة تحكم وإدارة المحتوى <span className="hidden sm:inline text-xs text-slate-400 font-normal">(Admin Panel)</span>
              </h2>
              <span className="text-[10px] sm:text-xs text-sky-400 font-medium block truncate">
                م. محمد طه القشار - التحكم الفوري
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all"
              title="تسجيل الخروج"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">خروج</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
              title="إغلاق"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Success Banner Notification */}
        {successBanner && (
          <div className="px-6 py-3 bg-emerald-500/20 border-b border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-slate-950/60 border-b border-slate-800 p-2 flex overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'projects' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>المشاريع ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'certificates' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>الشهادات ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'contact' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>وسائل التواصل والروابط</span>
          </button>

          <button
            onClick={() => setActiveTab('bio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'bio' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>النبذة والنصوص</span>
          </button>
        </div>

        {/* Content Body */}
        <div ref={contentBodyRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* Tab 1: Projects Manager */}
          {activeTab === 'projects' && (
            <div className="space-y-8">
              
              {/* Permanent Code Export & Backup Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-sky-300">تثبيت بيانات وصور المشاريع في كود الموقع الدائم</h4>
                  <p className="text-[11px] text-slate-400">انسخ بيانات مشاريعك بصورها وروابطها لنقلها إلى كود الموقع لكي تظهر للجميع على أي جوال وجهاز بدون لوحة تحكم.</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(projects, null, 2));
                      showNotification('تم نسخ بيانات المشاريع كاملة! أرسلها لي هنا وسأثبتها فوراً في كود الموقع.');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>📋 نسخ كود المشاريع</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'projects_data.json';
                      a.click();
                      showNotification('تم تحميل ملف projects_data.json');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5"
                  >
                    <span>⬇️ تحميل JSON</span>
                  </button>
                </div>
              </div>

              {/* Add / Edit Form */}
              <form onSubmit={handleProjectSubmit} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-sky-400" />
                  <span>{projForm.id ? 'تعديل بيانات مشروع قائم' : 'إضافة مشروع جديد'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">اسم المشروع (بالعربية) *</label>
                    <input
                      type="text"
                      required
                      value={projForm.titleAr}
                      onChange={(e) => setProjForm({ ...projForm, titleAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">التصنيف (Category)</label>
                    <select
                      value={projForm.category}
                      onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    >
                      <option value="web">تطوير ويب (Web Platform)</option>
                      <option value="ai">ذكاء اصطناعي (AI & Vision)</option>
                      <option value="database">قواعد بيانات (Database & Analytics)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">وصف قصير (Short Summary) *</label>
                  <input
                    type="text"
                    required
                    value={projForm.shortDescAr}
                    onChange={(e) => setProjForm({ ...projForm, shortDescAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">التقنيات (مفصولة بفواصل)</label>
                    <input
                      type="text"
                      placeholder="FastAPI, React, PostgreSQL"
                      value={projForm.techStr}
                      onChange={(e) => setProjForm({ ...projForm, techStr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">رابط المعاينة (Live Demo URL)</label>
                    <input
                      type="url"
                      placeholder="https://my-demo.vercel.app"
                      value={projForm.demoUrl}
                      onChange={(e) => setProjForm({ ...projForm, demoUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">رابط كود المصدر (GitHub Repo)</label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={projForm.githubUrl}
                      onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                    />
                  </div>
                </div>

                {/* Direct Image File Selection & Preview */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>صورة المشروع (رفع ملف من الجهاز أو إدخال رابط)</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* File Upload Button */}
                    <label className="flex-1 w-full py-3 px-4 rounded-xl bg-slate-800 border-2 border-dashed border-sky-500/40 hover:border-sky-400 text-sky-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                      <Upload className="w-4 h-4" />
                      <span>اختر صورة من جهازك (Choose Image File)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, setProjForm)}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400">أو</span>

                    {/* URL Input */}
                    <input
                      type="text"
                      placeholder="أو ضع رابط صورة مباشر (URL)..."
                      value={projForm.image}
                      onChange={(e) => setProjForm({ ...projForm, image: e.target.value })}
                      className="flex-1 w-full px-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs dir-ltr"
                    />
                  </div>

                  {/* Image Live Thumbnail Preview */}
                  {projForm.image && (
                    <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <img src={projForm.image} alt="Preview" className="w-16 h-12 object-cover rounded-lg border border-slate-700" />
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        تم تحديد الصورة الرئيسية وجاهزة للحفظ
                      </span>
                      <button
                        type="button"
                        onClick={() => setProjForm({ ...projForm, image: '' })}
                        className="mr-auto text-xs text-rose-400 hover:underline"
                      >
                        إزالة الصورة
                      </button>
                    </div>
                  )}
                </div>

                {/* Project Video Field */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-xs font-bold text-purple-400 flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>رابط فيديو ترويجي / توضيحي للمشروع (MP4 / YouTube / Vimeo)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ضع رابط الفيديو هنا (مثال: https://.../video.mp4 أو رابط يوتيوب)..."
                    value={projForm.videoUrl}
                    onChange={(e) => setProjForm({ ...projForm, videoUrl: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs dir-ltr"
                  />
                  {projForm.videoUrl && (
                    <div className="flex items-center justify-between text-xs text-purple-300 bg-purple-950/40 p-2 rounded-xl border border-purple-800/40">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Film className="w-4 h-4" />
                        تم تعيين رابط الفيديو للمشروع
                      </span>
                      <button
                        type="button"
                        onClick={() => setProjForm({ ...projForm, videoUrl: '' })}
                        className="text-rose-400 hover:underline"
                      >
                        إزالة الفيديو
                      </button>
                    </div>
                  )}
                </div>

                {/* Project Photo Gallery Manager */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Images className="w-4 h-4" />
                    <span>معرض صور ومعاينات المشروع (Screenshots Gallery)</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Multi-file Upload */}
                    <label className="flex-1 w-full py-3 px-4 rounded-xl bg-slate-800 border-2 border-dashed border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                      <Upload className="w-4 h-4" />
                      <span>رفع صور إضافية للمعرض (Upload Multiple Photos)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleGalleryFileUpload(e, setProjForm)}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400">أو أضف رابط صورة</span>

                    <button
                      type="button"
                      onClick={() => {
                        const url = prompt('أدخل رابط الصورة الإضافية (Image URL):');
                        if (url && url.trim()) {
                          setProjForm(prev => ({ ...prev, gallery: [...(prev.gallery || []), url.trim()] }));
                        }
                      }}
                      className="py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-bold text-xs hover:bg-slate-700 transition-all whitespace-nowrap"
                    >
                      + إضافة رابط صورة
                    </button>
                  </div>

                  {/* Gallery Thumbnails List */}
                  {projForm.gallery && projForm.gallery.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs text-slate-400 font-semibold">الصور المضافة للمعرض ({projForm.gallery.length}):</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {projForm.gallery.map((imgUrl, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-24">
                            <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                setProjForm(prev => ({
                                  ...prev,
                                  gallery: prev.gallery.filter((_, i) => i !== idx)
                                }));
                              }}
                              className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600/90 text-white hover:bg-rose-700 transition-all opacity-0 group-hover:opacity-100 shadow-md"
                              title="حذف من المعرض"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-sky-500 text-white font-bold text-xs flex items-center gap-2 hover:bg-sky-400 transition-all shadow-md shadow-sky-500/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>{projForm.id ? 'حفظ التعديلات' : 'إضافة المشروع'}</span>
                  </button>

                  {projForm.id && (
                    <button
                      type="button"
                      onClick={() => setProjForm({ id: null, titleAr: '', titleEn: '', shortDescAr: '', longDescAr: '', category: 'web', techStr: '', demoUrl: '', githubUrl: '', image: '', videoUrl: '', gallery: [] })}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                </div>
              </form>

              {/* Projects List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-300">المشاريع الحالية المعروضة بالموقع ({projects.length}):</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((p) => {
                    const itemId = p._id || p.id || p.customId;
                    return (
                      <div key={itemId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {p.image && <img src={p.image} alt="Thumbnail" className="w-12 h-12 object-cover rounded-xl border border-slate-800 shrink-0" />}
                          <div>
                            <h5 className="font-bold text-white text-sm">{p.title?.ar || p.title}</h5>
                            <p className="text-xs text-slate-400 line-clamp-1">{p.shortDesc?.ar || p.shortDesc}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setProjForm({
                                id: itemId,
                                titleAr: p.title?.ar || p.title,
                                titleEn: p.title?.en || '',
                                shortDescAr: p.shortDesc?.ar || '',
                                longDescAr: p.longDesc?.ar || '',
                                category: p.category || 'web',
                                techStr: (p.tech || []).join(', '),
                                demoUrl: p.demoUrl || '',
                                githubUrl: p.githubUrl || '',
                                image: p.image || '',
                                videoUrl: p.videoUrl || '',
                                gallery: Array.isArray(p.gallery) ? p.gallery : []
                              });
                              scrollToForm();
                              showNotification('تم فتح بيانات المشروع للتعديل في أعلى الصفحة ✏️');
                            }}
                            className="p-2 rounded-xl bg-slate-800 text-sky-400 hover:bg-sky-500 hover:text-white transition-all"
                            title="تعديل المشروع"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              deleteProject(itemId);
                              showNotification('تم حذف المشروع.');
                            }}
                            className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                            title="حذف المشروع"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Certificates Manager */}
          {activeTab === 'certificates' && (
            <div className="space-y-8">
              
              {/* Form */}
              <form onSubmit={handleCertSubmit} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>{certForm.id ? 'تعديل بيانات الشهادة' : 'إضافة شهادة جديدة'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">عنوان الشهادة (بالعربية) *</label>
                    <input
                      type="text"
                      required
                      value={certForm.titleAr}
                      onChange={(e) => setCertForm({ ...certForm, titleAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">الجهة المانحة (Issuer) *</label>
                    <input
                      type="text"
                      required
                      placeholder="جامعة بارتن / Coursera / Microsoft"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">التصنيف (Category)</label>
                    <select
                      value={certForm.category}
                      onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    >
                      <option value="engineering">أكاديمية (B.Sc. Degree)</option>
                      <option value="erasmus">Erasmus+ برامج دولية</option>
                      <option value="ai">ذكاء اصطناعي (AI Vision)</option>
                      <option value="web">تطوير ويب (Web Stack)</option>
                      <option value="database">قواعد بيانات (Databases)</option>
                      <option value="leadership">قيادة وإدارة</option>
                      <option value="volunteering">عمل تطوعي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">السنة (Year)</label>
                    <input
                      type="text"
                      value={certForm.date}
                      onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">شارة الشهادة (Badge)</label>
                    <input
                      type="text"
                      value={certForm.badge}
                      onChange={(e) => setCertForm({ ...certForm, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>

                {/* Direct Certificate Image Upload */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>صورة الشهادة (رفع ملف صورة من جهازك أو وضع رابط)</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="flex-1 w-full py-3 px-4 rounded-xl bg-slate-800 border-2 border-dashed border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                      <Upload className="w-4 h-4" />
                      <span>اختر صورة الشهادة (Image File)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, setCertForm)}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400">أو</span>

                    <input
                      type="text"
                      placeholder="رابط صورة مباشر..."
                      value={certForm.image}
                      onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                      className="flex-1 w-full px-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs dir-ltr"
                    />
                  </div>

                  {certForm.image && (
                    <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <img src={certForm.image} alt="Cert Preview" className="w-16 h-12 object-cover rounded-lg border border-slate-700" />
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        تم اختيار صورة الشهادة بنجاح
                      </span>
                      <button
                        type="button"
                        onClick={() => setCertForm({ ...certForm, image: '' })}
                        className="mr-auto text-xs text-rose-400 hover:underline"
                      >
                        إزالة الصورة
                      </button>
                    </div>
                  )}
                </div>

                {/* Certificate Photo Gallery Manager (نفس حق المشاريع) */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Images className="w-4 h-4" />
                    <span>معرض صور إضافية للشهادة (صور التخرج / التكريم / صفحات الشهادة)</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Multi-file Upload */}
                    <label className="flex-1 w-full py-3 px-4 rounded-xl bg-slate-800 border-2 border-dashed border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                      <Upload className="w-4 h-4" />
                      <span>رفع صور إضافية للمعرض (Upload Multiple Photos)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleGalleryFileUpload(e, setCertForm)}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400">أو أضف رابط صورة</span>

                    <button
                      type="button"
                      onClick={() => {
                        const url = prompt('أدخل رابط الصورة الإضافية للشهادة (Image URL):');
                        if (url && url.trim()) {
                          setCertForm(prev => ({ ...prev, gallery: [...(prev.gallery || []), url.trim()] }));
                        }
                      }}
                      className="py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-bold text-xs hover:bg-slate-700 transition-all whitespace-nowrap"
                    >
                      + إضافة رابط صورة
                    </button>
                  </div>

                  {/* Gallery Thumbnails List */}
                  {certForm.gallery && certForm.gallery.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs text-slate-400 font-semibold">الصور المضافة للمعرض ({certForm.gallery.length}):</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {certForm.gallery.map((imgUrl, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-24">
                            <img src={imgUrl} alt={`Cert Gallery ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                setCertForm(prev => ({
                                  ...prev,
                                  gallery: prev.gallery.filter((_, i) => i !== idx)
                                }));
                              }}
                              className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600/90 text-white hover:bg-rose-700 transition-all opacity-0 group-hover:opacity-100 shadow-md"
                              title="حذف من المعرض"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Certificate PDF Upload */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4" />
                    <span>ملف الشهادة PDF (رفع ملف PDF من جهازك أو وضع رابط)</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="flex-1 w-full py-3 px-4 rounded-xl bg-slate-800 border-2 border-dashed border-sky-500/40 hover:border-sky-400 text-sky-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                      <Upload className="w-4 h-4" />
                      <span>اختر ملف PDF للشهادة (Choose PDF File)</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfFileUpload}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400">أو</span>

                    <input
                      type="url"
                      placeholder="https://domain.com/cert.pdf"
                      value={certForm.pdfUrl}
                      onChange={(e) => setCertForm({ ...certForm, pdfUrl: e.target.value })}
                      className="flex-1 w-full px-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs dir-ltr"
                    />
                  </div>

                  {certForm.pdfUrl && (
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم ربط ملف PDF الشهادة بنجاح</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>{certForm.id ? 'حفظ التعديلات' : 'إضافة الشهادة'}</span>
                  </button>

                  {certForm.id && (
                    <button
                      type="button"
                      onClick={() => setCertForm({
                        id: null, titleAr: '', issuer: '', date: '2026', category: 'engineering', badge: 'شهادة معتمدة', pdfUrl: '', image: '', gallery: []
                      })}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                </div>
              </form>

              {/* Certificates List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-300">الشهادات الحالية بالموقع ({certificates.length}):</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((c) => {
                    const itemId = c._id || c.id || c.customId;
                    return (
                      <div key={itemId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 overflow-hidden">
                          {c.image && <img src={c.image} alt="Cert Thumb" className="w-12 h-12 object-cover rounded-xl border border-slate-800 shrink-0" />}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-white text-sm truncate">{typeof c.title === 'object' ? (c.title.ar || c.title.en) : c.title}</h5>
                              {c.gallery && c.gallery.length > 0 && (
                                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold shrink-0">
                                  {c.gallery.length} صور
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 truncate">{typeof c.issuer === 'object' ? (c.issuer.ar || c.issuer.en || '') : (c.issuer || '')} ({c.date})</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setCertForm({
                                id: itemId,
                                titleAr: typeof c.title === 'object' ? (c.title.ar || c.title.en || '') : (c.title || ''),
                                issuer: typeof c.issuer === 'object' ? (c.issuer.ar || c.issuer.en || '') : (c.issuer || ''),
                                date: c.date || '2026',
                                category: c.category || 'engineering',
                                badge: c.badge || 'شهادة معتمدة',
                                pdfUrl: c.pdfUrl || '',
                                image: c.image || '',
                                gallery: c.gallery || []
                              });
                              scrollToForm();
                              showNotification('تم فتح بيانات الشهادة للتعديل في أعلى الصفحة ✏️');
                            }}
                            className="p-2 rounded-xl bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all shrink-0"
                            title="تعديل الشهادة"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              deleteCertificate(itemId);
                              showNotification('تم حذف الشهادة.');
                            }}
                            className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shrink-0"
                            title="حذف الشهادة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}



          {/* Tab 4: Contact & Social Links */}
          {activeTab === 'contact' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setContactInfo(contactFormState);
                showNotification('تم حفظ وسائل التواصل والروابط بنجاح!');
              }} 
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Link className="w-4 h-4 text-sky-400" />
                <span>إدارة روابط التواصل الاجتماعي والمراسلة</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">البريد الإلكتروني (Email)</label>
                  <input
                    type="email"
                    value={contactFormState.email || ''}
                    onChange={(e) => setContactFormState({ ...contactFormState, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">رقم الهاتف (Phone)</label>
                  <input
                    type="text"
                    value={contactFormState.phone || ''}
                    onChange={(e) => setContactFormState({ ...contactFormState, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">رقم الواتساب (WhatsApp Number without +)</label>
                  <input
                    type="text"
                    value={contactFormState.whatsapp || ''}
                    onChange={(e) => setContactFormState({ ...contactFormState, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">حساب LinkedIn</label>
                  <input
                    type="text"
                    value={contactFormState.linkedin || ''}
                    onChange={(e) => setContactFormState({ ...contactFormState, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">حساب GitHub</label>
                  <input
                    type="text"
                    value={contactFormState.github || ''}
                    onChange={(e) => setContactFormState({ ...contactFormState, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">حساب Instagram</label>
                  <input
                    type="text"
                    value={contactFormState.instagram || ''}
                    onChange={(e) => setContactFormState({ ...contactFormState, instagram: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs dir-ltr"
                    placeholder="alqashar123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-sky-500 text-white font-bold text-xs flex items-center gap-2 hover:bg-sky-400 transition-all shadow-md shadow-sky-500/20"
              >
                <Save className="w-4 h-4" />
                <span>حفظ الروابط ومعلومات التواصل</span>
              </button>
            </form>
          )}

          {/* Tab 5: Bio & Texts */}
          {activeTab === 'bio' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setBioInfo(bioFormState);
                showNotification('تم تحديث البيانات الشخصية والنبذة بنجاح!');
              }} 
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span>تعديل الاسم والنبذة التعريفية</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    value={bioFormState.name || ''}
                    onChange={(e) => setBioFormState({ ...bioFormState, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">المسمى الوظيفي (Job Title)</label>
                  <input
                    type="text"
                    value={bioFormState.role || ''}
                    onChange={(e) => setBioFormState({ ...bioFormState, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">اسم الجامعة والكلية</label>
                <input
                  type="text"
                  value={bioFormState.university || ''}
                  onChange={(e) => setBioFormState({ ...bioFormState, university: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">فقرة النبذة الرئيسية (Bio Text 1)</label>
                <textarea
                  rows={3}
                  value={bioFormState.bioText1 || ''}
                  onChange={(e) => setBioFormState({ ...bioFormState, bioText1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">فقرة التفاصيل والخبرة (Bio Text 2)</label>
                <textarea
                  rows={3}
                  value={bioFormState.bioText2 || ''}
                  onChange={(e) => setBioFormState({ ...bioFormState, bioText2: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs resize-none"
                />
              </div>

              {/* CV File Upload Section */}
              <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/30 space-y-3">
                <h4 className="text-xs font-bold text-sky-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>إدارة ملف السيرة الذاتية (CV File / Link)</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  يمكنك رفع ملف PDF السيرة الذاتية الخاص بك مباشرة أو إدخال رابط مباشر. عند الضغط على "تحميل السيرة الذاتية" سيتم تنزيل هذا الملف.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* PDF Upload Button */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">رفع ملف PDF السيرة الذاتية من الجهاز</label>
                    <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-sky-500/50 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 cursor-pointer text-xs font-bold transition-all">
                      <Upload className="w-4 h-4 text-sky-400" />
                      <span>اختر ملف PDF السيرة الذاتية</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={handleCvFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Direct Link Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">أو ضع رابط مباشر للملف (Google Drive / Dropbox)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/my-resume.pdf"
                      value={bioFormState.cvUrl && !bioFormState.cvUrl.startsWith('data:') ? bioFormState.cvUrl : ''}
                      onChange={(e) => {
                        const link = e.target.value;
                        setBioFormState(prev => ({
                          ...prev,
                          cvUrl: link,
                          cvFileName: link ? 'رابط خارجي' : ''
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs dir-ltr"
                    />
                  </div>
                </div>

                {/* Attached File Preview Status */}
                {bioFormState.cvUrl ? (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold overflow-hidden">
                      <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">
                        الملف المرفق حالياً: {bioFormState.cvFileName || (bioFormState.cvUrl.startsWith('data:') ? 'ملف PDF محلي' : 'رابط مباشر')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={bioFormState.cvUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-bold flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>معاينة</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setBioFormState(prev => ({ ...prev, cvUrl: '', cvFileName: '' }));
                          showNotification('تم إزالة ملف السيرة الذاتية.');
                        }}
                        className="p-1 rounded-md bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-[11px]"
                        title="حذف الملف المرفق"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-amber-400/90 font-medium">
                    ⚠️ لم يتم رفع ملف سيرة ذاتية بعد. سيتم عرض القالب والتصميم التفاعلي التلقائي للسيرة الذاتية للزوار عند الضغط على "تحميل السيرة الذاتية".
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-purple-500 transition-all shadow-md shadow-purple-600/20"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات الشخصية</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('هل أنت تأكد من إعادة ضبط جميع البيانات للوضع الافتراضي؟')) {
                      resetAllData();
                      showNotification('تمت إعادة ضبط كافة البيانات للوضع الافتراضي.');
                    }
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-800 text-rose-400 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-500 hover:text-white transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة ضبط المصنع</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
