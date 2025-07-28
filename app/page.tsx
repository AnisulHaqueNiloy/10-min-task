import { Suspense } from "react";
import { getCourseData } from "@/lib/api";

import type { CourseData } from "@/lib/types";
import SeoHead from "@/components/SeoHead";
import HeroSection from "@/components/HeroSection";
import TabSection from "@/components/TabSection";
import Cta from "@/components/Cta";
import Header from "@/components/Header";

interface PageProps {
  searchParams: {
    lang?: string;
  };
}

async function CourseContent({ lang }: { lang: string }) {
  let courseData: CourseData | null = null;
  let error: string | null = null;

  try {
    const response = await getCourseData(lang);
    courseData = response.data;
  } catch (err) {
    console.error("Error fetching course data:", err);
    error = "Failed to load course data. Please try again later.";
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Error Loading Course
          </h2>
          <p className="text-gray-600">{error || "Course data not found"}</p>
          <a
            href="/"
            className="mt-4 inline-block px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const testimonialsSection = courseData.sections.find(
    (s) => s.type === "testimonials"
  );

  return (
    <>
      {/* SEO Head Component */}
      <SeoHead courseData={courseData} />

      {/* Hero Section */}
      <HeroSection courseData={courseData} />

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-3">
              {/* Tabbed Sections */}
              <TabSection sections={courseData.sections} />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <Cta
                checklist={courseData.checklist}
                ctaText={courseData.cta_text}
              />
            </div>
          </div>

          {/* Testimonials - Full Width Below
          {testimonialsSection && (
            <div className="mt-16">
              <Testimonials section={testimonialsSection} />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="animate-pulse">
        <div className="h-16 bg-gray-300 mb-4"></div>
        <div className="h-96 bg-gray-300 mb-8"></div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function HomePage({ searchParams }: PageProps) {
  const lang = searchParams.lang || "bn"; // Access searchParams directly [^2][^3]

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <CourseContent lang={lang} />
      </Suspense>
    </main>
  );
}
