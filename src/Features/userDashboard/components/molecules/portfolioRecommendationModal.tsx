import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  PortfolioRecommendation,
  PortfolioRecommendationsModalProps,
} from "../../types";

const PortfolioRecommendationsModal: React.FC<
  PortfolioRecommendationsModalProps
> = ({ isOpen, onClose }) => {
  const recommendations: PortfolioRecommendation[] = [
    {
      title: "Diversify Portfolio",
      description:
        "Diversify portfolio to spread risk, consider investing in emerging markets and Japan to increase potential returns.",
      percentage: 23.2,
    },
    {
      title: "Long DE10Y 1m Futures",
      description: "Presently dovish-positioned ECB vs hawkish-positioned BoE.",
      percentage: 11.6,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl text-center font-cirka">
            Portfolio Recommendations
          </DialogTitle>
          <p className="text-gray-600 text-center">
            Improve your portfolio with our recommendations
          </p>
        </DialogHeader>

        {/* Portfolio Score Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Your Portfolio Optimisation Score
            </span>
            <Info className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-2">
            <span className="text-3xl font-bold">32.3%</span>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: "32.3%" }}
              />
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-3">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.title}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{recommendation.title}</h3>
                  <span className="text-green-500 text-sm bg-green-50 px-2 py-0.5 rounded-full">
                    +{recommendation.percentage}%
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">
                {recommendation.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Back
          </Button>
          <Button className="flex-1 bg-navy hover:bg-navyLight">
            Modify Positions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioRecommendationsModal;
