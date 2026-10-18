# Checklists (English)

## Before starting
- [ ] `SPEC.md` written and approved
- [ ] `CLAUDE.md` short and up to date
- [ ] Git ready, `.env` in `.gitignore`, `.env.example` has names only
- [ ] `lint` and `build` pass on the empty project
- [ ] Import-direction rule tested (forbidden import fails lint)

## Per section (Gate of the Section Loop)
- [ ] New chat; plan written and approved; baseline (lint + build) was green before starting
- [ ] Built in small parts; only planned files touched
- [ ] `lint` OK, type-check OK, `build` OK
- [ ] Works in the browser: success, error, empty/long-text states
- [ ] No console errors or warnings
- [ ] Responsive at 360 / 768 / 1280; RTL checked if Arabic is supported
- [ ] Keyboard: tab order, visible focus; images have `alt`; inputs have labels
- [ ] Earlier sections re-checked (regression guard P7): same look and behavior
- [ ] `git diff` read, every file understood
- [ ] Commit with a clear message; `PLAN.md` status updated

## Security
- [ ] No secrets in code, `VITE_*`, docs, or git history
- [ ] Webhook/API keys only on the server; webhook secret required
- [ ] Endpoint: Origin allowlist fails closed; Content-Type checked; body size limited
- [ ] Rate limit uses a shared store (or platform firewall); honeypot present
- [ ] Server-side validation + length limits; control characters (CR/LF) stripped; HTML-escaped in email templates
- [ ] Generic error messages; no upstream details leaked
- [ ] CSP: `script-src 'self'`, no unsafe-inline scripts, `img-src` minimal, `frame-ancestors 'none'`
- [ ] `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS set
- [ ] No `dangerouslySetInnerHTML`/`eval` with untrusted data; external links have `rel="noopener noreferrer"`
- [ ] `npm audit --omit=dev` clean; Dependabot + CI (lint, type-check, build, audit)
- [ ] No tooling folders or stray docs in the repo; `security.txt` added
- [ ] Verified with curl: no Origin -> 403, wrong Origin -> 403, wrong Content-Type -> 415, bad JSON -> 400, valid -> 200

## Performance
- [ ] Fonts self-hosted, only needed subsets/weights, `font-display: swap`
- [ ] Images: WebP/AVIF + fallback, width/height set, lazy except LCP, LCP preloaded, no unused files
- [ ] Below-the-fold sections code-split; animation features lazy
- [ ] `prefers-reduced-motion` respected; heavy canvas/particles paused off-screen
- [ ] Hashed assets cached as immutable
- [ ] Canonical, Open Graph (absolute JPG/PNG URL), Twitter card, `robots.txt`, `sitemap.xml`
- [ ] Lighthouse mobile measured before and after; target 90+
- [ ] Lighthouse note: if `NO_NAVSTART`, use PageSpeed Insights or Incognito with extensions off

## Accessibility
- [ ] One `h1`, logical heading order; `lang` and `dir` set correctly
- [ ] Color contrast is readable (check dark and light)
- [ ] All interactive elements reachable and operable by keyboard
- [ ] Buttons are `button`, links are `a`; icon-only buttons have `aria-label`

## Before deploy
- [ ] `npm ci` then `npm run build` works from a clean copy
- [ ] `.env.example` up to date; env vars set in the host dashboard
- [ ] Hosting config: rewrites (if router), headers
- [ ] Tested on a phone
- [ ] No unused files or libraries
- [ ] Live site tested after deploy: direct links, forms, console, security headers

# ======== العربية ========

# قوائم الفحص (عربي)

## قبل البدء
- [ ] `SPEC.md` مكتوب وموافَق عليه
- [ ] `CLAUDE.md` قصير ومحدّث
- [ ] Git جاهز، و`.env` في `.gitignore`، و`.env.example` فيه أسماء فقط
- [ ] `lint` و`build` بينجحوا على المشروع الفاضي
- [ ] قاعدة اتجاه الاستيراد مختبَرة (استيراد ممنوع بيفشل في lint)

## لكل قسم (الـ Gate في حلقة الأقسام)
- [ ] محادثة جديدة؛ الخطة مكتوبة وموافَق عليها؛ الأساس (lint + build) كان أخضر قبل البدء
- [ ] انبنى بأجزاء صغيرة؛ انلمست الملفات المخططة فقط
- [ ] `lint` تمام، type-check تمام، `build` تمام
- [ ] بيشتغل في المتصفح: نجاح، خطأ، فاضي/نص طويل
- [ ] ما في أخطاء ولا تحذيرات في console
- [ ] responsive على 360 / 768 / 1280؛ RTL مفحوص إذا العربي مدعوم
- [ ] لوحة المفاتيح: ترتيب Tab، focus ظاهر؛ الصور فيها `alt`؛ الحقول إلها labels
- [ ] الأقسام السابقة أُعيد فحصها (حارس الانحدار P7): نفس الشكل والسلوك
- [ ] قرأت `git diff` وفهمت كل ملف
- [ ] commit برسالة واضحة؛ حالة `PLAN.md` اتحدّثت

## الأمان
- [ ] لا أسرار في الكود ولا `VITE_*` ولا الوثائق ولا تاريخ git
- [ ] مفاتيح webhook/API على الخادم فقط؛ سر الـ webhook إجباري
- [ ] الـ endpoint: قائمة Origin تفشل بالإغلاق؛ Content-Type مفحوص؛ حجم الجسم محدود
- [ ] الـ rate limit بمخزن مشترك (أو firewall المنصة)؛ honeypot موجود
- [ ] تحقق على الخادم + حدود أطوال؛ أحرف التحكم (CR/LF) محذوفة؛ HTML-escape في قوالب الإيميل
- [ ] رسائل خطأ عامة؛ ما في تسريب لتفاصيل الـ upstream
- [ ] CSP: `script-src 'self'`، بدون unsafe-inline للسكربتات، `img-src` بأقل حد، `frame-ancestors 'none'`
- [ ] `X-Content-Type-Options` و`Referrer-Policy` و`Permissions-Policy` وHSTS مضبوطة
- [ ] لا `dangerouslySetInnerHTML`/`eval` مع بيانات غير موثوقة؛ الروابط الخارجية فيها `rel="noopener noreferrer"`
- [ ] `npm audit --omit=dev` نظيف؛ Dependabot + CI (lint، type-check، build، audit)
- [ ] لا مجلدات أدوات ولا وثائق زائدة في الريبو؛ `security.txt` مضاف
- [ ] اختبار بـ curl: بدون Origin -> 403، Origin خاطئ -> 403، Content-Type خاطئ -> 415، JSON فاسد -> 400، طلب صحيح -> 200

## السرعة
- [ ] الخطوط محلية، فقط الـ subsets والأوزان المطلوبة، `font-display: swap`
- [ ] الصور: WebP/AVIF + fallback، width/height موجودين، lazy ما عدا الـ LCP، والـ LCP عليه preload، ولا ملفات غير مستخدمة
- [ ] الأقسام تحت الشاشة code-split؛ ميزات الأنيميشن lazy
- [ ] `prefers-reduced-motion` محترم؛ الـ canvas/الجسيمات الثقيلة بتتوقف خارج الشاشة
- [ ] الملفات اللي اسمها hash كاشها immutable
- [ ] Canonical وOpen Graph (رابط JPG/PNG مطلق) وTwitter card و`robots.txt` و`sitemap.xml`
- [ ] Lighthouse موبايل مقاس قبل وبعد؛ الهدف 90+
- [ ] ملاحظة Lighthouse: إذا ظهر `NO_NAVSTART` استعمل PageSpeed Insights أو Incognito والإضافات مغلقة

## إتاحة الوصول
- [ ] `h1` واحد وترتيب عناوين منطقي؛ `lang` و`dir` مضبوطين
- [ ] تباين الألوان مقروء (افحص الداكن والفاتح)
- [ ] كل العناصر التفاعلية بتنوصل وبتشتغل بلوحة المفاتيح
- [ ] الأزرار `button` والروابط `a`؛ أزرار الأيقونات فيها `aria-label`

## قبل النشر
- [ ] `npm ci` ثم `npm run build` بيشتغلوا من نسخة نظيفة
- [ ] `.env.example` محدّث؛ متغيرات البيئة مضبوطة في لوحة الاستضافة
- [ ] إعداد الاستضافة: rewrites (إذا في router) وheaders
- [ ] جرّبت على الجوال
- [ ] لا ملفات ولا مكتبات غير مستخدمة
- [ ] الموقع الحي مفحوص بعد النشر: الروابط المباشرة، الفورمات، console، security headers
