"use client";

import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function Header() {
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-black text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50"
    >
      <div className="flex justify-between space-x-4">
        <h1 className="text-xl font-bold text-violet-400">10 Minute School</h1>
      </div>
      <div>
        <button
          onClick={toggleLanguage}
          className="text-sm bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded"
        >
          EN or BN
        </button>
      </div>
    </motion.header>
  );
}
