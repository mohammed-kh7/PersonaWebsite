# Workflow (English)

**Rule:** every step has a **Gate**. You do not move on until the Gate is true.

```text
Idea -> SPEC -> Section map -> Stack -> Scaffold + tooling -> Rules file
-> Layout/base -> [SECTION LOOP] -> API/integrations -> Security pass
-> Performance pass -> Fresh review -> Deploy -> Improve
```

## Step 1: Idea and SPEC (what comes from you)
- Fill `SPEC.md` by running prompt **P1** (interview). The AI asks 2-3 questions at a time, then writes the file.
- You provide: idea, audience, languages, pages, content, design references, accounts.
- **Gate:** `SPEC.md` exists, you read all of it and approved it.

## Step 2: Section map (MVP only)
- Run **P2**. The AI turns `SPEC.md` into `PLAN.md`: an ordered list of sections (for example Layout, Hero, About, Skills, Projects, Contact) with acceptance criteria for each.
- Order: base layout first, then top-of-page sections, then sections with forms/APIs last.
- **Gate:** at most 5 "must" features, every section has acceptance criteria and a status `todo`.

## Step 3: Stack
- Default: React + Vite + TypeScript + React Router (only if multi-page) + one styling method + Vercel. Every extra library needs a written reason in `SPEC.md`.
- **Gate:** library list with reasons is in `SPEC.md`.

## Step 4: Scaffold and tooling (run P3)
- Create the project, add ESLint, Prettier, alias `@/`, `.gitignore` with `.env`, `.env.example`, first commit.
- Copy `03-CLAUDE.md` to `CLAUDE.md`. Add the import-direction ESLint rule and **test it** with a forbidden import.
- **Gate:** `npm run dev`, `npm run lint`, `npm run build` pass on the empty project; forbidden import fails lint; first commit done.

## Step 5: Layout and base styles
- Header, footer, container, colors and fonts as CSS variables/tokens in one place. No features yet.
- **Gate:** looks right on phone and desktop. Commit.

## Step 6: THE SECTION LOOP (repeat for every section in `PLAN.md`)

```text
 A. BASELINE   lint + build pass? previous sections OK?  (if not: fix first, do not start)
 B. PLAN       new chat; AI reads CLAUDE.md + SPEC.md + PLAN.md; proposes a plan for ONE section (P4). You approve.
 C. BUILD      one small part at a time (P5): one component, one hook, or one request
 D. CHECK      section check (P6) + checklist "Per section"
 E. REGRESSION earlier sections still render and behave the same (P7)
 F. REVIEW     read git diff, understand every file
 G. COMMIT     feat(section): ...  and set the section status to done in PLAN.md
 H. NEXT       only now start the next section (new chat)
```

**The "do not break anything" protocol**
1. Start every section from a clean git state and a passing build (baseline).
2. Touch only files listed in the plan. Anything outside needs your approval.
3. After each part run `npm run lint && npm run build`. A broken build blocks the next part.
4. Before the commit, open the page and check the previous sections (P7). Compare to how they looked/behaved before.
5. If a regression appears: stop, do not patch on top. Run `git restore .` (or `git revert` the commit), and redo the part with a more precise prompt.
6. One commit per section (or per part). Small commits make rollback cheap.
7. Never mark a section `done` without the evidence: command outputs and what you checked by hand.

**Gate (per section):** works in the browser (success, error, empty states), lint and build pass, earlier sections unchanged, checklist ticked, diff understood, committed, status updated.

## Step 7: API and integrations
- All requests in one place (`features/<name>/api/` or `src/api/`). Secrets only on the server (serverless function or n8n), never in `VITE_*`.
- Handle loading, error and empty states. Run the security prompt for forms/APIs (**P9**).
- **Gate:** tested success, failure (network off), and empty data; contact/forms protected (see checklist).

## Step 8: Security pass (P8)
- Fresh chat. Full audit of headers/CSP, secrets, forms/API, dependencies, repo.
- **Gate:** every item in "Security checklist" is ticked or has a written reason.

## Step 9: Performance pass (P10)
- Fonts, images, bundle, animations, caching, SEO tags. Measure before and after (PageSpeed Insights or Lighthouse in an Incognito window with extensions off).
- **Gate:** target mobile score 90+ (95+ if possible), numbers recorded in `PLAN.md`.

