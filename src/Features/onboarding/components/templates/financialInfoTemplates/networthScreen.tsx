import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/Features/auth/state'
import { useOnboardingStore } from '@/Features/onboarding/state'
import formatCurrency from '@/utils/formatCurrency'
import React, { useEffect, useState } from 'react'

interface NetWorthScreenProps {
  onContinue: () => void
  onBack: () => void
}

export const NetWorthScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
  const { formData } = useOnboardingStore()
  const { user } = useAuthStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContinue()
  }

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-6">
        Thank You
        <span className="text-navyLight">
          {' '}
          {user?.firstName + ' ' + user?.lastName || 'User'}
        </span>
        , based on the information submitted we estimate your net worth to be{' '}
        <span className="text-navyLight">
          {formatCurrency(formData?.financial?.netWorth || '0', 'usd')}
        </span>
      </h1>
      {/* <p className=" mb-12 font-helvetica text-sm">
        Does this look right? If not, please go back and make some adjustments.
      </p> */}
      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-navy hover:bg-navyLight text-white"
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
