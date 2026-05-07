"use client";

import { motion } from "motion/react";

export default function ChangelogPage() {

  return (
    <>

      <main className="pt-32 px-6 max-w-5xl mx-auto mb-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center text-text-secondary">
            <p>Changelog content coming soon...</p>
          </div>
        </motion.div>
      </main>
    </>
  );
}
