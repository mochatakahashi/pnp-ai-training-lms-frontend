'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail, Lock, LogIn, Shield } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email address and password.')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      // Set session login state
      sessionStorage.setItem('isLoggedIn', 'true')
      sessionStorage.setItem('userEmail', email)
      
      // Preserve existing region/station if already registered, otherwise set defaults
      if (!sessionStorage.getItem('userRegion')) {
        sessionStorage.setItem('userRegion', 'National Capital Region (NCR)')
      }
      if (!sessionStorage.getItem('userStation')) {
        sessionStorage.setItem('userStation', 'Manila Police District - Station 1 (Ermita)')
      }

      setIsLoading(false)
      router.push('/dashboard')
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Officer Log In</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your PNP email and password to log in to the LMS portal.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="email"
              type="email"
              placeholder="officer@pnp.gov.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-secondary/30 border-border"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-secondary/30 border-border"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 shadow-md flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            'Logging in...'
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Log In
            </>
          )}
        </Button>
      </form>

      {/* Demo Filler Options */}
      <div className="pt-2 text-center">
        <p className="text-xs text-muted-foreground mb-2">Quick Test Logins:</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              setEmail('maria.cruz@pnp.gov.ph')
              setPassword('PnpOfficer2026!')
            }}
          >
            Demo Officer
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              setEmail('admin.training@pnp.gov.ph')
              setPassword('PnpAdmin2026!')
            }}
          >
            Demo Admin
          </Button>
        </div>
      </div>

      {/* Switch to Sign Up */}
      <p className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
        Don&apos;t have an account yet?{' '}
        <Link href="/signup" className="text-primary font-semibold hover:underline">
          Sign Up / Register Office →
        </Link>
      </p>
    </div>
  )
}
