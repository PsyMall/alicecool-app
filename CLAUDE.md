# פרויקט Alicecool – אפליקציית לימוד טורקית-עברית

## הנחיית עבודה חשובה
**אחרי כל פעולה – חובה לעדכן את CLAUDE.md עם המיקום הנוכחי והשלב הבא.**
כך תמיד ניתן להמשיך מהמקום הנכון גם אם עוצרים באמצע.

## קבצים בתיקייה
- `index.html` – האפליקציה הראשית (HTML+CSS+JS + PWA meta tags + SW registration)
- `words-data.js` – מאגר מילים (5,104 מילים, 4 רמות: A1/A2/B1/B2)
- `manifest.json` – PWA manifest (שם, צבעים, אייקונים)
- `sw.js` – Service Worker (cache-first, אופליין)
- `icons/icon-192.svg` – אייקון 192x192
- `icons/icon-512.svg` – אייקון 512x512
- `CLAUDE.md` – תיעוד פרויקט (הקובץ הזה)
- `לוגו.png` – לוגו המותג
- `צבעי המותג.pdf` – מסמך צבעי המותג

## צבעי המותג
- `#262261` – כחול כהה (ראשי)
- `#403C74` – סגול-כחול (משני)
- `#AE1B28` – אדום (הדגשות)
- `#FFFFFF` – לבן

## מה בנוי ✅

### תשתית
- 6 מסכים: בית, שיעורים, סדרות, שיחה, פרופיל, תרגול הגייה
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

### מבחן הגייה אופציונלי
- מסך תרגול הגייה עם Alice (ElevenLabs Conversational AI)
- agent נפרד (Pronunciation Agent ID)
- לא משפיע על פתיחת קטגוריות – בונוס בלבד

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
- `elevenlabs_agent` – Agent ID (בוט שיחה)
- `elevenlabs_voice` – Voice ID (TTS למילים)
- `elevenlabs_pron_agent` – Pronunciation Agent ID (תרגול הגייה)

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
13. ✅ מבחן הגייה אופציונלי עם agent נפרד

### ⏳ עצרנו כאן (2026-04-09):
**הכל בנוי ופרוס. המשתמש צריך:**
1. להגדיר Voice ID ב-ElevenLabs (לקול טורקי) ולהזין בהגדרות הבוט
2. ליצור Pronunciation Agent ב-ElevenLabs (אופציונלי) ולהזין Agent ID
3. להעתיק System Prompt מהאפליקציה ולהדביק ב-ElevenLabs Agent Settings
4. לבדוק את כל הפיצ'רים החדשים באתר החי

## הערות טכניות
- Node.js לא מותקן – לא להשתמש ב-npm/vite
- Python לא מותקן
- כל שינוי הוא ישירות בקבצי HTML/JS
- אחסון: GitHub Pages (בחירת המשתמש)
- PWA: המשתמש רוצה אפשרות התקנה בטלפון
