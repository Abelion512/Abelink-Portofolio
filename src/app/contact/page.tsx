"use client";

import { motion } from "motion/react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Mail, Instagram, Linkedin, Github, Send } from "lucide-react";
import { site } from "@/config/site";

export default function ContactPage() {

  const contactMethods = [
    {
      label: "Direct Email",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <Mail className="w-6 h-6" />,
      color: "rgba(59, 130, 246, 0.15)",
    },
    {
      label: "Instagram",
      value: "@ihsanovid",
      href: site.social.instagram,
      icon: <Instagram className="w-6 h-6" />,
      color: "rgba(236, 72, 153, 0.15)",
    },
    {
      label: "LinkedIn",
      value: "ihsanuddin-abelion",
      href: site.social.linkedin,
      icon: <Linkedin className="w-6 h-6" />,
      color: "rgba(10, 102, 194, 0.15)",
    },
    {
      label: "GitHub",
      value: "Abelion512",
      href: site.social.github,
      icon: <Github className="w-6 h-6" />,
      color: "rgba(255, 255, 255, 0.1)",
    }
  ];

  return (
    <>

      <main className="relative z-10 pt-32 px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <a 
                key={method.label} 
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full focus:outline-none"
              >
                <SpotlightCard
                  className="p-8 h-full"
                  color={method.color}
                >
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all duration-500">
                      {method.icon}
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted group-hover:text-primary/70 transition-colors">
                        {method.label}
                      </p>
                      <p className="text-lg font-display font-bold text-text-primary">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>

          {/* Call to action section */}
          <section className="mt-24 p-12 md:p-20 rounded-[3rem] bg-linear-to-br from-primary/10 via-base to-transparent border border-primary/20 relative overflow-hidden text-center max-w-4xl mx-auto">
             <div className="absolute top-0 right-0 p-8 text-primary/10 opacity-20 pointer-events-none">
                <Send size={120} />
             </div>
             
             <div className="relative z-10 space-y-8">
                <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
                  Ready to start a <span className="text-gradient">new project?</span>
                </h3>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                  I&apos;m always open to discussing new opportunities, creative ideas, or specialized development projects.
                </p>
                <div className="pt-4">
                  <a 
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-1 transition-all duration-300"
                  >
                    Send me a message
                    <Send size={18} />
                  </a>
                </div>
             </div>
          </section>
        </motion.div>
      </main>
    </>
  );
}
