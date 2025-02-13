"use client";

import React from "react";
import { RiskInfoScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/screen";
import { PersonalInfoScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/personalInfo/screen";
import { KnowledgeInfoScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/knowledgeInfo/screen";

const QuestionnairePage: React.FC = () => {
  return (
    <div>
      <PersonalInfoScreen />
      <RiskInfoScreen />
      <KnowledgeInfoScreen />
    </div>
  );
};

export default QuestionnairePage;
