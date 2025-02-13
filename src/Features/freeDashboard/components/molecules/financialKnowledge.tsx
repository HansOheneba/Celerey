import React from "react";
import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

interface FinancialKnowledgeAssessmentProps {
  progress: number;
  onUpgradeClick: () => void
}

export const FinancialKnowledgeAssessment: React.FC<
  FinancialKnowledgeAssessmentProps
> = ({ progress, onUpgradeClick }) => {
  return (
    <Card className="p-6 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Financial Knowledge</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      <div className="space-y-4 mb-5">
        <p className="font-helvatica font-bold">
          Financial Knowledge Assessment
        </p>
        <button onClick={onUpgradeClick} className="bg-[#E15B2D] text-white rounded-md p-1 ml-auto mr-auto">
          Upgrade
        </button>
        <div className="font-helvatica font bold text-2xl">Incomplete</div>
      </div>

      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-3.5 mr-4">
          <div
            className="bg-[#281FBB] h-3.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-[#281FBB] font-medium">{progress}%</span>
      </div>
      <p className="text-gray-500 mt-5 font-helvatica text-sm">
        Take the full financial assessment with a{" "}
        <span className="text-blue-500 hover: text-undeline hover:cursor-pointer">
          Pro Account
        </span>
        . Get Started Today!
      </p>

      {/* Bottom Border */}
      <div className="border-b border-gray-200 mt-8 p-4 mb-10" />
    </Card>
  );
};
