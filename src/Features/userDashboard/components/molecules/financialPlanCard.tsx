import React from "react";
import { FinancialPlan } from "../../types";

interface FinancialPlanCardProps {
  plan: FinancialPlan;
}

export const FinancialPlanCard: React.FC<FinancialPlanCardProps> = ({
  plan,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">{plan.name}</h3>
        <button className="text-navy text-sm hover:text-navyLight">
          Modify
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{plan.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-navy rounded-full"
              style={{ width: `${plan.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Current Amount</p>
            <p className="font-medium">
              ${plan.currentAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Duration Start</p>
            <p className="font-medium">
              {new Date(plan.durationStart).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Target Amount</p>
            <p className="font-medium">${plan.targetAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Duration End</p>
            <p className="font-medium">
              {new Date(plan.durationEnd).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Goal Duration</p>
            <p className="font-medium">{plan.goalDuration} months</p>
          </div>
          <div>
            <p className="text-gray-600">Duration Left</p>
            <p className="font-medium">{plan.durationLeft} months</p>
          </div>
        </div>
      </div>
    </div>
  );
};
