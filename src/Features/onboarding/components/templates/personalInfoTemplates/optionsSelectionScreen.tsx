import { Button } from "@/components/ui/button";
import { BaseScreenProps, Option } from "../../../types";
import { OptionCard } from "../../molecules/optionCard";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { useAuthStore } from "@/Features/auth/state";
import Spinner from "@/components/ui/spinner";

export interface OptionsSelectionScreenProps extends BaseScreenProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const OPTIONS: Option[] = [
  {
    id:0,
    key: "financial-planning",
    title: "Financial Planning",
    description: "Improve my finances",
  },
  {
    id:1,
    key: "investing",
    title: "Investing",
    description: "Expert guidance on how to invest my money",
  },
  {
    id:2,
    key: "real-estate",
    title: "Real Estate",
    description: "Guidance on acquiring real estate",
  },
  {
    id:3,
    key: "mortgage",
    title: "Mortgage",
    description: "Getting a mortgage that suits my circumstances",
  },
  { id:4,
    key: "debt",
    title: "Debt",
    description: "Restructure my debt",
  },
  { id:5,
    key: "retirement",
    title: "Retirement",
    description: "Help me plan for my retirement",
  },
  { id:6,
    key: "tax-planning",
    title: "Tax Planning",
    description: "Strategize and optimize my taxes",
  },
];

export const OptionsSelectionScreen: React.FC<OptionsSelectionScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {


  const { loading, saveProfileInfo, formData, setLoading } = useOnboardingStore()
  const { user, setUser } = useAuthStore()



  const handleContinue = async () => {
    setLoading(true)
    if (user?.userId) {
      await saveProfileInfo(formData.personal)
      await setUser()
      onContinue()
    }
    setLoading(false)
  }

  const handleOptionToggle = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];
    onChange(newValue);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        Thanks for submitting your personal details. What are your areas of interest?
      </h1>

      <p className="text-gray-600 mb-8">
        How can we help you, choose an option(s)
      </p>

      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value.includes(option.key)}
            onClick={() => handleOptionToggle(option.key)}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          
          onClick={handleContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={value.length === 0 || loading}
        >
          {loading && <Spinner className="text-white" />} Continue
          </Button>
      </div>
    </div>
  );
};
