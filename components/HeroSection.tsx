"use client";

import { motion } from "framer-motion";
import type { CourseData } from "@/lib/types";
import VideoSlider from "./VideoSlider";

interface HeroSectionProps {
  courseData: CourseData;
}

export default function HeroSection({ courseData }: HeroSectionProps) {
  const heroImage = courseData.media.find(
    (item) => item.name === "thumbnail" && item.resource_type === "image"
  );

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
          heroImage?.resource_value || "/placeholder.svg?height=800&width=1200"
        })`,
      }}
    >
      <div className="container mx-auto px-6 py-12 h-full relative">
        {/* Left Side - Title and Description - Full width */}
        <div className="flex flex-col justify-center min-h-[80vh]">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {courseData.title}
            </h1>
            <div
              className="text-lg md:text-xl mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: courseData.description }}
            />
          </motion.div>
        </div>

        {/* Video Slider - Positioned at absolute bottom right */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-2 right-0 z-10"
        >
          <VideoSlider media={courseData.media} />
        </motion.div>
      </div>
    </section>
  );
}
