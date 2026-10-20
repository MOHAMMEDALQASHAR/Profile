import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon } from './Icons';
import { 
  FolderGit2, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Video, 
  Images, 
  Maximize2, 
  Eye,
  Globe,
  Trash2
} from 'lucide-react';

export default function Projects({ t, lang }) {
  const { projects, isAdminLoggedIn, updateProject } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMediaTab, setActiveMediaTab] = useState('image'); // 'image' | 'video' | 'gallery'
  const [lightboxImage, setLightboxImage] = useState(null);
  const [quickPromptProject, setQuickPromptProject] = useState(null);

  const categories = [
    { key: 'all', label: t.projects.filterAll },
    { key: 'web', label: t.skills.categories.web },
    { key: 'ai', label: t.skills.categories.ai },
    { key: 'database', label: t.skills.categories.database }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const openProjectWithTab = (project, tab = 'image') => {
    setSelectedProject(project);
    const hasVid = Boolean(project?.videoUrl && String(project.videoUrl).trim());
    setActiveMediaTab(tab === 'video' && !hasVid ? 'image' : tab);
    setQuickPromptProject(null);
  };

  const handleDeleteVideo = (projectId) => {
    if (window.confirm('هل أنت متأكد من حذف الفيديو لهذا المشروع؟')) {
      const projId = projectId || selectedProject?.id || selectedProject?._id;
      updateProject(projId, { ...selectedProject, videoUrl: '' });
      setSelectedProject(prev => prev ? { ...prev, videoUrl: '' } : null);
      setActiveMediaTab('image');
    }
  };

  const getLoc = (val) => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string' || typeof val === 'number') return String(val);
    if (typeof val === 'object') {
      const res = val[lang] || val.ar || val.en || val.tr || '';
      if (typeof res === 'object') return JSON.stringify(res);
      return String(res || '');
    }
    return String(val);
  };

  const getEmbedVideoUrl = (url) => {
    if (!url) return '';
    const videoUrl = url.trim();
    if (videoUrl.includes('youtube.com/embed/')) return videoUrl;
    if (videoUrl.includes('youtube.com/watch?v=')) {
      const id = videoUrl.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (videoUrl.includes('youtu.be/')) {
      const id = videoUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (videoUrl.includes('youtube.com/shorts/')) {
      const id = videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    return videoUrl;
  };

  return (
    <section id="projects" className="py-20 relative z-10 bg-slate-900/20 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-3">
            <FolderGit2 className="w-4 h-4" />
            <span>{t.projects.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t.projects.subtitle}
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 scale-105'
                  : 'bg-slate-800/50 dark:bg-slate-800/50 border border-slate-700/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const title = getLoc(project.title);
            const shortDesc = getLoc(project.shortDesc);
            const keyVal = project._id || project.id || project.customId || `proj-${index}`;
            const hasVideo = Boolean(project.videoUrl && String(project.videoUrl).trim());
            const hasGallery = Boolean(project.gallery && project.gallery.length > 0);

            return (
              <div 
                key={keyVal}
                className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-sky-500/50 transition-all duration-300 shadow-xl"
              >
                {/* Project Image Header */}
                <div 
                  onClick={() => setQuickPromptProject(project)}
                  className="relative h-60 w-full overflow-hidden bg-slate-900 cursor-pointer group/img"
                >
                  <img 
                    src={project.image} 
                    alt={title}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500 opacity-90 group-hover/img:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-sky-400 text-xs font-bold">
                    {(project.category || 'WEB').toUpperCase()}
                  </span>

                  {/* Media Indicator Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5">
                    {hasGallery && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-600/90 backdrop-blur-md border border-amber-400/40 text-white text-[10px] font-extrabold flex items-center gap-1">
                        <Images className="w-3 h-3" />
                        <span>{project.gallery.length} صور</span>
                      </span>
                    )}
                    {hasVideo && (
                      <span className="px-2.5 py-1 rounded-full bg-purple-600/90 backdrop-blur-md border border-purple-400/40 text-white text-[10px] font-extrabold flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>فيديو</span>
                      </span>
                    )}
                  </div>

                  {/* Overlay Quick Launch Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs">
                    <span className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-500/30 flex items-center gap-2 transform group-hover/img:scale-105 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>{t.projects.mediaSelectTitle || 'خيارات المعاينة'}</span>
                    </span>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => setQuickPromptProject(project)}
                      className="text-xl font-extrabold text-white mb-2 group-hover:text-sky-400 transition-colors cursor-pointer"
                    >
                      {title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {shortDesc}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(project.tech || []).map((tItem, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50 text-[11px] font-semibold text-slate-300">
                        {getLoc(tItem)}
                      </span>
                    ))}
                  </div>

                  {/* Quick Action Trigger Button */}
                  <button
                    onClick={() => setQuickPromptProject(project)}
                    className="w-full py-3 px-4 mb-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.projects.mediaSelectTitle || 'خيارات العرض والمعاينة السريعة'}</span>
                  </button>



                </div>

              </div>
            );
          })}
        </div>

        {/* 1. Quick Choice Options Modal (عند الضغط على كرت المشروع) */}
        {quickPromptProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              
              {/* Close Button */}
              <button
                onClick={() => setQuickPromptProject(null)}
                className="absolute top-5 left-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold inline-block mb-3">
                  {(quickPromptProject.category || 'WEB').toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                  {getLoc(quickPromptProject.title)}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  {t.projects.mediaSelectSubtitle || 'اختر نوع المعاينة التي تريدها للمشروع:'}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                
                {/* 1. Live Demo */}
                <a
                  href={quickPromptProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-gradient-to-br from-sky-600/20 to-blue-600/20 border border-sky-500/40 hover:border-sky-400 text-white flex flex-col items-center justify-center gap-2.5 transition-all group hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm">{t.projects.liveDemo || 'معاينة الموقع'}</span>
                </a>

                {/* 2. Photo Gallery */}
                <button
                  onClick={() => openProjectWithTab(quickPromptProject, 'gallery')}
                  className="p-4 rounded-2xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/40 hover:border-amber-400 text-white flex flex-col items-center justify-center gap-2.5 transition-all group hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                    <Images className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm">{t.projects.photoGallery || 'معرض الصور'}</span>
                </button>

              </div>

              {/* View All Details Button */}
              <button
                onClick={() => openProjectWithTab(quickPromptProject, 'image')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs text-center border border-slate-700 transition-all"
              >
                {t.projects.detailsBtn || 'استعراض التفاصيل الكاملة للمشروع'}
              </button>

            </div>
          </div>
        )}

        {/* 2. Rich Project Details Modal with Interactive Media Tabs */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700/60 rounded-2xl max-w-md md:max-w-lg lg:max-w-2xl w-full max-h-[72vh] sm:max-h-[75vh] overflow-y-auto p-3 sm:p-4 shadow-2xl relative flex flex-col">
              
              {/* Dedicated Clean Header Row (Title & Category on Right, Close Button on Left) */}
              <div className="flex items-start justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-800">
                <div className="min-w-0">
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[9px] sm:text-[10px] font-bold inline-block mb-0.5">
                    {(selectedProject.category || 'WEB').toUpperCase()}
                  </span>
                  <h3 className="text-xs sm:text-base font-extrabold text-white leading-snug truncate">
                    {getLoc(selectedProject.title)}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0"
                  title="إغلاق النافذة"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                
                {/* Media Column (Left Column on Desktop) */}
                <div className="lg:col-span-6 space-y-2">
                  {(() => {
                    const hasSelectedVideo = Boolean(selectedProject.videoUrl && String(selectedProject.videoUrl).trim());
                    const hasSelectedGallery = Boolean(selectedProject.gallery && selectedProject.gallery.length > 0);
                    const tabCount = 1 + (hasSelectedVideo ? 1 : 0) + (hasSelectedGallery ? 1 : 0);
                    const gridColsClass = tabCount === 3 ? 'grid-cols-3' : tabCount === 2 ? 'grid-cols-2' : 'grid-cols-1';

                    return (
                      <>
                        {/* Media View Selector Tabs (Only show when there are multiple media types) */}
                        {tabCount > 1 && (
                          <div className={`grid ${gridColsClass} gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-center`}>
                            <button
                              onClick={() => setActiveMediaTab('image')}
                              className={`py-1 px-1.5 rounded text-[9px] sm:text-[10px] font-bold flex items-center justify-center gap-1 transition-all whitespace-nowrap ${
                                activeMediaTab === 'image' || (!hasSelectedVideo && activeMediaTab === 'video')
                                  ? 'bg-sky-500 text-white shadow-sm'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <Eye className="w-3 h-3" />
                              <span>{t.projects.tabMainImage || 'الصورة'}</span>
                            </button>

                            {/* Only show video tab if project has video */}
                            {hasSelectedVideo && (
                              <button
                                onClick={() => setActiveMediaTab('video')}
                                className={`py-1 px-1.5 rounded text-[9px] sm:text-[10px] font-bold flex items-center justify-center gap-1 transition-all whitespace-nowrap ${
                                  activeMediaTab === 'video'
                                    ? 'bg-purple-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <Video className="w-3 h-3" />
                                <span>فيديو</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                              </button>
                            )}

                            {/* Only show gallery tab if project has gallery images */}
                            {hasSelectedGallery && (
                              <button
                                onClick={() => setActiveMediaTab('gallery')}
                                className={`py-1 px-1.5 rounded text-[9px] sm:text-[10px] font-bold flex items-center justify-center gap-1 transition-all whitespace-nowrap ${
                                  activeMediaTab === 'gallery'
                                    ? 'bg-amber-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <Images className="w-3 h-3" />
                                <span>الصور ({selectedProject.gallery?.length || 0})</span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* Main Media Display Box with Ultra Compact Dimensions */}
                        <div className="w-full aspect-video h-32 sm:h-36 lg:h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center shadow-sm">
                          
                          {/* 1. Main Image Tab */}
                          {(activeMediaTab === 'image' || (!hasSelectedVideo && activeMediaTab === 'video')) && (
                            <div className="w-full h-full relative group flex items-center justify-center bg-slate-950">
                              <img 
                                src={selectedProject.image} 
                                alt="Project Main Preview"
                                className="w-full h-full object-contain"
                              />
                              <button
                                onClick={() => setLightboxImage(selectedProject.image)}
                                className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 hover:bg-sky-500 transition-all shadow-sm"
                                title="تكبير الصورة"
                              >
                                <Maximize2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {/* 2. Video Player Tab */}
                          {activeMediaTab === 'video' && hasSelectedVideo && (
                            <div className="w-full h-full aspect-video bg-black flex items-center justify-center relative">
                              {isAdminLoggedIn && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteVideo(selectedProject.id)}
                                  className="absolute top-2 left-2 z-20 px-2 py-1 rounded-md bg-rose-600/90 hover:bg-rose-600 text-white text-[10px] font-bold shadow flex items-center gap-1 transition-all"
                                  title="حذف الفيديو من هذا المشروع"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>حذف الفيديو</span>
                                </button>
                              )}
                              {selectedProject.videoUrl.includes('youtube.com') || selectedProject.videoUrl.includes('youtu.be') ? (
                                <iframe
                                  src={getEmbedVideoUrl(selectedProject.videoUrl)}
                                  title="Project Video"
                                  className="w-full h-full aspect-video border-0 rounded-xl"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <video
                                  src={selectedProject.videoUrl}
                                  controls
                                  autoPlay
                                  className="w-full h-full object-contain aspect-video rounded-xl"
                                />
                              )}
                            </div>
                          )}

                          {/* 3. Photo Gallery Tab */}
                          {activeMediaTab === 'gallery' && (
                            <div className="w-full h-full p-1.5 overflow-y-auto">
                              {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                  {selectedProject.gallery.map((imgUrl, i) => (
                                    <div 
                                      key={i} 
                                      onClick={() => setLightboxImage(imgUrl)}
                                      className="relative group rounded-lg overflow-hidden h-16 border border-slate-800 bg-slate-900 cursor-pointer hover:border-amber-500/50 transition-all"
                                    >
                                      <img src={imgUrl} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                        <Maximize2 className="w-3 h-3" />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 space-y-1">
                                  <Images className="w-6 h-6 text-slate-600 mx-auto" />
                                  <p className="text-slate-400 text-[10px]">
                                    {t.projects.noGallery || 'لا توجد صور إضافية لهذا المشروع حالياً.'}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                        </div>
                      </>
                    );
                  })()}

                  {/* Links Action Bar under Video */}
                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500 transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{t.projects.liveDemo}</span>
                    </a>

                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-1.5 px-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-purple-400 font-bold text-[10px] flex items-center justify-center gap-1 transition-all"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>{t.projects.githubRepo}</span>
                    </a>
                  </div>

                </div>

                {/* Content Column (Right Column on Desktop) */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-2 pl-0 lg:pl-1">
                  
                  {/* Description */}
                  <div>
                    <p className="text-slate-300 text-[11px] sm:text-xs leading-normal">
                      {getLoc(selectedProject.longDesc)}
                    </p>
                  </div>

                  {/* Key Features Highlights */}
                  {(selectedProject.highlights || []).length > 0 && (
                    <div className="pt-0.5">
                      <h4 className="text-[11px] font-bold text-white mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-sky-400" />
                        <span>{t.projects.modalKeyFeatures}</span>
                      </h4>
                      <ul className="space-y-0.5">
                        {(selectedProject.highlights || []).map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{getLoc(h)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="pt-0.5">
                    <h4 className="text-[10px] font-bold text-slate-400 mb-1">
                      {t.projects.modalTech}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {(selectedProject.tech || []).map((tItem, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 font-bold text-[10px]">
                          {getLoc(tItem)}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* 3. Lightbox Full Image Viewer */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fadeIn">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-5 left-5 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full max-h-[90vh] flex items-center justify-center p-2">
              <img 
                src={lightboxImage} 
                alt="Full View" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

