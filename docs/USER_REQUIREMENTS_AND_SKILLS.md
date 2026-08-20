# PNP LMS - User Requirements & Applied Skills Documentation

This document consolidates all user requirements, design guidelines, and technical skills applied across the PNP AI Training LMS codebase.

---

## 1. Core User Requirements & Preferences

### Dashboard & Layout Design
- **Subheader Back Navigation**: Added `← Back to Home` subheader buttons on subpages (Certificates, Verification, Exams).
- **Officer Welcome Banner**:
  - Greeting: `"Welcome Officer"`
  - Subtitle: `"Continue your professional development with our training modules and certification programs."`
  - Pill Notification: `"9 new modules available this week"`
- **My Progress Section**:
  - Positioned directly below the Welcome Officer banner in a compact layout.
  - Senior / Elderly friendly tracking format:
    - **Courses Enrolled**: 3
    - **Hours Spent**: 24.5
    - **Completed Modules**: 9
    - **Certificates Earned**: 2
- **Recommended Next Steps Card**:
  - Formatted with clear check-icon list items:
    - Complete Crisis Management course
    - Retake Community Policing exam
    - Explore new communication skills course
- **Recent Exams Card**:
  - Displays recent exams with score badges.
  - Includes a direct **`See All →`** button navigating to the full exams page.
- **My Learning & Course Catalog Separation**:
  - Removed course progress card from Dashboard.
  - Course Catalog contains search bar and enrollment toggle.
  - My Learning is placed under Courses with tabs.

### Navigation Header (Topbar)
- **Top Search Bar**: Removed top search bar (`Search courses, exams...`) as requested.
- **Hamburger & Close Toggle**:
  - Restyled to a circular pill button (`w-9 h-9 rounded-full shadow-2xs hover:scale-105`).
  - Closed State (`Menu` icon): Sky blue theme (`bg-sky-50 text-sky-600 border-sky-200`).
  - Open State (`X` icon): Rose theme (`bg-rose-50 text-rose-600 border-rose-200`).

### Quiz & Examination Rules
- **No Automatic Passing**: Scores are calculated dynamically based on correct answers.
- **70% Passing Threshold**: Officers must score **≥ 70%** to pass a quiz. Scores < 70% require a retake.
- **Clue Feedback System**:
  - On incorrect attempts, the correct option choice is **NOT** revealed or highlighted in green.
  - An amber **`💡 Clue`** card provides educational context to guide the officer.
- **AI Chatbot Availability Rules**:
  - AI Assistant is available **ONLY during Module Reading/Review** mode (`activeTab === 'content'`).
  - Automatically **hidden during Quizzes and Final Exams** to preserve test integrity.

---

## 2. Integrated Skills & Plugins

### Applied Web Application Guidance
- Clean Next.js 16 App Router structure with TypeScript.
- Tailwind CSS styling with HSL color tokens (`bg-card`, `text-foreground`, `bg-sky-500`, `bg-emerald-600`, `bg-rose-600`).
- Responsive card grids, elevated shadow layers, and glassmorphism elements.

### Applied Android CLI Plugin & Mobile Readiness
- Mobile-friendly viewport breakpoints (`sm`, `md`, `lg`).
- Responsive drawer toggle for sidebar on smaller screen devices.
