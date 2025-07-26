"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Media } from "@/lib/types";
import Image from "next/image";

interface VideoSliderProps {
  media: Media[];
}

export default function VideoSlider({ media }: VideoSliderProps) {
  const videoMedia = media.filter((item) => item.resource_type === "video");
  const [activeIndex, setActiveIndex] = useState(0);

  if (videoMedia.length === 0) return null;

  const activeVideo = videoMedia[activeIndex];

  return (
    <div className="w-full max-w-sm bg-black/40 backdrop-blur-sm rounded-lg p-4">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.resource_value}`}
              title="Course Preview"
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {videoMedia.map((video, index) => (
          <motion.button
            key={video.resource_value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 relative w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
              index === activeIndex
                ? "border-violet-400"
                : "border-white/30 hover:border-white/50"
            }`}
          >
            <Image
              src={video.thumbnail_url || "/placeholder.svg?height=48&width=64"}
              alt={`Video ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === activeIndex && (
              <div className="absolute inset-0 bg-violet-500/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
