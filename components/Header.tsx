"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang") || "bn";

  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLang) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", lang);
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white py-4 px-6 sticky top-0 z-50 shadow-xl border-b border-purple-500/20"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">10</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
            10 Minute School
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </a>

          {/* Courses Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              Courses
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            {isCoursesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                >
                  IELTS Course
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                >
                  English Course
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                >
                  Math Course
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                >
                  Science Course
                </a>
              </motion.div>
            )}
          </div>

          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Blog
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Switch */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentLang === "en"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-700/80 hover:bg-gray-600 text-gray-300"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("bn")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentLang === "bn"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-700/80 hover:bg-gray-600 text-gray-300"
              }`}
            >
              BN
            </button>
          </div>

          {/* Login Button */}
          <button className="hidden md:block px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm font-medium transition-colors">
            Login
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pt-4 border-t border-purple-500/20"
        >
          <nav className="flex flex-col space-y-3">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Courses
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Blog
            </a>

            {/* Mobile Language Switch */}
            <div className="flex items-center space-x-2 py-2">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentLang === "en"
                    ? "bg-violet-600 text-white"
                    : "bg-gray-700/80 hover:bg-gray-600 text-gray-300"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("bn")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentLang === "bn"
                    ? "bg-violet-600 text-white"
                    : "bg-gray-700/80 hover:bg-gray-600 text-gray-300"
                }`}
              >
                BN
              </button>
            </div>

            {/* Mobile Login */}
            <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm font-medium transition-colors w-fit">
              Login
            </button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
