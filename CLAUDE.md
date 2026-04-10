# פרויקט Alicecool – אפליקציית לימוד טורקית-עברית

## הנחיית עבודה חשובה
**אחרי כל פעולה – חובה לעדכן את CLAUDE.md עם המיקום הנוכחי והשלב הבא.**
כך תמיד ניתן להמשיך מהמקום הנכון גם אם עוצרים באמצע.

## פורמט משימות באתרים חיצוניים
כשנותנים משימה שדורשת פעולה באתר חיצוני, הפורמט הוא:
1. **בעברית:** "פתח את: [לינק מלא לאתר]"
2. **הוראה באנגלית** (תמיד באנגלית!) להעתקה לתוסף Claude בדפדפן – מפורטת, עצמאית, מבקשת מהמשתמש מידע חסר אם צריך
3. המשתמש ישלח צילום מסך כאישור שהמשימה בוצעה
4. לעדכן CLAUDE.md עם השלב הנוכחי

## קבצים בתיקייה
- `index.html` – האפליקציה הראשית (HTML+CSS+JS + PWA meta tags + SW registration)
- `words-data.js` – מאגר מילים (5,104 מילים, 4 רמות: A1/A2/B1/B2)
- `manifest.json` – PWA manifest (שם, צבעים, אייקונים)
- `sw.js` – Service Worker (cache-first, אופליין) – CACHE_NAME: alicecool-v3
- `worker.js` – קוד Cloudflare Worker שמשמש כ-proxy ל-ElevenLabs TTS (מסתיר את ה-API Key)
- `icons/icon-192.svg` – אייקון 192x192
- `icons/icon-512.svg` – אייקון 512x512
- `CLAUDE.md` – תיעוד פרויקט (הקובץ הזה)
- `לוגו.png` – לוגו המותג
- `צבעי המותג.pdf` – מסמך צבעי המותג

## ארכיטקטורת TTS (2026-04-10)
- **Worker URL:** https://alicecool-tts.moty-gotgilf.workers.dev/
- **Cloudflare account:** Moty.gotgilf@gmail.com (Account ID: 57a94bff03640a5ec90f081d5732ec68)
- **Secrets מוגדרים ב-Worker:**
  - `ELEVENLABS_API_KEY` (secret_text) – ה-API Key הסודי של ElevenLabs
  - `VOICE_ID` (secret_text) – Voice ID של הקול הטורקי
- **זרימה:** האפליקציה → POST ל-Worker עם `{text}` → Worker קורא ל-ElevenLabs עם הסודות → מחזיר audio/mpeg
- **יתרונות:** API Key לא חשוף ללקוחות, 100K קריאות/יום חינם, CORS מוגבל ל-psymall.github.io
- **ללא צורך בהגדרות קול באפליקציה** – הכל פועל אוטומטית

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

### ElevenLabs – הגדרות (localStorage)
- `elevenlabs_key` – API Key
- `elevenlabs_voice` – Voice ID (TTS למילים)
- מסך הגדרות קול (⚙️) – פשוט: API Key + Voice ID בלבד
- בוט שיחה ובוט הגייה הוסרו מהממשק (לא בשימוש כרגע)

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
    - Worker נוצר ונפרס: alicecool-tts.moty-gotgilf.workers.dev
    - Secrets: ELEVENLABS_API_KEY + VOICE_ID
    - קוד TTS proxy עם CORS והגבלת אורך טקסט
    - speakWord() עודכן לקרוא ל-Worker
    - מסך הגדרות קול פושט (אין צורך ב-API Key מהלקוח)
    - הוסר קוד ישן: showPrompt, startConversation, renderPronunciationQuiz, saveEL, clearEL
    - sw.js cache version → v3

### ⏳ עצרנו כאן (2026-04-10):

## שלבים הבאים (לפי סדר ביצוע)

### שלב C: Firebase Auth + Firestore – מערכת משתמשים
**סטטוס: הבא בתור**

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
- Node.js לא מותקן – לא להשתמש ב-npm/vite
- Python לא מותקן
- כל שינוי הוא ישירות בקבצי HTML/JS
- אחסון: GitHub Pages (בחירת המשתמש)
- PWA: כבר בנוי, ניתן להתקנה בטלפון
- קהל יעד: 10K עוקבים בטיקטוק (ישראלים)
- Firebase: עובד מ-HTML/JS ישירות (לא צריך שרת)
