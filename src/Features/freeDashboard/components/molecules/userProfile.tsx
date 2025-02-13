import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ChevronRight, Info } from 'lucide-react'
import Link from 'next/link'
import formatCurrency from '@/utils/formatCurrency'
// import { useRouter } from "next/navigation";

interface UserProfileProps {
  userName: string
  netWorth: number
  riskAttitude: string
  investmentExperience: string
  profileCompletion?: number
  bookCall?: () => void
  onUpgradeClick?: () => void
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  netWorth,
  riskAttitude,
  investmentExperience,
  profileCompletion,
  onUpgradeClick,
  bookCall
}) => {
  // const router = useRouter();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className="hidden lg:block bg-white rounded-3xl">
      <div className="p-8">
        {/* Account Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-bold">Free Account</span>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={onUpgradeClick}
            className="text-[#6938EF] text-sm font-medium hover:underline"
          >
            Upgrade
          </button>
        </div>

        {/* Welcome Section */}
        <div className="space-y-1">
          <h1 className="text-4xl font-medium font-cirka">
            Welcome {userName}
          </h1>
          <p className="text-gray-600 mt-2 text-small font-cirka">
            {currentDate}
          </p>
          <p className="text-gray-700 mt-2 font-helvatica text-medium">
            We&apos;re happy to see you again. Here&apos;s is a quick overview
            of your finances.
          </p>
        </div>

        {/* Profile Completion */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium text-medium">
              Profile Completion
            </span>
            <span className="text-gray-600 bg-gray-100 p-1 text-sm">
              You&apos;re almost there!
            </span>
          </div>
          <span className="text-2xl font-medium">{profileCompletion}%</span>
          <div className="relative h-2 bg-[#EBE9FE] rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-[#281FBB] rounded-full"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onUpgradeClick}
              className="bg-[#E15B2D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#E63D04] transition-colors"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Financial Info */}
      <div className="space-y-2 p-2 bg-[#FAFBFB]">
        <div className="border-b border-[#AAAAAA] pb-2">
          <div className="text-sm text-gray-500 pl-5 mb-2 font-helvatica">
            Your Risk Attitude
          </div>
          <div className=" flex justify-between items-center ">
            <div className="text-xl text-black font-cirka pl-5 font-medium capitalize">
              {riskAttitude}
            </div>
            <div>
              <span
                onClick={onUpgradeClick}
                className="text-[#E15B2D] font-semibold text-sm hover:underline cursor-pointer"
              >
                Complete profile
              </span>
            </div>
          </div>
        </div>

        <div className="border-b border-[#AAAAAA] pb-2">
          <div className="text-sm text-gray-500 pl-5 mb-2 font-helvatica">
            Your Current Net Worth
          </div>
          <div className="text-xl text-navyLight font-cirka pl-5 font-medium">
            {formatCurrency(netWorth.toString(), "usd")}
          </div>
        </div>

        <div className="border-b border-[#AAAAAA]">
          <div className="text-sm text-gray-500 pl-5 mb-2 font-helvatica">
            Your Investment Experience
          </div>
          <div className=" flex justify-between items-center ">
            <div className="text-xl text-black font-cirka pl-5 font-medium capitalize">
              {investmentExperience}
            </div>
            <div>
              <span
                onClick={onUpgradeClick}
                className="text-[#E15B2D] font-semibold text-sm hover:underline cursor-pointer"
              >
                Complete profile
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Button */}
      <div className="space-y-2 bg-gray-50 mb-10">
        <div className="flex items-center justify-between  rounded-lg">
          <div className="flex items-center  p-2 gap-4">
            <div className="flex-shrink-0">
              <Image
                src="/assets/consultation.svg"
                alt="Consultation"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <span className="font-medium">Book 15 Minutes Consultation</span>
          </div>
          <button
            onClick={bookCall}
            className="p-2 rounded-full bg-[#1E1B4B] hover:bg-[#2D2A5C] transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
        {/* Bottom Border */}
        <div className="border-b bg-gray-50 border-gray-200 p-4 " />
      </div>
    </Card>
  );
}

export default UserProfile
