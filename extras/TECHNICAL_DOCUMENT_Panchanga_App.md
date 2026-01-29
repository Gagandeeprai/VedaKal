
# Technical Document
## Tri-Lingual Panchanga Mobile Application

---

## 1. Architecture Overview

The Tri-Lingual Panchanga Mobile Application follows a **client-centric architecture** with external data services.

### High-Level Architecture

```

+----------------------+
|  Mobile App (Client) |
|  React Native (Expo) |
+----------+-----------+
|
| HTTP/JSON
|
+----------v-----------+
| Panchanga Data API   |
| (Third-party / Open) |
+----------------------+

````

### Description
- The mobile application acts as the **presentation and logic layer**
- Panchanga data is fetched from a **remote API** based on date and city coordinates
- Language rendering is handled **locally using JSON dictionaries**
- No backend server is required in Version 1

---

## 2. Tech Stack Choices

### 2.1 Frontend (Mobile App)

| Technology | Choice | Reason |
|-----------|-------|--------|
| Framework | React Native | Cross-platform (Android & iOS) |
| Runtime | Expo | Simplifies build, preview, and deployment |
| Language | JavaScript / TypeScript | Easy learning curve, strong ecosystem |
| UI Styling | React Native StyleSheet | Native performance, simple styling |
| Navigation | Expo Router | File-based routing, scalable |

**Why this stack?**
- Reduces development time
- Works well with AI-assisted coding tools
- No need for heavy IDEs or emulators
- Widely accepted in industry and academics

---

### 2.2 Development Tools

| Tool | Purpose |
|-----|--------|
| VS Code | Code editor |
| Node.js | JavaScript runtime |
| Expo Go | Live preview on real devices |
| Git | Version control |
| GitHub | Source code hosting |

---

## 3. Data Model and APIs

### 3.1 Data Model (Client-Side)

#### Panchanga Data Object
```json
{
  "date": "YYYY-MM-DD",
  "city": "Bengaluru",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "tithi": {
    "en": "Pratipada",
    "kn": "ಪ್ರತಿಪದ",
    "sa": "प्रतिपदा"
  },
  "nakshatra": {
    "en": "Ashwini",
    "kn": "ಅಶ್ವಿನಿ",
    "sa": "अश्विनी"
  },
  "vara": {
    "en": "Monday",
    "kn": "ಸೋಮವಾರ",
    "sa": "सोमवारः"
  },
  "sunrise": "06:12",
  "sunset": "18:35"
}
````

---

### 3.2 Language Data Model

Language support is implemented using **local JSON dictionaries**.

```json
{
  "tithi": {
    "en": "Tithi",
    "kn": "ತಿಥಿ",
    "sa": "तिथि"
  }
}
```

**Advantages**

* Offline support
* No translation API cost
* Faster rendering
* Accurate religious terminology

---

### 3.3 APIs

* Panchanga data fetched using **third-party Panchanga or astronomical APIs**
* Inputs:

  * Date
  * Latitude
  * Longitude
* Output:

  * Tithi
  * Nakshatra
  * Vara
  * Sunrise / Sunset

**API Interaction**

* REST-based
* JSON response
* Read-only (GET requests)

---

## 4. Deployment Plan

### 4.1 Development Phase

* Local development using Expo
* Live testing on physical Android device via Expo Go
* Manual testing for:

  * Language switching
  * City selection
  * Data accuracy

---

### 4.2 Build Phase

* Generate Android APK using Expo build tools
* Perform final testing on multiple devices

---

### 4.3 Release Phase

* Create Google Play Developer account
* Upload signed APK
* Add app metadata:

  * Description
  * Screenshots
  * Privacy policy
* Publish under Lifestyle / Education category

---

## 5. Risks and Tradeoffs

### 5.1 Technical Risks

| Risk                     | Impact                  | Mitigation                   |
| ------------------------ | ----------------------- | ---------------------------- |
| API downtime             | App fails to load data  | Graceful error handling      |
| Network dependency       | Requires internet       | Add offline cache (future)   |
| Unicode rendering issues | Language display errors | Use proper fonts and testing |
| API accuracy differences | Panchanga mismatch      | Use trusted data source      |

---

### 5.2 Design Tradeoffs

| Decision              | Tradeoff                    |
| --------------------- | --------------------------- |
| No custom backend     | Less control over data      |
| Manual city selection | Less automation initially   |
| JSON-based language   | Manual translation work     |
| Expo over native      | Slight performance overhead |

---

## 6. Scalability and Future Enhancements

* GPS-based automatic city detection
* Offline Panchanga storage
* Monthly and yearly calendar views
* Festival and vrat notifications
* Migration to custom backend if needed

---

## 7. Conclusion

The chosen technical stack balances **simplicity, scalability, and academic suitability**.
By using React Native with Expo and external Panchanga APIs, the project achieves fast development, clean architecture, and readiness for real-world deployment while remaining feasible within academic constraints.

```


