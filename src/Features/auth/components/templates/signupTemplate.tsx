'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SocialSignupButton } from '../molecules/socialSignupButton'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../state'
import Spinner from '@/components/ui/spinner'

export const SignUpTemplate = () => {
  const [email, setEmail] = useState('')

  const router = useRouter()
  const { sendOTP, loading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await sendOTP(email)
    if (success) {
      router.push('/auth/signup-otp')
    }
  }

  const handleSignup = () => {
    router.push('/auth/signin')
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
        <h1 className="text-4xl font-cirka font-light mt-4 mb-2">
          Create your Celerey Account
        </h1>
        <p className="text-sm text-gray-600 font-helvetica">
          Enter your email address and we will send you a code to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter Email address"
          className="w-full p-3 border mb-2 rounded-md focus:border-navy focus:ring-1 focus:ring-navy"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          disabled={!email || loading}
          type="submit"
          className="md:w-[450px] w-full bg-navy hover:bg-navyLight text-white"
        >
          {loading && <Spinner className="text-white" />} Send Me a Code
        </Button>
      </form>

      {/* <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-sm mb-6 mt-6">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      <div className="space-y-3">
        <SocialSignupButton provider="google" onClick={() => {}} />
        <SocialSignupButton provider="linkedin" onClick={() => {}} />
      </div> */}

      <p className="mt-6 text-sm">
        <span className="text-navy">Already have an account ?</span>{" "}
        <span
          onClick={handleSignup}
          className="text-navyLight hover:cursor-pointer hover:underline "
        >
          Sign in
        </span>
      </p>
    </div>
  );
}
