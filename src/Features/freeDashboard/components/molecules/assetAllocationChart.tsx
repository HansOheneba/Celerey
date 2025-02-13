import React from "react";
import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { ApexOptions } from "apexcharts";
import { ChartType } from "../../types";

interface AssetAllocationProps {
  Chart: ChartType;
}

export const AssetAllocation: React.FC<AssetAllocationProps> = ({ Chart }) => {
  const assets = [
    { name: "Cash", value: 300000, color: "#6B4EFF" },
    { name: "Credit Card", value: 200000, color: "#4CAF50" },
    { name: "Bonds", value: 250000, color: "#FF9800" },
    { name: "Car Loan", value: 150000, color: "#FFB547" },
    { name: "Real Estate", value: 300000, color: "#FF5722" },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    colors: assets.map((asset) => asset.color),
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Total Assets", "Total Liabilities"],
      labels: {
        show: true,
        style: {
          colors: ["#64748B", "#64748B"],
          fontSize: "14px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return `$${(val / 1000000).toFixed(1)}m`;
        },
        style: {
          colors: "#64748B",
          fontSize: "14px",
        },
      },
      min: 0,
      max: 1200000,
      tickAmount: 2,
    },
    grid: {
      show: true,
      borderColor: "#f3f4f6",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    legend: {
      position: "right",
      horizontalAlign: "left",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      markers: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        width: 8,
        height: 8,
      },
      itemMargin: {
        vertical: 8,
        horizontal: 12,
      },
    },
  };

  const series = assets.map((asset) => ({
    name: asset.name,
    data: [asset.value, asset.value * 0.3],
  }));

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-[#1C1F33]">Asset Allocation</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400" />
      </div>

      <div className="h-[280px]">
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height="100%"
        />
      </div>
    </Card>
  );
};
