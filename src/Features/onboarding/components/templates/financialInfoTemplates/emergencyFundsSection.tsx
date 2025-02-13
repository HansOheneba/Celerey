import React, { useState, useEffect } from 'react'
import { Modal } from '@/Features/onboarding/components/molecules/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type EmergencyFundsDataType = {
  emergencyFund: {
    hasEmergencyFunds?: string
    emergencyFundAmount?: string
    targetMonths?: string
  }
}

interface EmergencyFundsSectionProps {
  onChange: (field: string, value: string) => void
  isComplete?: boolean
  isNextSectionComplete?: boolean
  values: any
}

const EmergencyFundsSection: React.FC<EmergencyFundsSectionProps> = ({
  onChange,
  isNextSectionComplete,
  values,
}) => {
  const [inputValue, setInputValue] = useState<EmergencyFundsDataType>({
    emergencyFund: {
      hasEmergencyFunds: values.hasEmergencyFunds ? 'yes' : 'no',
      emergencyFundAmount: values.emergencyFundAmount?.split(' ')[0],
      targetMonths: values.targetMonths?.split(' ')[0],
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emergencyFundAmountValid, setEmergencyFundAmountValid] = useState(true)
  const [targetMonthsValid, setTargetMonthsValid] = useState(true)

  useEffect(() => {
    if (inputValue.emergencyFund?.emergencyFundAmount !== undefined) {
      setEmergencyFundAmountValid(
        /^\d*$/.test(inputValue.emergencyFund.emergencyFundAmount),
      )
    }
    if (inputValue.emergencyFund?.targetMonths !== undefined) {
      setTargetMonthsValid(/^\d*$/.test(inputValue.emergencyFund.targetMonths))
    }
  }, [
    inputValue.emergencyFund?.emergencyFundAmount,
    inputValue.emergencyFund?.targetMonths,
  ])

  useEffect(() => {
    if (
      isModalOpen &&
      values.hasEmergencyFunds &&
      values.emergencyFundAmount &&
      values.targetMonths
    ) {
      setInputValue({
        emergencyFund: {
          hasEmergencyFunds: values.hasEmergencyFunds ? 'yes' : 'no',
          emergencyFundAmount: values.emergencyFundAmount?.split(' ')[0],
          targetMonths: values.targetMonths?.split(' ')[0],
        },
      })
    }
  }, [isModalOpen])

  const handleEmergencyFundAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const emergencyFundAmountValue = e.target.value
    if (/^\d*$/.test(emergencyFundAmountValue)) {
      const updatedValue = {
        ...inputValue,
        emergencyFund: {
          ...inputValue.emergencyFund,
          emergencyFundAmount: emergencyFundAmountValue,
        },
      }
      setInputValue(updatedValue)
      onChange(
        'emergencyFundAmount',
        updatedValue.emergencyFund.emergencyFundAmount,
      )
    }
  }

  const handleTargetMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetMonthsValue = e.target.value
    if (/^\d*$/.test(targetMonthsValue)) {
      const updatedValue = {
        ...inputValue,
        emergencyFund: {
          ...inputValue.emergencyFund,
          targetMonths: targetMonthsValue,
        },
      }
      setInputValue(updatedValue)
      onChange('targetMonths', updatedValue.emergencyFund.targetMonths)
    }
  }

  const handleHasEmergencyFundsChange = (value: 'yes' | 'no') => {
    const updatedValue = {
      ...inputValue,
      emergencyFund: {
        ...inputValue.emergencyFund,
        hasEmergencyFunds: value,
        emergencyFundAmount:
          value === 'no' ? '' : inputValue.emergencyFund.emergencyFundAmount,
        targetMonths:
          value === 'no' ? '' : inputValue.emergencyFund.targetMonths,
      },
    }
    setInputValue(updatedValue)
    onChange('hasEmergencyFunds', value)
  }

  const isComplete =
    inputValue?.emergencyFund?.hasEmergencyFunds !== '' &&
    inputValue.emergencyFund?.emergencyFundAmount !== '' &&
    inputValue.emergencyFund?.targetMonths !== ''

  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${
              isComplete
                ? 'bg-blue-900 text-white'
                : 'bg-white border-blue-900 border text-blue-900'
            }`}
          >
            2
          </div>
          <h3 className="font-medium">Emergency Funds</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-800 text-sm font-semibold"
        >
          {isComplete ? 'Edit' : 'Fill Details'}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="What are your emergency fund details?"
        description="Enter your emergency fund details below."
        sectionNumber={2}
        sectionTitle="Emergency Funds"
        nextSectionTitle="Retirement"
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-4">
          <div className="flex flex-col border-gray-300 pb-4 items-center">
            <label className="flex-1 text-center pb-3">
              Have you saved up to cover some living expenses for a duration?
            </label>
            <div className="flex-1 w-2/3 flex gap-4">
              <Button
                variant={'outline'}
                className={`flex-1 px-4 py-2 rounded-md font-medium ${
                  inputValue.emergencyFund.hasEmergencyFunds === 'no'
                    ? 'bg-navy text-white'
                    : 'border border-gray-300'
                }`}
                onClick={() => handleHasEmergencyFundsChange('no')}
              >
                No
              </Button>
              <Button
                variant={'outline'}
                className={`flex-1 px-4 py-2 rounded-md font-medium ${
                  inputValue.emergencyFund.hasEmergencyFunds === 'yes'
                    ? 'bg-navy text-white'
                    : 'border border-gray-300'
                }`}
                onClick={() => handleHasEmergencyFundsChange('yes')}
              >
                Yes
              </Button>
            </div>
          </div>

          {inputValue.emergencyFund.hasEmergencyFunds === 'yes' && (
            <>
              <div className="flex border-b border-gray-300 pb-4 items-center">
                <label className="flex-1">Months of living expenses saved</label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="flex-1 appearance-none"
                  value={inputValue.emergencyFund?.emergencyFundAmount || ''}
                  onChange={handleEmergencyFundAmountChange}
                />
              </div>
              <div className="flex border-b border-gray-300 pb-4 items-center">
                <label className="flex-1">Target Duration (Months)</label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="flex-1 appearance-none"
                  value={inputValue.emergencyFund?.targetMonths || ''}
                  onChange={handleTargetMonthsChange}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false)
            }}
            className="flex-1 bg-navy hover:bg-navyLight text-white"
            disabled={!isComplete}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export { EmergencyFundsSection }