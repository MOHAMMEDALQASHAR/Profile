import React, { useState } from 'react';
import { galleryData } from '../data/galleryData';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

export default function PhotoGallery({ t, lang }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const allCategories = [
    { key: 'all', label: t.gallery.catAll || 'الكل' },
    { key: 'graduation', label: t.gallery.catGraduation || 'التخرج' },
    { key: 'conferences', label: t.gallery.catConferences || 'المؤتمرات' },
    { key: 'volunteering', label: t.gallery.catVolunteering || 'التطوع' },
    { key: 'awards', label: t.gallery.catAwards || 'الجوائز' }
  ];

  const categories = allCategories.filter(cat => cat.key === 'all' || galleryData.some(g => g.category === cat.key));

  const filteredPhotos = activeCategory === 'all'
    ? galleryData
    : galleryData.filter(g => g.category === activeCategory);

  return (
    <section id="gallery" className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-3">
            <ImageIcon className="w-4 h-4" />
            <span>{t.gallery.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t.gallery.subtitle}
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredPhotos.map((item) => {
            const title = item.title[lang] || item.title.ar;
            return (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="group relative h-36 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer glass-card border-none shadow-lg"
              >
                <img
                  src={item.image}
                  alt={title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 flex items-end justify-between gap-1">
                  <div>
                    <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[8px] sm:text-[10px] font-bold inline-block mb-1 sm:mb-2 backdrop-blur-md">
                      {item.category.toUpperCase()}
                    </span>
                    <h4 className="text-white font-bold text-xs sm:text-base leading-tight line-clamp-2">
                      {title}
                    </h4>
                  </div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-purple-600/80 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shrink-0">
                    <ZoomIn className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute -top-12 left-0 p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl">
                <img
                  src={lightboxImg.image}
                  alt="Full view"
                  className="w-full max-h-[75vh] object-contain bg-slate-950"
                />
                <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
                  <h3 className="text-white font-bold text-lg">
                    {lightboxImg.title[lang] || lightboxImg.title.ar}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
