import HeroSection from "@/components/HeroSection";
import { getCourseData } from "@/lib/api";
import { Suspense } from "react";

async function CourseContent() {
  const response = await getCourseData();
  const { data } = response;
  console.log(data);

  return (
    <>
      <HeroSection courseData={data} />
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense>
        <CourseContent />
      </Suspense>
    </div>
  );
}
