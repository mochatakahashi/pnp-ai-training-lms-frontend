# PNP LMS - Page Structure & Navigation Guide

## Navigation Flows

### Public Pages (No Authentication Required)
```
Landing Page (/)
├── Sign In → Login Page
├── Get Started → Sign Up Page
└── Sign Up Link → Sign Up Page

Login Page (/login)
├── Forgot password? → Forgot Password Page
├── Sign Up Link → Sign Up Page
└── Demo Buttons → Dashboard (redirect)

Signup Page (/signup)
├── Back to Sign In → Login Page
└── Form Submit → Login Page (redirect)

Forgot Password Page (/forgot-password)
├── Back to Sign In → Login Page
└── Form Submit → Success State (email sent)
```

### Student Dashboard Pages
```
Dashboard (/dashboard)
├── View All Courses → Courses Page
├── Continue Course → Course Detail Page
├── View All Certificates → Certificates Page
├── Settings → Settings Page
└── Logout → Login Page

Courses Page (/courses)
├── Course Card → Course Detail Page
├── Back → Dashboard
└── Navigation Sidebar Links

Course Detail Page (/courses/[courseId])
├── Module Cards → Module Viewer
├── Start Exam → Exam Page
├── Back → Courses Page
└── Chat Widget → AI Assistant

Module Viewer
├── Course Content Display
├── Chat Widget (enabled)
├── Progress Tracking
└── Mark Complete

Exams Page (/exams)
├── Exam Card → Start Exam
├── Back → Dashboard
└── Navigation Sidebar Links

Exam Page (/exams/[examId])
├── Quiz Interface
├── Timer (countdown)
├── Question Navigation
├── Submit → Results Page

Results Page
├── Score Display
├── Performance Analysis
├── Generate Certificate
├── Back → Exams Page

Certificates Page (/certificates)
├── Certificate Card → Certificate Viewer
├── Download PDF Button
├── Share Certificate
└── Back → Dashboard
```

### Admin Dashboard Pages
```
Admin Dashboard (/admin)
├── Manage Courses → Admin Courses Page
├── Manage Students → Admin Students Page
├── View Analytics → Admin Analytics Page
├── New Course Button → Course Create Form
└── Navigation Sidebar Links

Admin Courses Page (/admin/courses)
├── Course Cards
├── Edit Button → Edit Form
├── Delete Button → Confirmation
├── Add Module Button → Module Form
├── View Details → Course Analytics
└── Back → Admin Dashboard

Admin Students Page (/admin/students)
├── Student List/Grid
├── Student Details → Student Profile
├── View Progress → Progress Analytics
├── Send Message Button → Messaging
└── Back → Admin Dashboard

Admin Analytics Page (/admin/analytics)
├── Key Metrics Cards
├── Charts & Graphs
├── Export Report Button → PDF
├── Date Range Selector
└── Back → Admin Dashboard
```

---

## Page Details

### 1. Landing Page (/)
**Purpose**: Public-facing homepage introducing the PNP LMS platform

**Sections**:
- Navigation Bar
- Hero Section
- Features Grid (6 features)
- How It Works Section (4 steps)
- CTA Section
- Footer

**Call-to-Action**:
- "Start Learning" → /signup
- "Sign In" → /login
- Navigation Links → Smooth scroll to sections

**Access**: Public (No login required)

---

### 2. Login Page (/login)
**Purpose**: User authentication and session creation

**Form Fields**:
- Email (required)
- Password (required)
- "Forgot Password?" link
- Remember me checkbox (optional)

**Features**:
- Demo buttons for quick testing
- Sign up link for new users
- Error message display
- Loading state
- Password visibility toggle

**Validation**:
- Email format validation
- Non-empty password requirement
- Error messages for failed auth

**Access**: Public (No login required)

---

### 3. Signup Page (/signup)
**Purpose**: New user registration and account creation

**Form Fields**:
- Full Name (required)
- Email (required)
- Password (required, min 8 chars)
- Confirm Password (required)
- Terms & Conditions checkbox (optional)

**Validation**:
- Email format validation
- Password strength validation
- Password match validation
- Minimum length requirements

**Access**: Public (No login required)

---

### 4. Forgot Password Page (/forgot-password)
**Purpose**: Password reset flow for forgotten credentials

**Flow States**:
- **Input State**: Email entry form
- **Confirmation State**: Success message after submission

**Features**:
- Email input validation
- Confirmation screen with clear messaging
- 24-hour reset link expiration notice
- Back to login link

**Access**: Public (No login required)

---

### 5. Student Dashboard (/dashboard)
**Purpose**: Main hub for student learning activities

**Sections**:
1. **Welcome Banner**
   - Personalized greeting
   - Quick status updates
   - New modules indicator

2. **Statistics Cards** (4 cards)
   - Courses Enrolled
   - Hours Spent
   - Completed Modules
   - Certificates Earned

