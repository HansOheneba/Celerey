"use client";

import { AssetAllocationLayout } from "@/Features/assetAllocation/components/templates/assetAllocationLayout";
import { SubscriptionTemplate } from "@/Features/assetAllocation/components/templates/subscriptionTemplate";

export default function SubscriptionPage() {
  return (
    <AssetAllocationLayout>
      <SubscriptionTemplate />
    </AssetAllocationLayout>
  );
}
