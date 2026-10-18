# New Project Kit (English)

A folder you copy into every new web project. It tells you (and the AI assistant) **how the project runs**, **how to build it one section at a time without breaking anything**, and gives you **ready prompts** for checks, files, security and performance.

Every file is in two parts: **English first, then Arabic below it** (after the line `# ======== العربية ========`).

## Files

| File | What it is | When you use it |
|------|-----------|-----------------|
| `README.md` | This index + the summary of the guide | Once, to understand the kit |
| `01-WORKFLOW.md` | The full workflow, with a Gate after every step, and the section-by-section loop | Follow it from start to finish |
| `02-SPEC.template.md` | The project file **you** fill in (idea, audience, sections, content, accounts) | Step 1, before any code |
| `03-CLAUDE.md` | Short rules file for the AI. Copy to the project root as `CLAUDE.md` | Step 4, once |
| `04-PROMPTS.md` | All prompts: spec interview, section plan/build/check, regression guard, security, performance, review, bug fix, deploy | Copy-paste during the work |
| `05-CHECKLISTS.md` | Checklists: per section, security, performance, accessibility, pre-deploy | Tick them at each Gate |

## How to start a new project (5 minutes)

1. Create the project folder. Copy `02-SPEC.template.md` to `SPEC.md` and `03-CLAUDE.md` to `CLAUDE.md` in its root. Keep the other files in a `docs/kit/` folder (or keep the kit outside the project and paste prompts from it).
2. Open `01-WORKFLOW.md` and start at Step 1.
3. Run the **Spec interview** prompt (`04-PROMPTS.md`, P1). Answer the questions. The AI writes `SPEC.md`.
4. Continue step by step. Never skip a Gate.

## What the AI does vs. what you do

| You provide | The AI does |
|-------------|-------------|
| The idea, audience, priorities | Asks questions, writes `SPEC.md`, proposes the section order |
| Content: texts, images, logo, links (or approve placeholders) | Builds one section per round, runs lint/build, reports evidence |
| Accounts: GitHub, Vercel, n8n, domain | Writes code, config, docs, env examples |
| Secret values (in the host dashboard only, never in chat or Git) | Never asks for secrets in chat |
| Approvals at each Gate, final `git diff` review | Stops at each Gate and waits |

## Summary of the guide (10 rules)

1. **Feature/section first.** Code that belongs to one feature lives in that feature's folder.
2. **Co-locate.** Things that change together stay together (component, style, test).
3. **Shared only if used twice.** Do not move something to a global folder until two features need it.
4. **Components render, hooks think.** Logic goes into custom hooks.
5. **One import direction:** `shared -> features -> app`. Features never import from other features.
6. **Import directly from files**, not through barrel `index` files (they hurt tree shaking in Vite).
7. **Local state first.** Global state only when really needed in several places.
8. **Clear names.** A variable explains itself; a function does one thing.
9. **Every rule needs an automatic check** (ESLint, build, tests). A rule without a check will be broken. Test it: make a forbidden import on purpose and confirm lint fails.
10. **Vibe coding done right:** small steps, every step has a check (run, lint, build), review every diff, commit after every success, never accept code you do not understand, one chat per task, keep the rules file short.

Corrections to common mistakes: do not mix two architectures (bulletproof-react vs Feature-Sliced Design: pick one); Clean Architecture is a heavy tool, use its light version (logic in hooks/services); pick one styling method (Tailwind or CSS Modules, not both); any `VITE_*` variable is public in the browser, so never put secrets in it.

Sources worth opening: bulletproof-react `docs/project-structure.md`, Feature-Sliced Design docs, and the official Claude Code best-practices page. Links in the original guide marked with a warning sign were not verified, check them before relying on them.

## Important notes

- If a **course assignment** dictates a folder structure, the assignment wins. Use its structure and apply the same rules inside it.
- The default stack in this kit is React + Vite + TypeScript + one styling method + Vercel. Change it in `SPEC.md`.
- Keep this kit updated. When a mistake teaches you something, add a line to `03-CLAUDE.md` or a prompt here.

# ======== العربية ========

# مجلد بداية أي مشروع جديد (عربي)

مجلد بتنسخه لأي مشروع ويب جديد. بيحكي لك ولمساعد الذكاء الاصطناعي **كيف بيمشي المشروع**، و**كيف تبني قسم قسم بدون ما ينكسر شي**، وفيه **برومتات جاهزة** للفحص والملفات والأمان والسرعة.

كل ملف مقسوم لجزئين: **الإنجليزي أولاً، وتحته العربي** (بعد السطر `# ======== العربية ========`).

## الملفات

