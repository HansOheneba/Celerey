import React from "react";
import { FinancialMetric } from "../../types";
import formatCurrency from "@/utils/formatCurrency";

interface MetricCardProps {
  title: string;
  metric: FinancialMetric;
  icon: React.ReactNode;
  currency: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  icon,
  currency
}) => {


  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-cirka text-navy font-medium">{title}</h3>
      </div>
      <p className="text-xl font-bold text-gray-900">
        {formatCurrency(metric?.value?.toString() || '0', currency)}
      </p>
    </div>
  );
};
