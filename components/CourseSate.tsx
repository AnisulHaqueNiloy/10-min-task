"use client"

import { motion } from "framer-motion"
import type { ChecklistItem } from "@/lib/types"

interface CourseStatsProps {
    checklist: ChecklistItem[]
}

export default function CourseState({ checklist }: CourseStatsProps) {
    // Extract stats from checklist data
    const getStatValue = (text: string) => {
        const match = text.match(/(\d+(?:,\d+)*)/)
        return match ? match[1] : "0"
    }

    const getStatLabel = (text: string) => {
        if (text.includes("কোর্সটি করছেন")) return "শিক্ষার্থী"
        if (text.includes("ভিডিও")) return "ভিডিও"
        if (text.includes("সময় লাগবে")) return "ঘন্টা"
        if (text.includes("মক টেস্ট")) return "মক টেস্ট"
        return "আইটেম"
    }

    // Get stats from checklist
    const statsItems = checklist
        .filter(
            (item) =>
                item.text.includes("কোর্সটি করছেন") ||
                item.text.includes("ভিডিও") ||
                item.text.includes("সময় লাগবে") ||
                item.text.includes("মক টেস্ট"),
        )
        .slice(0, 4)

    return (
        <section className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statsItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg p-4 text-center shadow-md"
                    >
                        <div className="text-2xl font-bold text-violet-600">{getStatValue(item.text)}</div>
                        <div className="text-sm text-gray-600">{getStatLabel(item.text)}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
