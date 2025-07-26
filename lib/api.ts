//@ts-ignore;
import { ApiResponse } from "./types";

import { useLanguageStore } from "./store";

export async function getCourseData(lang = "bn"): Promise<ApiResponse> {
  const response = await fetch(
    `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
    {
      headers: {
        "X-TENMS-SOURCE-PLATFORM": "web",
      },
      next: {
        revalidate: 3600, // ISR - revalidate every hour
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch course data");
  }

  return response.json();
}
