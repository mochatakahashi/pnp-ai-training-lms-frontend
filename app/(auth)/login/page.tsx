'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Demo: detect role based on email and redirect accordingly
        if (email.includes('admin')) {
          // Admin dashboard
          router.push('/admin')
        } else {
          // Trainee/Student dashboard
          router.push('/')
        }
      } else {
        setError('Please fill in all fields')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sign in to your account to continue learning
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
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

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-secondary/30 border-border hover:bg-secondary/50 focus:bg-secondary/50"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 mt-2"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or continue as</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Demo Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-border hover:bg-secondary/50 text-foreground"
          onClick={() => {
            setEmail('trainee@pnp.gov.ph')
            setPassword('demo123')
            setTimeout(() => router.push('/'), 500)
          }}
        >
          Demo Trainee
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-border hover:bg-secondary/50 text-foreground"
          onClick={() => {
            setEmail('admin@pnp.gov.ph')
            setPassword('admin123')
            setTimeout(() => router.push('/admin'), 500)
          }}
        >
          Demo Admin
        </Button>
      </div>

      {/* Signup Link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
