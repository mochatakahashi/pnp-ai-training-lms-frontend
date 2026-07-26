'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail, Lock, User, Building2, MapPin, Shield, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<'info' | '2fa'>('info')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('National Capital Region (NCR)')
  const [policeStation, setPoliceStation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const regions = [
    { id: 'ncr', name: 'National Capital Region (NCR)', code: 'PRO NCR' },
    { id: 'pro1', name: 'Region 1 - Ilocos Region', code: 'PRO 1' },
    { id: 'pro2', name: 'Region 2 - Cagayan Valley', code: 'PRO 2' },
    { id: 'pro3', name: 'Region 3 - Central Luzon', code: 'PRO 3' },
    { id: 'pro4a', name: 'Region 4A - CALABARZON', code: 'PRO 4A' },
    { id: 'pro4b', name: 'Region 4B - MIMAROPA', code: 'PRO 4B' },
    { id: 'pro5', name: 'Region 5 - Bicol Region', code: 'PRO 5' },
    { id: 'pro6', name: 'Region 6 - Western Visayas', code: 'PRO 6' },
    { id: 'pro7', name: 'Region 7 - Central Visayas', code: 'PRO 7' },
    { id: 'pro8', name: 'Region 8 - Eastern Visayas', code: 'PRO 8' },
    { id: 'pro9', name: 'Region 9 - Zamboanga Peninsula', code: 'PRO 9' },
    { id: 'pro10', name: 'Region 10 - Northern Mindanao', code: 'PRO 10' },
    { id: 'pro11', name: 'Region 11 - Davao Region', code: 'PRO 11' },
    { id: 'pro12', name: 'Region 12 - SOCCSKSARGEN', code: 'PRO 12' },
    { id: 'pro13', name: 'Region 13 - Caraga Region', code: 'PRO 13' },
    { id: 'barmm', name: 'Bangsamoro Autonomous Region (BARMM)', code: 'PRO BARMM' },
    { id: 'car', name: 'Cordillera Administrative Region (CAR)', code: 'PRO CAR' },
    { id: 'nhq', name: 'PNP National Headquarters', code: 'NHQ Camp Crame' },
  ]

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName || !email || !password || !confirmPassword || !policeStation) {
      setError('Please complete all required fields including your Name, Office, Email, and Password.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)

    // Pre-fill sample OTP code for user convenience and proceed to 2FA step
    setTimeout(() => {
      setIsLoading(false)
      setOtp('849201')
      setStep('2fa')
    }, 400)
  }

  const handle2faSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit authentication code.')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      // Store session data upon successful sign up & 2FA authentication
      sessionStorage.setItem('isLoggedIn', 'true')
      sessionStorage.setItem('userName', fullName)
      sessionStorage.setItem('userEmail', email)
      sessionStorage.setItem('userRegion', selectedRegion)
      sessionStorage.setItem('userStation', policeStation)

      setIsLoading(false)
      router.push('/dashboard')
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {step === 'info' ? 'PNP Officer Registration (Sign Up)' : '2-Layer Authentication'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {step === 'info'
            ? 'Input your Name, PNP Email, Office details, and Password.'
            : 'Enter the 6-digit authentication code sent to your email to verify your registration.'}
        </p>
      </div>

      {step === 'info' ? (
        <form onSubmit={handleInfoSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">Full Name & Rank</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="fullName"
                type="text"
                placeholder="e.g. Pat. Maria Cruz"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 bg-secondary/30 border-border"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">PNP Email Address</Label>
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

          {/* Office - Region */}
          <div className="space-y-2">
            <Label htmlFor="region" className="text-sm font-medium flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              Police Regional Office (PRO)
            </Label>
            <select
              id="region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
            >
              {regions.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.code} - {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Office - Police Station */}
          <div className="space-y-2">
            <Label htmlFor="station" className="text-sm font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              Police Station / Unit / Precinct
            </Label>
            <Input
              id="station"
              type="text"
              placeholder="e.g. Manila Police District - Station 1 (Ermita)"
              value={policeStation}
              onChange={(e) => setPoliceStation(e.target.value)}
              className="bg-secondary/30 border-border text-sm"
              disabled={isLoading}
            />
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 chars"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-secondary/30 border-border"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-secondary/30 border-border"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 shadow-md">
            {isLoading ? 'Processing Registration...' : 'Continue to 2-Layer Authentication →'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handle2faSubmit} className="space-y-4">
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Authentication Required</p>
              <p>Enter the 6-digit 2FA code sent to <span className="font-mono text-primary font-bold">{email}</span> to verify your office registration.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">6-Digit Code</Label>
            <Input
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="text-center font-mono text-xl tracking-[0.4em] bg-secondary/30 border-border h-12"
              placeholder="849201"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground text-center">Demo Code: <span className="font-mono font-bold text-primary">849201</span></p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11 shadow-md">
            {isLoading ? 'Verifying 2FA...' : 'Verify 2FA & Complete Sign Up ✓'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setStep('info')}
            disabled={isLoading}
          >
            ← Back to Registration Details
          </Button>
        </form>
      )}

      {/* Switch to Log In */}
      <p className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Log In with Email & Password →
        </Link>
      </p>
    </div>
  )
}
