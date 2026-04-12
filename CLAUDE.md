# פרויקט Alicecool – אפליקציית לימוד טורקית-עברית

## הנחיית עבודה חשובה
**אחרי כל פעולה – חובה לעדכן את CLAUDE.md עם המיקום הנוכחי והשלב הבא.**
כך תמיד ניתן להמשיך מהמקום הנכון גם אם עוצרים באמצע.

## ⏰ תזכורות תחזוקה שוטפות – חובה להזכיר למשתמש!

### 🔴 בתחילת כל יום עבודה חדש – להזכיר למשתמש **לפני שמתחילים לעבוד**:

> 💾 "בוקר טוב! לפני שמתחילים לעבוד – **כדאי לוודא שהקבצים האחרונים שלך מועתקים לגוגל דרייב** (`G:\My Drive\עבודה עסקים\ALICESCOOL\wabsite\`). הגיבוי לגוגל דרייב הוא ידני – אתה מעתיק בעצמך – אז אחרי שינויים חדשים חשוב לזכור להעתיק. רוצה שנתחיל?"

**מתי להזכיר:**
- ✅ **בכל שיחה חדשה שנפתחת ביום חדש** (יש הפרש של יותר מ-12 שעות מהשיחה הקודמת)
- ✅ **בסוף שיחה שבה היו שינויים בקבצים** – להזכיר להעתיק את הקבצים המעודכנים לגוגל דרייב
- ❌ לא צריך להזכיר אם כבר הזכרתי באותה שיחה

### 💡 בדיקת usage של שירותים חיצוניים (כל 3-5 שיחות):

> 💡 "דרך אגב, כדאי לבדוק את השימוש ב-ElevenLabs וב-Cloudflare שלא חרגת מהתוכנית החינמית:
> 1. **ElevenLabs:** https://elevenlabs.io/app/subscription – 10,000 תווים/חודש חינם
> 2. **Cloudflare:** https://dash.cloudflare.com → Workers & Pages → alicecool-tts → Metrics – 100K בקשות/יום חינם"

**מתי חיוני להזכיר:**
- כשהמשתמש מדבר על פרסום/שיווק/שיתוף האתר
- כשהמשתמש מזכיר שיש לו עוד משתמשים
- בתחילת כל שיחה שחולפים יותר מ-7 ימים מהשיחה הקודמת
- אם המשתמש מדווח שהכפתור 🔊 לא עובד (יכול להיות שחרגנו מהחבילה)

## פורמט משימות באתרים חיצוניים
כשנותנים משימה שדורשת פעולה באתר חיצוני, הפורמט הוא:
1. **בעברית:** "פתח את: [לינק מלא לאתר]"
2. **הוראה באנגלית** (תמיד באנגלית!) להעתקה לתוסף Claude בדפדפן – מפורטת, עצמאית, מבקשת מהמשתמש מידע חסר אם צריך
3. המשתמש ישלח צילום מסך כאישור שהמשימה בוצעה
4. לעדכן CLAUDE.md עם השלב הנוכחי

## קבצים בתיקייה
- `index.html` – האפליקציה הראשית (HTML+CSS+JS + PWA meta tags + SW registration)
- `words-data.js` – מאגר מילים (5,104 מילים, 4 רמות: A1/A2/B1/B2)
- `sentences-data.js` – מאגר משפטים להרכבה (120 משפטים, 30 לכל רמה)
- `manifest.json` – PWA manifest (שם, צבעים, אייקונים)
- `sw.js` – Service Worker (cache-first, אופליין) – CACHE_NAME: alicecool-v4
- `worker.js` – קוד Cloudflare Worker שמשמש כ-proxy ל-ElevenLabs TTS (מסתיר את ה-API Key)
- `icons/icon-192.svg` – אייקון 192x192
- `icons/icon-512.svg` – אייקון 512x512
- `CLAUDE.md` – תיעוד פרויקט (הקובץ הזה)
- `לוגו.png` – לוגו המותג
- `צבעי המותג.pdf` – מסמך צבעי המותג

