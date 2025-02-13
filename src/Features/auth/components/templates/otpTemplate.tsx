'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { OTPInput } from '../molecules/otpInput'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../state'
import Spinner from '@/components/ui/spinner'
import { OTP_LENGTH } from '../../constants'
import { useDashboardStore } from '@/Features/userDashboard/state'
import { useOnboardingStore } from '@/Features/onboarding/state'
// import { useAssetAllocationStore } from '@/Features/assetAllocation/state'

export const OTPTemplate = () => {
  const [otpValues, setOTPValues] = useState(Array(6).fill(''))

  const {
    validateOTP,
    loading,
    user,
    error,
    setError,
    setLoading,
  } = useAuthStore()
  const { getSectionProgress } = useOnboardingStore()

  const { subscription } = useDashboardStore()
  const router = useRouter()

  const handleSignIn = async () => {
    const success = await validateOTP(otpValues.join(''), 'SIGN_IN')
    if (success) {
      setLoading(true)

      if (subscription.status === 'active') {
        router.replace('/dashboard')
        setLoading(true)
        return
      }

      const activeSection = await getSectionProgress()

      if (activeSection === 'completed') {
        router.replace('/freebie')
        setLoading(false)
        return
      }

      const sectionToRouteMap: { [key: string]: string } = {
        personal: '/personal-info',
        financial: '/financial-info',
        goals: '/goals-info',
        risk: '/risk-info',
        knowledge: '/knowledge-info',
      }

      const activeRoute = sectionToRouteMap[activeSection || 'personal']
      router.replace(activeRoute)
    }
  }

  const handleOpenEmail = () => {
    window.open('https://mail.google.com', '_blank')
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <Image
          src="/assets/logo1.svg"
          alt="Celerey Logo"
          width={60}
          height={60}
          className="mx-auto"
        />
        <h1 className="text-4xl font-cirka mt-4 mb-2">Verify your identity</h1>
        <p className="text-sm text-gray-600 font-helvetica">
          Enter the code we just sent to {user?.email}
        </p>
      </div>

      <OTPInput
        length={6}
        value={otpValues}
        onChange={(value) => {
          if (error) {
            setError('')
          }
          setOTPValues(value)
        }}
      />
      {error && <p className=" text-sm mt-1 mb-2 text-red-500">{error}</p>}

      <Button
        disabled={otpValues.join('').length !== OTP_LENGTH || loading}
        onClick={handleSignIn}
        className="w-80 bg-navy text-white mb-4 hover:bg-navyLight"
      >
        {loading && <Spinner className="text-white" />} Sign in to my dashboard
      </Button>

      <div className="space-y-2 text-sm">
        <p
          className="text-gray-600 hover:cursor-pointer hover:text-navyLight"
          onClick={handleOpenEmail}
        >
          Open Email
        </p>
        <p className="text-navyLight hover:cursor-pointer">Resend The Code</p>
      </div>
    </div>
  )
}
