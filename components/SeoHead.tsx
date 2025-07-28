"use client";

import Head from "next/head";
import type { CourseData } from "@/lib/types";

interface SEOHeadProps {
  courseData: CourseData;
}

export default function SeoHead({ courseData }: SEOHeadProps) {
  const seoData =
    courseData.seo && courseData.seo.length > 0 ? courseData.seo[0] : null;

  const title = seoData?.title || courseData.title;
  const description =
    seoData?.description ||
    courseData.description.replace(/<[^>]*>/g, "").trim();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}
