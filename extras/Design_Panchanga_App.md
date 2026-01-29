
## 📌 Design Document

### Tri-Lingual Panchanga Mobile Application

---

## 🎨 1) Design Inspiration (Web/Dribbble References)

Here are relevant UI/UX ideas you can reference when building your app UI:

🔗 **Dribbble Ideas**

1. Minimal daily calendar UI (clean date + info):
   [https://dribbble.com/search/calendar](https://dribbble.com/search/calendar)
2. Multilingual interface typography inspiration:
   [https://dribbble.com/search/multilingual](https://dribbble.com/search/multilingual) UI
3. Clean info card layouts (for Panchanga data):
   [https://dribbble.com/search/info](https://dribbble.com/search/info) card
4. City/location picker screens:
   [https://dribbble.com/search/location](https://dribbble.com/search/location) picker

📌 Notes:
Use these as **visual mood boards** — they help you justify UI decisions in your report + design presentation.

---

## 🧠 2) Information Architecture

```
App Root
│
├── Home Screen
│     ├── Panchanga Summary Card
│     ├── Sunrise/Sunset Info
│     ├── Language Toggle
│     ├── City Selection Button
│     └── Navigation Tab Bar
│
├── City Selection Screen
│     └── Searchable city list
│
├── Settings / Language Screen
│     └── Language Selector (English | ಕನ್ನಡ | संस्कृत)
│
├── Details Screen (optional)
│     └── Expanded Panchanga info (monthly view)
│
└── About / Help Screen
      └── App details & credits
```

---

## 🔁 3) Key User Flows

### 🔹 **Flow 1 — First Launch**

1. User opens the app
2. Default city shown (or prompt to select)
3. Panchanga info is shown for today
4. Language toggle visible at top

---

### 🔹 **Flow 2 — Change City**

1. User taps “City” icon
2. City Selection Screen opens
3. User searches and selects a city
4. App updates home screen with new data

---

### 🔹 **Flow 3 — Change Language**

1. User taps language toggle
2. Selector opens with three options
3. User selects Kannada / English / Sanskrit
4. All text updates accordingly

---

### 🔹 **Flow 4 — View Details**

1. User taps “More Details” (optional)
2. Expanded info screen opens
3. Monthly calendar, festival list, etc.

---

## 📱 4) Screens & Components List

| Screen / Component            | Purpose                               |
| ----------------------------- | ------------------------------------- |
| **Home Screen**               | Display today’s Panchanga at a glance |
| **Panchanga Card**            | Core data: Tithi, Nakshatra, Vara     |
| **Sun Info Card**             | Sunrise & Sunset timings              |
| **Language Toggle**           | Change UI language instantly          |
| **City Selection Screen**     | Manual city picker                    |
| **Search Bar**                | Filter cities                         |
| **Footer / Nav Bar**          | Switch between Home / About tabs      |
| **About / Help**              | Info about app & version              |
| **Details Screen (Optional)** | Expanded monthly/yearly info          |

---

## 🧩 Component Breakdowns

### ✔ Panchanga Card

| Element   | UI Type | Notes                  |
| --------- | ------- | ---------------------- |
| Date      | Text    | Big, readable          |
| Tithi     | Text    | Needs multi-language   |
| Nakshatra | Text    | Multi-language support |
| Vara      | Text    | Icon + Label optional  |

---

### ✔ Sunrise/Sunset Card

| Element      | UI Type   |
| ------------ | --------- |
| Sun Icon     | Visual    |
| Sunrise Time | Bold text |
| Sunset Time  | Bold text |

---

### ✔ Language Toggle

* Tab control (EN | ಕನ್ನಡ | संस्कृत)
* Use readable fonts

---

### ✔ City Search List

* Search bar with placeholder
* Scrollable list
* Highlight selected city

---

## 🎯 5) Design Principles

### 🧼 Simple & Calm

* Clean layout (no clutter)
* High contrast text
* Soft background

### 🧾 Informational Hierarchy

* Panchanga info → largest text
* Sunrise/sunset → medium
* Language/City → smaller

### 📏 Consistency

* Same card style across screens
* Consistent spacing
* Same font scaling

### 🗣 Multi-Language Ready

* Unicode support for Kannada + Sanskrit
* Proper fonts (not fallback boxes)

### 🧪 Feedback

* Loading indicators when fetching data
* Empty state if city has no data

---

## ♿ 6) Accessibility Notes

### 🔑 Typography & Spacing

* Minimum text size: **16sp** for body text
* Headings: **22sp+**
* Sufficient line spacing (1.4x)

### 💡 Color Contrast

* High contrast body text vs background
* WCAG AA standards (≥4.5:1)

### 🧭 Navigation

* Tap targets **≥ 48dp**
* Clear focus states

### 📱 Screen Reader

* All text UI must have accessibility labels
* Language toggle announces selected language

---

## 🧠 Extra Notes for College / Report

**Design Justification**

* Panchanga info is dense → use cards
* Multi-language → need consistent layout
* City selection must be simple → searchable list

**Future improvements**

* Dark mode
* Calendar month view
* Personalized reminders (Rahu Kalam alerts)

---