## Step 10: Fresh review (P11)
- New chat reviews the full diff for correctness and security only. Remove dead code and unused packages.
- **Gate:** lint, build, audit pass; nothing unused left.

## Step 11: Deploy (P14)
- Push to GitHub (no `.env`), import in Vercel, set env vars in the dashboard, add rewrites if a router is used, test the live URL on phone and desktop.
- **Gate:** the live site behaves like local; direct links open; no secrets in the repo or history.

## Step 12: Improve
- Back to `SPEC.md`: take one "nice to have", add it to `PLAN.md` as a new section, and run the Section Loop again.

## Section status table (keep it in `PLAN.md`)

| # | Section | Status (todo / doing / done) | Lint+Build | Manual check | Regression | Commit |
|---|---------|------------------------------|-----------|--------------|-----------|--------|
| 1 | Layout | todo | | | | |

# ======== العربية ========

# الورك فلو (عربي)

**القاعدة:** كل خطوة إلها **Gate** (شرط إتمام). ما تنتقل للخطوة التالية قبل ما يتحقق الـ Gate.

```text
فكرة -> SPEC -> خريطة الأقسام -> Stack -> إنشاء + أدوات -> ملف القواعد
-> Layout/الأساس -> [حلقة الأقسام] -> API/تكاملات -> فحص أمان
-> فحص سرعة -> مراجعة بعين جديدة -> نشر -> تحسين
```

## الخطوة 1: الفكرة وSPEC (اللي بيجي منك)
- عبّي `SPEC.md` بتشغيل برومت **P1** (المقابلة). المساعد بيسأل سؤالين أو ثلاثة كل مرة، وبعدها بيكتب الملف.
- أنت بتوفّر: الفكرة، الجمهور، اللغات، الصفحات، المحتوى، مراجع التصميم، الحسابات.
- **Gate:** `SPEC.md` موجود، قرأته كله ووافقت عليه.

## الخطوة 2: خريطة الأقسام (MVP فقط)
- شغّل **P2**. المساعد بيحوّل `SPEC.md` إلى `PLAN.md`: قائمة مرتبة بالأقسام (مثلاً Layout، Hero، About، Skills، Projects، Contact) ولكل قسم معايير قبول.
- الترتيب: الـ layout الأساسي أولاً، ثم أقسام أعلى الصفحة، وأقسام الفورم/الـ API في الآخر.
- **Gate:** بحد أقصى 5 ميزات "لازم"، ولكل قسم معايير قبول وحالة `todo`.

## الخطوة 3: الـ Stack
- الافتراضي: React + Vite + TypeScript + React Router (فقط إذا الموقع متعدد الصفحات) + طريقة تنسيق وحدة + Vercel. كل مكتبة إضافية لازم إلها سبب مكتوب في `SPEC.md`.
- **Gate:** قائمة المكتبات مع أسبابها موجودة في `SPEC.md`.

## الخطوة 4: الإنشاء والأدوات (شغّل P3)
- أنشئ المشروع، ضيف ESLint وPrettier وalias `@/`، و`.gitignore` فيه `.env`، و`.env.example`، وأول commit.
- انسخ `03-CLAUDE.md` باسم `CLAUDE.md`. ضيف قاعدة ESLint لاتجاه الاستيراد و**اختبرها** باستيراد ممنوع.
- **Gate:** `npm run dev` و`npm run lint` و`npm run build` بينجحوا على المشروع الفاضي؛ الاستيراد الممنوع بيفشل في lint؛ أول commit تم.

## الخطوة 5: الـ Layout والتنسيق الأساسي
- Header وFooter وContainer، والألوان والخطوط كمتغيرات/tokens في مكان واحد. بدون ميزات بعد.
- **Gate:** شكله مضبوط على الجوال والكمبيوتر. commit.

## الخطوة 6: حلقة الأقسام (تتكرر لكل قسم في `PLAN.md`)

