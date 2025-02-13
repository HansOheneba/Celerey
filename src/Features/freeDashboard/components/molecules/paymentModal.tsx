import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { SubscriptionTier } from '../../types'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe'
import { PaymentForm } from './PaymentForm'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTier: SubscriptionTier | null
  onPaymentComplete: () => void
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onPaymentComplete,
}) => {
  
  const [stripePromise, setStripePromise]: any = useState(null)

  useEffect(() => {
    getStripe().then(setStripePromise)
  }, [])


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="sm:max-w-[500px] w-[95vw] bg-white p-4 md:p-6 rounded-xl">
        <button
          onClick={onClose}
          className="absolute right-2 md:right-4 top-2 md:top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-cirka mb-4">
            Complete Your Payment
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            You are subscribing to {selectedTier?.name} plan at $
            {selectedTier?.price}/year
          </p>

          {stripePromise && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                selectedTier={selectedTier}
                onPaymentComplete={onPaymentComplete}
                onClose={onClose}
              />
            </Elements>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
