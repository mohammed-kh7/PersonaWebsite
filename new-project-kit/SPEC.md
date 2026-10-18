# SPEC (English)

## 1. Idea
- What is the site/app in one sentence: A clean, scalable React project structure demonstrating professional folder organization for a React application.
- Why does it exist / what problem does it solve: Practice organizing a React application using a professional and maintainable structure as per course assignment requirements.
- Who is it for (audience): Course instructors, developers learning React project structure.
- The 3 most important things a visitor must be able to do: 1) View the organized folder structure 2) See example components in each folder 3) Understand the architecture pattern.

## 2. Languages and direction
- Languages: English
- RTL needed: no
- Default language: English

## 3. Pages and sections (in order, top to bottom)
| # | Section | Purpose | Content ready? (yes / placeholder) |
|---|---------|---------|------------------------------------|
| 1 | Layout (header/footer) | Base layout with Navbar and Footer | placeholder |
| 2 | UI Components | Reusable UI primitives (Button, Input) | placeholder |
| 3 | Providers | App-level providers (Context, Theme) | placeholder |
| 4 | Skeleton | Loading states (LoadingSkeleton) | placeholder |
| 5 | Common Components | Shared components (EmptyState) | placeholder |
| 6 | Hooks | Custom hooks (useDebounce) | placeholder |
| 7 | API Layer | API configuration and endpoints (axios, users.api) | placeholder |
| 8 | Types | TypeScript type definitions (user.types) | placeholder |
| 9 | Store | State management (auth.store, index) | placeholder |
| 10 | Pages | Page components (Home, About) | placeholder |
| 11 | Constants | App constants (routes) | placeholder |
| 12 | i18n | Internationalization config (config, en.json) | placeholder |
| 13 | Assets | Static assets (images, icons, fonts) | placeholder |
| 14 | Schemas | Validation schemas (user.schema) | placeholder |
| 14 | Utils | Utility functions (formatDate) | placeholder |

## 4. Features
- **Must (MVP, max 5):**
  1. Vite + React + TypeScript project setup
  2. Complete folder structure under src/ as specified
  3. At least one example file in each required folder
  4. ESLint + Prettier configured
  5. GitHub repository pushed
- **Nice to have (later):** Actual UI implementation, routing, theme toggle
- **Out of scope (not now):** Backend, authentication, database, complex features

## 5. Design
- Mood / style: Clean, minimal, educational
- Reference sites (links): None (structure-focused)
- Colors: Neutral grays, one accent color
- Fonts: System font stack
- Dark mode: no
- Animations: none

## 6. Content I will provide
- Texts: Placeholder texts for components
- Images/logo: None needed (placeholder SVGs if any)
- Links (GitHub, LinkedIn, ...): GitHub repo link after push
- Anything I will NOT provide (use clearly marked placeholders): Real content, images, icons

## 7. Integrations
- Forms: None
- APIs / n8n / database: None (mock API structure only)
- Analytics: None

## 8. Stack (default shown, change if needed)
- React + Vite + TypeScript + CSS Modules + Vercel
- Extra libraries and the reason for each:
  - axios: HTTP client for API layer example
  - zod: Schema validation for schemas example
  - react-router-dom: For pages routing example (optional, only if multi-page)

## 9. Accounts and environment variables
- Accounts I have: GitHub, Vercel
- Env variable NAMES only (values go in the host dashboard, never here): VITE_API_BASE_URL

## 10. Security notes
- Do we collect personal data (emails, names)? no
- Any login/payment? no

## 11. Constraints
- Deadline: As per course
- Budget: N/A
- Hosting: Vercel
- Must work on: desktop browsers

## 12. Done means
- [ ] Project structure matches required folder tree exactly
- [ ] At least one example file in each folder
- [ ] npm run lint passes
- [ ] npm run build passes
- [ ] Pushed to GitHub public repository
- [ ] No secrets in repo

## What must come from me (checklist)
- [ ] GitHub account for pushing
- [ ] Vercel account for deployment (optional)
- [ ] Approval at every Gate and a read of every final git diff

# ======== العربية ========

# SPEC (عربي)

## 1. الفكرة
- شو الموقع/التطبيق بجملة وحدة: هيكل مشروع رياكت نظيف وقابل للتوسع يوضح تنظيم المجلدات الاحترافي لتطبيق رياكت.
- ليش موجود / شو المشكلة اللي بيحلها: ممارسة تنظيم تطبيق رياكت باستخدام هيكل احترافي وقابل للصيانة حسب متطلبات الواجب.
- لمين (الجمهور): مدربي الدورة، مطورين بتعلموا هيكل مشروع رياكت.
- أهم 3 أشياء لازم الزائر يقدر يعملها: 1) يشوف هيكل المجلدات المنظم 2) يشوف مكونات مثال في كل مجلد 3) يفهم نمط المعمارية.

