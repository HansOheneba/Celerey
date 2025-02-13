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

export const SignupOTPTemplate = () => {
  const [otpValues, setOTPValues] = useState(Array(6).fill(''))
  const { validateOTP, loading, setLoading } = useAuthStore()
  const { subscription } = useDashboardStore()
  const { getSectionProgress } = useOnboardingStore()

  const router = useRouter()

  const handleOpenEmail = () => {
    window.open('https://mail.google.com', '_blank')
  }

  const handleAccountCreation = async () => {
    const success = await validateOTP(otpValues.join(''), 'SIGN_UP')
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

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <Image
          src="/assets/logo1.svg"
          alt="Celerey Logo"
          width={50}
          height={50}
          className="mx-auto"
        />
        <h1 className="text-3xl font-cirka mt-4 mb-2">
          {' '}
          We&apos;ve sent the code to your email
        </h1>
        <p className="text-sm text-gray-600 font-helvetica">
          Check your email and enter the 6-digit code just sent to you
        </p>
      </div>

      <OTPInput length={OTP_LENGTH} value={otpValues} onChange={setOTPValues} />

      <Button
        disabled={otpValues.join('').length !== OTP_LENGTH || loading}
        onClick={handleAccountCreation}
        className="md:w-80 w-full bg-navy text-white mb-4 hover:bg-navyLight"
      >
        {loading && <Spinner className="text-white" />} Create My Account
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
