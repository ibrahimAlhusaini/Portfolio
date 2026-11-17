import { data as englishResume } from '../containers/resume/utils';

export const profile = {
  email: 'ibrahimalhusaini21@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/ibrahimAlhusaini' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ibrahim-alhusaini-2177632b8/' },
  ],
};

export const destinations = [
  { id: 'about', en: ['About', 'About me'], ar: ['عني', 'نبذة عني'], x: 57, y: 25 },
  { id: 'skills', en: ['Skills', 'Technical skills'], ar: ['مهاراتي', 'المهارات التقنية'], x: 24, y: 45 },
  { id: 'projects', route: 'projects1', en: ['Projects', 'Selected projects'], ar: ['مشاريعي', 'مختارات من مشاريعي'], x: 62, y: 54 },
  { id: 'resume', en: ['Resume', 'Experience & education'], ar: ['السيرة الذاتية', 'الخبرة والتعليم'], x: 32, y: 77 },
  { id: 'contact', en: ['Contact', 'Get in touch'], ar: ['تواصل', 'تواصل معي'], x: 86, y: 72 },
];

export const skills = [
  {
    en: 'Programming', ar: 'لغات البرمجة',
    items: ['Python', 'Java', 'C++', 'JavaScript', 'PHP', 'SQL'],
  },
  {
    en: 'Web development', ar: 'تطوير الويب',
    items: ['HTML', 'CSS', 'React', 'Vue 3', 'Bootstrap', 'Node.js', 'Express.js', 'MySQL'],
  },
  {
    en: 'Machine learning & data', ar: 'تعلم الآلة والبيانات',
    items: [
      'Scikit-learn', 'Pandas',
      ['Data preprocessing', 'المعالجة المسبقة للبيانات'],
      ['Feature engineering', 'هندسة الخصائص'],
      ['Classification', 'التصنيف'],
      ['Predictive modeling', 'النمذجة التنبؤية'],
      ['Model training & testing', 'تدريب النماذج واختبارها'],
      ['Model evaluation', 'تقييم النماذج'],
      ['Statistics & scientific computing', 'الإحصاء والحوسبة العلمية'],
    ],
  },
  {
    en: 'Tools & platforms', ar: 'الأدوات والمنصات',
    items: ['Git', 'GitHub', 'Power BI', 'Excel', 'Figma'],
  },
];

export const projects = [
  {
    name: 'ML Detect',
    en: 'Graduation project applying machine learning to detect DDoS attacks.',
    ar: 'مشروع تخرج يوظّف تعلم الآلة لكشف هجمات حجب الخدمة الموزّعة.',
    href: 'https://graduation-project-ebon.vercel.app/',
  },
  {
    name: 'MetaForm GYM',
    en: 'A full-stack fitness platform for tracking workouts and calories, building custom plans, and exploring body-weight and strength trends.',
    ar: 'منصة لياقة متكاملة لتتبّع التمارين والسعرات، وإنشاء خطط مخصّصة، واستكشاف اتجاهات وزن الجسم والقوة.',
    href: 'https://github.com/ibrahimAlhusaini/MetaForm-GYM',
  },
  {
    name: 'VNAT Research',
    en: 'An experiment using the VNAT dataset to classify encrypted VPN and non-VPN traffic.',
    ar: 'تجربة لتصنيف حركة الشبكة المشفّرة داخل الشبكات الافتراضية الخاصة وخارجها باستخدام بيانات VNAT.',
    file: 'Final Course Project Report Selected .pdf',
  },
  {
    name: 'Loan Approval',
    en: 'A study exploring machine learning algorithms for predicting loan approvals.',
    ar: 'دراسة تستكشف استخدام خوارزميات تعلم الآلة للتنبؤ بالموافقة على القروض.',
    file: 'Loan Approval Predication By Using Machine Lerning Algorithm.pdf',
  },
  {
    name: 'Gym Tools',
    en: 'A storefront for people setting up a home gym.',
    ar: 'متجر إلكتروني لمعدات تجهيز الصالات الرياضية المنزلية.',
    href: 'https://github.com/ibrahimAlhusaini/Gym-Store',
  },
];

const arabicResume = {
  experience: [{
    title: 'مطوّر برمجيات',
    subTitle: 'تدريب في شركة Kwaidi',
    period: '06/2024 – 08/2024',
    description: [
      'طوّرت مكوّنات Vue.js ديناميكية وقابلة لإعادة الاستخدام في مشاريع ويب للعملاء، وطبّقت التوجيه والخصائص المحسوبة والمراقِبات والخصائص الممرّرة والسلوك التفاعلي للواجهات.',
      'أضفت دعم العربية والإنجليزية باتجاهَي الكتابة، والوضعين الداكن والفاتح، ورفع الملفات بأمان باستخدام Vue.js وBootstrap وJSON وCSS.',
      'بنيت واجهات متجاوبة للحاسب والأجهزة اللوحية والهواتف باستخدام Bootstrap واستعلامات الوسائط في CSS، وأضفت ترقيم الصفحات وعلامات التبويب والعدّادات المتحركة.',
      'نقلت أجزاء من مشروع Vue.js من JavaScript إلى TypeScript، ودمجت مكوّنات Vuetify، ونشرت المشاريع عبر GitHub وVercel للمراجعة والاختبار المستمرّين.',
    ],
  }],
  education: [{
    title: 'بكالوريوس علوم الحاسب',
    subTitle: 'جامعة الإمام عبدالرحمن بن فيصل',
    period: '08/2020 – 05/2025',
    description: [
      'المعدل التراكمي ٤٫٢ من ٥٫٠',
      'المقررات ذات الصلة تشمل البرمجة كائنية التوجّه، وإدارة البنية التحتية، وتصميم قواعد البيانات، وأنظمة التشغيل، وتحليل الخوارزميات، وهندسة البرمجيات، وتطوير الويب وتطبيقات الجوال، وتنقيب البيانات ومستودعاتها.',
    ],
  }],
};

export const resume = { en: englishResume, ar: arabicResume };

export const certification = {
  en: 'IBM Data Science Professional Certificate',
  ar: 'شهادة IBM المهنية في علوم البيانات',
  issuer: 'IBM · Coursera',
  date: { en: 'August 2026', ar: 'أغسطس ٢٠٢٦' },
  href: 'https://www.coursera.org/verify/professional-cert/0JT16JYV92GG',
  file: 'IBM Data Science.pdf',
};
