import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RiskAttitudeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuidingPrinciple {
  title: string;
  description: string;
}

const RiskAttitudeModal: React.FC<RiskAttitudeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const guidingPrinciples: GuidingPrinciple[] = [
    {
      title: "Rational",
      description:
        "You have been very rational about investment opportunities and you only invest when you are certain about gaining some returns. You are generally not impulsive in your investment decision making. You check the data before proceeding.",
    },
    {
      title: "Informed",
      description:
        "You stay very informed because you are aware that some markets can be very volatile and you do your best to take advantage of those moves. You are also attentive to the macroeconomic factors of the.",
    },
  ];

  const router = useRouter();
  const handleAdvisors = () => {
    router.push("/advisors");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center text-3xl font-cirka font-normal">
            Risk Attitude Report
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="text-center mb-4">
            <h3 className="text-medium font-normal mb-2">Attitude Summary</h3>
            <p className="text-lg text-navyLight font-normal mb-4">
              Somewhat Aggressive
            </p>

            <div className="w-40 h-40 mx-auto mb-4">
              <Image
                src="/assets/riskAttitude.svg"
                alt="Risk attitude illustration"
                width={80}
                height={80}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="relative pl-6 mb-6">
            <div className="absolute left-0 top-0 h-full w-1 bg-navyLight" />
            <p className="text-gray-700 text-sm">
              The assessment indicates that your attitude towards risk is
              somewhat aggressive. This means you are conservative about your
              investments but are willing to take a risk when you really need
              to. This approach can be helpful in managing risk before making
              investment decisions.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-center mb-3">
              Your Key Investment Guiding Principles
            </h4>
            <div className="space-y-3">
              {guidingPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="flex items-center items-start gap-3"
                >
                  <Image
                    src="/assets/tick.png"
                    alt="tick"
                    width={20}
                    height={20}
                  />
                  <div>
                    <span className="font-semibold text-medium">
                      {principle.title}
                    </span>
                    {" - "}
                    <span className="text-gray-700 text-sm">
                      {principle.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <div className="flex justify-between gap-4 w-full sm:justify-center">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              onClick={handleAdvisors}
              className="flex-1 sm:flex-none bg-navy hover:bg-navyLight"
            >
              Talk With Advisor
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RiskAttitudeModal;
