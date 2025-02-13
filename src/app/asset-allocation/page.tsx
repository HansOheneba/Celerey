import { AssetAllocationLayout } from "@/Features/assetAllocation/components/templates/assetAllocationLayout";
import AssetAllocationTemplate from "@/Features/assetAllocation/components/templates/assetAllocationTemplate";

export default function AssetAllocationPage() {
  const defaultProps = {
    userName: "Micheal",
    riskAttitude: "Somewhat Aggressive",
    netWorth: 103650.0,
    investmentExperience: "Advanced",
    riskAllocation: {
      low: 33,
      medium: 49,
      high: 17,
    },
  };

  return (
    <AssetAllocationLayout>
      <AssetAllocationTemplate {...defaultProps} />
    </AssetAllocationLayout>
  );
}
