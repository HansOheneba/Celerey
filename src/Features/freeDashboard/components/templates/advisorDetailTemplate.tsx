"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Calendar, X } from "lucide-react";
import { useRouter } from "next/navigation";
import UserProfile from "../molecules/userProfile";
import { Advisor } from "../../types";

interface AdvisorDetailsTemplateProps {
  advisor: Advisor;
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
}

export const AdvisorDetailsTemplate: React.FC<AdvisorDetailsTemplateProps> = ({
  advisor,
  userName,
  netWorth,
  riskAttitude,
  investmentExperience,
}) => {
  const router = useRouter();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const CalendarModal = () => {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={() => setShowCalendarModal(false)}
      >
        <div
          className="relative w-full max-w-[1200px] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowCalendarModal(false)}
            className="absolute top-4 right-4 z-60 bg-white/90 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

          {/* Calendar Iframe */}
          <div className="w-full h-[80vh]">
            <iframe
              src={advisor.googleCalendarUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title={`Book Appointment with ${advisor.name}`}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
      {/* Calendar Modal  */}
      {showCalendarModal && <CalendarModal />}

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/*  UserProfile */}
          <div className="lg:col-span-4 w-full">
            <UserProfile
              userName={userName}
              netWorth={netWorth}
              riskAttitude={riskAttitude}
              investmentExperience={investmentExperience}
            />
          </div>

          {/*Advisor Details */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-4 sm:p-8">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-navy mb-4 sm:mb-0"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to advisors
              </button>

              <div className="bg-white rounded-lg p-4 sm:p-6">
                {/* Advisor Image */}
                <div className="relative h-48 sm:h-64 md:h-80 mb-4 sm:mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={advisor.imageUrl}
                    alt={advisor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Advisor Information */}
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-xl sm:text-2xl font-cirka text-navy mb-2">
                    {advisor.name}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {advisor.title}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700">
                    {advisor.bio}
                  </p>
                </div>

                {/* Specialties and Strengths  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                  {/* Specialties Section */}
                  <div>
                    <h2 className="text-base sm:text-lg font-cirka text-navy mb-4">
                      {advisor.name}&apos;s Specialties in:
                    </h2>
                    <ul className="space-y-2">
                      {advisor.specialties.map((specialty, index) => (
                        <li
                          key={index}
                          className="text-sm sm:text-base text-gray-700"
                        >
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strengths Section */}
                  {/* <div>
                    <h2 className="text-base sm:text-lg font-cirka text-navy mb-4">
                      {advisor.name}&apos;s Strengths:
                    </h2>
                    <ul className="space-y-2">
                      {advisor.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="text-sm sm:text-base text-gray-700"
                        >
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>

                {/* Appointment Booking Button */}
                <div className="mt-4 sm:mt-6">
                  <button
                    onClick={() => setShowCalendarModal(true)}
                    className="w-full flex items-center justify-center bg-navy hover:bg-navy/90 text-white rounded-full py-2 sm:py-3 text-xs sm:text-sm font-medium"
                  >
                    <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Book an Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
