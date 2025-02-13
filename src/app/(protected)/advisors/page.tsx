import { AdvisorsListTemplate } from "@/Features/userDashboard/components/templates/advisorListTemplate";
import { DashboardLayout } from "@/Features/userDashboard/components/templates/dashboardLayout";

const DEFAULT_USER_DATA = {
  userName: "Jude",
  netWorth: 103550.0,
  riskAttitude: "Low",
  investmentExperience: "Beginner",
  profileCompletion: 40,
};

export default function AdvisorsPage() {
  return (
    <DashboardLayout>
      <AdvisorsListTemplate
        userName={DEFAULT_USER_DATA.userName}
        netWorth={DEFAULT_USER_DATA.netWorth}
        riskAttitude={DEFAULT_USER_DATA.riskAttitude}
        investmentExperience={DEFAULT_USER_DATA.investmentExperience}
      />
    </DashboardLayout>
  );
}
