"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface AssetAllocationLayoutProps {
  children: React.ReactNode;
}

export const AssetAllocationLayout: React.FC<AssetAllocationLayoutProps> = ({
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#", text: "Risk Allocation" },
    { href: "#", text: "Book a Call" },
    { href: "#", text: "Knowledge Hub" },
  ];

  const footerLinks = [
    { href: "#", text: "Help" },
    { href: "#", text: "Privacy Policy" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 border-b bg-white relative">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-sm font-helvetica text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-sm font-helvetica text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="flex-grow bg-white">
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </div>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-helvetica text-gray-500">
            © Celerey {new Date().getFullYear()}
          </span>
          <div className="flex gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-sm font-helvetica text-gray-500 hover:text-gray-700 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
