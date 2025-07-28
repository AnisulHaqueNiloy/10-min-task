"use client";

import { motion } from "framer-motion";
import type { Section, Pointer } from "@/lib/types";

interface PointersSectionProps {
  section: Section;
}

export default function PointerSection({ section }: PointersSectionProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
      <div className="space-y-4">
        {section.values.map((pointer: Pointer, index) => (
          <motion.div
            key={pointer.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 flex items-start space-x-4 border border-green-100"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed pt-2">{pointer.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
