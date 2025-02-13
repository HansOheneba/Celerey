"use client";
import { use } from "react";
import { AdvisorDetailsTemplate } from "@/Features/userDashboard/components/templates/advisorDetailTemplate";
import { DUMMY_ADVISORS } from "@/Features/userDashboard/constants";
import { DashboardLayout } from "@/Features/userDashboard/components/templates/dashboardLayout";

interface AdvisorPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DEFAULT_USER_DATA = {
  userName: "Jude",
  netWorth: 103550.0,
  riskAttitude: "Low",
  investmentExperience: "Beginner",
  profileCompletion: 40,
};

export default function AdvisorPage({ params }: AdvisorPageProps) {
  const unwrappedParams = use(params);
  const advisor = DUMMY_ADVISORS.find((a) => a.id === unwrappedParams.id);

  if (!advisor) {
    return null;
  }

  return (
    <DashboardLayout>
      <AdvisorDetailsTemplate
        advisor={advisor}
        userName={DEFAULT_USER_DATA.userName}
        netWorth={DEFAULT_USER_DATA.netWorth}
        riskAttitude={DEFAULT_USER_DATA.riskAttitude}
        investmentExperience={DEFAULT_USER_DATA.investmentExperience}
      />
    </DashboardLayout>
  );
}