```text
 A. الأساس      هل lint وbuild ناجحين؟ هل الأقسام السابقة سليمة؟ (إذا لا: صلّح أولاً، لا تبدأ)
 B. الخطة       محادثة جديدة؛ المساعد بيقرأ CLAUDE.md وSPEC.md وPLAN.md؛ بيقترح خطة لقسم واحد (P4). أنت بتوافق.
 C. البناء      جزء صغير كل مرة (P5): مكوّن واحد، أو hook واحد، أو طلب واحد
 D. الفحص       فحص القسم (P6) + قائمة "لكل قسم"
 E. الانحدار    الأقسام السابقة لسا بتظهر وبتشتغل نفس ما كانت (P7)
 F. المراجعة    اقرأ git diff وافهم كل ملف
 G. الـ commit   feat(section): ... وغيّر حالة القسم إلى done في PLAN.md
 H. التالي      الآن فقط ابدأ القسم التالي (محادثة جديدة)
```

**بروتوكول "ما ننكسر شي"**
1. ابدأ كل قسم من حالة git نظيفة وbuild ناجح (الأساس).
2. المساعد بيلمس الملفات المذكورة في الخطة فقط. أي ملف خارجها لازم تحكيله.
3. بعد كل جزء شغّل `npm run lint && npm run build`. أي build مكسور بيوقف الجزء التالي.
4. قبل الـ commit افتح الصفحة وافحص الأقسام السابقة (P7). قارنها بشكلها وسلوكها قبل.
5. إذا ظهر انحدار: وقّف، لا تعمل ترقيع فوقه. نفّذ `git restore .` (أو `git revert` للـ commit) وأعد الجزء ببرومت أدق.
6. commit لكل قسم (أو لكل جزء). الـ commits الصغيرة بتخلّي الرجوع رخيص.
7. لا تعلّم قسم `done` بدون دليل: مخرجات الأوامر وشو فحصت يدوياً.

**Gate (لكل قسم):** بيشتغل في المتصفح (نجاح، خطأ، فاضي)، lint وbuild ناجحين، الأقسام السابقة ما تغيّرت، القائمة معلَّمة، فهمت الـ diff، تم الـ commit، والحالة اتحدّثت.

## الخطوة 7: الـ API والتكاملات
- كل الطلبات في مكان واحد (`features/<name>/api/` أو `src/api/`). الأسرار على الخادم فقط (serverless function أو n8n)، مش في `VITE_*`.
- تعامل مع حالات loading وerror وempty. شغّل برومت أمان الفورم/الـ API (**P9**).
- **Gate:** جرّبت النجاح، والفشل (افصل الشبكة)، والبيانات الفاضية؛ الفورم محمي (شوف القائمة).

## الخطوة 8: فحص الأمان (P8)
- محادثة جديدة. فحص كامل للـ headers/CSP، والأسرار، والفورم/API، والاعتماديات، والريبو.
- **Gate:** كل بنود "قائمة الأمان" معلَّمة أو مكتوب سبب تجاوزها.

## الخطوة 9: فحص السرعة (P10)
- الخطوط، الصور، الـ bundle، الأنيميشن، الكاش، وسوم SEO. قِس قبل وبعد (PageSpeed Insights أو Lighthouse في نافذة Incognito والإضافات مغلقة).
- **Gate:** الهدف على الموبايل 90+ (95+ لو أمكن)، والأرقام مسجّلة في `PLAN.md`.

## الخطوة 10: مراجعة بعين جديدة (P11)
- محادثة جديدة بتراجع الـ diff كامل للصحة والأمان فقط. امسح الكود الميت والمكتبات غير المستخدمة.
- **Gate:** lint وbuild وaudit ناجحين؛ ما في شي غير مستخدم.

## الخطوة 11: النشر (P14)
- ارفع على GitHub (بدون `.env`)، استورد المشروع في Vercel، ضيف متغيرات البيئة من اللوحة، ضيف rewrites إذا في router، وجرّب الرابط الحي على الجوال والكمبيوتر.
- **Gate:** الموقع الحي بيتصرف مثل المحلي؛ الروابط المباشرة بتفتح؛ ما في أسرار في الريبو ولا في تاريخه.

## الخطوة 12: التحسين
- ارجع لـ `SPEC.md`: خذ ميزة وحدة من "مفيد"، ضيفها لـ `PLAN.md` كقسم جديد، وأعد حلقة الأقسام.

## جدول حالة الأقسام (خلّيه في `PLAN.md`)

| # | القسم | الحالة (todo / doing / done) | Lint+Build | فحص يدوي | الانحدار | Commit |
|---|-------|------------------------------|-----------|----------|----------|--------|
| 1 | Layout | todo | | | | |
