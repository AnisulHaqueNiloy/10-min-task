"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Section, Instructor, Feature, Pointer } from "@/lib/types"
import Image from "next/image"

interface TabbedSectionsProps {
    sections: Section[]
}

export default function TabbedSections({ sections }: TabbedSectionsProps) {
    const [activeTab, setActiveTab] = useState(0)

    const relevantSections = sections.filter((section) => ["instructors", "features", "pointers"].includes(section.type))

    const tabs = [
        { key: "instructors", label: "কোর্স ইন্সট্রাক্টর" },
        { key: "features", label: "কোর্সটি যেভাবে সাজানো হয়েছে" },
        { key: "pointers", label: "কোর্সটি করে যা শিখবেন" },
    ]

    const handleTabClick = (index: number) => {
        setActiveTab(index)
        // Smooth scroll to content
        const element = document.getElementById("tab-content")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const renderContent = (section: Section) => {
        switch (section.type) {
            case "instructors":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.values.map((instructor: Instructor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-md p-6 text-center"
                            >
                                <Image
                                    src={instructor.image || "/placeholder.svg"}
                                    alt={instructor.name}
                                    width={120}
                                    height={120}
                                    className="rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-bold mb-2">{instructor.name}</h3>
                                <p className="text-gray-600 mb-3">{instructor.short_description}</p>
                                <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: instructor.description }} />
                            </motion.div>
                        ))}
                    </div>
                )

            case "features":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.values.map((feature: Feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4"
                            >
                                <Image
                                    src={feature.icon || "/placeholder.svg"}
                                    alt=""
                                    width={48}
                                    height={48}
                                    className="flex-shrink-0"
                                />
                                <div>
                                    <h3 className="text-lg font-bold mb-2 text-violet-600">{feature.title}</h3>
                                    <p className="text-gray-700">{feature.subtitle}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )

            case "pointers":
                return (
                    <div className="space-y-4">
                        {section.values.map((pointer: Pointer, index) => (
                            <motion.div
                                key={pointer.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-md p-4 flex items-start space-x-4"
                            >
                                <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700">{pointer.text}</p>
                            </motion.div>
                        ))}
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <section className="bg-white rounded-lg shadow-md p-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-8 border-b">
                {tabs.map((tab, index) => {
                    const section = relevantSections.find((s) => s.type === tab.key)
                    if (!section) return null

                    return (
                        <motion.button
                            key={tab.key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTabClick(index)}
                            className={`px-6 py-3 font-medium text-sm md:text-base transition-colors relative ${activeTab === index
                                    ? "text-violet-600 border-b-2 border-violet-600"
                                    : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            {section.name || tab.label}
                        </motion.button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <div id="tab-content">
                <AnimatePresence mode="wait">
                    {relevantSections.map((section, index) => {
                        if (index !== activeTab) return null

                        return (
                            <motion.div
                                key={section.type}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderContent(section)}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </section>
    )
}
