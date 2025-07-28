import { Suspense } from "react";
import { getCourseData } from "@/lib/api";

import type { CourseData } from "@/lib/types";
import SeoHead from "@/components/SeoHead";
import HeroSection from "@/components/HeroSection";
import TabSection from "@/components/TabSection";
import Cta from "@/components/Cta";
import Header from "@/components/Header";

// Renamed and corrected the type definition for searchParams
// Next.js expects an index signature for searchParams in page components.
interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
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

  return (
    <>
      <SeoHead courseData={courseData} />
      <HeroSection courseData={courseData} />

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <TabSection sections={courseData.sections} />
            </div>
            <div className="lg:col-span-1">
              <Cta
                checklist={courseData.checklist}
                ctaText={courseData.cta_text}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Used HomePageProps for the page component
export default async function HomePage() {
  // const langParam = searchParams?.lang;
  // const lang = Array.isArray(langParam) ? langParam[0] : langParam ?? "bn";

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      <CourseContent lang={"bn"} />
    </main>
  );
}
