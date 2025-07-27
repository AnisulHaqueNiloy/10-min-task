"use client"

import { motion } from "framer-motion"
import type { ChecklistItem } from "@/lib/types"

interface WhyChooseSectionProps {
    checklist: ChecklistItem[]
}

export default function WhyChooseSection({ checklist }: WhyChooseSectionProps) {
    return (
        <section className="py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">কেন এই কোর্সটি বেছে নেবেন?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {checklist.slice(0, 6).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                        >
                            <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <p className="text-gray-700">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
