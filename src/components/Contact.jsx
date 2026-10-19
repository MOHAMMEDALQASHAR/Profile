import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './Icons';
import { Mail, Phone, Send, CheckCircle2, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

export default function Contact({ t }) {
  const { contactInfo } = usePortfolio();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '523562cb-5473-4b85-86f0-0f14da8ce572',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'رسالة جديدة من زائر موقعك الشخصي',
          message: formData.message,
          from_name: formData.name
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setErrorMessage(data.message || 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً');
      }
    } catch {
      setErrorMessage('تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactChannels = [
    {
      title: "البريد الإلكتروني",
      action: "إرسال رسالة مباشرة",
      link: `mailto:${contactInfo.email}`,
      icon: Mail,
      color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      hoverBorder: "hover:border-sky-500/50"
    },
    {
      title: "واتساب (WhatsApp)",
      action: "بدء محادثة فورية",
      link: `https://wa.me/${contactInfo.whatsapp}`,
      icon: Phone,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      hoverBorder: "hover:border-emerald-500/50"
    },
    {
      title: "LinkedIn",
      action: "زيارة الحساب المهني",
      link: contactInfo.linkedin && contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://www.linkedin.com/in/${contactInfo.linkedin || 'mohammed-taha-alqashar-9579422b6'}`,
      icon: LinkedinIcon,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      hoverBorder: "hover:border-blue-500/50"
    },
    {
      title: "GitHub",
      action: "تصفح الأكواد والمشاريع",
      link: contactInfo.github && contactInfo.github.startsWith('http') ? contactInfo.github : `https://github.com/${contactInfo.github || 'MOHAMMEDALQASHAR'}`,
      icon: GithubIcon,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      hoverBorder: "hover:border-purple-500/50"
    },
    {
      title: "Instagram",
      action: "زيارة الصفحة الرسمية",
      link: contactInfo.instagram && contactInfo.instagram.startsWith('http')
        ? contactInfo.instagram
        : `https://www.instagram.com/${contactInfo.instagram ? contactInfo.instagram.replace('@', '') : 'alqashar123'}`,
      icon: InstagramIcon,
      color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
      hoverBorder: "hover:border-pink-500/50"
    }
  ];

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-3">
            <Send className="w-4 h-4" />
            <span>{t.contact.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.contact.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Direct Action Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {contactChannels.map((c, i) => {
              const IconComp = c.icon;
              return (
                <a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between ${c.hoverBorder} hover:scale-[1.01] transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${c.color} group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-400 transition-colors">
                        {c.title}
                      </h4>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {c.action}
                      </span>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-sky-400 group-hover:border-sky-500/50 group-hover:bg-slate-800 transition-all shrink-0">
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl relative overflow-hidden">
            
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  شكراً لتواصلك!
                </h3>
                <p className="text-slate-300 text-sm max-w-md">
                  {t.contact.form.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    {t.contact.form.subject}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contact.form.sendBtn}</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
