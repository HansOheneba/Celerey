import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useOnboardingStore } from '@/Features/onboarding/state'
import Spinner from '@/components/ui/spinner'

interface TargetAmountScreenProps {
  values: {
    targetAmount: string
  }
  onBack: () => void
  onContinue: () => void
  onChange: (field: string, value: string) => void
}

export const TargetAmountScreen: React.FC<TargetAmountScreenProps> = ({
  values,
  onChange,
  onContinue,
  onBack,
}) => {
  const { loading, saveGoalsInfo } = useOnboardingStore()

  const isComplete = values.targetAmount !== ''

  const handleInputChange = (field: 'targetAmount', value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value)
    }
  }

  const handleContinue = async () => {
    try {
      await saveGoalsInfo()
      onContinue()
    }catch(error) {
      console.log("Error", error)
    }

  }

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cirka mb-4">
          What is your target amount for this goal
        </h1>
        <p className="text-gray-600">Target amount for financial goal</p>
      </div>
      <div className="space-y-4 mb-12">
        <div className="flex border-b border-gray-300 pb-4 items-center">
          <label className="flex-1">Specify target amount</label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="flex-1 appearance-none"
            value={values.targetAmount || ''}
            onChange={(e) => {
              handleInputChange('targetAmount', e.target.value)
            }}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          
          onClick={handleContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!isComplete || loading}
        >
          {loading && <Spinner />} Continue
        </Button>
      </div>
    </div>
  )
}
