"use client";

import { motion } from "framer-motion";
import type { Section, Feature } from "@/lib/types";
import Image from "next/image";

interface FeaturesSectionProps {
  section: Section;
}

export default function FeatureSection({ section }: FeaturesSectionProps) {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-violet-900 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.values.map((feature: Feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-4 flex items-start space-x-3 border border-violet-500/20"
          >
            <div className="bg-violet-600/20 p-2 rounded-lg flex-shrink-0">
              <Image
                src={feature.icon || "/placeholder.svg"}
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1 text-violet-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
