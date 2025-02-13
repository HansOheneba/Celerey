import { Button } from "@/components/ui/button";
import { NavigationButtonsProps } from "../../types";

export const NavigationButtons = ({
  onBack,
  onContinue,
  showBack = true,
}: NavigationButtonsProps) => (
  <div className="w-full max-w-md mx-auto">
    <div
      className={`flex ${
        showBack ? "justify-between" : "justify-center"
      } gap-4 mb-4`}
    >
      {showBack && (
        <Button variant="outline" onClick={onBack} className="w-32">
          Back
        </Button>
      )}
      <Button onClick={onContinue} className="bg-navy text-white w-32">
        Continue
      </Button>
    </div>
    <div className="text-sm text-center text-gray-600">
      <span>Personal Information</span>
      <span className="mx-2">|</span>
      <span className="text-gray-400">Financial Information</span>
      <span className="mx-2">|</span>
      <span className="text-gray-400">Your Goals</span>
      <span className="mx-2">|</span>
      <span className="text-gray-400">Your Risk Profile</span>
    </div>
  </div>
);
