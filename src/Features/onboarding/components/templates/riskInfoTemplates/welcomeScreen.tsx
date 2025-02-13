import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/Features/auth/state";
import React, { useEffect, useState } from "react";

interface WelcomeScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const WelcomeScreen = ({ onContinue, onBack }: WelcomeScreenProps) => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const {user} = useAuthStore()

  useEffect(() => {
    // Fetch the state from local storage
    const storedState = localStorage.getItem("onboarding-storage");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setFirstName(parsedState.state?.formData?.personal?.firstName || null);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-6">
        Thank You
        <span className="text-navyLight"> {(user?.firstName) || "User"}</span>, to identify the best way for you to reach your goals, we
        need to understand your attitude to risk shall we begin?
      </h1>
      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-navy hover:bg-navyLight text-white"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
