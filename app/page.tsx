'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Shield,
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  Globe,
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Interactive Learning',
    description:
      'Engaging course content with videos, documents, and interactive modules designed for effective training.',
  },
  {
    icon: Zap,
    title: 'Smart Assessments',
    description:
      'Comprehensive exam system with instant grading, feedback, and performance analytics.',
  },
  {
    icon: Award,
    title: 'Digital Certificates',
    description:
      'Automatic certificate generation upon course completion with unique verification codes.',
  },
  {
    icon: Users,
    title: 'Admin Dashboard',
    description:
      'Complete course management, student monitoring, and detailed analytics for administrators.',
  },
  {
    icon: Globe,
    title: 'Accessible Anywhere',
    description:
      'Access training materials anytime, anywhere with a responsive, mobile-friendly interface.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description:
      'Enterprise-grade security with role-based access control and data protection.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Enroll in Courses',
    description:
      'Browse available training courses and enroll to begin your learning journey.',
  },
  {
    number: '02',
    title: 'Learn at Your Pace',
    description:
      'Complete modules with interactive content and get support from our AI chatbot.',
  },
  {
    number: '03',
    title: 'Take Assessments',
    description:
      'Test your knowledge with comprehensive exams and receive instant results.',
  },
  {
    number: '04',
    title: 'Earn Certificates',
    description:
      'Receive digital certificates upon completion and track your progress.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>PNP LMS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-foreground hover:bg-secondary/50"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Official PNP Training Platform
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance">
              Professional Training for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Philippine National Police
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              A comprehensive learning management system designed for police
              training and professional development with interactive courses,
              smart assessments, and digital certificates.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-border hover:bg-secondary/50 px-8 h-12"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive features designed for effective police training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to get started with your training
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-border" />
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Join the Philippine National Police learning community today
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12">
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 px-8 h-12"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-bold">PNP LMS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Philippine National Police Learning Management System
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © 2026 Philippine National Police. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
