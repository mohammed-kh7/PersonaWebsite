# CLAUDE.md template (English)

Copy this to the project root as `CLAUDE.md`. Keep it SHORT: for every line ask "if I delete it, will the AI make a mistake?" If not, delete it. In a normal chat (no Claude Code), paste it as the first message together with `SPEC.md` and `PLAN.md`.

```markdown
# Project
[Name]: [one sentence]. React + Vite + TypeScript + [Tailwind | CSS Modules]. Hosted on Vercel.

# Commands
- npm run dev        # run
- npm run lint       # must pass before every commit
- npm run build      # must pass before every commit (includes type check)

# Structure (mandatory)
- Code by feature: src/features/<name>/{api,components,hooks,utils}
- Shared only: src/components, src/hooks, src/lib, src/utils
- Import direction: shared -> features -> app. NEVER import a feature from another feature.
- Import directly from files (no index.ts barrel files). Use the @/ alias.
- If a course/assignment dictates the folder structure, follow it.

# Code
- Components render only. Logic goes in custom hooks.
- No new library without asking me.
- Do not edit files outside the task scope.
- One styling method only.
- No secrets in code. Any VITE_* variable is public in the browser.
- No empty try/catch, no disabling lint rules to hide errors.

# Security (always)
- Validate and sanitize all user input on the SERVER too. Return generic error messages.
- External links: target="_blank" needs rel="noopener noreferrer".
- No dangerouslySetInnerHTML with unsanitized data. Never use eval or inline scripts.
- Secrets (webhooks, API keys) stay in server-side env vars (serverless function / n8n).

# Way of working
- Build ONE section at a time from PLAN.md. Small steps, then run lint and build.
- Before changing more than 3 files: show a plan and wait for my approval.
- After every change: list changed files as bullets, show command output as evidence.
- Do not mark a section done without: lint+build pass, manual check, regression check of earlier sections.
- If a fix fails twice, stop and tell me; do not keep patching.
```

# ======== العربية ========

# قالب CLAUDE.md (عربي)

انسخه لجذر المشروع باسم `CLAUDE.md`. خلّيه **قصير**: لكل سطر اسأل "لو حذفته، بيغلط المساعد؟" إذا لا، احذفه. في المحادثة العادية (بدون Claude Code)، الصقه كأول رسالة مع `SPEC.md` و`PLAN.md`. (القالب نفسه مكتوب بالإنجليزي لأن المساعد بيتبعه أدق هيك، وهاد شرحه:)

```markdown
# المشروع
[الاسم]: [جملة وحدة]. React + Vite + TypeScript + [Tailwind | CSS Modules]. النشر على Vercel.

# الأوامر
- npm run dev        # تشغيل
- npm run lint       # لازم ينجح قبل أي commit
- npm run build      # لازم ينجح قبل أي commit (يشمل فحص الأنواع)

# الهيكل (إلزامي)
- الكود حسب الميزة: src/features/<name>/{api,components,hooks,utils}
- المشترك فقط: src/components, src/hooks, src/lib, src/utils
- الاتجاه: shared -> features -> app. ممنوع استيراد feature من feature ثانية.
- استيراد مباشر من الملفات (بدون ملفات index.ts تجميعية). استخدم alias: @/
- إذا واجب/كورس بيفرض هيكل المجلدات، اتبعه.

# الكود
- المكوّن يعرض فقط. المنطق في custom hooks.
- ممنوع إضافة مكتبة بدون سؤالي.
- لا تعدّل ملفات خارج نطاق المهمة.
- طريقة تنسيق وحدة فقط.
- لا أسرار في الكود. أي متغير VITE_* بيظهر للجميع في المتصفح.
- ممنوع try/catch فاضي، وممنوع تعطيل قواعد lint لإخفاء الأخطاء.

# الأمان (دائماً)
- تحقق ونظّف كل مدخلات المستخدم على الخادم كمان. رجّع رسائل خطأ عامة.
- الروابط الخارجية: target="_blank" لازم معها rel="noopener noreferrer".
- ممنوع dangerouslySetInnerHTML مع بيانات غير منظّفة. ممنوع eval والسكربتات المضمّنة.
- الأسرار (webhooks، مفاتيح API) تبقى في متغيرات بيئة على الخادم (serverless function / n8n).

# طريقة العمل
- ابنِ قسم واحد كل مرة من PLAN.md. خطوات صغيرة، ثم شغّل lint وbuild.
- قبل تغيير أكثر من 3 ملفات: اعرض خطة وانتظر موافقتي.
- بعد كل تغيير: اذكر الملفات المتغيّرة بنقاط، واعرض مخرجات الأوامر كدليل.
- لا تعلّم قسم done بدون: lint+build ناجحين، فحص يدوي، وفحص انحدار للأقسام السابقة.
- إذا فشل إصلاح مرتين، وقّف وخبّرني؛ لا تكمّل ترقيع.
```
