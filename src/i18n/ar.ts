import type { Dictionary } from './types'

export const ar: Dictionary = {
  meta: {
    title: 'محمد خضير — مطوّر واجهات أمامية | متخصص في React وأتمتة الذكاء الاصطناعي',
    description:
      'محمد خضير — مطوّر واجهات أمامية وأخصائي أتمتة ذكاء اصطناعي. React و JavaScript وسير عمل N8n وأحدث تقنيات الويب.',
  },
  brand: {
    first: 'محمد',
    last: 'خضير',
  },
  nav: {
    label: 'التنقل الرئيسي',
    items: {
      home: 'الرئيسية',
      about: 'نبذة',
      skills: 'المهارات',
      projects: 'المشاريع',
      services: 'الخدمات',
      contact: 'تواصل',
    },
    themeToggle: 'التبديل إلى الوضع {theme}',
    toggleMenu: 'فتح القائمة',
    scrollToTop: 'العودة إلى الأعلى',
    switchLanguage: 'التبديل إلى الإنجليزية',
  },
  common: {
    liveDemo: 'نسخة حية',
    visitDemo: 'عرض النسخة الحية',
    github: 'GitHub',
    previousSlide: 'الشريحة السابقة',
    nextSlide: 'الشريحة التالية',
    slideOf: '{current} من {total}',
    goToSlide: 'الانتقال إلى الشريحة {index}',
    backToTop: 'العودة إلى الأعلى',
    sending: 'جارٍ الإرسال...',
    sendMessage: 'إرسال الرسالة',
  },
  hero: {
    greeting: 'مرحباً، أنا',
    descriptionLead: 'مطوّر واجهات أمامية وأخصائي أتمتة ذكاء اصطناعي، أعمل مع',
    descriptionTail: '، وواجهات مدعومة بالذكاء الاصطناعي.',
    ctaPrimary: 'اعرض أعمالي',
    ctaSecondary: 'تواصل معي',
    stats: [
      { value: '5+', label: 'تقنيات' },
      { value: '10+', label: 'مشاريع' },
      { value: '100%', label: 'التزام' },
    ],
    profileAlt: 'محمد خضير — مطوّر واجهات أمامية وأخصائي أتمتة ذكاء اصطناعي',
    scrollIndicator: 'انتقل إلى قسم نبذة',
  },
  about: {
    title: 'نبذة',
    highlight: 'عني',
    subtitle: 'أبني تطبيقات ويب عصرية وسريعة الأداء تقدّم تجربة مستخدم استثنائية.',
    bioLead: 'أنا',
    bioRole: 'مطوّر واجهات أمامية وأخصائي أتمتة ذكاء اصطناعي',
    bioTail:
      'شغوف بصناعة واجهات مستخدم نظيفة ومتجاوبة باستخدام React و JavaScript. أركز على بناء تجارب رقمية سلسة تجمع بين التصميم المدروس والكود المنظّم.',
    paragraphTwo:
      'تمتد خبرتي من هندسة مكونات React إلى أتمتة سير العمل عبر N8n وحلول الواجهات المدعومة بالذكاء الاصطناعي. ملتزم بتسليم تطبيقات واجهة أمامية تحقق تفاعلاً ونتائج تجارية حقيقية.',
    highlights: [
      {
        id: 'code',
        title: 'تطوير الواجهات الأمامية',
        description: 'أبني واجهات عصرية ومتجاوبة باستخدام React و JavaScript',
      },
      {
        id: 'zap',
        title: 'الذكاء الاصطناعي والأتمتة',
        description: 'دمج سير عمل N8n وواجهات مدعومة بالذكاء الاصطناعي',
      },
    ],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'أتمتة ذكية', 'N8n'],
  },
  skills: {
    title: 'مهاراتي',
    highlight: '',
    subtitle: 'التقنيات والأدوات التي أعمل بها لبناء تجارب ويب عصرية.',
    categories: [
      { key: 'frontend', label: '🎨 الواجهات الأمامية' },
      { key: 'tools', label: '🛠️ الأدوات وسير العمل' },
      { key: 'automation', label: '🤖 الأتمتة والذكاء الاصطناعي' },
    ],
    items: [
      { id: 'react', label: 'React', category: 'frontend' },
      { id: 'javascript', label: 'JavaScript', category: 'frontend' },
      { id: 'html-css', label: 'HTML5 / CSS3', category: 'frontend' },
      { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend' },
      { id: 'responsive-design', label: 'تصميم متجاوب', category: 'frontend' },
      { id: 'git-github', label: 'Git / GitHub', category: 'tools' },
      { id: 'figma', label: 'Figma', category: 'tools' },
      { id: 'vscode', label: 'VS Code', category: 'tools' },
      { id: 'n8n-workflows', label: 'سير عمل N8n', category: 'automation' },
      { id: 'ai-integration', label: 'دمج الذكاء الاصطناعي', category: 'automation' },
      { id: 'api-automation', label: 'أتمتة واجهات API', category: 'automation' },
      { id: 'webhook-design', label: 'تصميم Webhooks', category: 'automation' },
    ],
  },
  projects: {
    title: '',
    highlight: 'مشاريعي',
    subtitle:
      'مجموعة من تطبيقات الويب والألعاب التفاعلية وأدوات الإدارة المبنية باستخدام JavaScript و HTML5 و CSS3.',
    items: [
      {
        id: '1',
        title: 'موقع البورتفوليو الشخصي',
        description:
          'موقع بورتفوليو للمطوّر بتصميم داكن عصري، نبذة شخصية، عرض للمهارات، تنقل تفاعلي، وأبرز المشاريع.',
      },
      {
        id: '2',
        title: 'نظام إدارة المنتجات CRUDS',
        description:
          'لوحة تحكم لإدارة المنتجات مع عمليات إنشاء وقراءة وتعديل وحذف كاملة، وحساب تلقائي للسعر والضريبة والخصم، وبحث بنظامين.',
      },
      {
        id: '3',
        title: 'لعبةXO (XO)',
        description:
          'لعبةXO تفاعلية على الويب بسمات داكنة مخصصة، وإدارة حالة الأدوار خطوة بخطوة، ومنطق فوري لتحديد الفائز.',
      },
      {
        id: '4',
        title: 'لعبة Hangman',
        description:
          'لعبة تخمين كلمات ممتعة مع اختيار التصنيف (أشخاص/كلمات)، وتحديث رسم المشنقة ديناميكياً، ولوحة مفاتيح افتراضية تفاعلية.',
      },
      {
        id: '5',
        title: 'محول العملات',
        description:
          'أداة نظيقة لتحويل العملات تدعم الحسابات الفورية بين الدولار الأمريكي ($) والشاقل الإسرائيلي (₪) مع واجهة متجاوبة.',
      },
    ],
  },
  services: {
    title: '',
    highlight: 'خدماتي',
    subtitle: 'ما يمكنني تقديمه لمساعدتك على بناء منتجات رقمية مميزة.',
    items: [
      {
        id: '1',
        title: 'تطوير تطبيقات React',
        description:
          'تطبيقات React مخصصة باستخدام TypeScript وأنماط Hooks حديثة وبنية معتمدة على المكونات.',
        features: [
          'تطبيقات صفحة واحدة (SPA)',
          'مكتبات مكونات جاهزة',
          'إدارة الحالة',
          'تحسين الأداء',
        ],
      },
      {
        id: '2',
        title: 'هندسة الواجهات الأمامية',
        description:
          'أنظمة واجهات قابلة للتوسع بكود نظيف وأنظمة تصميم مدمجة وأفضل الممارسات.',
        features: [
          'أنظمة التصميم',
          'تصميم متجاوب',
          'إمكانية الوصول (a11y)',
          'دعم المتصفحات المتعددة',
        ],
      },
      {
        id: '3',
        title: 'الذكاء الاصطناعي والأتمتة',
        description:
          'أتمتة سير العمل عبر N8n وواجهات مدعومة بالذكاء الاصطناعي لتبسيط العمليات وزيادة الإنتاجية.',
        features: [
          'سير عمل N8n',
          'دمج المحادثات الذكية',
          'أتمتة Webhooks',
          'تصميم خطوط البيانات',
        ],
      },
      {
        id: '4',
        title: 'استشارات الويب',
        description:
          'إرشادات تقنية حول البنية المعمارية واختيار التقنيات واستراتيجية التنفيذ لمشاريع الويب.',
        features: [
          'مراجعات تقنية',
          'اختيار التقنيات',
          'مراجعة الكود',
          'الإرشاد والتدريب',
        ],
      },
    ],
  },
  contact: {
    title: 'تواصل',
    highlight: 'معني',
    subtitle: 'لديك مشروع في ذهنك؟ لنعمل معاً على إنشاء شيء مميز.',
    connectTitle: 'لنتواصل',
    connectText:
      'أنا منفتح دائماً لمناقشة المشاريع الجديدة والأفكار الإبداعية أو الفرص للمشاركة في رؤيتك.',
    emailLabel: 'البريد الإلكتروني',
    responseTimeLabel: 'زمن الرد',
    responseTimeValue: 'خلال 24 ساعة',
    talkLabel: 'لنبدأ',
    talkValue: 'متاح للعمل الحر والتعاون',
    form: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'الرسالة',
      namePlaceholder: 'الاسم الكامل',
      emailPlaceholder: 'name@example.com',
      subjectPlaceholder: 'استفسار عن مشروع',
      messagePlaceholder: 'أخبرني عن مشروعك...',
      submit: 'إرسال الرسالة',
      successTitle: 'تم إرسال الرسالة!',
      successText: 'شكراً لتواصلك معي، سأعود إليك قريباً!',
      errorText: 'تعذّر إرسال الرسالة. حاول مرة أخرى أو راسلني مباشرة عبر البريد.',
    },
  },
  footer: {
    tagline: 'مطوّر واجهات أمامية متخصص في React و JavaScript وأتمتة الذكاء الاصطناعي.',
    rights: 'جميع الحقوق محفوظة.',
  },
  validation: {
    required: '{field} مطلوب',
    email: 'الرجاء إدخال بريد إلكتروني صحيح',
    minLength: 'الحد الأدنى {count} أحرف',
    maxLength: 'الحد الأقصى {count} أحرف',
    pattern: 'صيغة غير صحيحة',
  },
}