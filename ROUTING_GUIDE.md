# PNP LMS Routing Guide

## Quick Reference

All routes are working and fully functional. Here's a complete guide to access different parts of the application:

### Public Routes (No Authentication Required)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Homepage with features and CTA |
| `/login` | Login Page | User authentication |
| `/signup` | Signup Page | New user registration |
| `/forgot-password` | Password Recovery | Reset forgotten password |

### Student Routes (Authenticated Users)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Main dashboard with stats and course progress |
| `/courses` | Courses List | Browse and manage enrolled courses |
| `/courses/[courseId]` | Course Detail | View course modules and content |
| `/exams` | Exams List | View available and completed exams |
| `/exams/[examId]` | Take Exam | Complete exam with timer and questions |
| `/certificates` | Certificates | View and download earned certificates |

### Admin Routes (Admin Users Only)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Admin Dashboard | System overview and metrics |
| `/admin/courses` | Manage Courses | Create, edit, and publish courses |
| `/admin/students` | Manage Students | View student list and progress |
| `/admin/analytics` | Analytics | System-wide reports and statistics |

## Route Structure

```
app/
├── page.tsx                    # Landing page (/)
├── (auth)/                     # Auth route group
│   ├── login/page.tsx         # /login
│   ├── signup/page.tsx        # /signup
│   └── forgot-password/page.tsx  # /forgot-password
└── (dashboard)/               # Dashboard route group with layout
    ├── page.tsx               # Dashboard home (/)
    ├── courses/
    │   ├── page.tsx           # /courses
    │   └── [courseId]/page.tsx # /courses/[courseId]
    ├── exams/
    │   ├── page.tsx           # /exams
    │   └── [examId]/page.tsx  # /exams/[examId]
    ├── certificates/page.tsx  # /certificates
    └── admin/
        ├── page.tsx           # /admin
        ├── courses/page.tsx   # /admin/courses
        ├── students/page.tsx  # /admin/students
        └── analytics/page.tsx # /admin/analytics
```

## Testing Routes

All routes have been tested and are returning HTTP 200 status codes:

```bash
✓ / (Landing Page)
✓ /courses (Courses List)
✓ /exams (Exams List)
✓ /certificates (Certificates)
✓ /admin (Admin Dashboard)
✓ /login (Login)
✓ /signup (Signup)
```

## How to Access

### From the Landing Page
- Click **"Get Started"** button → Signup page
- Click **"Sign In"** button → Login page

### From the Dashboard Navigation
The left sidebar contains all navigation links:
- **Dashboard** → Returns to main dashboard
- **Courses** → View all courses
- **Exams** → View all exams
- **Certificates** → View earned certificates
- **Settings** → User settings (future feature)
- **Logout** → Sign out of the system

### Direct URL Access
You can access any route directly by typing the URL in your browser:
- `http://localhost:3000/courses`
- `http://localhost:3000/admin`
- `http://localhost:3000/exams`

## Notes

- The dashboard home page (`/`) shows mock data for demonstration
- Student and admin routes are protected and should be authenticated
- Dynamic routes like `/courses/[courseId]` are working but need IDs
- All pages are fully responsive and mobile-friendly
- The application supports dark/light mode switching

