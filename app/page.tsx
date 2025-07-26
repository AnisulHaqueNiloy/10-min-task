import HeroSection from "@/components/HeroSection";
import { getCourseData } from "@/lib/api";

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

CourseContent();

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <CourseContent />
    </div>
  );
}