3. **My Courses Section**
   - Course cards with progress
   - Continue button
   - Module completion count

4. **Recent Exams Section**
   - Exam titles
   - Scores
   - Pass/fail status
   - Dates

5. **Recommended Next Steps**
   - Goal-oriented suggestions
   - Action items

**Access**: Students only (requires login)

---

### 6. Courses Page (/courses)
**Purpose**: Browse and manage enrolled courses

**Features**:
- Course listing (grid or list view)
- Search and filter by category
- Sort by progress or enrollment date
- Course progress visualization
- View all enrolled courses

**Filters**:
- By Category (Police Training, etc.)
- By Status (In Progress, Completed, Not Started)
- By Difficulty (Beginner, Intermediate, Advanced)

**Actions**:
- Continue/Resume course
- View course details
- Leave course (archive)

**Access**: Students only (requires login)

---

### 7. Course Detail Page (/courses/[courseId])
**Purpose**: View course content and modules

**Sections**:
1. **Course Header**
   - Course title
   - Description
   - Instructor info
   - Duration estimate

2. **Course Stats**
   - Overall progress
   - Modules completed
   - Time spent
   - Certificate status

3. **Modules List**
   - Module cards
   - Status (locked, in progress, completed)
   - Duration estimate
   - View/continue button

4. **Course Navigation**
   - Sidebar with module list
   - Progress indicator
   - Quick jump to module

**Features**:
- Responsive module viewer
- Module content display
- AI chat widget
- Module completion tracking

**Access**: Enrolled students only

---

### 8. Module Viewer (Within Course Detail)
**Purpose**: Display interactive course content

**Features**:
1. **Content Display**
   - Text content
   - Videos
   - Images
   - Documents
   - Interactive elements

2. **Navigation**
   - Previous/Next module buttons
   - Module progress indicator
   - Table of contents

3. **AI Chat Widget**
   - Floating chat button
   - Conversation history
   - Context-aware responses
   - Disable during exams

4. **Actions**
   - Mark as complete
   - Take exam button
   - View resources
   - Print content

**Access**: During module study (not during exams)

---

### 9. Exams Page (/exams)
**Purpose**: List available and completed exams

**Features**:
- Available exams (not yet taken)
- Completed exams with scores
- Retake available exams
- View results from previous attempts

**Filters**:
- By Status (Available, Passed, Failed)
- By Course
- By Date

**Actions**:
- Start exam
- View results
- Retake exam
- Download certificate (if passed)

**Access**: Students only (requires login)

---

### 10. Exam Page (/exams/[examId])
**Purpose**: Take a timed exam with multiple questions

**Features**:
1. **Exam Interface**
   - Question display
   - Answer options (radio, checkbox, text)
   - Question navigation
   - Flagged questions list

2. **Exam Timer**
   - Countdown timer
   - Time warnings (5 min, 1 min)
   - Auto-submit on timeout

3. **Controls**
   - Previous/Next buttons
   - Flag question button
   - Submit exam button
   - Confirm submission dialog

4. **Question Tracking**
   - Question counter (X of Y)
   - Status indicators (answered, flagged, skipped)
   - Review flagged questions

**Integrity Features**:
- Window focus detection
- Disable exam controls during timer
- Activity logging
- One exam instance per user per attempt

**Access**: Enrolled students, after module completion

---

### 11. Exam Results Page
**Purpose**: Display exam performance and feedback

**Sections**:
1. **Score Summary**
   - Final score (percentage)
   - Pass/fail status
   - Grade letter (if applicable)

2. **Performance Analytics**
   - Correct/incorrect count
   - Question-by-question breakdown
   - Time taken per question
   - Performance vs. class average

3. **Feedback**
   - Review answers
   - See correct answers
   - Detailed explanations

4. **Next Steps**
   - Retake exam button (if allowed)
   - Download/print results
   - View certificate (if passed)
   - Return to course

**Access**: After exam submission

---

### 12. Certificates Page (/certificates)
**Purpose**: View and manage earned certificates

**Features**:
- Certificate listing (cards or grid)
- Certificate preview
- Download as PDF
- Print certificate
- Share certificate link
- Certificate verification (QR code)
- Certificate details (date, course, score)

**Actions**:
- View certificate
- Download PDF
- Print
- Share
- Verify (via code)

**Sorting**:
- By date earned (newest first)
- By course name
- By score achieved

**Access**: Students only (shows earned certificates)

---

### 13. Admin Dashboard (/admin)
**Purpose**: Central hub for system administration

**Sections**:
1. **Header**
   - System status indicator
   - Quick action (New Course button)

2. **Key Metrics** (4 cards)
   - Total Courses
   - Active Students
   - Exams Created
   - Average Pass Rate

3. **Quick Actions** (4 buttons)
   - Create Course
   - Manage Courses
   - Manage Students
   - View Analytics

4. **Recent Courses Table**
   - Course name
   - Student count
   - Module count
   - Exam count
   - Status (published/draft)

