"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DUMMY_ADVISORS } from "../../constants";

interface AdvisorsListTemplateProps {
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
}

export const AdvisorsListTemplate: React.FC<AdvisorsListTemplateProps> = ({
  userName,
  netWorth,
  riskAttitude,
  investmentExperience,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Main content area */}
        <div className="w-full">
          <div className="bg-white rounded-xl p-4 sm:p-8">
            {/* Header and Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-200 pb-4 sm:pb-6 mb-4 sm:mb-8">
              <div className="w-full sm:max-w-2xl mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-cirka text-navy mb-2 sm:mb-3">
                  Our expert panel of advisors
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Enjoy four 15-minute virtual consultations with a professional
                  advisor each year, ensuring you receive personalised advice
                  and support.
                </p>
              </div>
              <div className="w-full sm:w-48">
                <input
                  type="text"
                  placeholder="Filter"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>
            </div>

            {/* Advisors Grid  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {DUMMY_ADVISORS.map((advisor) => (
                <div
                  key={advisor.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={advisor.imageUrl}
                      alt={advisor.name}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-cirka text-navy mb-1">
                      {advisor.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      {advisor.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 line-clamp-3">
                      {advisor.bio}
                    </p>
                    <button
                      onClick={() => router.push(`/advisors/${advisor.id}`)}
                      className="w-full bg-[#28134B] hover:bg-[#28134B]/90 text-white rounded-full py-2 text-xs sm:text-sm font-medium transition-colors duration-200"
                    >
                      Book A Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
