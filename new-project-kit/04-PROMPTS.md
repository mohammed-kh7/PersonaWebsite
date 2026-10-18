# Prompts (English)

Copy, fill the [brackets], paste. Start a **new chat for every task** and begin with `CLAUDE.md` + `SPEC.md` + `PLAN.md` (Claude Code reads them itself).

Index: P1 Spec interview | P2 Section map | P3 Scaffold | P4 Section plan | P5 Build one part | P6 Section check | P7 Regression guard | P8 Full security audit | P9 Form/API security | P10 Performance | P11 Fresh review | P12 Bug fix | P13 Refactor | P14 Deploy check | P15 Explain code | P16 Understanding quiz | P17 Hand-off summary

---

## P1. Spec interview
```text
I want to build [one-sentence description]. Interview me about: audience, languages (RTL?), pages and sections, content I have, design references, integrations (forms, APIs), accounts, and hard decisions I have not noticed. Ask 2-3 questions at a time. When we finish, write SPEC.md following the structure of SPEC.template.md. Do not write any code.
```

## P2. Section map (SPEC -> PLAN)
```text
Read SPEC.md. Create PLAN.md: an ordered list of sections to build (base layout first, sections with forms/APIs last). For each section give: purpose, files it will touch (by our folder structure), acceptance criteria I can check by eye, edge cases (empty/error/long text/RTL/mobile), and security notes. Add a status table (todo/doing/done). Keep MVP to the "must" features only. Do not write code.
```

## P3. Scaffold and tooling
```text
Create the project: Vite + React + TypeScript, ESLint, Prettier, alias @/ (vite + tsconfig), .gitignore including .env, .env.example (names only), and the folder structure from CLAUDE.md. Add an ESLint rule (import/no-restricted-paths or equivalent for my ESLint version) enforcing: shared -> features -> app, and no feature-to-feature imports. Then PROVE it: add a forbidden import on purpose, show that npm run lint fails, remove it, show that lint passes. Run npm run build and show the output. Make the first commit. Do not add libraries beyond the approved list in SPEC.md.
```

## P4. Plan ONE section
```text
Section: [name] from PLAN.md. Read CLAUDE.md, SPEC.md, PLAN.md and these files: [list]. Do not write code yet. Show: files to create/edit (only these will be touched), the parts in order (one component/hook/request each), how we verify each part, risks to other sections, and security/performance notes. Wait for my approval.
```

## P5. Build ONE part
```text
Implement part [N] only: [part]. Follow the pattern of [existing file]. Touch only: [files]. No new libraries. When done: run npm run lint and npm run build and show the output, then list the changed files as bullets. Stop and wait. Do not start the next part.
```

## P6. Section check (after the section is built)
```text
Check section [name] against its acceptance criteria in PLAN.md. Do the following and report with evidence, not claims:
1. Run lint, type-check and build; show results.
2. Start the dev server/preview and verify: renders, no console errors/warnings, loading/error/empty states, long text, keyboard navigation and focus visibility, alt text/labels, responsive at 360px, 768px, 1280px, and RTL if the site supports Arabic.
3. Check the section's own security items (inputs, links, secrets) and performance items (image sizes, lazy loading, no unused imports).
4. List anything that fails. Fix only failures inside this section's files. If a fix would touch other files, stop and ask me.
Report as a table: criterion | result | evidence.
```

## P7. Regression guard (before the next section)
```text
I finished section [name]. Before we move on, verify we did not break earlier sections: [list of done sections]. Run lint, type-check and build. Then open the app and for each earlier section confirm it renders and behaves as before (navigation, theme/language toggle, forms, animations, console errors). Use git diff --stat against the last commit of the previous section to list every file changed outside this section's scope and justify each one. If anything regressed: stop, do not patch on top; propose reverting the part with git restore/revert and redoing it. Report as a table: earlier section | result | evidence.
```

