"use client";

import { motion } from "framer-motion";
import type { Section, Instructor } from "@/lib/types";
import Image from "next/image";

interface InstructorsSectionProps {
  section: Section;
}

export default function InstructorSection({
  section,
}: InstructorsSectionProps) {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.values.map((instructor: Instructor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 text-center border border-violet-100"
          >
            <Image
              src={instructor.image || "/placeholder.svg"}
              alt={instructor.name}
              width={120}
              height={120}
              className="rounded-full mx-auto mb-4 border-4 border-violet-200"
            />
            <h3 className="text-xl font-bold mb-2 text-violet-800">
              {instructor.name}
            </h3>
            <p className="text-violet-600 mb-3 font-medium">
              {instructor.short_description}
            </p>
            <div
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: instructor.description }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
