import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useAuthStore } from "@/Features/auth/state";
import { useOnboardingStore } from "@/Features/onboarding/state";
import React, { useEffect, useState } from "react";

interface NetWorthScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const SubmitScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const { formData, saveRiskInfo, loading } = useOnboardingStore();
  const { user } = useAuthStore();

  useEffect(() => {
    // Fetch the state from local storage
    const storedState = localStorage.getItem("onboarding-storage");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setFirstName(parsedState.state?.formData?.personal?.firstName || null);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await saveRiskInfo();
      onContinue();
    } catch (error) {
      console.log(error);
    }
  };

  // Define risk descriptions based on the user's selection
  const riskKey = formData.risk?.userRiskTolerance?.key || "";
  const riskDescriptions: Record<string, string> = {
    low: "You prioritize stability and prefer lower-risk investments to protect your capital, even if it means smaller returns.",
    medium:
      "You're open to a balance of risk and reward, willing to accept some volatility for the opportunity of higher returns.",
    high: "You're comfortable with taking on significant risk in pursuit of maximum potential gains, even if it means experiencing market fluctuations.",
  };

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-cirka mb-6">
        Thanks,
        <span className="text-navyLight"> {user?.firstName || "User"}</span>.
        Based on your responses, &nbsp;
        <span className="text-navyLight">
          your risk tolerance is: <br />
          <span className="capitalize">{riskKey}</span>
        </span>
      </h1>
      <p className="mb-12 font-helvetica text-sm">
        {riskDescriptions[riskKey] ||
          "We couldn't determine your risk preference. Please review your answers."}
      </p>
      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          disabled={loading}
          type="submit"
          className="flex-1 bg-navy hover:bg-navyLight text-white"
        >
          {loading && <Spinner />} Submit
        </Button>
      </div>
    </form>
  );
};
