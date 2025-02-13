'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SocialLoginButton } from '../molecules/socialLoginButton'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../state'
import Spinner from '@/components/ui/spinner'

export const SignInTemplate = () => {
  const [email, setEmail] = useState('')
  const { sendOTP, loading } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await sendOTP(email)
    if (success) {
      router.push('/auth/otp')
    }
  }

  const handleSignup = () => {
    router.push('/auth/signup')
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
        <h1 className="text-4xl font-cirka font-light mt-4 mb-2">Sign In</h1>
        <p className="text-sm text-gray-600 font-helvetica">
          New to Celerey?{' '}
          <a
            onClick={handleSignup}
            className="text-navyLight hover:cursor-pointer hover:text-navy hover:underline"
          >
            Get Started
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter Email address or Mobile No."
          className="w-full p-3 border mb-4 rounded-md focus:border-navy focus:ring-1 focus:ring-navy"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          disabled={!email || loading}
          type="submit"
          className="w-[450px] bg-navy hover:bg-navyLight text-white"
        >
          {loading && <Spinner className="text-white" />} Continue
        </Button>
      </form>
{/* 
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-sm mb-6 mt-6">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div> */}
{/* 
      <div className="space-y-3">
        <SocialLoginButton provider="google" onClick={() => {}} />
        <SocialLoginButton provider="linkedin" onClick={() => {}} />
      </div>

      <p className="mt-6 text-sm hover:cursor-pointer hover:text-navy hover:underline text-navyLight">
        Need help signing in?
      </p> */}
    </div>
  )
}
