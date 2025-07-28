"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

import type { Section } from "@/lib/types";
import InstructorsSection from "./tabs/InstructorSection";
import FeaturesSection from "./tabs/FeatureSection";
import PointersSection from "./tabs/PointerSection";
import ExclusiveFeaturesSection from "./tabs/ExclusiveFeatureSection";
import AboutSection from "./tabs/AboutSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TabbedSectionsProps {
  sections: Section[];
}

export default function TabSection({ sections }: TabbedSectionsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Define tabs
  const tabDefinitions = [
    {
      key: "instructors",
      fallbackLabel: "Instructor",
      sectionType: "instructors",
      color: "violet",
    },
    {
      key: "features",
      fallbackLabel: "কোর্সটি যেভাবে সাজানো হয়েছে",
      sectionType: "features",
      color: "blue",
    },
    {
      key: "pointers",
      fallbackLabel: "কোর্সটি করে যা শিখবেন",
      sectionType: "pointers",
      color: "green",
    },
    {
      key: "exclusive",
      fallbackLabel: "Course Exclusive Feature",
      sectionType: "feature_explanations",
      color: "orange",
    },
    {
      key: "about",
      fallbackLabel: "কোর্স সম্পর্কে বিস্তারিত",
      sectionType: "about",
      color: "rose",
    },
  ];

  // Filter available tabs based on sections and use API name or fallback
  const availableTabs = tabDefinitions
    .map((tabDef) => {
      const section = sections.find((s) => s.type === tabDef.sectionType);
      return section
        ? { ...tabDef, label: section.name || tabDef.fallbackLabel, section }
        : null;
    })
    .filter(Boolean) as ((typeof tabDefinitions)[0] & {
    section: Section;
    label: string;
  })[];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    // Smooth scroll to the specific section
    const sectionId = `section-${availableTabs[index].key}`;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderSectionContent = (section: Section, sectionType: string) => {
    switch (sectionType) {
      case "instructors":
        return <InstructorsSection section={section} />;
      case "features":
        return <FeaturesSection section={section} />;
      case "pointers":
        return <PointersSection section={section} />;
      case "feature_explanations":
        return <ExclusiveFeaturesSection section={section} />;
      case "about":
        return <AboutSection section={section} />;
      default:
        return null;
    }
  };

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      violet: isActive
        ? "bg-violet-600 text-white"
        : "bg-violet-100 text-violet-700 hover:bg-violet-200",
      blue: isActive
        ? "bg-blue-600 text-white"
        : "bg-blue-100 text-blue-700 hover:bg-blue-200",
      green: isActive
        ? "bg-green-600 text-white"
        : "bg-green-100 text-green-700 hover:bg-green-200",
      orange: isActive
        ? "bg-orange-600 text-white"
        : "bg-orange-100 text-orange-700 hover:bg-orange-200",
      rose: isActive
        ? "bg-rose-600 text-white"
        : "bg-rose-100 text-rose-700 hover:bg-rose-200",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.violet;
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      {/* Sticky Carousel Tab Navigation */}
      <div className="sticky top-16 z-50 bg-white/95 backdrop-blur-md rounded-t-xl p-4 pb-3 border-b border-gray-200 shadow-lg">
        <div className="absolute inset-0 bg-white rounded-t-xl"></div>
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors border border-gray-200"
          >
            {" "}
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Scrollable Tab Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-3 px-10 py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {availableTabs.map((tab, index) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabClick(index)}
                className={`flex-shrink-0 px-4 py-2 font-medium text-xs md:text-sm transition-all duration-300 rounded-lg whitespace-nowrap shadow-md ${getTabColorClasses(
                  tab.color,
                  activeTab === index
                )}`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* All Sections Content - Displayed Normally */}
      <div className="p-6 pt-3 space-y-12">
        {availableTabs.map((tab, index) => (
          <motion.div
            key={tab.key}
            id={`section-${tab.key}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-28"
          >
            {/* Section Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {tab.label}
              </h2>
              <div
                className={`w-20 h-1 mx-auto rounded-full bg-gradient-to-r ${
                  tab.color === "violet"
                    ? "from-violet-500 to-purple-600"
                    : tab.color === "blue"
                    ? "from-blue-500 to-indigo-600"
                    : tab.color === "green"
                    ? "from-green-500 to-emerald-600"
                    : tab.color === "orange"
                    ? "from-orange-500 to-amber-600"
                    : "from-rose-500 to-pink-600"
                }`}
              ></div>
            </div>

            {/* Section Content */}
            {renderSectionContent(tab.section, tab.sectionType)}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
