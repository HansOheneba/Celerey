import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionTier: string;
}

export const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
  subscriptionTier,
}) => {
  const features = [
    {
      title: "WhatsApp only channel",
      description: "Seamless WhatsApp Channel.",
    },
    {
      title: "Conversational flow customization",
      description: "Tailored Conversational Flows.",
    },
    {
      title: "Risk profile categorisation",
      description: "",
    },
    {
      title: "Basic Robo-advisory on financial health (no visualisation)",
      description: "Foundational Financial Health Robo-Advisory.",
    },
    {
      title: "Basic recommended asset allocation (no visualisation)",
      description: "Foundational Asset Allocation Recommendation.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="max-w-4xl bg-white p-4 md:p-8 rounded-2xl w-[95vw] md:w-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-10 p-2 md:p-5 items-center">
          {/* Trophy Image */}
          <div className="flex justify-center mb-6 md:mb-0">
            <div className="relative w-32 h-32 md:w-48 md:h-48 bg-[#E6FBF8] rounded-full flex items-center justify-center">
              <Image
                src="/assets/trophy.png"
                alt="Trophy"
                width={120}
                height={120}
                className="object-contain w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </div>

          {/* Congratulations Text */}
          <div className="p-2 md:p-5 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-cirka text-[#1E1B4B] mb-4">
              Congratulations!
            </h2>

            {/* Subscription Details */}
            <p className="text-sm md:text-base text-gray-800 mb-6 font-helvetica">
              You just subscribed to the{" "}
              <span className="text-[#6938EF] font-semibold">
                Celerey {subscriptionTier} Account
              </span>
              . This subscription includes (but is not limited to):
            </p>

            {/* Features List */}
            <div className="text-left space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">
                      {feature.title}
                    </p>
                    {feature.description && (
                      <p className="text-gray-600 text-xs md:text-sm">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
