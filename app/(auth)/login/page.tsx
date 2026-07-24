'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail, Lock, Shield, Building2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'credentials' | '2fa' | 'office'>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [selectedOffice, setSelectedOffice] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const offices = [
    { id: 'ncr', name: 'NCR Police Office', region: 'National Capital Region' },
    { id: 'car', name: 'CAR Police Office', region: 'Cordillera Administrative Region' },
    { id: 'r1', name: 'Region 1 Police Office', region: 'Ilocos Region' },
    { id: 'r2', name: 'Region 2 Police Office', region: 'Cagayan Valley' },
    { id: 'r3', name: 'Region 3 Police Office', region: 'Central Luzon' },
    { id: 'r4a', name: 'Region 4-A Police Office', region: 'CALABARZON' },
    { id: 'r4b', name: 'Region 4-B Police Office', region: 'Mimaropa' },
    { id: 'r5', name: 'Region 5 Police Office', region: 'Bicol Region' },
    { id: 'r6', name: 'Region 6 Police Office', region: 'Western Visayas' },
    { id: 'r7', name: 'Region 7 Police Office', region: 'Central Visayas' },
    { id: 'r8', name: 'Region 8 Police Office', region: 'Eastern Visayas' },
    { id: 'r9', name: 'Region 9 Police Office', region: 'Zamboanga Peninsula' },
    { id: 'r10', name: 'Region 10 Police Office', region: 'Northern Mindanao' },
    { id: 'r11', name: 'Region 11 Police Office', region: 'Davao Region' },
    { id: 'r12', name: 'Region 12 Police Office', region: 'Soccsksargen' },
    { id: 'barmm', name: 'BARMM Police Office', region: 'Bangsamoro Autonomous Region' },
  ]

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setStep('2fa')
      } else {
        setError('Please fill in all fields')
      }
      setIsLoading(false)
    }, 500)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      if (otp && otp.length === 6) {
        setStep('office')
      } else {
        setError('Invalid OTP. Please try again.')
      }
      setIsLoading(false)
    }, 500)
  }

  const handleOfficeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate final submission
    setTimeout(() => {
      if (selectedOffice) {
        // Store user session and redirect
        sessionStorage.setItem('userEmail', email)
        sessionStorage.setItem('userOffice', selectedOffice)
        router.push('/dashboard')
      } else {
        setError('Please select your office')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">
          {step === 'credentials' && 'Welcome Back'}
          {step === '2fa' && 'Verify Your Identity'}
          {step === 'office' && 'Select Your Office'}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {step === 'credentials' && 'Sign in to your account to continue learning'}
          {step === '2fa' && 'Enter the 6-digit code sent to your email'}
          {step === 'office' && 'Select your assigned police office or station'}
        </p>
      </div>

      {step === 'credentials' && (
      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
      )}

      {step === '2fa' && (
      <form onSubmit={handleOtpSubmit} className="space-y-4">
        {/* OTP Input */}
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm font-medium">
            Authentication Code
          </Label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="pl-10 text-center text-lg tracking-widest bg-secondary/30 border-border hover:bg-secondary/50 focus:bg-secondary/50"
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-muted-foreground">Check your email for the 6-digit code</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Verify Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 mt-2"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </Button>

        {/* Back Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full border-border hover:bg-secondary/50"
          onClick={() => {
            setStep('credentials')
            setOtp('')
            setError('')
          }}
          disabled={isLoading}
        >
          Back
        </Button>
      </form>
      )}

      {step === 'office' && (
      <form onSubmit={handleOfficeSubmit} className="space-y-4">
        {/* Office Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Police Office / Station</Label>
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2">
            {offices.map((office) => (
              <button
                key={office.id}
                type="button"
                onClick={() => setSelectedOffice(office.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedOffice === office.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground">{office.name}</p>
                    <p className="text-xs text-muted-foreground">{office.region}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Continue Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 mt-2"
          disabled={isLoading || !selectedOffice}
        >
          {isLoading ? 'Completing...' : 'Complete Sign In'}
        </Button>

        {/* Back Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full border-border hover:bg-secondary/50"
          onClick={() => {
            setStep('2fa')
            setSelectedOffice('')
            setError('')
          }}
          disabled={isLoading}
        >
          Back
        </Button>
      </form>
      )}

      {step === 'credentials' && (
      <>
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
            setEmail('officer@pnp.gov.ph')
            setPassword('demo123')
          }}
        >
          Demo Officer
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-border hover:bg-secondary/50 text-foreground"
          onClick={() => {
            setEmail('admin@pnp.gov.ph')
            setPassword('admin123')
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
      </>
      )}
    </div>
  )
}
