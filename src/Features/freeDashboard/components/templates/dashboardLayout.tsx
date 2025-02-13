"use client";

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, LogOut, Menu, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/Features/auth/state'
import { useOnboardingStore } from '@/Features/onboarding/state'
import { useDashboardStore } from '@/Features/userDashboard/state'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  // State management for navigation and dropdowns
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { logout } = useAuthStore()
  const { resetOnboarding } = useOnboardingStore()
  const { reset } = useDashboardStore()
  const router = useRouter()

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  // User dropdown menu component
  const UserDropdownMenu = () => (
    <div
      className="bg-white rounded-md shadow-lg py-2 w-48"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => {
          /*  logout logic  */
          reset()
          resetOnboarding()
          logout()
          router.replace('/auth/signin')
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  )

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href='/freebie' passHref className="w-32">
            <Image
              src="/assets/logo2.svg"
              alt="Celerey"
              width={80}
              height={30}
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex gap-6 items-center">
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Risk Allocation
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Goals & Planning
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Knowledge Hub
            </Link>
            <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
          </div> */}
          {/* Mobile Navigation */}
             {/* Desktop Navigation */}
             <div className="hidden md:flex gap-6 items-center">
            {/* <Link href="#" className="text-sm font-helvetica text-gray-600">
              Risk Allocation
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Goals & Planning
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Knowledge Hub
            </Link> */}
         
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="h-6 w-6 text-navy" />
            </button>
          </div>   {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {/* <Link href="#" className="text-sm font-helvetica text-gray-600">
              Risk Allocation
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Goals & Planning
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Knowledge Hub
            </Link> */}
            {/* Desktop User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                }}
                className="flex items-center"
              >
                <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
                <ChevronDown
                  className={`ml-1 h-4 w-4 text-gray-600 transition-transform ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <UserDropdownMenu />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="h-6 w-6 text-navy" />
            </button>
          </div>
       
        </div>
      </nav>
      <div className="flex-grow bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>
      </div>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-helvetica text-gray-500">
            © Celerey {new Date().getFullYear()}
          </span>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-helvetica text-gray-500">
              Help
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-500">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