| الملف | شو هو | متى بتستعمله |
|-------|-------|--------------|
| `README.md` | هذا الفهرس + ملخص الدليل | مرة وحدة لتفهم المجلد |
| `01-WORKFLOW.md` | الورك فلو كامل، وبوابة (Gate) بعد كل خطوة، وحلقة البناء قسم بقسم | اتبعه من أول المشروع لآخره |
| `02-SPEC.template.md` | ملف المشروع اللي **أنت** بتعبيه (الفكرة، الجمهور، الأقسام، المحتوى، الحسابات) | الخطوة 1، قبل أي كود |
| `03-CLAUDE.md` | ملف قواعد قصير للمساعد. انسخه لجذر المشروع باسم `CLAUDE.md` | الخطوة 4، مرة وحدة |
| `04-PROMPTS.md` | كل البرومتات: مقابلة المواصفات، خطة/بناء/فحص القسم، حارس الانحدار، الأمان، السرعة، المراجعة، إصلاح الأخطاء، النشر | انسخ والصق أثناء الشغل |
| `05-CHECKLISTS.md` | قوائم فحص: لكل قسم، الأمان، السرعة، إتاحة الوصول، قبل النشر | علّم عليها عند كل Gate |

## كيف تبدأ مشروع جديد (5 دقائق)

1. أنشئ مجلد المشروع. انسخ `02-SPEC.template.md` باسم `SPEC.md` و`03-CLAUDE.md` باسم `CLAUDE.md` لجذره. باقي ملفات المجلد خليها في `docs/kit/` (أو خلي المجلد خارج المشروع وانسخ منه البرومتات).
2. افتح `01-WORKFLOW.md` وابدأ من الخطوة 1.
3. شغّل برومت **مقابلة المواصفات** (`04-PROMPTS.md`، P1). جاوب على الأسئلة، والمساعد بيكتب `SPEC.md`.
4. كمّل خطوة خطوة. لا تتخطى أي Gate.

## شو بيعمل المساعد وشو بتعمل أنت

| أنت بتوفّر | المساعد بيعمل |
|------------|---------------|
| الفكرة، الجمهور، الأولويات | بيسأل أسئلة، بيكتب `SPEC.md`، بيقترح ترتيب الأقسام |
| المحتوى: نصوص، صور، شعار، روابط (أو توافق على نصوص مؤقتة) | بيبني قسم واحد كل جولة، بيشغّل lint وbuild، وبيعرض الدليل |
| الحسابات: GitHub، Vercel، n8n، الدومين | بيكتب الكود والإعدادات والتوثيق وملفات env المثال |
| قيم الأسرار (في لوحة الاستضافة فقط، مش في المحادثة ولا Git) | ما بيطلب أسرار في المحادثة أبداً |
| الموافقة عند كل Gate، ومراجعة `git diff` الأخيرة | بيوقف عند كل Gate وبيستنى |

## ملخص الدليل (10 قواعد)

1. **الميزة/القسم أولاً.** الكود اللي بيخص ميزة وحدة مكانه داخل مجلد هذه الميزة.
2. **خلّي المتغيرات مع بعضها (Co-location).** اللي بيتغير مع بعض بيضل مع بعض (المكوّن وتنسيقه واختباره).
3. **المشترك فقط لما تستعمله مرتين.** ما تنقل شي لمجلد عام قبل ما ميزتين تحتاجه.
4. **المكوّن يعرض، والـ hook يفكّر.** المنطق في custom hooks.
5. **اتجاه استيراد واحد:** `shared -> features -> app`. الـ feature ما بتستورد من feature ثانية.
6. **استيراد مباشر من الملف**، مش من ملفات `index` التجميعية (بتضر الـ tree shaking في Vite).
7. **الحالة المحلية أولاً.** الحالة العامة فقط لما تحتاجها فعلاً في أكثر من مكان.
8. **أسماء واضحة.** المتغير يشرح نفسه، والدالة تعمل شي واحد.
9. **كل قاعدة لازم لها فحص آلي** (ESLint، build، tests). القاعدة بدون فحص بتنكسر. اختبرها: اعمل استيراد ممنوع عمداً وتأكد إن lint بيفشل.
10. **البايب كودينج الصح:** خطوات صغيرة، كل خطوة لها فحص (تشغيل، lint، build)، راجع كل diff، اعمل commit بعد كل نجاح، لا تقبل كود ما فهمته، محادثة وحدة لكل مهمة، وخلّي ملف القواعد قصير.

تصحيحات لأخطاء شائعة: لا تخلط معماريتين (bulletproof-react مقابل Feature-Sliced Design: اختر وحدة)؛ Clean Architecture أداة ثقيلة، خذ نسختها الخفيفة (منطق في hooks/services)؛ اختر طريقة تنسيق وحدة (Tailwind أو CSS Modules، مش الاثنين)؛ أي متغير `VITE_*` بيظهر للجميع في المتصفح، فلا تحط فيه أسرار.

مصادر تستاهل الفتح: `docs/project-structure.md` من bulletproof-react، توثيق Feature-Sliced Design، وصفحة best practices الرسمية لـ Claude Code. الروابط اللي عليها علامة تحذير في الدليل الأصلي ما اتحققنا منها، افحصها قبل ما تعتمد عليها.

## ملاحظات مهمة

- إذا في **واجب دراسي** بيفرض هيكل مجلدات، الواجب هو الأول. استعمل هيكله وطبّق نفس القواعد داخله.
- الـ stack الافتراضي في هذا المجلد: React + Vite + TypeScript + طريقة تنسيق وحدة + Vercel. غيّره في `SPEC.md`.
- حدّث هذا المجلد. كل ما غلطة تعلّمك شي، ضيف سطر في `03-CLAUDE.md` أو برومت هنا.