## 2. اللغات والاتجاه
- اللغات: إنجليزي
- يحتاج RTL: لا
- اللغة الافتراضية: إنجليزي

## 3. الصفحات والأقسام (مرتبة من فوق لتحت)
| # | القسم | الهدف | المحتوى جاهز؟ (نعم / مؤقت) |
|---|-------|-------|-----------------------------|
| 1 | Layout (header/footer) | لايوت أساسي مع Navbar و Footer | مؤقت |
| 2 | UI Components | مكونات UI قابلة لإعادة الاستخدام (Button, Input) | مؤقت |
| 3 | Providers | مقدمين على مستوى التطبيق (Context, Theme) | مؤقت |
| 4 | Skeleton | حالات تحميل (LoadingSkeleton) | مؤقت |
| 5 | Common Components | مكونات مشتركة (EmptyState) | مؤقت |
| 6 | Hooks | هوكس مخصصة (useDebounce) | مؤقت |
| 7 | API Layer | إعداد API والنقاط النهائية (axios, users.api) | مؤقت |
| 8 | Types | تعريفات TypeScript (user.types) | مؤقت |
| 9 | Store | إدارة الحالة (auth.store, index) | مؤقت |
| 10 | Pages | مكونات الصفحات (Home, About) | مؤقت |
| 11 | Constants | ثوابت التطبيق (routes) | مؤقت |
| 12 | i18n | إعداد التدويل (config, en.json) | مؤقت |
| 13 | Assets | أصول ثابتة (images, icons, fonts) | مؤقت |
| 14 | Schemas | مخططات التحقق (user.schema) | مؤقت |
| 15 | Utils | دوال مساعدة (formatDate) | مؤقت |

## 4. الميزات
- **لازم (MVP، بحد أقصى 5):**
  1. إعداد مشروع Vite + React + TypeScript
  2. هيكل مجلدات كامل تحت src/ كما هو مطلوب
  3. ملف مثال واحد على الأقل في كل مجلد مطلوب
  4. ESLint + Prettier مضبوطين
  5. رفع المشروع على GitHub
- **مفيد (لاحقاً):** تنفيذ UI فعلي، توجيه، تبديل ثيم
- **خارج النطاق (مش هلأ):** باك إند، مصادقة، قاعدة بيانات، ميزات معقدة

## 5. التصميم
- الأجواء / الأسلوب: نظيف، بسيط، تعليمي
- مواقع مرجعية (روابط): لا يوجد (التركيز على الهيكل)
- الألوان: درجات رمادية محايدة، لون مميز واحد
- الخطوط: System font stack
- وضع داكن: لا
- الأنيميشن: لا يوجد

## 6. المحتوى اللي رح أوفّره
- النصوص: نصوص placeholder للمكونات
- الصور/الشعار: غير مطلوبة (placeholder SVGs إذا لزم)
- الروابط (GitHub، LinkedIn، ...): رابط GitHub repo بعد الرفع
- شو اللي ما رح أوفّره (استعمل نصوص مؤقتة بعلامة واضحة): محتوى حقيقي، صور، أيقونات

## 7. التكاملات
- الفورمات: لا يوجد
- APIs / n8n / قاعدة بيانات: لا يوجد (هيكل API وهمي فقط)
- التحليلات: لا يوجد

## 8. الـ Stack (الافتراضي مكتوب، غيّره لو لزم)
- React + Vite + TypeScript + CSS Modules + Vercel
- مكتبات إضافية وسبب كل وحدة:
  - axios: HTTP client لطبقة API المثال
  - zod: التحقق من المخططات لـ schemas المثال
  - react-router-dom: لتوجيه الصفحات المثال (اختياري، فقط إذا multi-page)

## 9. الحسابات ومتغيرات البيئة
- الحسابات اللي عندي: GitHub، Vercel
- **أسماء** متغيرات البيئة فقط (القيم في لوحة الاستضافة، مش هون أبداً): VITE_API_BASE_URL

## 10. ملاحظات الأمان
- هل بنجمع بيانات شخصية (إيميلات، أسماء)؟ لا
- فيه تسجيل دخول/دفع؟ لا

## 11. القيود
- الموعد النهائي: حسب الدورة
- الميزانية: غير محدد
- الاستضافة: Vercel
- لازم يشتغل على: متصفحات سطح المكتب

## 12. معنى "خلص"
- [ ] هيكل المشروع يطابق شجرة المجلدات المطلوبة تماماً
- [ ] ملف مثال واحد على الأقل في كل مجلد
- [ ] npm run lint ينجح
- [ ] npm run build ينجح
- [ ] مرفوع على GitHub public repository
- [ ] لا أسرار في الريبو

## شو لازم يجي مني (قائمة)
- [ ] حساب GitHub للرفع
- [ ] حساب Vercel للنشر (اختياري)
- [ ] موافقة عند كل Gate وقراءة كل git diff نهائي