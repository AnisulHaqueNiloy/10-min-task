"use client";

import { motion } from "framer-motion";
import type { Section, AboutItem } from "@/lib/types";

interface AboutSectionProps {
  section: Section;
}

export default function AboutSection({ section }: AboutSectionProps) {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-8">
      <div className="space-y-8">
        {section.values.map((item: AboutItem, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-rose-100"
          >
            <div
              className="text-xl font-bold mb-4 text-rose-800"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
