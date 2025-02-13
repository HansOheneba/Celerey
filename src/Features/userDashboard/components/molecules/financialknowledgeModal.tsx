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

interface FinancialKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuidingPrinciple {
  title: string;
  description: string;
}

const FinancialKnowledgeModal: React.FC<FinancialKnowledgeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const guidingPrinciples: GuidingPrinciple[] = [
    {
      title: "Fundamental Analysis",
      description:
        "You already have a good understanding of how a lot of things work in the world of finance. We can help you to get even better at understanding what moves the markets.",
    },
    {
      title: "Financial Market Insights",
      description:
        "We know you are busy and we hate to waste your time so we will send you a brief summary about relevant",
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
          <DialogTitle className="text-center text-3xl font-cirka text-navy font-normal">
            Financial Knowledge Report
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="text-center mb-4">
            <h3 className="text-medium font-normal mb-2">
              Financial Knowledge Summary
            </h3>
            <p className="text-lg text-navy font-normal mb-4">Intermediate</p>

            <div className="w-40 h-40 mx-auto mb-4">
              <Image
                src="/assets/finiancial.svg"
                alt="Risk attitude illustration"
                width={80}
                height={80}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="relative pl-6 mb-6">
            <div className="absolute left-0 top-0 h-full w-1 bg-navy" />
            <p className="text-navy text-sm">
              The assessment indicates that your financial knowledge is at the
              <span className="text-bold"> intermediate</span> level. This
              indicates that you have a fair grasp of finance. Although you are
              not an expert, you understand how macroeconomics play a key role
              and influence in a lot of financial instruments. You have a good
              appreciation of sentimental analysis which has been very helpful
              to you in the past
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

export default FinancialKnowledgeModal;