## מאגר משפטים (2026-04-10)
- **sentences-data.js** – 120 משפטים, 30 לכל רמה (A1, A2, B1, B2)
- מבנה: `{ he, tr, words }` – עברית, טורקית מלא, מערך מילים בסדר נכון
- A1: מתחילים – ברכות, הצגה עצמית, הווה פשוט
- A2: בסיסי – עבר, עתיד, פעולות יומיומיות
- B1: בינוני – תנאים, חוות דעת, משפטי משנה
- B2: מתקדם – תחביר מתקדם, נושאים מופשטים

## תכונת הרכבת משפטים (2026-04-10)
- **כפתור ניווט:** 🧩 משפטים (בתפריט תחתון, בין "שיעורים" ל"סדרות")
- **כרטיס במסך הבית:** 🧩 הרכבת משפטים
- **מסכים:**
  - `renderSentences()` – בחירת רמה עם progress bar לכל רמה
  - `renderSentQuiz()` – המשחק עצמו
- **מצב (state):**
  - `sentLvl` – הרמה הנוכחית
  - `sentIdx` – אינדקס המשפט הנוכחי ברמה
  - `sentShuffled` – מערך מעורבב של אינדקסי המילים
  - `sentPlaced` – מערך המילים שהמשתמש שם בסדר
  - `sentChecked` / `sentCorrect` – מצב בדיקה
- **פונקציות:**
  - `startSentencesLevel(level)` – מתחיל רמה (מוצא את המשפט האחרון שלא סומן)
  - `initSentenceRound()` – מעורבב את המילים (Fisher-Yates)
  - `placeSentTile(idx)` / `removeSentTile(idx)` – הזזת מילים
  - `checkSentence()` – בודק, נותן XP אם נכון, מראה תשובה אם לא, ומשמיע אוטומטית את המשפט הטורקי דרך ElevenLabs (setTimeout 400ms)
  - `nextSentence()` – מעבר למשפט הבא
- **שמירה:** `sent_done_A1_0`, `sent_done_A1_1`... ב-localStorage; `sentencesCompleted` מונה כולל
- **XP:** 10 נקודות לכל משפט נכון
- **4 עיטורים חדשים:**
  - 🧩 בנאי צעיר – משפט ראשון
  - 📝 בנאי מתחיל – 10 משפטים
  - 📜 בנאי מנוסה – 50 משפטים
  - 🏗️ בנאי מאסטר – 100 משפטים
- **הערה:** בפריוויו המקומי של Claude Code המשפטים לא תמיד עובדים בזמן עריכה (cache/timing), אבל **באתר החי GitHub Pages הכל עובד מושלם** – נבדק end-to-end.

## השמעה אוטומטית למשפטים (2026-04-10)
- כשמשתמש משלים משפט נכון (ב-`checkSentence()`), המשפט הטורקי המלא מושמע אוטומטית
- השהייה של 400ms כדי לא להתנגש עם `SFX.correct()` (צליל ה-ding)
- עובר דרך אותו `speakWord()` קיים → TTS Worker → ElevenLabs
- נהנה מאותו cache בזיכרון (משפט לא נשלח פעמיים באותה session)
- **הגבלת אורך ב-Worker:** 200 תווים (`worker.js:53`) כ-safety guard; המשפט הארוך ביותר במאגר הוא 48 תווים, אז אין בעיה
- **השפעה על usage:** משפט ממוצע ≈ 30-50 תווים לעומת מילה ≈ 5-7 תווים → צריכת תווים ב-ElevenLabs גדלה משמעותית כשלומדים משפטים. לעקוב אחרי https://elevenlabs.io/app/subscription

## ארכיטקטורת TTS (2026-04-10)
- **Worker URL:** https://alicecool-tts.moty-gotgilf.workers.dev/
- **Cloudflare account:** Moty.gotgilf@gmail.com (Account ID: 57a94bff03640a5ec90f081d5732ec68)
- **Secrets מוגדרים ב-Worker:**
  - `ELEVENLABS_API_KEY` (secret_text) – ה-API Key הסודי של ElevenLabs
  - `VOICE_ID` (secret_text) – Voice ID של הקול הטורקי (uqq9c1CYgBRmZ0b4JJpV)
- **זרימה:** האפליקציה → POST ל-Worker עם `{text}` → Worker קורא ל-ElevenLabs עם הסודות → מחזיר audio/mpeg
- **יתרונות:** API Key לא חשוף ללקוחות, 100K קריאות/יום חינם, CORS מוגבל ל-psymall.github.io
- **Cache:** אותה מילה לא נשלחת פעמיים (cache בזיכרון באפליקציה)
- **ללא צורך בהגדרות קול באפליקציה** – הכל פועל אוטומטית
- **API Token של Cloudflare נמחק** (2026-04-10) מטעמי אבטחה – ליצירת שינויים ב-Worker בעתיד יש ליצור Token חדש

