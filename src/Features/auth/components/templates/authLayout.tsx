"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="w-32">
            <Image
              src="/assets/logo2.svg"
              alt="Celerey"
              width={80}
              height={30}
              priority
            />
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
      <div className="flex-grow bg-offWhite">
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </div>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-helvetica text-gray-500">
            © Celerey 2025
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