## P8. Full security audit (fresh chat, before deploy)
```text
Do a security audit of this web project. Report findings ranked by severity with file and line, and the smallest fix for each. Check:
1. Secrets: nothing secret in src, VITE_* variables, git history, docs; .env ignored; .env.example has names only.
2. Backend/serverless endpoints: Origin allowlist that FAILS CLOSED (empty list or missing Origin = 403), Content-Type check, body size limit, rate limiting with a SHARED store (not only in-memory), honeypot, server-side validation with length limits, stripping control characters (CR/LF) from fields that end up in headers/emails, generic error messages, no upstream details leaked, webhook secret REQUIRED, timeouts.
3. Headers (hosting config, e.g. vercel.json): Content-Security-Policy with script-src 'self' (no unsafe-inline scripts), img-src not wider than needed, frame-ancestors 'none', X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS. Confirm the app still works under this CSP with no console violations. Remove duplicated header files the host ignores.
4. Frontend: dangerouslySetInnerHTML, eval, inline event handlers, target="_blank" without rel="noopener noreferrer", unvalidated localStorage values, user data rendered unsafely, source maps published.
5. Dependencies: npm audit --omit=dev, unused packages, Dependabot, CI workflow (lint, type-check, build, audit).
6. Repo hygiene: tooling folders (.claude, .vscode), leftover docs, security.txt, no sensitive data committed.
Do not change code yet. Give me the list; I will approve fixes.
```

## P9. Quick security check for a form/API feature
```text
Review ONLY the [form/API feature] code. Can a stranger: send unlimited requests, send another site's Origin, inject line breaks into email subject/name, send huge bodies, send HTML/script that will be rendered later, learn internal URLs/secrets from error messages or the bundle? For each yes, show the exact line and the smallest fix. Also confirm loading, error, empty and success states exist on the client.
```

## P10. Performance pass
```text
Do a performance pass without changing the look. First measure (build output sizes; Lighthouse mobile on the production preview, recording Performance/Accessibility/Best Practices/SEO). Then check and fix in this order: (1) fonts self-hosted, only needed subsets/weights, font-display swap, no render-blocking third-party CSS; (2) images: modern formats (WebP/AVIF) with JPG/PNG fallback, explicit width/height, loading="lazy" except the LCP image, LCP image preloaded, no unused assets; (3) bundle: code-split below-the-fold sections, load animation features lazily (e.g. LazyMotion with async features), no heavy library for a small job; (4) animations: respect prefers-reduced-motion, pause when off-screen, fewer particles on mobile; (5) caching headers (immutable for hashed assets); (6) head: canonical, Open Graph with ABSOLUTE image URL (JPG/PNG), Twitter card, robots.txt, sitemap.xml. Re-measure and report before/after in a table. If Lighthouse fails with NO_NAVSTART, use PageSpeed Insights or an Incognito window with extensions disabled.
```

## P11. Fresh-eyes review (new chat, no history)
```text
Review these changes (git diff): [paste]. Report ONLY issues that affect correctness, security or the requirements in SPEC.md/CLAUDE.md. For each: file/line, why it is a problem, minimal fix. Do not suggest style changes or extra features. If you find nothing, say so.
```

## P12. Bug fix
```text
Problem: [what I see]. Happens when [steps]. Expected: [..]. Full error: [paste text]. Relevant file: [path]. Recent diff: [paste].
First find the ROOT CAUSE and explain it; write no fix yet. Then propose the smallest change that fixes the cause (not one that hides the error). Wait for my approval.
```

## P13. Refactor without changing behavior
```text
Reorganize [component/folder] to match CLAUDE.md. Change NO behavior and NO styling. Show the steps first. Move one thing per step; after each step run build and show it passes. Update every import. Do not delete anything before confirming with grep that it is unused.
```

## P14. Deploy check
```text
Prepare for deployment. Verify: npm ci then npm run build from a clean state; no .env or secrets in the repo or git history (scan history); .env.example up to date; hosting config (rewrites for SPA routing if a router is used, headers); list the environment variables I must set in the host dashboard (names and purpose, no values); after deploy, give me a manual test list for the live URL (phone + desktop, direct links, forms, console errors, security headers check).
```

## P15. Explain code (learning)
```text
Explain [file] line by line as if I were a beginner: what does each part do, what are the alternatives, and what could break if I change it?
```

## P16. Understanding quiz
```text
Ask me 5 questions about the code you just wrote to check I understood it, then correct my answers.
```

## P17. Hand-off summary (end of a long chat)
```text
Summarize for a new chat: what is done (sections and commits), what is in progress, decisions made and why, open problems, and the exact next step. Under 200 words. I will paste it into the new chat together with CLAUDE.md, SPEC.md and PLAN.md.
```

# ======== العربية ========

# البرومتات (عربي)

انسخ، عبّي [الأقواس]، والصق. ابدأ **محادثة جديدة لكل مهمة** وابدأها بـ `CLAUDE.md` + `SPEC.md` + `PLAN.md` (Claude Code بيقراهم لحاله).