## 🔒 מה שאסור למחוק (יפיל את הכפתור 🔊 באתר)
| פריט | מיקום | תוצאה במחיקה |
|---|---|---|
| **Worker "alicecool-tts"** | Cloudflare Dashboard | 🔊 מפסיק לעבוד |
| **Secret ELEVENLABS_API_KEY** | בתוך ה-Worker | 🔊 מחזיר שגיאה |
| **Secret VOICE_ID** | בתוך ה-Worker | 🔊 מחזיר שגיאה |
| **API Key ב-ElevenLabs** | elevenlabs.io/app/settings | 🔊 מחזיר שגיאה |
| **חשבון Cloudflare** | - | 🔊 מפסיק לעבוד |

## 💾 גיבויים ומיקומי קוד (2026-04-10)
הקוד נמצא ב-**3 מקומות נפרדים** לצורך יתירות:

| # | מיקום | תפקיד | סנכרון |
|---|-------|--------|--------|
| 1 | `C:\Users\Excalibur\Documents\claude code\first project\` | **תיקיית העבודה הראשית** – פה עובדים | - |
| 2 | `G:\My Drive\עבודה עסקים\ALICESCOOL\wabsite\` | **גיבוי ב-Google Drive** | ⚠️ **ידני** – המשתמש מעתיק ידנית אחרי עבודה |
| 3 | https://github.com/PsyMall/alicecool-app | **GitHub + GitHub Pages** (האתר החי) | אוטומטי דרך `git push` |

**חשוב לזכור:**
- ❗ **גוגל דרייב מתעדכן רק כשהמשתמש מעתיק ידנית** – לא להניח שהוא תמיד מעודכן!
- ✅ **GitHub תמיד מעודכן** אחרי `git push` – זה המקור האמין ביותר לגרסה העדכנית
- 📌 **בסוף כל שיחת עבודה משמעותית** – להזכיר למשתמש להעתיק את הקבצים המעודכנים לגוגל דרייב

**תרחישי חירום:**
- **GitHub נפל/נחסם:** לקחת את הקבצים מהמחשב (או מגוגל דרייב אם הוא עדכני) ולהעלות ל-Netlify / Cloudflare Pages / Vercel (15 דקות)
- **המחשב נדפק:** להוריד מ-GitHub (המקור האמין ביותר) או מגוגל דרייב (אם הועתק לאחרונה)
- **אובדן גישה לגוגל דרייב:** GitHub + המחשב עדיין זמינים
- **אובדן כל השלושה בבת אחת:** תרחיש בלתי סביר – אבל אפשר להוסיף שכבה רביעית (GitLab mirror או Dropbox)

**סדר חזרה מגיבוי במקרה חירום:** 1️⃣ GitHub → 2️⃣ המחשב → 3️⃣ Google Drive (עלול להיות מעט מאחור)

## 📊 גבולות חינמיים וניטור
**תמיד לבדוק מעת לעת (ראה "תזכורות תחזוקה" למטה)**

### ElevenLabs (הצוואר בקבוק העיקרי!)
- **תוכנית חינמית: 10,000 תווים לחודש**
- מילה טורקית ממוצעת = 5-7 תווים → בערך 1,500-2,000 השמעות/חודש
- כל המשתמשים חולקים את אותו pool (מפתח יחיד ב-Worker)
- **איפה לבדוק:** https://elevenlabs.io/app/subscription
- תוכניות בתשלום:
  - Starter: $5/חודש = 30,000 תווים
  - Creator: $22/חודש = 100,000 תווים
  - Pro: $99/חודש = 500,000 תווים

### Cloudflare Workers
- **תוכנית חינמית: 100,000 בקשות/יום**
- כמעט בלתי אפשרי לחרוג (cache באפליקציה חוסך)
- **איפה לבדוק:** Cloudflare Dashboard → alicecool-tts → Metrics
- אחרי 100K/יום: $0.50 למיליון בקשות נוספות (זול)

## ⏰ תזכורות תחזוקה – להדריך את המשתמש לבדוק מעת לעת
**באופן אקטיבי:** כשהמשתמש פותח שיחה חדשה או כל כמה שיחות, להזכיר לו לבדוק:

### בדיקה שבועית (לפחות פעם בשבוע)
1. **ElevenLabs usage:** https://elevenlabs.io/app/subscription
   - כמה תווים נוצלו החודש?
   - אם מעל 70% מהחבילה → שקלו שדרוג
2. **Cloudflare metrics:** Dashboard → alicecool-tts → Metrics
   - כמה בקשות התקבלו?
   - בדיקה לוודא שאין abuse

### בדיקה חודשית
- סקירת התפלגות משתמשים (אם יש Firebase בהמשך)
- בדיקת שגיאות ב-Worker logs
- עדכון cache ה-SW אם יש שינויים גדולים

### מתי לשדרג את ElevenLabs?
- **10-50 משתמשים פעילים:** תוכנית חינמית מספיקה
- **50-500 משתמשים:** Starter ($5) או Creator ($22)
- **500+ משתמשים:** Creator/Pro + לשקול rate limit ב-Worker

## צבעי המותג
- `#262261` – כחול כהה (ראשי)
- `#403C74` – סגול-כחול (משני)
- `#AE1B28` – אדום (הדגשות)
- `#FFFFFF` – לבן

