import React from "react";
import { SubscriptionTier } from "../../types";
import { FeaturesList } from "./featureList";

interface PricingCardProps {
  tier: SubscriptionTier;
  // onSubscribe: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  // onSubscribe,
}) => {
  return (
    <div
      className={`bg-[#F4F5F6] ${
        tier.isPopular ? "border border-navy" : "border-transparent"
      } text-[#242424] rounded-lg p-4 md:p-6 flex flex-col h-full relative`}
    >
      <div className="mb-4 md:mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl text-[#242424] font-semibold font-cirka mb-2">
            {tier.name}
          </h3>
          {/* Popular Badge */}
          {tier.isPopular && (
            <div className="bg-navy text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </div>
          )}
        </div>

        <p className="text-xs md:text-sm text-[#242424] font-circa mb-2">
          {tier.description}
        </p>
        <p className="text-xs md:text-xs text-navy font-circa italic">
          {tier.idealCustomer}
        </p>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl md:text-3xl font-bold">
            ${tier.price.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm text-[#242424]">
            (${tier.pricePerMonth}/month)
          </div>
        </div>
        <div className="text-xs md:text-sm text-[#242424]">Per year</div>
      </div>

      <div>
        <button
          // onClick={onSubscribe}
          className={`w-full rounded-md py-2 px-4 text-sm md:text-base transition-colors bg-[#F4F5F6] border border-navy text-navy hover:bg-navy hover:text-white`}
          disabled={tier.isCurrentPlan}
        >
          {tier.buttonText}
        </button>
      </div>

      <div className="border-t">
        <h4 className="font-semibold mt-4 md:mt-5 text-[#242424] mb-3 md:mb-4 text-sm md:text-base">
          Features
        </h4>
        <p className="font-helvatica text-[#242424] mt-2 text-xs md:text-sm mb-3 md:mb-4">
          {tier.intro}
        </p>
        <FeaturesList features={tier.features} />
      </div>
    </div>
  );
};
