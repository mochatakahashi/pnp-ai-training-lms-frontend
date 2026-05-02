'use client'

import React from 'react'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PNP LMS</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Philippine National Police Learning Management System
          </p>
        </div>

        {/* Auth Content */}
        <div className="bg-card rounded-xl border border-border shadow-lg p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2026 Philippine National Police. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