## מה בנוי ✅

### תשתית
- 5 מסכים: בית, שיעורים, סדרות, הגדרות קול, פרופיל
- מאגר מילים חיצוני (words-data.js) מחובר ל-index.html
- מסך שיעורים עם tabs לרמות A1/A2/B1/B2
- **סה"כ: 161 קטגוריות, 5,104 מילים**
  - A1: 20 קטגוריות (588 מילים)
  - A2: 14 קטגוריות (445 מילים)
  - B1: 14 קטגוריות (421 מילים)
  - B2: 113 קטגוריות (3,650 מילים)
- 8 קטגוריות מילות סדרות (96 ביטויים)
- PWA: manifest.json + sw.js (cache v2) + אייקוני SVG
- רספונסיביות מובייל

### עיצוב ו-UX (שדרוג 2026-04-09)
- עיצוב מודרני-נקי בהשראת Duolingo
- אנימציות: fadeIn, slideUp, pop, bounce, shake, stagger, confetti
- Bottom nav עם backdrop blur
- Greeting אישי לפי שעה (בוקר/צהריים/ערב/לילה)
- Toast notifications + celebration overlays

### צלילים (Web Audio API)
- תשובה נכונה (ding), שגויה (buzz), flip, fanfare, level-up, click
- כפתור mute קבוע (נשמר ב-localStorage)

### נעילת קטגוריות + מבחנים (שדרוג 2026-04-09)
- קטגוריות נעולות לפי סדר (CATEGORY_ORDER + isCategoryUnlocked)
- סיום כרטיסיות → עובר אוטומטית למבחן (לא מסמן done)
- ציון 70%+ במבחן = קטגוריה הבאה נפתחת
- הודעת "🔓 נפתחה!" / "צריך 70%" בתוצאות מבחן
- קטגוריות נעולות: אפורות, 🔒, לא לחיצות

### הגייה בקול (ElevenLabs TTS)
- כפתור 🔊 על כל מילה (כרטיסיות, סדרות, מילים לחזרה)
- speakWord() - POST to ElevenLabs TTS API עם cache בזיכרון
- שדה Voice ID בהגדרות הבוט
- model: eleven_multilingual_v2

### כלים פסיכולוגיים (engagement)
- Daily Goal: יעד 10 מילים + Progress Ring
- Streak System: רצף יומי + streak freeze (50 XP)
- Spaced Repetition: חוזק מילים + דעיכה + מסך "מילים לחזרה"
- 19 עיטורים (כולל hidden: ינשוף לילה, ציפור מוקדמת)
- Confetti + celebrations על הצלחות
- Streak counter בקוויז (3+, 5+ ברצף)
- מילת בונוס אקראית בסוף מבחן
- Social proof: "X לומדים מחוברים עכשיו"
- מילה של היום + הידעת? (טיפ יומי)
- Loss aversion: מילים נחלשות אם לא חוזרים

