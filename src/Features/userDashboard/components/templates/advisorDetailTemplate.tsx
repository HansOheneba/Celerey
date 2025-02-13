"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Calendar, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Advisor } from "../../types";

interface AdvisorDetailsTemplateProps {
  advisor: Advisor;
  userName?: string;
  netWorth?: number;
  riskAttitude?: string;
  investmentExperience?: string;
}

export const AdvisorDetailsTemplate: React.FC<AdvisorDetailsTemplateProps> = ({
  advisor,
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
          <button
            onClick={() => setShowCalendarModal(false)}
            className="absolute top-4 right-4 z-60 bg-white/90 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

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
      {showCalendarModal && <CalendarModal />}

      <div className="max-w-[1440px] mx-auto">
        <div className="w-full bg-white rounded-xl p-4 sm:p-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-navy mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to advisors
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <div className="relative h-48 sm:h-64 lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src={advisor.imageUrl}
                  alt={advisor.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Advisor Information */}
            <div className="w-full">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-cirka text-navy mb-2">
                  {advisor.name}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4">
                  {advisor.title}
                </p>
                <p className="text-base text-gray-700">{advisor.bio}</p>
              </div>

              {/* Specialties and Strengths */}
              <div className="space-y-6">
                {/* Specialties Section */}
                <div>
                  <h2 className="text-lg sm:text-xl font-cirka text-navy mb-4">
                    {advisor.name}&apos;s Specialties in:
                  </h2>
                  <ul className="space-y-2">
                    {advisor.specialties.map((specialty, index) => (
                      <li key={index} className="text-base text-gray-700">
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths Section */}
                {/* <div>
                  <h2 className="text-lg sm:text-xl font-cirka text-navy mb-4">
                    {advisor.name}&apos;s Strengths:
                  </h2>
                  <ul className="space-y-2">
                    {advisor.strengths.map((strength, index) => (
                      <li key={index} className="text-base text-gray-700">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div> */}

                {/* Appointment Booking Button */}
                <button
                  onClick={() => setShowCalendarModal(true)}
                  className="w-full flex items-center justify-center bg-navy hover:bg-navy/90 text-white rounded-full py-3 text-sm font-medium mt-6"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
