import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDashboardStore } from '../../state'
import Spinner from '@/components/ui/spinner'

export interface ExpenseItem {
  id?: string
  category?: string
  amount?: number
  key?: string
  percentage?: string | number
  color?: string
}

interface EditExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (expenses: ExpenseItem[]) => void
  initialExpenses: ExpenseItem[]
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialExpenses,
}) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses)
  const [additionalExpenses, setAdditionalExpenses] = useState<
    Array<{
      category: string
      amount: string
    }>
  >([])

  const { updateBalance, loading } = useDashboardStore()

  useEffect(() => {
    setExpenses(initialExpenses)
  }, [initialExpenses])

  const handleAmountChange = (key: string, value: string) => {
    const updatedExpenses = expenses.map((item) =>
      item.key === key ? { ...item, amount: parseFloat(value) || 0 } : item,
    )
    setExpenses(updatedExpenses)
  }

  const handleAddExpense = () => {
    setAdditionalExpenses([...additionalExpenses, { category: '', amount: '' }])
  }

  const handleAdditionalExpenseChange = (
    index: number,
    field: 'category' | 'amount',
    value: string,
  ) => {
    const newAdditionalExpenses = [...additionalExpenses]
    newAdditionalExpenses[index] = {
      ...newAdditionalExpenses[index],
      [field]: value,
    }
    setAdditionalExpenses(newAdditionalExpenses)
  }

  const handleSubmit = async () => {
    try {
      await updateBalance(expenses, 'expense')
      onClose()
    } catch (error) {
      console.log('Error', error)
    }
    // const newExpenses = additionalExpenses
    //   .filter((exp) => exp.category && exp.amount)
    //   .map((exp) => ({
    //     category: exp.category,
    //     amount: parseFloat(exp.amount),
    //     percentage: 0,
    //     color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color
    //   }));

    // const updatedExpenses = [...expenses, ...newExpenses];
    // const total = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    // const finalExpenses = updatedExpenses.map((exp) => ({
    //   ...exp,
    //   percentage: Number(((exp.amount / total) * 100).toFixed(1)),
    // }));

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cirka font-semibold text-center">
            Edit Expense
          </DialogTitle>
          <DialogDescription className="text-center">
            Modify your expenses
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {expenses.map((expense, index) => (
            <div
              key={expense.category}
              className="flex justify-between items-center space-x-4"
            >
              <span className="text-sm text-gray-700">{expense.category}</span>
              <Input
                type="number"
                value={expense.amount}
                onChange={(e) => {
                  if (expense?.key) {
                    handleAmountChange(expense.key, e.target.value)
                  }
                }}
                className="w-[140px]"
              />
            </div>
          ))}
          {/* 
          {additionalExpenses.map((expense, index) => (
            <div
              key={index}
              className="flex justify-between items-center space-x-4"
            >
              <Input
                type="text"
                placeholder="Please Specify"
                value={expense.category}
                onChange={(e) =>
                  handleAdditionalExpenseChange(
                    index,
                    'category',
                    e.target.value,
                  )
                }
                className="flex-1"
              />
              <Input
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  handleAdditionalExpenseChange(index, 'amount', e.target.value)
                }
                className="w-[140px]"
              />
            </div>
          ))}

          <button
            onClick={handleAddExpense}
            className="text-indigo-600 text-sm flex items-center space-x-1"
          >
            <span>+</span>
            <span>Add Additional Expense(s)</span>
          </button> */}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose} className="w-[120px]">
            Back
          </Button>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-[120px] bg-[#1B1856] hover:bg-[#1B1856]/90"
          >
            {loading && <Spinner />} Modify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditExpenseModal
