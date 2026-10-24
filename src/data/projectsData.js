export const projectsData = [
  {
    id: "ahla-al-ayyam",
    category: "web",
    title: {
      ar: "نظام حجز قاعة أحلى الأيام",
      en: "Ahla Al Ayyam Hall Booking System",
      tr: "Ahla Al Ayyam Düğün Salonu Rezervasyon Sistemi"
    },
    shortDesc: {
      ar: "منصة إلكترونية متكاملة لحجز المناسبات، تشمل لوحة تحكم، إدارة الحجوزات، التقويم، الدفع، وإدارة العملاء.",
      en: "Complete electronic event hall booking platform with admin dashboard, calendar management, payment tracking, and customer management.",
      tr: "Düğün ve etkinlik salonu rezervasyonu için yönetim paneli, takvim, ödeme takibi ve müşteri yönetimi içeren kapsamlı platform."
    },
    longDesc: {
      ar: "مشروع احترافي متكامل تم بناء الباك إند الخاص به باستخدام Python FastAPI وSQL, والواجهة الأمامية بلوحة تحكم تفاعلية. يوفر النظام حلولاً شاملة لإدارة المواعيد، تأكيد الحجوزات، منع التعارض في المواعيد، طباعة العقود والتقارير المالية، وتنبيه العملاء عبر الوتساب/البريد.",
      en: "Enterprise-grade booking platform engineered with Python FastAPI backend and interactive frontend dashboard. Handles calendar conflict resolution, contract printing, automated client notifications, payment schedule tracking, and detailed financial reports.",
      tr: "Python FastAPI ve etkileşimli yönetim arayüzü ile geliştirilmiş etkinlik salonu rezervasyon sistemi. Çakışmasız takvim takibi, sözleşme basımı, ödeme planlaması ve finansal raporlama sunar."
    },
    tech: ["FastAPI", "Python", "React", "PostgreSQL", "Tailwind CSS", "REST API", "Vercel"],
    highlights: [
      "لوحة تحكم تفاعلية شامـلة للتقويم والمواعيد (Interactive Dashboard Calendar)",
      "إدارة الحجوزات، الدفعات، الفواتير والعقود (Payments & Contracts Management)",
      "إدارة بيانات العملاء والخدمات المضافة (Customer & Services Directory)",
      "نظام منع التعارض في الأيام والأوقات (Automatic Double-Booking Prevention)",
      "إحصائيات مالية وتقارير أداء دورية (Financial Analytics & Reporting)"
    ],
    demoUrl: "https://salah-ahla-alayam-s4mi.vercel.app/",
    githubUrl: "https://github.com/MOHAMMEDALQASHAR/ahla-al-ayyam-system",
    image: "/projects/ahla-al-ayam.png",
    videoUrl: "",
    gallery: [
      "/projects/ahla-al-ayam.png"
    ]
  },
  {
    id: "smart-ai-attendance",
    category: "ai",
    title: {
      ar: "نظام حضور ذكي بالذكاء الاصطناعي",
      en: "Smart AI Attendance System",
      tr: "Akıllı Yapay Zeka Devam Kontrol Sistemi"
    },
    shortDesc: {
      ar: "استخدام Raspberry Pi والكاميرات وتقنيات الذكاء الاصطناعي للتعرف على الأشخاص وإدارة الحضور تلقائيًا.",
      en: "AI-powered facial recognition attendance system integrated with Raspberry Pi hardware and high-res vision sensors.",
      tr: "Raspberry Pi ve kameralar kullanarak yüz tanıma teknolojisi ile otomatik devam ve yoklama yönetim sistemi."
    },
    longDesc: {
      ar: "نظام رؤية حاسوبية (Computer Vision) ذكي يعتمد على نموذج YOLO وOpenCV لتحديد وتأكيد هوية الموظفين أو الطلاب تلقائياً عند المرور أمام الكاميرا المرتبطة بـ Raspberry Pi، مع تسجـيل وقت الحضور والانصراف تلقائياً في قاعدة البيانات وعرض النتائج في لوحة تحكم فورية.",
      en: "Edge AI Computer Vision system leveraging OpenCV, YOLO, and Python running on Raspberry Pi. Automatically detects and recognizes student or employee faces in real time, logs precise entry/exit timestamps into PostgreSQL database, and displays live attendance stats.",
      tr: "OpenCV, YOLO ve Raspberry Pi donanımı ile çalışan gerçek zamanlı yüz tanıma sistemi. Öğrenci veya personeli anında tespit ederek devam bilgilerini veritabanına kaydeder."
    },
    tech: ["Python", "OpenCV", "YOLO", "Raspberry Pi", "TensorFlow", "PostgreSQL", "Flask/FastAPI"],
    highlights: [
      "تعرّف فوري بدقة عالية على الوجوه (Real-Time High Precision Facial Recognition)",
      "دمج كامل مع شريحة Raspberry Pi وكاميرات الشوارع/المؤسسات (Raspberry Pi Edge Hardware Integration)",
      "تسجيل تلقائي وتفادي التزوير للحضور والانصراف (Anti-Spoofing Automated Logging)",
      "لوحة متابعة فورية للإحصائيات والتنبيهات (Real-Time Admin Monitoring Portal)"
    ],
    demoUrl: "https://github.com/mohamed-taha-alqashar/smart-ai-attendance",
    githubUrl: "https://github.com/mohamed-taha-alqashar/smart-ai-attendance",
    image: "/projects/smart-ai-attendance.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    gallery: [
      "/projects/smart-ai-attendance.png"
    ]
  },
  {
    id: "lms-learning-platform",
    category: "web",
    title: {
      ar: "منصة تعليمية متكاملة",
      en: "Comprehensive Educational Platform",
      tr: "Kapsamlı Eğitim ve Kurs Platformu"
    },
    shortDesc: {
      ar: "منصة لإدارة الدورات والطلاب والمدربين مع نظام صلاحيات متكامل (RBAC).",
      en: "Full-featured LMS platform for managing online courses, students, instructors, and role-based permissions.",
      tr: "Kurslar, öğrenciler, eğitmenler ve yetkilendirme sistemi (RBAC) içeren kapsamlı LMS platformu."
    },
    longDesc: {
      ar: "منصة تعليمية شاملة توفر بيئة تفاعلية للمدربين والطلاب، تشمل إدارة الدورات التدريبية، تحميل ملفات المحاضرات، حل الواجبات، الاختبارات الإلكترونية، إصدار الشهادات الأوتوماتيكية، ونظام صلاحيات متقدم (Admin, Instructor, Student).",
      en: "A robust Learning Management System built with React, Node.js/Express, and MongoDB. Features course enrollment, video streaming, interactive quizzes, automated certificate generation upon course completion, and multi-tier RBAC access control.",
      tr: "React, Node.js ve MongoDB ile geliştirilmiş eğitim yönetim sistemi. Kurs kaydı, ödev teslimi, online sınavlar ve otomatik sertifika oluşturma modüllerine sahiptir."
    },
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT Auth"],
    highlights: [
      "إدارة الدورات والطلاب والمدربين (Courses, Student & Instructor Portals)",
      "نظام صلاحيات وأمان محكم (Role-Based Access Control - RBAC)",
      "اختبارات إلكترونية وتقييمات تلقائية (Online Quizzes & Instant Grading)",
      "توليد شهادات إتمام الدورة تلقائياً (Automated Course Completion Certificates)"
    ],
    demoUrl: "https://lms-platform-demo.vercel.app",
    githubUrl: "https://github.com/mohamed-taha-alqashar/lms-educational-platform",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "data-analytics-dashboard",
    category: "database",
    title: {
      ar: "لوحة تحليل بيانات تفاعلية",
      en: "Interactive Data Analytics Dashboard",
      tr: "İnteraktif Veri Analiz Paneli"
    },
    shortDesc: {
      ar: "Dashboard احترافية لعرض وتحليل البيانات باستخدام الرسوم البيانية والتقارير.",
      en: "Professional analytical dashboard for visualization, KPI tracking, dynamic charts, and automated data exports.",
      tr: "Dinamik grafikler, KPI takibi ve veri dışa aktarma özelliklerine sahip profesyonel analiz paneli."
    },
    longDesc: {
      ar: "لوحة بيانات ذكية تدعم الاتصال بعدة قواعد بيانات (PostgreSQL, SQL Server, MySQL)، وتقوم بتصفية وتجميع البيانات الضخمة وعرضها في مخططات بيانية تفاعلية (Bar, Line, Pie, Radar Charts) لمساعدة صناع القرار على اتخاذ القرارات المبنية على البيانات.",
      en: "High-performance Business Intelligence dashboard connecting seamlessly with PostgreSQL & SQL Server data warehouses. Generates real-time charts, visual trends, aggregated financial metrics, and customizable PDF/Excel reports.",
      tr: "PostgreSQL ve SQL Server veritabanlarına bağlanan iş zekası paneli. Gerçek zamanlı grafikler, trend analizleri ve özelleştirilebilir raporlar oluşturur."
    },
    tech: ["React", "Chart.js / Recharts", "ASP.NET Core", "SQL Server", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "رسوم بيانية تفاعلية ومؤشرات أداء مباشرة (Real-Time Interactive KPI Charts)",
      "تصفية متقدمة وتجميع البيانات (Advanced Multi-Filter Data Aggregation)",
      "تصدير التقارير بصيغة PDF وExcel (PDF & Excel Data Export Engine)",
      "دعم وضع الرؤية الداكنة والفاتحة (Dark / Light Theme Visualizer)"
    ],
    demoUrl: "https://analytics-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/mohamed-taha-alqashar/data-analytics-dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
    ]
  }
];