الفهرس: P1 مقابلة المواصفات | P2 خريطة الأقسام | P3 الإنشاء | P4 خطة القسم | P5 بناء جزء | P6 فحص القسم | P7 حارس الانحدار | P8 فحص أمان كامل | P9 أمان الفورم/API | P10 السرعة | P11 مراجعة بعين جديدة | P12 إصلاح خطأ | P13 Refactor | P14 فحص النشر | P15 شرح الكود | P16 اختبار الفهم | P17 ملخص تسليم

---

## P1. مقابلة المواصفات
```text
بدي أبني [وصف بجملة وحدة]. اعمل معي مقابلة عن: الجمهور، اللغات (وهل RTL؟)، الصفحات والأقسام، المحتوى اللي عندي، مراجع التصميم، التكاملات (فورم، APIs)، الحسابات، وقرارات صعبة ما انتبهت لها. اسأل سؤالين أو ثلاثة كل مرة. لما نخلص، اكتب SPEC.md على بنية SPEC.template.md. لا تكتب أي كود.
```

## P2. خريطة الأقسام (من SPEC إلى PLAN)
```text
اقرأ SPEC.md. أنشئ PLAN.md: قائمة مرتبة بالأقسام اللي رح نبنيها (الـ layout الأساسي أولاً، وأقسام الفورم/الـ API في الآخر). لكل قسم: الهدف، الملفات اللي رح يلمسها (حسب هيكلنا)، معايير قبول بقدر أتحقق منها بالعين، الحالات الحدّية (فاضي/خطأ/نص طويل/RTL/جوال)، وملاحظات الأمان. ضيف جدول حالة (todo/doing/done). خلّي الـ MVP على ميزات "لازم" فقط. لا تكتب كود.
```

## P3. الإنشاء والأدوات
```text
أنشئ المشروع: Vite + React + TypeScript، ESLint، Prettier، alias @/ (في vite وtsconfig)، و.gitignore فيه .env، و.env.example (أسماء فقط)، وهيكل المجلدات من CLAUDE.md. ضيف قاعدة ESLint (import/no-restricted-paths أو المكافئ لنسخة ESLint عندي) بتفرض: shared -> features -> app، وممنوع استيراد feature من feature. بعدين أثبت إنها شغالة: ضيف استيراد ممنوع عمداً، وورّيني إن npm run lint فشل، احذفه، وورّيني إنه نجح. شغّل npm run build وورّيني المخرجات. اعمل أول commit. لا تضف مكتبات خارج القائمة المعتمدة في SPEC.md.
```

## P4. خطة قسم واحد
```text
القسم: [الاسم] من PLAN.md. اقرأ CLAUDE.md وSPEC.md وPLAN.md وهذه الملفات: [قائمة]. لا تكتب كود بعد. اعرض: الملفات اللي رح تنشأ/تتعدل (هذه فقط اللي رح تنلمس)، الأجزاء بالترتيب (مكوّن/hook/طلب لكل جزء)، كيف بنتحقق من كل جزء، المخاطر على الأقسام الثانية، وملاحظات الأمان والسرعة. انتظر موافقتي.
```

## P5. بناء جزء واحد
```text
نفّذ الجزء [N] فقط: [الجزء]. اتبع نمط [ملف موجود]. المسموح تلمس: [ملفات] فقط. ممنوع مكتبات جديدة. لما تخلص: شغّل npm run lint وnpm run build وورّيني المخرجات، ثم اذكر الملفات المتغيّرة بنقاط. بعدها وقّف وانتظر. لا تبدأ الجزء التالي.
```

## P6. فحص القسم (بعد ما يخلص بناؤه)
```text
افحص القسم [الاسم] مقابل معايير القبول في PLAN.md. نفّذ التالي وبلّغ بالدليل، مش بالادعاء:
1. شغّل lint وtype-check وbuild، وورّيني النتائج.
2. شغّل dev/preview وتحقق من: بيظهر صح، ما في أخطاء/تحذيرات في console، حالات loading/error/empty، النص الطويل، التنقل بلوحة المفاتيح ووضوح الـ focus، alt والـ labels، responsive على 360 و768 و1280، وRTL إذا الموقع بيدعم العربي.
3. افحص بنود الأمان الخاصة بالقسم (المدخلات، الروابط، الأسرار) وبنود السرعة (أحجام الصور، lazy loading، لا imports غير مستخدمة).
4. اذكر كل شي فشل. صلّح فقط الفشل داخل ملفات هذا القسم. إذا الإصلاح بيلمس ملفات ثانية، وقّف واسألني.
بلّغ بجدول: المعيار | النتيجة | الدليل.
```

