"use client";
import { CourseData } from "@/lib/types";
import React from "react";

interface HeroSectionProps {
  courseData: CourseData;
}

export default function HeroSection({ courseData }: HeroSectionProps) {
  const heroImg = courseData.media.find(
    (item) => item.name === "thumbnail" && item.resource_type === "image"
  );
  console.log(heroImg);
  return <div>HeroSection</div>;
}
