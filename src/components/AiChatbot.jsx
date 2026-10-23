import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw } from 'lucide-react';

export default function AiChatbot({ isOpen, onClose, t, lang }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: t.aiChatbot.welcome
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Knowledge engine response generator
  const getAiResponse = (query) => {
    const q = query.toLowerCase();

    // Projects inquiry
    if (q.includes('مشروع') || q.includes('مشاريع') || q.includes('project') || q.includes('proje') || q.includes('أحلى الأيام') || q.includes('حضور') || q.includes('لائحة')) {
      if (lang === 'en') {
        return "Eng. Mohamed Taha built 40+ software projects! Highlights include:\n1. **Ahla Al Ayyam Hall Booking Platform**: Complete event booking, calendar, payments & client dashboard (FastAPI & React).\n2. **Smart AI Attendance System**: Raspberry Pi + OpenCV & YOLO for real-time facial recognition.\n3. **Educational Platform (LMS)**: Course & student management with RBAC.\n4. **Data Analytics Dashboard**: KPI charts & reports.";
      } else if (lang === 'tr') {
        return "Müh. Mohamed Taha 40'tan fazla proje geliştirdi! Öne çıkanlar:\n1. **Ahla Al Ayyam Salon Rezervasyon Sistemi**: Düğün salonu takvim ve ödeme yönetimi (FastAPI & React).\n2. **Yapay Zeka Devam Kontrolü**: Raspberry Pi + OpenCV/YOLO ile yüz tanıma.\n3. **Eğitim Platformu (LMS)**: Kurs ve öğrenci yönetimi.\n4. **Veri Analiz Paneli**: KPI grafikleri.";
      } else {
        return "قام المهندس محمد طه القشار بتطوير أكثر من 40 مشروعاً برمجياً! من أبرزها:\n1. **نظام حجز قاعة أحلى الأيام**: منصة إلكترونية شاملة لإدارة الحجوزات والتقويم والدفعات (FastAPI + React).\n2. **نظام الحضور الذكي بالذكاء الاصطناعي**: نظام رؤية حاسوبية يعتمد على Raspberry Pi وOpenCV وYOLO لتحديد الهوية والتعرف الفوري على الوجوه.\n3. **المنصة التعليمية (LMS)**: نظام إدارة الدورات والطلاب مع صلاحيات متكاملة.\n4. **لوحة تحليل البيانات (Dashboard)**: عرض وإحصائيات مباشرة.";
      }
    }

    // Education & Certificates inquiry
    if (q.includes('دراسة') || q.includes('جامعة') || q.includes('شهادة') || q.includes('تخرج') || q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('mezun') || q.includes('bartın')) {
      if (lang === 'en') {
        return "Mohamed is a **Computer Engineer** and graduated with a B.Sc. in **Software Engineering** from **Bartın University** in Turkey. He specializes in Web Development, AI, and Databases.";
      } else if (lang === 'tr') {
        return "Mohamed, **Bilgisayar Mühendisi** olup Türkiye'deki **Bartın Üniversitesi Yazılım Mühendisliği** bölümünden başarıyla mezun olmuştur. Web geliştirme, yapay zeka ve veritabanı alanlarında uzmanlaşmıştır.";
      } else {
        return "محمد طه القشار **مهندس حاسوب** وخريج **هندسة البرمجيات من جامعة بارتن في تركيا (Bartın Üniversitesi)** ومطور برمجيات وحلول رقمية، متخصص في تطوير تطبيقات الويب، أنظمة الذكاء الاصطناعي، وقواعد البيانات.";
      }
    }

    // Skills & Technologies inquiry
    if (q.includes('مهارات') || q.includes('تقنيات') || q.includes('لغات') || q.includes('skill') || q.includes('tech') || q.includes('yetenek') || q.includes('python') || q.includes('react')) {
      if (lang === 'en') {
        return "Mohamed is proficient in:\n- **Languages**: C#, Java, Python, JavaScript, PHP, SQL\n- **Web & Backend**: React, Next.js, FastAPI, ASP.NET Core, Node.js\n- **Databases**: PostgreSQL, MySQL, SQL Server, MongoDB, Firebase\n- **AI & Tools**: OpenCV, YOLO, TensorFlow, Git, Docker, Visual Studio.";
      } else if (lang === 'tr') {
        return "Mohamed'in yetenekleri:\n- **Diller**: C#, Java, Python, JavaScript, PHP, SQL\n- **Web & Backend**: React, Next.js, FastAPI, ASP.NET Core, Node.js\n- **Veritabanları**: PostgreSQL, MySQL, SQL Server, MongoDB, Firebase\n- **Yapay Zeka**: OpenCV, YOLO, TensorFlow, Git, Docker.";
      } else {
        return "يمتلك المهندس محمد مهارات شاملة وتتضمن:\n- **لغات البرمجة**: C#, Java, Python, JavaScript, PHP, SQL\n- **تطوير الويب والباك إند**: React, Next.js, FastAPI, ASP.NET Core, Node.js\n- **قواعد البيانات**: PostgreSQL, MySQL, SQL Server, MongoDB, Firebase\n- **الذكاء الاصطناعي والأدوات**: OpenCV, YOLO, TensorFlow, Git, Docker, VS Code.";
      }
    }

    // Contact & Hiring inquiry
    if (q.includes('تواصل') || q.includes('إيميل') || q.includes('هاتف') || q.includes('توظيف') || q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('iletisim')) {
      if (lang === 'en') {
        return "You can get in touch directly with Eng. Mohamed via:\n- **Email**: alqashar2002@gmail.com\n- **LinkedIn**: linkedin.com/in/mohammed-taha-alqashar-9579422b6\n- **GitHub**: github.com/MOHAMMEDALQASHAR\n- **Instagram**: instagram.com/alqashar123\n- **YouTube**: youtube.com/@alqashar\n- **WhatsApp/Phone**: Available in the contact section below!";
      } else if (lang === 'tr') {
        return "Müh. Mohamed ile doğrudan iletişime geçebilirsiniz:\n- **E-posta**: alqashar2002@gmail.com\n- **LinkedIn**: linkedin.com/in/mohammed-taha-alqashar-9579422b6\n- **GitHub**: github.com/MOHAMMEDALQASHAR\n- **Instagram**: instagram.com/alqashar123\n- **YouTube**: youtube.com/@alqashar\n- **WhatsApp**: Aşağıdaki iletişim bölümünden ulaşabilirsiniz!";
      } else {
        return "يمكنك التواصل المباشر مع المهندس محمد طه القشار عبر:\n- **البريد الإلكتروني**: alqashar2002@gmail.com\n- **LinkedIn**: linkedin.com/in/mohammed-taha-alqashar-9579422b6\n- **GitHub**: github.com/MOHAMMEDALQASHAR\n- **Instagram**: instagram.com/alqashar123\n- **YouTube**: youtube.com/@alqashar\n- **الواتساب**: متوفر في قسم التواصل بالأسفل!";
      }
    }

    // Default friendly response
    if (lang === 'en') {
      return "Eng. Mohamed Taha Al-Qashar is a Yemeni Software Engineer specialized in Web Development, Artificial Intelligence (OpenCV/YOLO), and Database Systems. Feel free to ask about his projects, skills, certifications, or how to contact him!";
    } else if (lang === 'tr') {
      return "Müh. Mohamed Taha Al-Qashar Web Geliştirme, Yapay Zeka (OpenCV/YOLO) ve Veritabanı sistemlerinde uzmanlaşmış bir Yazılım Mühendisidir. Projeleri, eğitimi veya iletişim hakkında dilediğinizi sorabilirsiniz!";
    } else {
      return "المهندس محمد طه القشار هو مهندس برمجيات ومطور حلول رقمية متخصص في تطوير تطبيقات الويب، الذكاء الاصطناعي (OpenCV/YOLO)، وقواعد البيانات. يسعدني الإجابة عن أي سؤال يخص مشاريعـه، مهاراته، شهاداته، أو كيفية التواصل معه!";
    }
  };

  const handleSend = (textToSend = input) => {
    const text = textToSend.trim();
    if (!text) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAiResponse(text);
      setMessages([...newMessages, { sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 animate-fadeIn max-w-[calc(100vw-1.5rem)]">
      <div className="w-[calc(100vw-1.5rem)] sm:w-96 h-[480px] sm:h-[500px] bg-slate-950 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
        
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <span>{t.aiChatbot.title}</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </h3>
              <span className="text-[10px] text-purple-300 block">Al-Qashar Intelligent Assistant</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl max-w-[82%] leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-sky-600/30 border border-sky-400/40 flex items-center justify-center text-sky-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>جاري التحليل والكتابة...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
            {t.aiChatbot.suggestedTitle}
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {t.aiChatbot.suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-sky-300 hover:bg-sky-500/20 hover:border-sky-400 transition-all shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={t.aiChatbot.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-700/70 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
