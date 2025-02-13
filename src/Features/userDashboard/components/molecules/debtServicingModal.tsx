import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LiabilityItem } from '../../types'
import { useDashboardStore } from '../../state'
import Spinner from '@/components/ui/spinner'

interface DebtServicingModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (amount: number) => void
  currentDebtAmount?: number
  liabilities: LiabilityItem[]
  totalLiabilities: number
}

interface FormState {
  debtServicingAmount: string
}

const DebtServicingModal: React.FC<DebtServicingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentDebtAmount,
  liabilities = [],
  totalLiabilities = 0,
}) => {
  const [formState, setFormState] = React.useState<FormState>({
    debtServicingAmount: currentDebtAmount?.toString() || '',
  })

  useEffect(() => {
    setFormState({ debtServicingAmount: currentDebtAmount?.toString() || '' })
  }, [currentDebtAmount])

  const { loading, updateBalance } = useDashboardStore()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d*\.?\d*$/.test(value)) {
      setFormState((prev) => ({
        ...prev,
        debtServicingAmount: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(formState.debtServicingAmount)
    if (!isNaN(amount)) {
      try {
        await updateBalance(liabilities, 'liabilities', {
          estimation: {
            servicingAmount: amount,
            servicingPeriod:Number(Number(totalLiabilities / amount).toFixed(0)),
          },
        })
         onClose()
      } catch (error) {
        console.log('Error', error)
      }
    }
  }

  const formatCurrency = (value: string) => {
    const number = parseFloat(value)
    if (isNaN(number)) return ''
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-cirka text-navy text-2xl text-center font-normal">
            How much debt can you service every year?
          </DialogTitle>
          <p className="text-gray-600 text-sm text-center mt-2">
            Modify your debt servicing amount
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label
              htmlFor="debtServicingAmount"
              className="text-sm text-gray-600"
            >
              Debt Servicing Amount
            </label>
            <Input
              id="debtServicingAmount"
              type="text"
              value={formState.debtServicingAmount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg text-right"
              placeholder="0.00"
            />
            {formState.debtServicingAmount && (
              <p className="text-sm text-gray-600 text-right">
                {formatCurrency(formState.debtServicingAmount)}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="flex-1 bg-[#1B1856] hover:bg-[#1B1856]/90"
            >
              {loading && <Spinner />} Modify
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DebtServicingModal
