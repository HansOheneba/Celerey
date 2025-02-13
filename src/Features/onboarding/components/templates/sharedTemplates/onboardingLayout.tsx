import React, { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

interface OnboardingLayoutProps {
  children: React.ReactNode
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="w-32">
            <div className="w-32 cursor-pointer">
              <Image
                src="/assets/logo2.svg"
                alt="Celerey"
                width={80}
                height={30}
                priority
              />
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            <a
              href="https://www.celerey.co/"
              className="text-sm font-helvetica text-gray-600"
            >
              About Us
            </a>
            <a
              href="https://www.celerey.co/resources"
              className="text-sm font-helvetica text-gray-600"
            >
              Resources
            </a>
          </div>
          <button
            className="md:hidden text-gray-600 transition-all"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 text-right rounded-lg p-4">
            <a
              href="https://www.celerey.co/"
              className="block text-sm font-helvetica text-gray-700 mb-2 border-b pb-2 hover:text-navy hover:border-navy transition-colors"
            >
              About Us
            </a>
            <a
              href="https://www.celerey.co/resources"
              className="block text-sm font-helvetica text-gray-700 mb-2 border-b pb-2 hover:text-navy hover:border-navy transition-colors"
            >
              Resources
            </a>
          </div>
        )}
      </nav>
      <div className="flex-grow bg-offWhite h-full">
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </div>
      <footer className="mx-10 border-t bg-offWhite">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-helvetica text-gray-500">
            &copy; 2025 Celerey. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
