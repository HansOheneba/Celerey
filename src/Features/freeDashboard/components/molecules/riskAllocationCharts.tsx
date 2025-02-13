import React from "react";
import { Card } from "@/components/ui/card";
import { Home, MoreHorizontal, TrendingUp } from "lucide-react";
import { ApexOptions } from "apexcharts";
import { ChartType } from "../../types";

interface RiskAllocationProps {
  Chart: ChartType;
}

export const RiskAllocation: React.FC<RiskAllocationProps> = ({ Chart }) => {
  const riskData = [
    { label: "Low", value: 33, color: "#4CAF50" },
    { label: "Medium", value: 49, color: "#FFA726" },
    { label: "High", value: 17, color: "#EF5350" },
  ];

  const getChartOptions = (color: string): ApexOptions => ({
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    colors: [color],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "55%",
        },
        track: {
          background: "#f5f5f5",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "14px",
            fontFamily: "Helvetica",
            formatter: function (val: number) {
              return `${val}%`;
            },
          },
        },
      },
    },
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Risk Allocation</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {riskData.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <React.Suspense
              fallback={
                <div className="h-20 w-20 animate-pulse bg-gray-100 rounded-full" />
              }
            >
              <Chart
                options={getChartOptions(item.color)}
                series={[item.value]}
                type="radialBar"
                height={100}
                width={100}
              />
            </React.Suspense>
            <span className="mt-2 text-sm font-helvetica text-gray-600">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-[#AAAAAA] pb-2">
        <div className="flex items-center py-3 border-b pt-4 border-[#AAAAAA]">
          <Home className="h-5 w-5 text-gray-400 mr-3" />
          <span className="text-gray-700">Real Estate</span>
          <span className="ml-auto font-medium">$980,000</span>
        </div>
        <div className="flex items-center py-3">
          <TrendingUp className="h-5 w-5 text-gray-400 mr-3" />
          <span className="text-gray-700">Fixed Income</span>
          <span className="ml-auto font-medium">$200,000</span>
        </div>
      </div>
    </Card>
  );
};
