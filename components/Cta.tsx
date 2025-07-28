"use client";

import { motion } from "framer-motion";
import type { ChecklistItem, CtaText } from "@/lib/types";
import Image from "next/image";

interface StickyCTAProps {
  checklist: ChecklistItem[];
  ctaText: CtaText;
}

export default function Cta({ checklist, ctaText }: StickyCTAProps) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="sticky top-24 bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-2xl p-6 border border-violet-100 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>
          Limited Time Offer
        </div>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-2xl text-gray-400 line-through">৳2000</span>
          <span className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            ৳1000
          </span>
        </div>
        <p className="text-sm text-green-600 font-medium">50% ছাড়!</p>
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl mb-6 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <span className="flex items-center justify-center">
          <span>{ctaText.name}</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </motion.button>

      {/* Checklist Items */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-800 mb-4 text-center bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          কোর্সে যা থাকছে
        </h3>
        {checklist.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-100"
          >
            <div className="flex-shrink-0 w-6 h-6 mt-1 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
              <Image
                src={item.icon || "/placeholder.svg?height=20&width=20"}
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 object-contain filter brightness-0 invert"
              />
            </div>
            <span className="text-sm text-gray-700 leading-relaxed flex-1">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 pt-4 border-t border-violet-100">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Secure Payment
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Instant Access
          </div>
        </div>
      </div>
    </motion.div>
  );
}
