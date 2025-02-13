import React, { useState, useEffect } from 'react'
import { differenceInCalendarMonths, parseISO } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  AddFinancialGoalModalProps,
  GoalFormData,
} from '../../types'
import { useDashboardStore } from '../../state'
import Spinner from '@/components/ui/spinner'

const CustomDatePicker: React.FC<{
  label: string
  value: string
  onChange: (date: string) => void
  placeholder?: string
  required?: boolean
}> = ({ label, value, onChange, placeholder, required }) => {
  const formattedValue = value
    ? new Date(value).toISOString().split('T')[0]
    : ''

  return (
    <div className="flex items-center justify-between space-x-4">
      <label className="text-gray-900 w-1/3">{label}</label>
      <div className="w-2/3">
        <input
          type="date"
          value={formattedValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent 
            placeholder-gray-400 appearance-none"
        />
      </div>
    </div>
  )
}

const AddFinancialGoalModal: React.FC<AddFinancialGoalModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isModifying = false,
}) => {
  const [goalId, setGoalId] = useState(initialData?.id || '')
  const [formData, setFormData] = useState<GoalFormData>(() => ({
    name: initialData?.name || '',
    targetAmount: (initialData?.type === 'emergency' ?initialData?.targetValue.split(' ')[0] : initialData?.targetValue.toString()) || '',
    currentAmount: (initialData?.type === 'emergency' ?initialData?.currentValue.split(' ')[0] : initialData?.currentValue.toString()) || '',
    durationStart: initialData?.startDate || '',
    durationEnd: initialData?.endDate || '',
    goalDuration: initialData?.duration?.toString() || '',
    durationLeft: initialData?.durationLeft?.toString() || '',
    type: initialData?.type || 'custom'
  }))

  const {
    loading,
    createFinancialGoal,
    updateFinancialGoal,
    setLoading
  } = useDashboardStore()

  // Calculate goal duration and duration left
  const calculateDurations = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return { goalDuration: '0', durationLeft: '0' }

    const start = parseISO(startDate)
    const end = parseISO(endDate)
    const now = new Date()

    const goalDuration = Math.max(0, differenceInCalendarMonths(end, start))
    const durationLeft = Math.max(0, differenceInCalendarMonths(end, now))

    return {
      goalDuration: goalDuration.toString(),
      durationLeft: durationLeft.toString(),
    }
  }

  // Reset form when modal opens or initial data changes
  useEffect(() => {
    if (isOpen) {
      const updatedFormData = {
        name: initialData?.name || '',
        targetAmount: (initialData?.type === 'emergency' ?initialData?.targetValue.split(' ')[0] : initialData?.targetValue.toString()) || '',
        currentAmount: (initialData?.type === 'emergency' ?initialData?.currentValue.split(' ')[0] : initialData?.currentValue.toString()) || '',
        durationStart: initialData?.startDate || '',
        durationEnd: initialData?.endDate || '',
        goalDuration: initialData?.duration?.toString() || '',
        durationLeft: initialData?.durationLeft?.toString() || '',
        type: initialData?.type || 'custom'
      }

      if (updatedFormData.durationStart && updatedFormData.durationEnd) {
        const { goalDuration, durationLeft } = calculateDurations(
          updatedFormData.durationStart,
          updatedFormData.durationEnd,
        )
        updatedFormData.goalDuration = goalDuration
        updatedFormData.durationLeft = durationLeft
      }

      setFormData(updatedFormData)
      setGoalId(initialData?.id || '')
      setLoading(false)
    }
  }, [isOpen, initialData])

  // Update durations when start or end dates change
  useEffect(() => {
    if (formData.durationStart && formData.durationEnd) {
      const { goalDuration, durationLeft } = calculateDurations(
        formData.durationStart,
        formData.durationEnd,
      )

      setFormData((prev) => ({
        ...prev,
        goalDuration,
        durationLeft,
      }))
    }
  }, [formData.durationStart, formData.durationEnd])

  const getCurrentValueLabel = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'Current Duration'
      case 'retirement':
        return 'Current Pension'
      case 'saving':
        return 'Current Savings'
      default:
        return 'Current Amount'
    }
  }

  const getTargetValueLabel = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'Target Duration'
      case 'retirement':
        return 'Target Pension'
      case 'saving':
        return 'Target Savings'
      default:
        return 'Target Amount'
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Get the form element
    const form = e.currentTarget

    if (!form.checkValidity()) {
      return
    }

    // validation for date comparison
    if (new Date(formData.durationStart) >= new Date(formData.durationEnd)) {
      alert('End date must be after start date')
      return
    }

    // validation for amounts
    const targetAmountNum = parseFloat(formData.targetAmount)
    const currentAmountNum = parseFloat(formData.currentAmount)

    if (currentAmountNum > targetAmountNum) {
      alert('Current amount cannot exceed target amount')
      return
    }

    const { goalDuration, durationLeft } = calculateDurations(
      formData.durationStart,
      formData.durationEnd,
    )

    const newGoal = {
      name: formData.name.trim(),
      target_value: parseFloat(formData.targetAmount).toString(),
      current_value: parseFloat(formData.currentAmount).toString(),
      start_date: new Date(formData.durationStart).toISOString(),
      end_date: new Date(formData.durationEnd).toISOString(),
      type: initialData?.type ||  'custom',
    }

    try {
      if (goalId) {
        await updateFinancialGoal(newGoal, goalId)
        setGoalId('')
      } else {
        await createFinancialGoal(newGoal)
      }
      onClose()
    } catch (error) {
      console.log('Error', error)
    }

    // onAddGoal(newGoal);
    // onClose();
  }

  // Prevent unintended modal closure
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-[500px] p-0 max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="px-8 py-4 space-y-2">
          <DialogTitle className="text-2xl text-center font-cirka">
            {isModifying
              ? `Modify ${initialData?.name}`
              : 'Add New Financial Goal'}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {isModifying
              ? `Update the details for your ${initialData?.name.toLowerCase()}`
              : 'Enter the details of your new financial goal'}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="px-8 pb-6 space-y-4"
          noValidate
        >
          {/* Goal Name Input */}
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">Name of goal</label>
            <Input
              placeholder="e.g., Saving for a new car"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-2/3 rounded-lg border-gray-200"
              disabled={isModifying}
              required
              minLength={1}
            />
          </div>

          {/* Target Amount Input */}
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">{getTargetValueLabel(initialData?.type || 'custom')}</label>
            <Input
              type="number"
              placeholder={ initialData?.type !== 'emergency' ? "e.g., 140000" : "e.g., 14"}
              value={formData.targetAmount}
              onChange={(e) =>
                setFormData({ ...formData, targetAmount: e.target.value })
              }
              className="w-2/3 rounded-lg border-gray-200"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Current Amount Input */}
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">{getCurrentValueLabel(initialData?.type || 'custom')}</label>
            <Input
              type="number"
              placeholder={ initialData?.type !== 'emergency' ? "e.g., 2000" : "e.g., 4"}
              value={formData.currentAmount}
              onChange={(e) =>
                setFormData({ ...formData, currentAmount: e.target.value })
              }
              className="w-2/3 rounded-lg border-gray-200"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Start Date Picker */}
          <CustomDatePicker
            label="Duration Start"
            value={formData.durationStart}
            onChange={(date) =>
              setFormData({ ...formData, durationStart: date })
            }
            placeholder="Select start date"
            required
          />

          {/* End Date Picker */}
          <CustomDatePicker
            label="Duration End"
            value={formData.durationEnd}
            onChange={(date) => setFormData({ ...formData, durationEnd: date })}
            placeholder="Select end date"
            required
          />

          {/* Goal Duration */}
          {/* <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">Goal Duration (months)</label>
            <Input
              type="number"
              value={formData.goalDuration}
              onChange={(e) => setFormData({ ...formData, goalDuration: e.target.value })}
              className="w-2/3 rounded-lg border-gray-200"
              required
              min="1"
            />
          </div> */}

          {/* Duration Left  */}
          {/* <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">Duration Left (months)</label>
            <Input
              type="number"
              value={formData.durationLeft}
              onChange={(e) => setFormData({ ...formData, durationLeft: e.target.value })}
              className="w-2/3 rounded-lg border-gray-200"
              required
              min="0"
            />
          </div> */}

          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="flex-1 rounded-lg bg-navy hover:bg-navyLight"
            >
              {loading && <Spinner />}{' '}
              {isModifying ? 'Save Changes' : 'Add Goal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddFinancialGoalModal
