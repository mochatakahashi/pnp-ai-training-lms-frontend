'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setSubmitted(true)
      }
      setIsLoading(false)
    }, 500)
  }

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6 text-accent" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Check Your Email
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            We&apos;ve sent a password reset link to{' '}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <div className="bg-secondary/30 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Click the link in the email to reset your password. The link will
            expire in 24 hours.
          </p>
        </div>

        <Link href="/login" className="inline-block">
          <Button variant="outline" className="border-border hover:bg-secondary/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="email"
              type="email"
              placeholder="officer@pnp.gov.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-secondary/30 border-border hover:bg-secondary/50 focus:bg-secondary/50"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
