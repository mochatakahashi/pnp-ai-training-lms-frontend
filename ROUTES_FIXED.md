# PNP LMS - Routes & Authentication Flow

## Route Structure

### Public Routes (No Authentication Required)
- **`/`** - Landing page with features, CTAs, and system overview
- **`/login`** - Login page with demo accounts
- **`/signup`** - Sign up / Registration page
- **`/forgot-password`** - Password recovery page

### Trainee/Student Routes (Protected - requires student auth)
- **`/dashboard`** - Student dashboard with courses, exams, progress
- **`/courses`** - Browse all enrolled courses
- **`/courses/[courseId]`** - View specific course and modules
- **`/exams`** - Available and completed exams
- **`/exams/[examId]`** - Take exam with timer and questions
- **`/certificates`** - View earned certificates

### Admin Routes (Protected - requires admin auth)
- **`/admin`** - Admin dashboard with key metrics and quick actions
- **`/admin/courses`** - Manage all courses (create, edit, delete, publish)
- **`/admin/students`** - Monitor student progress and enrollment
- **`/admin/exams`** - Monitor exams, scores, and completion rates
- **`/admin/certificates`** - View and verify student certificates by region/section
- **`/admin/analytics`** - System-wide analytics and reporting

## Authentication & Redirection Logic

### Login Process
1. User visits `/login`
2. User enters email and password or clicks demo button
3. System detects role based on email:
   - Email contains "admin" → redirects to `/admin`
   - Other emails → redirects to `/dashboard`

### Demo Accounts
- **Demo Trainee**
  - Email: `trainee@pnp.gov.ph`
  - Password: `demo123`
  - Redirects to: `/dashboard`

- **Demo Admin**
  - Email: `admin@pnp.gov.ph`
  - Password: `admin123`
  - Redirects to: `/admin`

## Navigation Items by Role

### Student/Trainee Sidebar Menu
```
Dashboard (/dashboard)
Courses (/courses)
Exams (/exams)
Certificates (/certificates)
Settings
Logout
```

### Admin Sidebar Menu
```
Dashboard (/admin)
Manage Courses (/admin/courses)
Manage Students (/admin/students)
Monitor Exams (/admin/exams)
Monitor Certificates (/admin/certificates)
Analytics (/admin/analytics)
Settings
Logout
```

## Landing Page Buttons

All call-to-action buttons on the landing page (`/`) now point to `/login`:
- Top Navigation: "Sign In" → `/login`
- Hero Section: "Get Started" → `/login`
- Hero Section: "Start Learning" → `/login`
- CTA Section: "Create Account" → `/login`
- CTA Section: "Sign In" → `/login`

## Key Changes Made

1. ✅ Moved Student Dashboard from `/` → `/dashboard`
2. ✅ Landing page remains at `/` with features and CTAs
3. ✅ Updated Login redirects:
   - Trainee: `/login` → `/dashboard`
   - Admin: `/login` → `/admin`
4. ✅ Updated Demo Buttons:
   - Demo Trainee: Redirects to `/dashboard`
   - Demo Admin: Redirects to `/admin`
5. ✅ Updated Sidebar Navigation:
   - Student Dashboard link: `/dashboard`
   - Admin Dashboard link: `/admin`
   - Complete separation of student and admin menus
6. ✅ Updated Landing Page:
   - All buttons now point to `/login`
   - No more direct signup routes in CTAs

## Status Codes
All routes return HTTP 200 (OK):
- `/` ✓
- `/login` ✓
- `/dashboard` ✓
- `/admin` ✓
- `/courses` ✓
- `/exams` ✓
- `/admin/courses` ✓
- `/admin/students` ✓
- `/admin/exams` ✓
- `/admin/certificates` ✓
- `/admin/analytics` ✓
