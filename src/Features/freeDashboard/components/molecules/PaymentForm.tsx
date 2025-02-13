import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { SubscriptionTier } from '../../types'
import {
  Elements,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {
  createSubscriptionApi,
  getSubscriptionStatusApi,
} from '../../../userDashboard/service'
import Spinner from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

interface PaymentFormProps {
  selectedTier: SubscriptionTier | null
  onPaymentComplete: () => void
  onClose: () => void
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedTier,
  onPaymentComplete,
  onClose,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const elementStyles = {
    style: {
      base: {
        fontSize: '16px',
        color: '#333',
        '::placeholder': { color: '#A0AEC0' },
        fontFamily: 'inherit',
        padding: '10px',
      },
      invalid: { color: '#E53E3E' },
    },
  }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  // ✅ Track element completion in state
  const [isCardNumberComplete, setIsCardNumberComplete] = useState(false)
  const [isCardExpiryComplete, setIsCardExpiryComplete] = useState(false)
  const [isCardCvcComplete, setIsCardCvcComplete] = useState(false)

  const isButtonDisabled = !isCardNumberComplete || !isCardExpiryComplete || !isCardCvcComplete

  useEffect(() => {
    const cardNumberElement = elements?.getElement(CardNumberElement)
    const cardExpiryElement = elements?.getElement(CardExpiryElement)
    const cardCvcElement = elements?.getElement(CardCvcElement)

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) return

    // ✅ Event handler function
    const handleChange = (event: any, type: string) => {
      setErrorMessage('')
      if (type === 'cardNumber') setIsCardNumberComplete(event.complete)
      if (type === 'cardExpiry') setIsCardExpiryComplete(event.complete)
      if (type === 'cardCvc') setIsCardCvcComplete(event.complete)
    }

    cardNumberElement.on('change', (event) => handleChange(event, 'cardNumber'))
    cardExpiryElement.on('change', (event) => handleChange(event, 'cardExpiry'))
    cardCvcElement.on('change', (event) => handleChange(event, 'cardCvc'))

    return () => {
      cardNumberElement.off('change', (event) => handleChange(event, 'cardNumber'))
      cardExpiryElement.off('change', (event) => handleChange(event, 'cardExpiry'))
      cardCvcElement.off('change', (event) => handleChange(event, 'cardCvc'))
    }
  }, [elements])

  const handlePayment = async () => {
    if (!stripe || !elements || !selectedTier) return
    setLoading(true)

    const cardElement = elements.getElement(CardNumberElement)
    try {
      // 2️⃣ Create Payment Method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
      })

      if (error) {
        setErrorMessage(error?.message || '')
        setLoading(false)
        return
      }

      // 2️⃣ Send Payment Method to Backend
      const response = await createSubscriptionApi({
        plan: selectedTier.name.toLowerCase(),
        billing_interval:
          selectedTier.interval === 'yearly' ? 'yearly' : 'monthly',
        payment_method_id: paymentMethod.id,
      })

      if (!response.success) {
        setErrorMessage(response.message)
        setLoading(false)
        return
      }

      // 3️⃣ Confirm Payment Intent in Frontend
      const { error: confirmError } = await stripe.confirmCardPayment(
        response.data.client_secret,
      )

      if (confirmError) {
        setErrorMessage(confirmError?.message || '')
        setLoading(false)
        return
      }

      const subscriptionResponse = await getSubscriptionStatusApi()

      if (
        subscriptionResponse.data.status === 'active' ||
        subscriptionResponse.data.status === 'pending'
      ) {
        alert('Subscription Successful!')
        onPaymentComplete()
        onClose()
      } else {
        alert('Subscription Pending. Please check your email.')
      }

      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Subscription failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="space-y-4 text-left mb-6">
        {/* Card Number Field */}
        <div>
          <label className="block text-xs md:text-sm font-medium mb-1">
            Card Number
          </label>
          <div className="w-full p-2 text-sm md:text-base border rounded-md">
            <CardNumberElement options={elementStyles} />
          </div>
        </div>

        {/* Expiry Date & CVV Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium mb-1">
              Expiry Date
            </label>
            <div className="w-full p-2 text-sm md:text-base border rounded-md">
              <CardExpiryElement options={elementStyles} />
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium mb-1">
              CVV
            </label>
            <div className="w-full p-2 text-sm md:text-base border rounded-md">
              <CardCvcElement options={elementStyles} />
            </div>
          </div>
        </div>
      </div>

      {errorMessage && <p className='text-sm text-[#E53E3E] mb-2'>{errorMessage}</p>}

      <Button
        disabled={loading || isButtonDisabled}
        type="submit"
        onClick={handlePayment}
        className="w-[450px] bg-navy hover:bg-navyLight text-white"
      >
        {loading && <Spinner className="text-white" />}{' '}
        {loading ? 'Processing...' : `Pay $${selectedTier?.price}`}
      </Button>
    </div>
  )
}