**Access**: Admins only (requires admin role)

---

### 14. Admin Courses Page (/admin/courses)
**Purpose**: Manage all courses in the system

**Features**:
- Course listing (table view)
- Search by course name
- Filter by status (published, draft, archived)
- Sort by name, date, or student count

**Columns**:
- Course Title
- Description (excerpt)
- Student Count
- Module Count
- Exam Count
- Status Badge
- Actions (Edit, Delete, View)

**Actions**:
- Create new course
- Edit course
- Delete course
- Publish/unpublish
- View analytics
- Manage modules
- Manage exams

**Access**: Admins only

---

### 15. Admin Students Page (/admin/students)
**Purpose**: Monitor and manage student accounts

**Features**:
- Student listing (table view)
- Search by name or email
- Filter by enrollment status
- Filter by course

**Columns**:
- Student Name
- Email
- Courses Enrolled
- Progress (%)
- Certificates Earned
- Last Active
- Actions

**Actions**:
- View student profile
- View detailed progress
- Send message
- Reset password
- Deactivate/reactivate
- View analytics

**Access**: Admins only

---

### 16. Admin Analytics Page (/admin/analytics)
**Purpose**: View system-wide analytics and performance

**Sections**:
1. **Key Metrics Dashboard**
   - Total enrolled students
   - Active users (last 30 days)
   - Course completion rate
   - Average pass rate

2. **Charts & Graphs**
   - Student enrollment trend
   - Course popularity
   - Exam pass/fail rates
   - Time spent per course
   - Module completion rates

3. **Reports**
   - Course performance report
   - Student progress report
   - Exam statistics report
   - System usage report

4. **Filters**
   - Date range selector
   - Course filter
   - Student cohort filter

**Features**:
- Export reports (CSV, PDF)
- Data visualization
- Real-time metrics (refresh option)
- Trend analysis

**Access**: Admins only

---

## URL Structure

### Public Routes
```
GET  /                      # Landing page
GET  /login                 # Login page
POST /api/auth/login        # Login API endpoint
GET  /signup                # Sign up page
POST /api/auth/signup       # Sign up API endpoint
GET  /forgot-password       # Forgot password page
POST /api/auth/reset        # Reset password API endpoint
```

### Student Routes (Protected)
```
GET  /dashboard             # Student dashboard
GET  /courses               # Courses listing
GET  /courses/[id]          # Course detail
GET  /exams                 # Exams listing
GET  /exams/[id]            # Take exam
GET  /exams/[id]/results    # Exam results
GET  /certificates          # Certificates listing
POST /api/courses/[id]/complete       # Complete module API
POST /api/exams/[id]/submit           # Submit exam API
POST /api/certificates/[id]/download  # Download cert API
```

### Admin Routes (Protected - Admin Role Only)
```
GET  /admin                 # Admin dashboard
GET  /admin/courses         # Manage courses
POST /admin/courses         # Create course
PUT  /admin/courses/[id]    # Edit course
DELETE /admin/courses/[id]  # Delete course
GET  /admin/students        # Manage students
GET  /admin/students/[id]   # Student detail
GET  /admin/analytics       # Analytics dashboard
POST /admin/reports/export  # Export report API
```

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Stacked navigation
- Full-width cards
- Touch-friendly buttons (larger targets)
- Hamburger menu for sidebar

### Tablet (768px - 1024px)
- 2-column layouts
- Horizontal scrolling tables (if needed)
- Expanded navigation sidebar (visible)
- Medium-sized cards

### Desktop (> 1024px)
- Multi-column grids (3-4 columns)
- Full-width tables
- Sidebar navigation visible
- Hover effects enabled
- Expanded content views

---

## Authentication & Authorization

### Public Access
- Landing page
- Login page
- Signup page
- Forgot password page

### Student Access (Authenticated)
- Dashboard
- Courses
- Exams
- Certificates
- Profile settings

### Admin Access (Authenticated + Admin Role)
- All student pages
- Admin dashboard
- Course management
- Student management
- Analytics and reports

### Session Management
- JWT or session-based authentication
- Session timeout after inactivity
- Automatic logout
- Session recovery on page refresh

---

## Error Handling

### 404 Pages
- Landing page for undefined routes
- Suggestion to return to dashboard or home

### 403 Forbidden
- Redirect to login for unauthorized access
- Role-based access control
- Admin dashboard access requires admin role

### 500 Error
- Error boundary component
- User-friendly error message
- Support contact information
- Option to refresh or go home

---

## Loading States

### Page Loading
- Skeleton screens for initial load
- Progress indicators
- Loading spinners

### Form Submission
- Button disabled state
- Loading spinner in button
- Success/error messages
- Toast notifications

### Data Fetching
- Loading placeholders
- Error retry button
- Fallback content

---

This structure ensures a clear navigation flow, optimal user experience, and separation between public, student, and admin sections of the application.
