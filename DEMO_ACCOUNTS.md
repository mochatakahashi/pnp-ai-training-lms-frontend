# Demo Accounts - PNP LMS

## Overview
The PNP Learning Management System provides separate demo accounts for testing the **Trainee/Student** and **Admin** roles with completely separated navigation and functionality.

## Demo Account Credentials

### Trainee/Officer Account
**Role:** Student/Trainee  
**Email:** `trainee@pnp.gov.ph`  
**Password:** `demo123`  
**Access:** https://pnp-lms.app/login (click "Demo Trainee")  
**Dashboard:** `/` (Student Dashboard)

#### Trainee Sidebar Navigation
- Dashboard (/)
- Courses (/courses)
- Exams (/exams)
- Certificates (/certificates)

#### Trainee Features
- Browse available courses
- Enroll in courses
- Study modules with AI chatbot assistance
- Take exams with timer and auto-grading
- Download certificates upon completion
- View learning progress and statistics

---

### Admin Account
**Role:** Administrator  
**Email:** `admin@pnp.gov.ph`  
**Password:** `admin123`  
**Access:** https://pnp-lms.app/login (click "Demo Admin")  
**Dashboard:** `/admin` (Admin Dashboard)

#### Admin Sidebar Navigation
- Dashboard (/admin)
- Manage Courses (/admin/courses)
- Manage Students (/admin/students)
- Monitor Exams (/admin/exams)
- Monitor Certificates (/admin/certificates)
- Analytics (/admin/analytics)

#### Admin Features
- Create and manage courses with filtering (by level, subject, source)
- Track student enrollment and progress
- Monitor exam submissions and scores
- View certificates by section/region and trainee
- Access system-wide analytics and reporting

---

## Navigation Separation

The sidebar navigation is completely separated based on user role:

### When logged in as Trainee:
- Cannot access admin features
- Cannot navigate to /admin routes
- Sidebar shows only trainee-relevant links

### When logged in as Admin:
- Cannot access trainee courses (different /courses path)
- Has access to management and monitoring features
- Sidebar shows only admin-relevant links

---

## Quick Start Guide

### For Trainees:
1. Go to `/login`
2. Click "Demo Trainee" button
3. Automatically redirected to `/` (Dashboard)
4. Browse courses, take exams, earn certificates

### For Admins:
1. Go to `/login`
2. Click "Demo Admin" button
3. Automatically redirected to `/admin` (Admin Dashboard)
4. Manage courses, students, exams, and view analytics

---

## Account Notes

- Demo accounts reset daily (in production)
- No real data persistence without Supabase integration
- All changes are lost on page refresh
- Both roles can log out and switch accounts

---

## Technical Implementation

### Role-Based Routing
- Login logic detects email pattern and redirects to appropriate dashboard
- Trainee emails trigger `/` redirect
- Admin emails (containing "admin") trigger `/admin` redirect

### Sidebar Component
The sidebar component (`components/navigation/sidebar.tsx`) dynamically renders navigation items based on the `userRole` prop passed from layout:
- Student layout passes `userRole="student"`
- Admin layout passes `userRole="admin"`

### Separate Navigation Trees
- **Student Nav:** Dashboard, Courses, Exams, Certificates
- **Admin Nav:** Dashboard, Manage Courses, Manage Students, Monitor Exams, Monitor Certificates, Analytics
