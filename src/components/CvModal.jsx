import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, GraduationCap, Briefcase, Award, Code2, FileCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function CvModal({ isOpen, onClose, t, lang }) {
  const { bioInfo } = usePortfolio();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadFile = () => {
    if (!bioInfo?.cvUrl) return;
    const link = document.createElement('a');
    link.href = bioInfo.cvUrl;
    link.download = bioInfo.cvFileName || 'Mohamed_Taha_Alqashar_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Action Header */}
        <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-400 shrink-0" />
            <h3 className="font-bold text-white text-sm sm:text-base truncate">
              {t.cvModal.title} - {bioInfo?.name || 'Mohamed Taha Al-Qashar'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {bioInfo?.cvUrl && (
              <button
                onClick={handleDownloadFile}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md hover:from-emerald-400 hover:to-teal-500 transition-all"
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>تنزيل PDF</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-md hover:bg-sky-400 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{t.cvModal.printBtn}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all ml-auto sm:ml-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 bg-white text-slate-900 font-sans" id="printable-cv">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                محمد طه القشار (Mohamed Taha Al-Qashar)
              </h1>
              <p className="text-base sm:text-lg font-bold text-sky-700 mt-1">
                مهندس حاسوب ومطور برمجيات وحلول رقمية (Computer Engineer & Software Developer)
              </p>
            </div>
            
            <div className="text-xs space-y-1 text-slate-700 font-semibold dir-ltr">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>alqashar2002@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>+90 552 690 99 44</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>Bartın, Turkey / Yemen</span>
              </div>
            </div>
          </div>

          {/* Education & Bio */}
          <div className="mb-6">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-700" />
              <span>التعليم الأكاديمي والنبذة (Education & Bio)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
              مهندس حاسوب وخريج **هندسة البرمجيات من جامعة بارتن في تركيا (Bartın Üniversitesi)**. متخصص في تطوير الويب والذكاء الاصطناعي وقواعد البيانات، متمكن من لغات البرمجة C#, Java, Python, JavaScript, PHP, SQL وتطوير الأنظمة المتكاملة.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mb-6">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-sky-700" />
              <span>المهارات والتقنيات (Technical Skills)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div><strong>لغات البرمجة:</strong> C#, Java, Python, JavaScript (ES6+), PHP, SQL</div>
              <div><strong>تطوير الويب:</strong> React, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap</div>
              <div><strong>الباك إند:</strong> ASP.NET Core, FastAPI, Node.js, Express</div>
              <div><strong>قواعد البيانات:</strong> PostgreSQL, MySQL, SQL Server, Firebase, MongoDB</div>
              <div><strong>الذكاء الاصطناعي:</strong> OpenCV, YOLO, TensorFlow, Machine Learning, Computer Vision</div>
              <div><strong>أدوات التطوير:</strong> Git, GitHub, Docker, Postman, Visual Studio, VS Code</div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-700" />
              <span>الخبرات الرئيسية (Key Experience)</span>
            </h2>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-2">
              <li><strong>مطور برمجيات & Full Stack:</strong> تصميم وتطوير أنظمة حجز القاعات، اللوحات الإدارية، وأنظمة الحضور الذكي بالذكاء الاصطناعي مع ربط REST APIs.</li>
              <li><strong>مطور قواعد بيانات:</strong> بناء وتصميم الهياكل وتحسين أداء الاستعلامات المعقدة.</li>
              <li><strong>قائد فرق ومتطوع دولي:</strong> المشاركة في برامج Erasmus+ والتبادل الشبابي والفعاليات الثقافية.</li>
            </ul>
          </div>

          {/* Featured Projects */}
          <div className="mb-6">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-700" />
              <span>أبرز المشاريع (Featured Projects)</span>
            </h2>
            <div className="space-y-2 text-xs text-slate-800">
              <div><strong>نظام حجز قاعة أحلى الأيام:</strong> منصة إلكترونية كاملة للحجوزات، التقويم، والدفعات (FastAPI + React + PostgreSQL).</div>
              <div><strong>نظام الحضور الذكي بالذكاء الاصطناعي:</strong> التعرف التلقائي على الوجوه باستخدام Raspberry Pi, OpenCV, YOLO.</div>
              <div><strong>المنصة التعليمية (LMS):</strong> إدارة الدورات والطلاب والصلاحيات التفاعلية.</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
