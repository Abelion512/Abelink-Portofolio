"use client";

import { motion } from "motion/react";
import { useLangStore } from "@/store/languageStore";
import FloatingTitle from "@/components/ui/FloatingTitle";
import { useState } from "react";

export default function ChangelogPage() {
  const { t } = useLangStore();
  const [titleAnimated, setTitleAnimated] = useState(false);

  return (
    <>
      <FloatingTitle
        title={t("changelog.title")}
        subtitle={t("changelog.subtitle")}
        onAnimationComplete={() => setTitleAnimated(true)}
      />

      <main className="pt-20 px-6 max-w-5xl mx-auto mb-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: titleAnimated ? 0 : 0.6 }}
        >
          <div className="text-center text-text-secondary">
            <p>Changelog content coming soon...</p>
          </div>
        </motion.div>
      </main>
    </>
  );
}
