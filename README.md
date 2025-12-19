
# 🇮🇳 Interactive Therapy Authoring Studio (React + Flask)

> **Content Infrastructure for Inclusive Therapy in India**

This repository contains a full-stack, offline-first therapy content authoring and delivery platform designed for Indian languages, cultural contexts, and low-bandwidth environments.

---

## 🚀 Project Overview

This system enables **therapists and special educators** to:
- Create therapy content using a drag-and-drop visual editor
- Localize content across Indian languages
- Generate audio using Text-to-Speech
- Export content for offline use
- Publish and monetize therapy modules via a marketplace

The platform is **India-first**, **offline-by-default**, and **therapist-centric**.

---

## 🧱 Tech Stack

### Frontend (Client)
- **React.js**
- Canvas-based editor
- IndexedDB for offline storage
- PWA support
- Responsive & touch-first UI

### Backend (Server)
- **Flask (Python)**
- REST APIs
- Authentication & role management
- Content metadata & marketplace APIs

### AI & ML
- Indic language translation models (IndicTrans / mBART)
- Indian language Text-to-Speech (AI4Bharat)
- Image tagging & search embeddings
- Usage analytics & recommendation logic

---

## 📁 Project Structure

```
therapy-platform/
│
├── frontend/                # React App
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── editor/
│   │   ├── assets/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.js
│   └── package.json
│
├── backend/                 # Flask App
│   ├── app.py
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── ai_modules/
│   └── requirements.txt
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

## 🧠 Key Features

### 🎨 Authoring Studio
- Drag & drop canvas
- Therapy templates (AAC, social stories, matching)
- Touch-friendly interface

### 🌍 Multilingual Support
- Native Indian language input
- Auto-translation
- Transliteration toggle

### 🔊 Audio & Speech
- Text-to-Speech per block
- Therapist & parent voice recording
- Offline audio caching

### 📦 Export Options
- Printable PDF
- Interactive HTML
- Android APK wrapper
- Audio-only packs

### 📴 Offline-First
- Full editor works offline
- Local device storage
- Background sync when online

### 🛒 Marketplace
- Publish & discover therapy modules
- Free & paid content
- Ratings, reviews, and versioning

---

## 🔐 User Roles

- Therapist
- Special Educator
- Parent / Caregiver
- Admin

Each role has controlled permissions and access levels.

---

## 📊 Analytics & Reports

- Activity completion tracking
- Engagement time
- Error patterns
- Auto-generated progress summaries

> ⚠️ No diagnosis or medical decision-making is done by AI.

---

## ⚙️ Setup Instructions

### Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 📡 API Communication

- REST-based APIs
- JSON data exchange
- Secure authentication tokens

---

## ♿ Accessibility

- Large buttons & high contrast
- Dyslexia-friendly fonts
- Screen reader compatibility

---

## 🇮🇳 Design Principles

- India-first language support
- Offline-by-default
- Therapist-controlled content
- Modular & scalable architecture

---

## 🧪 Future Enhancements

- Plugin system for new activity types
- Third-party integrations via APIs
- Institutional dashboards
- Government & NGO deployments

---

## 📜 License

This project is built for educational, research, and hackathon purposes.

---

## 💡 Final Note

> *We are not building an app.*  
> **We are building the content infrastructure for inclusive therapy in India.**