### הגייה בקול – ארכיטקטורה סופית (2026-04-10)
- ❌ **אין יותר הגדרות קול באפליקציה** – הלקוח לא צריך להזין כלום
- ✅ הכל דרך Cloudflare Worker (API Key מוסתר)
- ✅ cache בזיכרון (אותה מילה לא נשלחת פעמיים)
- ✅ Web Audio API לכפתור 🔊

### מסך אודות (2026-04-10)
- החליף את מסך "הגדרות קול" הישן
- אייקון בתפריט: 💜 אודות (במקום ⚙️ הגדרות)
- תוכן אישי על אליס (5 שנות ניסיון, אוניברסיטת אדנה, שפות שהיא דוברת)
- כפתור "📱 שתף עכשיו" – Web Share API במובייל, מודאל fallback בדסקטופ
- הודעת שיתוף מוכנה עם לינק לאתר
- מזכיר Facebook/Instagram/TikTok כאפשרויות שיתוף
- הישג `chatty` שודרג: לא קשור יותר ל-API Key; עכשיו נפתח אחרי 10 השמעות TTS

## שלב נוכחי – 2026-04-09
**האתר חי!** https://psymall.github.io/alicecool-app/

### היסטוריית שלבים:
1. ✅ תיקון words-data.js (סוגריים, מילים אנגליות, בדיקת הגייה)
2. ✅ חיבור words-data.js ל-index.html + tabs A1/A2/B1/B2
3. ✅ הרחבת B2 ל-113 קטגוריות, 3,650 מילים (סה"כ 5,104)
4. ✅ הפיכה ל-PWA (manifest.json, sw.js, אייקוני SVG)
5. ✅ פרויקט GitHub + GitHub Pages
6. ✅ בדיקה מקיפה – הכל תקין
7. ✅ בוט: Hoca → Alice, פרומפט עברית, זיהוי מגדר
8. ✅ תוקן: widget במקום API call ישיר (שגיאה 405)
9. ✅ API Key + Agent נוצרו ב-ElevenLabs
10. ✅ שדרוג UI מלא (Duolingo-style) + צלילים + מערכות engagement
11. ✅ נעילת קטגוריות ברצף + מבחן חובה 70%
12. ✅ הגייה בקול (TTS) – כפתור 🔊 על כל מילה
13. ✅ הסרת בוט שיחה ובוט הגייה – פישוט למסך הגדרות קול בלבד
14. ✅ מסך הגדרות: רק API Key + Voice ID (בלי Agent IDs)
15. ✅ שלב A: הגדרת Voice ID + API Key באפליקציה (2026-04-10)
16. ✅ שלב B: Cloudflare Worker – **הושלם במלואו** (2026-04-10)
    - חשבון Cloudflare נוצר (Moty.gotgilf@gmail.com)
    - API Token נוצר (תבנית Edit Cloudflare Workers) – שימש להתקנה דרך REST API
    - Worker נוצר ונפרס: alicecool-tts.moty-gotgilf.workers.dev
    - Secrets נוספו דרך REST API: ELEVENLABS_API_KEY + VOICE_ID
    - קוד TTS proxy (worker.js) עם CORS מוגבל, הגבלת אורך 200 תווים, health check GET
    - נבדק end-to-end: החזיר 15KB MP3 למילה "merhaba" ✅
    - speakWord() עודכן לקרוא ל-Worker במקום ישירות ל-ElevenLabs
    - מסך "הגדרות קול" הוחלף ב"אודות" (איקון: 💜)
    - הוסר קוד ישן: showPrompt, showPronunciationPrompt, startConversation, renderPronunciationQuiz, startPronunciationQuiz, startPronunciationBot, saveEL, clearEL
    - sw.js cache version → v3
    - הושלם מסך אודות אישי + כפתור שיתוף חכם (Web Share API + modal fallback)
    - API Token של Cloudflare **נמחק** בסוף השלב (אבטחה) – רק ה-Worker ממשיך לעבוד עצמאית
17. ✅ Commit + Push ל-GitHub (81a61a1) – האתר החי מעודכן
18. ✅ **הרכבת משפטים** (43e4a82) – תכונה חדשה (2026-04-10)
    - 120 משפטים (30 לכל רמה)
    - משחק drag-and-drop (click-to-place)
    - 4 עיטורים חדשים
    - נבדק end-to-end על האתר החי ✅
19. ✅ **Node.js v24.14.1 + npm 11.0.0 הותקנו** (2026-04-10) – זמינים ישירות ב-Bash אחרי restart
20. ✅ **שרת פיתוח מקומי** (2026-04-10)
    - `.claude/launch.json` עם `npx serve -l 5173 .`
    - הפעלה: `preview_start` עם name `alicecool`
    - מעכשיו – בדיקות end-to-end מקומיות לפני כל push
21. ✅ **השמעה אוטומטית למשפטים** (2026-04-10)
    - `checkSentence()` קורא ל-`speakWord(sentence.tr)` עם setTimeout 400ms כשהמשפט נכון
    - נבדק מקומית end-to-end דרך preview_eval – הצלחה מלאה ✅
    - Commit `94ed8c7` – נדחף לאתר החי
22. ✅ **תיקון 11 משפטים לא-טבעיים במאגר** (2026-04-10) – Commit `539ba05`
    - סקירה מלאה של כל 120 המשפטים בעזרת ידע דקדוקי טורקי
    - **A1:** 5 תיקונים
      - `Bu ne kadar para?` → `Bu ne kadar?` ("para" מיותר)
      - `Türkçe çok iyi bilmiyorum` → `Türkçeyi iyi bilmiyorum` (חסר אקוזטיב)
      - `Babam bir doktor` → `Babam doktor` (אין "bir" לפני מקצוע)
      - `Bugün pazartesi günü` → `Bugün pazartesi` ("günü" מיותר)
      - `Hava çok soğuk bugün` → `Bugün hava çok soğuk` (זמן קודם)
    - **A2:** 3 תיקונים
      - `Geçen hafta hasta oldum` → `Geçen hafta hastaydım` (היה, לא נהיה)
      - `Ben senin adını unuttum` → `Senin adını unuttum` ("Ben" מיותר)
      - `Dün arkadaşlarımla yedim` → `Dün arkadaşlarımla yemek yedim`
    - **B1:** 1 תיקון
      - `ara beni` → `beni ara` (מושא לפני פועל)
    - **B2:** 2 תיקונים
      - `Neyi kastettiğini` → `Ne demek istediğini` (אידיומטי)
      - `gurur duyurdu` → `Başarın beni çok gururlandırdı` (הסיבתי הנכון)
    - אומת: 120 משפטים תקינים, 0 אי-התאמות בין `tr` ל-`words[]`, max length 48
    - נבדק מקומית דרך preview_eval + נדחף לאתר החי ✅

23. ✅ **שדרוג גיימיפיקציה** (2026-04-12) – מערכת תגמולים משופרת
    - **XP → ⭐ כוכבים** – שינוי כל המונחים לעברית ברורה
    - **בונוס יומי מתגבר** – יום 1=10⭐ עד יום 7=100⭐, מתאפס אם מפספסים
    - **Perfect Streak** – 5 ברצף=כפול, 10 ברצף=משולש
    - **💡 רמז במבחן** (15⭐) – מסיר 2 תשובות שגויות
    - **🛟 גלגל הצלה** (25⭐) – חושף תשובה נכונה
    - **💡 רמז במשפטים** (15⭐) – שם מילה אחת במקום הנכון
    - **רמות משופרות** – 8 רמות עם תארים ואייקונים: 🌱מתחיל → 📖לומד → 🧠חכם → ⚡מתקדם → 🎯מומחה → 👑אלוף → 🏆אגדה → 💎סולטאן
    - **🔧 כלי מפתח** בפרופיל – אפס בונוס, +100⭐
    - **כוכבים כפולים** – תמיכה ב-double XP כשפעיל
    - ~~גלגל מזל~~ – נבנה ונמחק (נתונים מדומים = סיכון משפטי)
    - ~~לוח תוצאות~~ – נבנה ונמחק (יחזור עם Firebase + נתונים אמיתיים)
    - Commits: `06c6b89`, `4303321`, `6b9bd84`, `a8a2ce7`, `f051203`, `daabe69`
    - SW cache version → v7

### ⏳ עצרנו כאן (2026-04-12):

**המצב:**
- האתר חי ומעודכן – https://psymall.github.io/alicecool-app/
- מערכת כוכבים ⭐ עם שימושים אמיתיים (רמזים, הצלה, freeze)
- בונוס יומי מתגבר + perfect streak + רמות משופרות
- Preview server מקומי זמין (`.claude/launch.json`)
- כל הקומיטים נדחפו ל-GitHub

**מה לעשות בשיחה הבאה (לפי סדר):**
1. **תזכורת אוטומטית:** לבדוק usage של ElevenLabs + Cloudflare
2. **שיפורי גרפיקה** – המשתמש יכול לגנרט תמונות, להחליף אייקונים, לשפר עיצוב
3. **שיפורי סאונדים** – צלילים טובים יותר (המשתמש ביקש)
4. **להמשיך לשלב C: Firebase Auth + Firestore** (מערכת משתמשים)
   - יצירת פרויקט Firebase (חינם)
   - הפעלת Authentication (Google + Email/Password)
   - יצירת Firestore database
   - הוספת מסך login/register לאפליקציה
   - החלפת getProgress()/saveProgress() מ-localStorage ל-Firestore
   - סנכרון: localStorage כ-fallback אופליין, Firestore כ-primary
5. **לוח תוצאות אמיתי** – יחזור אחרי Firebase עם נתונים אמיתיים
6. **גלגל מזל** – אפשר להחזיר אחרי Firebase (פרסים אמיתיים, לא מדומים)

## שלבים הבאים (לפי סדר ביצוע)

### שלב C: Firebase Auth + Firestore – מערכת משתמשים
**מטרה:** כל לקוח נכנס עם חשבון, ההתקדמות נשמרת בענן.
- כרגע התקדמות נשמרת ב-localStorage (אובדת אם מחליפים דפדפן/מוחקים נתונים)
- לקוחות צריכים login אישי עם שמירת התקדמות
- Firebase Auth: כניסה עם Google / אימייל+סיסמה (חינם עד 50K משתמשים)
- Firebase Firestore: מסד נתונים בענן (חינם עד 1GB)
- עובד ישירות מ-HTML/JS – בלי שרת
**מה צריך:**
1. ליצור פרויקט Firebase (חינם)
2. להפעיל Authentication (Google + Email/Password)
3. ליצור Firestore database
4. להוסיף מסך login/register לאפליקציה
5. לשנות getProgress()/saveProgress() לשמור ב-Firestore במקום localStorage
6. סנכרון: localStorage כ-fallback אופליין, Firestore כ-primary

### שלב D: אפליקציה בחנויות (אחרי שיש משתמשים)
**מטרה:** להפיץ דרך Google Play / App Store
- PWA כבר עובד כאפליקציה (הוסף למסך הבית)
- Google Play: המרה עם PWA Builder / Capacitor, עלות חד פעמית $25
- App Store: חשבון מפתח Apple $99/שנה
- מומלץ רק אחרי שיש בסיס משתמשים

## הערות טכניות
- **Node.js v24.14.1 מותקן** (2026-04-10) – `C:\Program Files\nodejs\`
  - `node`, `npm`, `npx` זמינים (אחרי restart של Claude Code)
  - אם PATH לא מעודכן – להשתמש בנתיב מלא: `"/c/Program Files/nodejs/node.exe"`
  - שימושים עיקריים: שרת פיתוח מקומי (`npx serve`), לינטינג, Wrangler (Cloudflare), Firebase CLI
- Python לא מותקן
- כל שינוי הוא ישירות בקבצי HTML/JS
- אחסון: GitHub Pages (בחירת המשתמש)
- PWA: כבר בנוי, ניתן להתקנה בטלפון
- קהל יעד: 10K עוקבים בטיקטוק (ישראלים)
- Firebase: עובד מ-HTML/JS ישירות (לא צריך שרת)

## כלים זמינים בסביבה (חשוב!)
- ✅ **Bash** (Git Bash) – כל הפקודות רצות פה
- ✅ **git** – commits, push, status
- ✅ **curl** – קריאות HTTP, עבודה עם REST APIs (Cloudflare, Firebase)
- ✅ **Node.js v24.14.1** + **npm 11.0.0** (מ-2026-04-10)
- ✅ **PowerShell** (Windows מובנה) – ל-one-liners ב-Windows
- ❌ Python – לא מותקן
- ❌ Deno/Bun – לא מותקנים

**כשמוסיפים כלי חדש:** לעדכן את הסקציה הזו ולציין "מותקן מ-[תאריך]"
