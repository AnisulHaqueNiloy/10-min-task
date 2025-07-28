"use client";

import { motion } from "framer-motion";
import type { Section, FeatureExplanation } from "@/lib/types";
import Image from "next/image";

interface ExclusiveFeaturesSectionProps {
  section: Section;
}

export default function ExclusiveFeatureSection({
  section,
}: ExclusiveFeaturesSectionProps) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {section.values.map((feature: FeatureExplanation, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-orange-100"
          >
            <div className="flex items-center justify-center mb-6 bg-orange-100 rounded-lg p-4">
              <Image
                src={feature.file_url || "/placeholder.svg"}
                alt={feature.title}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>

            <h3 className="text-xl font-bold mb-4 text-center text-orange-800">
              {feature.title}
            </h3>

            <ul className="space-y-3">
              {feature.checklist.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
