import * as React from "react";
import { Button } from "@/components/ui/button";
import { OptionCard } from "@/Features/onboarding/components/molecules/knowledgeOptionCard";
import { KnowledgeInfoSchema } from "@/Features/onboarding/schema";

interface PageProps {
  value: KnowledgeInfoSchema;
  onChange: (updates: Partial<KnowledgeInfoSchema>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const QUESTIONS = [
  {
    id: "investmentGradeBondsExperience",
    question:
      "How much investing experience do you have with investment grade bonds?",
    options: [
      { id: "none", value: "None" },
      { id: "1-3", value: "1 to 3 years" },
      { id: "over3Years", value: "More Than 3 Years" },
    ],
  },
  {
    id: "nonInvestmentGradeBondsKnowledge",
    question:
      "How much knowledge do you have about non-investment grade bonds?",
    options: [
      { id: "none", value: "None" },
      { id: "basic", value: "Basic" },
      { id: "informed", value: "Informed" },
    ],
  },
  {
    id: "nonInvestmentGradeBondsExperience",
    question:
      "How much investing experience do you have with non-investment grade bonds?",
    options: [
      { id: "none", value: "None" },
      { id: "1-3", value: "1 to 3 years" },
      { id: "over3Years", value: "More Than 3 Years" },
    ],
  },
  {
    id: "collectiveInvestmentsInstrumentsKnowledge",
    question:
      "How much knowledge do you have about collective investment instruments, such as funds?",
    options: [
      { id: "none", value: "None" },
      { id: "basic", value: "Basic" },
      { id: "informed", value: "Informed" },
    ],
  },
  {
    id: "collectiveInvestmentsInstrumentsExperience",
    question:
      "How much experience do you have with collective investment instruments, such as funds?",
    options: [
      { id: "none", value: "None" },
      { id: "1-3", value: "1 to 3 years" },
      { id: "over3Years", value: "More Than 3 Years" },
    ],
  },
];

export const Page2: React.FC<PageProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const handleOptionSelect = (questionId: string, optionId: string) => {
    onChange({ [questionId]: optionId });
  };

  const allQuestionsAnswered = QUESTIONS.every(
    (question) => value[question.id]
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl text-center font-cirka pb-5 border-b">
        Financial Knowledge and Experience
      </h1>

      {QUESTIONS.map((question) => (
        <div
          key={question.id}
          className="flex flex-col md:flex-row gap-4 border-b py-3 mb-3 items-center"
        >
          <h2 className="flex-1 font-helvetica text-center md:text-left">
            {question.question}
          </h2>
          <div className="flex-1 flex gap-4 items-end">
            {question.options.map((option) => (
              <OptionCard
                key={option.id}
                question={option.value}
                selected={value[question.id] === option.id}
                onClick={() => handleOptionSelect(question.id, option.id)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!allQuestionsAnswered}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
