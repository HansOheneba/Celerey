import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { useAuthStore } from '@/Features/auth/state'
import { useOnboardingStore } from '@/Features/onboarding/state'
import React, { useEffect, useState } from 'react'

interface NetWorthScreenProps {
  onContinue: () => void
  onBack: () => void
}

export const SubmitScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
  const [firstName, setFirstName] = useState<string | null>(null)
  const { formData, saveRiskInfo, loading } = useOnboardingStore()
  const { user } = useAuthStore()

  useEffect(() => {
    // Fetch the state from local storage
    const storedState = localStorage.getItem('onboarding-storage')
    if (storedState) {
      const parsedState = JSON.parse(storedState)
      setFirstName(parsedState.state?.formData?.personal?.firstName || null)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      await saveRiskInfo()
      onContinue()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-cirka mb-6">
        Thanks
        <span className="text-navyLight"> {(user?.firstName + ' ' + user?.lastName) || 'User'}</span>, from the
        assessment based on the answers, &nbsp;
        <span className="text-navyLight">
          your attitube to risk is: <br />
          <span className="capitalize">{formData.risk?.userRiskTolerance?.title || ''}</span>
        </span>
      </h1>
      <p className=" mb-12 font-helvetica text-sm">
        You seek to take on moderate risk for the opportunity of higher returns.
        You are willing to explore investment options with slightly higher risk
        levels. This is our assessment based on your responses.
      </p>
      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          disabled={loading}
          type="submit"
          className="flex-1 bg-navy hover:bg-navyLight text-white"
        >
          {loading && <Spinner />} Submit
        </Button>
      </div>
    </form>
  )
}
