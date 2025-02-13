import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { subscriptionTiers } from '../../constants'
import { PricingCard } from './pricingCard'
import { SubscriptionTier } from '../../types'
import { useDashboardStore } from '../../state'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubscriptionSelect: (tier: SubscriptionTier) => void
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscriptionSelect,
}) => {
  const { subscription, populateSubscription } = useDashboardStore()

  const handleSubscriptionSelect = async (tier: SubscriptionTier) => {
    await populateSubscription()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto bg-white p-4 md:p-6">
        <button
          onClick={onClose}
          className="absolute right-2 md:right-4 top-2 md:top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="mt-4 md:mt-6">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-cirka mb-4">
              Everyone deserves access to the best
              <br className="hidden md:inline" />
              financial planning tools and advice
            </h1>

            <p className="text-gray-600 text-xs md:text-sm font-helvetica max-w-3xl mx-auto px-4 md:px-0">
              Whether you&apos;re a beginner just starting out, a seasoned
              investor, or a high-net-worth individual with complex needs, we
              have a plan tailored just for you. Our subscription tiers are
              designed to provide you with the guidance, tools, and insights
              necessary to take control of your financial future and build
              lasting wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {subscriptionTiers.map((tier) => (
              <PricingCard
                subscription={subscription}
                key={tier.name}
                tier={tier}
                onSubscribe={() => handleSubscriptionSelect(tier)}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