## P7. حارس الانحدار (قبل القسم التالي)
```text
خلّصت القسم [الاسم]. قبل ما نكمل، تحقق إننا ما كسرنا الأقسام السابقة: [قائمة الأقسام المنتهية]. شغّل lint وtype-check وbuild. بعدين افتح التطبيق ولكل قسم سابق تأكد إنه بيظهر وبيتصرف مثل قبل (التنقل، تبديل الثيم/اللغة، الفورمات، الأنيميشن، أخطاء console). استخدم git diff --stat مقابل آخر commit للقسم السابق لتعرض كل ملف تغيّر خارج نطاق هذا القسم، وبرّر كل واحد. إذا في أي انحدار: وقّف، لا تعمل ترقيع فوقه؛ اقترح التراجع عن الجزء بـ git restore/revert وإعادته. بلّغ بجدول: القسم السابق | النتيجة | الدليل.
```

## P8. فحص أمان كامل (محادثة جديدة، قبل النشر)
```text
اعمل فحص أمان لمشروع الويب هذا. بلّغ بالنتائج مرتبة حسب الخطورة مع الملف والسطر وأصغر إصلاح لكل واحدة. افحص:
1. الأسرار: لا شي سري في src ولا متغيرات VITE_* ولا تاريخ git ولا الوثائق؛ .env متجاهَل؛ .env.example فيه أسماء فقط.
2. نقاط الـ backend/serverless: قائمة Origin مسموحة **تفشل بالإغلاق** (قائمة فاضية أو Origin مفقود = 403)، فحص Content-Type، حد لحجم الجسم، rate limiting بمخزن **مشترك** (مش بالذاكرة فقط)، honeypot، تحقق على الخادم مع حدود أطوال، حذف أحرف التحكم (CR/LF) من الحقول اللي بتروح في headers/إيميلات، رسائل خطأ عامة، عدم تسريب تفاصيل الـ upstream، سر الـ webhook **إجباري**، وtimeouts.
3. الـ Headers (إعداد الاستضافة مثل vercel.json): Content-Security-Policy مع script-src 'self' (بدون unsafe-inline للسكربتات)، img-src مش أوسع من اللازم، frame-ancestors 'none'، X-Content-Type-Options nosniff، Referrer-Policy، Permissions-Policy، HSTS. تأكد إن التطبيق بيشتغل تحت هذا الـ CSP بدون مخالفات في console. احذف ملفات headers المكررة اللي الاستضافة بتتجاهلها.
4. الواجهة: dangerouslySetInnerHTML، eval، inline event handlers، target="_blank" بدون rel="noopener noreferrer"، قيم localStorage غير مفحوصة، عرض بيانات مستخدم بشكل غير آمن، نشر source maps.
5. الاعتماديات: npm audit --omit=dev، حزم غير مستخدمة، Dependabot، وworkflow للـ CI (lint، type-check، build، audit).
6. نظافة الريبو: مجلدات أدوات (.claude، .vscode)، وثائق زائدة، security.txt، وعدم وجود بيانات حساسة في الـ commits.
لا تعدّل كود بعد. اعطني القائمة وأنا بوافق على الإصلاحات.
```

## P9. فحص أمان سريع لميزة فورم/API
```text
راجع كود [ميزة الفورم/API] فقط. هل بقدر شخص غريب: يرسل طلبات بلا حدود، يرسل Origin لموقع ثاني، يحقن أسطر جديدة في موضوع الإيميل/الاسم، يرسل أجسام ضخمة، يرسل HTML/سكربت رح يُعرض لاحقاً، يعرف روابط داخلية/أسرار من رسائل الخطأ أو من الـ bundle؟ لكل "نعم" اعرض السطر بالضبط وأصغر إصلاح. وتأكد كمان إن حالات loading وerror وempty وsuccess موجودة في الواجهة.
```

