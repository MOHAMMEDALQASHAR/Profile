import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Award, 
  Search, 
  FileText, 
  Download, 
  X, 
  ExternalLink, 
  Images, 
  Eye, 
  Maximize2, 
  Image as ImageIcon 
} from 'lucide-react';

export default function Certificates({ t, lang }) {
  const { certificates } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeMediaTab, setActiveMediaTab] = useState('image'); // 'image' | 'gallery'
  const [activeCertImage, setActiveCertImage] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    { key: 'all', label: 'الكل' },
    { key: 'engineering', label: 'أكاديمية' },
    { key: 'erasmus', label: 'Erasmus+' },
    { key: 'ai', label: 'ذكاء اصطناعي' },
    { key: 'web', label: 'تطوير ويب' },
    { key: 'database', label: 'قواعد بيانات' },
    { key: 'leadership', label: 'قيادة' },
    { key: 'volunteering', label: 'تطوع' }
  ];

  const getLoc = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val[lang] || val.ar || val.en || val.tr || '';
    }
    return String(val);
  };

  const filteredCerts = certificates.filter((cert) => {
    const title = getLoc(cert.title);
    const issuer = getLoc(cert.issuer);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'all' || cert.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenCert = (cert) => {
    setSelectedCert(cert);
    setActiveCertImage(cert.image);
    setActiveMediaTab('image');
  };

  const handleDownloadCert = (cert) => {
    const fileUrl = cert.pdfUrl || cert.image;
    if (!fileUrl) return;

    const certTitle = getLoc(cert.title) || 'Certificate';
    const safeFileName = `${certTitle.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}.pdf`;

    // Case 1: Base64 Data URL (data:application/pdf;base64,... or data:image/...)
    if (fileUrl.startsWith('data:')) {
      try {
        const parts = fileUrl.split(',');
        const mimeMatch = parts[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const binaryStr = atob(parts[1]);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: mime });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = safeFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      } catch (err) {
        console.error('Blob download error:', err);
        window.open(fileUrl, '_blank');
      }
      return;
    }

    // Case 2: Standard URL link
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = safeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certificates" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Award className="w-4 h-4" />
            <span>{t.certificates.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t.certificates.subtitle}
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.certificates.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 border border-slate-700/60 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredCerts.map((cert, index) => {
            const title = getLoc(cert.title);
            const issuer = getLoc(cert.issuer);
            const keyVal = cert._id || cert.id || cert.customId || `cert-${index}`;
            const hasGallery = Boolean(cert.gallery && cert.gallery.length > 0);

            return (
              <div
                key={keyVal}
                onClick={() => handleOpenCert(cert)}
                className="glass-card rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div className="relative h-24 sm:h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[9px] sm:text-[10px] font-bold backdrop-blur-md">
                    {cert.badge || 'شهادة'}
                  </span>

                  {/* Multi-Photos Gallery Indicator Badge (نفس المشاريع) */}
                  {hasGallery && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-600/90 backdrop-blur-md border border-amber-400/40 text-white text-[8px] sm:text-[10px] font-extrabold flex items-center gap-0.5 sm:gap-1 shadow-md">
                      <Images className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>{cert.gallery.length} <span className="hidden sm:inline">{t.certificates.photosCount || 'صور'}</span></span>
                    </span>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs">
                    <span className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-extrabold shadow-lg flex items-center gap-1 sm:gap-1.5 transform group-hover:scale-105 transition-transform">
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>معاينة</span>
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-2 mb-1 group-hover:text-amber-400 transition-colors leading-tight">
                      {title}
                    </h4>
                    <p className="text-[9px] sm:text-[11px] text-slate-400 mb-2 sm:mb-3 line-clamp-1">
                      {issuer} ({cert.date})
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-slate-700/30 flex items-center justify-between text-[10px] sm:text-xs font-bold text-amber-400">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      معاينة / PDF
                    </span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal PDF & Rich Image / Multi-Photo Gallery Viewer */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative flex flex-col">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Header */}
              <div className="mb-4 pr-0 sm:pr-8">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold inline-block mb-2">
                  {selectedCert.badge || 'شهادة معتمدة'}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {getLoc(selectedCert.title)}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {getLoc(selectedCert.issuer)} • {selectedCert.date}
                </p>
              </div>

              {/* Media Tabs Selector (إذا كانت الشهادة تحتوي على معرض صور) */}
              {selectedCert.gallery && selectedCert.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-center mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMediaTab('image');
                      setActiveCertImage(selectedCert.image);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      activeMediaTab === 'image'
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>{t.certificates.tabMainImage || 'صورة الشهادة'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('gallery')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      activeMediaTab === 'gallery'
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Images className="w-4 h-4" />
                    <span>{t.certificates.tabGallery || 'معرض الصور'} ({selectedCert.gallery.length})</span>
                  </button>
                </div>
              )}

              {/* Main Image Display Box */}
              {activeMediaTab === 'image' && (
                <div className="space-y-3 mb-6">
                  <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center group shadow-inner">
                    <img
                      src={activeCertImage || selectedCert.image}
                      alt="Certificate Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setLightboxImage(activeCertImage || selectedCert.image)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-md"
                      title="تكبير الصورة"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnails Strip (عرض الصورة الرئيسية + صور المعرض للتبديل السريع) */}
                  {selectedCert.gallery && selectedCert.gallery.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                      {/* Main Image Thumbnail */}
                      <button
                        type="button"
                        onClick={() => setActiveCertImage(selectedCert.image)}
                        className={`h-14 w-18 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          (activeCertImage === selectedCert.image)
                            ? 'border-amber-400 ring-2 ring-amber-400/30'
                            : 'border-slate-800 hover:border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={selectedCert.image} alt="Main Thumb" className="w-full h-full object-cover" />
                      </button>

                      {/* Gallery Thumbnails */}
                      {selectedCert.gallery.map((imgUrl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveCertImage(imgUrl)}
                          className={`h-14 w-18 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            (activeCertImage === imgUrl)
                              ? 'border-amber-400 ring-2 ring-amber-400/30'
                              : 'border-slate-800 hover:border-slate-700 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Gallery Grid Tab View */}
              {activeMediaTab === 'gallery' && (
                <div className="mb-6">
                  {selectedCert.gallery && selectedCert.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1">
                      {selectedCert.gallery.map((imgUrl, i) => (
                        <div
                          key={i}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="relative group rounded-xl overflow-hidden h-28 border border-slate-800 bg-slate-950 cursor-pointer hover:border-amber-400/60 transition-all"
                        >
                          <img src={imgUrl} alt={`Cert Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-1">
                      <Images className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-slate-400 text-xs">
                        {t.certificates.noGallery || 'لا توجد صور إضافية متوفرة لهذه الشهادة حالياً.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleDownloadCert(selectedCert)}
                  className="flex-1 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الشهادة بصيغة PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxImage(activeCertImage || selectedCert.image)}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>تكبير الصورة</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm"
                >
                  {t.certificates.modalClose}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Fullscreen Lightbox Modal (تكبير الصورة بجودة فائقة) */}
        {lightboxImage && (
          <div 
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-lg animate-fadeIn cursor-zoom-out"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center cursor-default"
            >
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute -top-10 left-0 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all shadow-lg"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <img 
                src={lightboxImage} 
                alt="Enlarged Certificate" 
                className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
              />

              <div className="flex items-center gap-3 mt-3">
                <a 
                  href={lightboxImage} 
                  download="certificate_image.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تنزيل الصورة</span>
                </a>

                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