## P10. فحص السرعة
```text
اعمل فحص سرعة بدون ما تغيّر الشكل. أولاً قِس (أحجام مخرجات build؛ Lighthouse موبايل على الـ production preview، وسجّل Performance/Accessibility/Best Practices/SEO). بعدين افحص وصلّح بهذا الترتيب: (1) الخطوط محلية، فقط الـ subsets والأوزان المطلوبة، font-display swap، بدون CSS خارجي يعطّل الرسم؛ (2) الصور: صيغ حديثة (WebP/AVIF) مع fallback JPG/PNG، width/height صريحين، loading="lazy" ما عدا صورة الـ LCP، وصورة الـ LCP عليها preload، ولا أصول غير مستخدمة؛ (3) الـ bundle: code-split للأقسام تحت الشاشة، تحميل ميزات الأنيميشن بشكل lazy (مثلاً LazyMotion بميزات async)، ولا مكتبة ثقيلة لشغلة صغيرة؛ (4) الأنيميشن: احترم prefers-reduced-motion، أوقفه خارج الشاشة، وقلّل الجسيمات على الجوال؛ (5) headers الكاش (immutable للملفات اللي اسمها hash)؛ (6) الـ head: canonical، وOpen Graph مع رابط صورة **مطلق** (JPG/PNG)، وTwitter card، وrobots.txt، وsitemap.xml. أعد القياس وبلّغ قبل/بعد بجدول. إذا Lighthouse فشل بـ NO_NAVSTART استعمل PageSpeed Insights أو نافذة Incognito والإضافات مغلقة.
```

## P11. مراجعة بعين جديدة (محادثة جديدة بدون تاريخ)
```text
راجع هذه التغييرات (git diff): [الصق]. بلّغ فقط عن المشاكل اللي بتأثر على الصحة أو الأمان أو المتطلبات في SPEC.md/CLAUDE.md. لكل مشكلة: الملف/السطر، ليش هي مشكلة، وأصغر إصلاح. لا تقترح تغييرات أسلوبية ولا ميزات إضافية. إذا ما لقيت شي، قل ذلك.
```

## P12. إصلاح خطأ
```text
المشكلة: [شو بشوف]. بتصير لما [الخطوات]. المتوقع: [..]. الخطأ كامل: [الصق النص]. الملف المعني: [مسار]. آخر diff: [الصق].
أولاً لاقي **السبب الجذري** واشرحه؛ لا تكتب حل بعد. بعدين اقترح أصغر تغيير بيعالج السبب (مش اللي بيخفي الخطأ). انتظر موافقتي.
```

## P13. Refactor بدون تغيير السلوك
```text
أعد ترتيب [المكوّن/المجلد] حسب CLAUDE.md. لا تغيّر أي سلوك ولا أي تنسيق. اعرض الخطوات أولاً. انقل شي واحد كل خطوة؛ وبعد كل خطوة شغّل build وورّيني إنه نجح. حدّث كل الـ imports. لا تحذف شي قبل ما تتأكد بـ grep إنه غير مستخدم.
```

## P14. فحص النشر
```text
جهّز للنشر. تحقق من: npm ci ثم npm run build من حالة نظيفة؛ لا .env ولا أسرار في الريبو ولا في تاريخ git (افحص التاريخ)؛ .env.example محدّث؛ إعداد الاستضافة (rewrites لتوجيه الـ SPA إذا في router، والـ headers)؛ اكتب لي قائمة متغيرات البيئة اللي لازم أضبطها في لوحة الاستضافة (الأسماء والغرض، بدون قيم)؛ وبعد النشر اعطني قائمة فحص يدوي للرابط الحي (جوال + كمبيوتر، روابط مباشرة، فورمات، أخطاء console، فحص security headers).
```

## P15. شرح الكود (تعلّم)
```text
اشرح لي [الملف] سطراً بسطر كأني مبتدئ: شو وظيفة كل جزء، شو البدائل، وشو ممكن ينكسر لو عدّلته؟
```

## P16. اختبار الفهم
```text
اسألني 5 أسئلة عن الكود اللي كتبته للتو لأتأكد إني فهمته، ثم صحّح إجاباتي.
```

## P17. ملخص تسليم (آخر محادثة طويلة)
```text
لخّص لمحادثة جديدة: شو انتهى (الأقسام والـ commits)، شو قيد العمل، القرارات اللي أخذناها وليش، المشاكل المفتوحة، والخطوة التالية بالضبط. أقل من 200 كلمة. رح ألصقه في المحادثة الجديدة مع CLAUDE.md وSPEC.md وPLAN.md.
```
