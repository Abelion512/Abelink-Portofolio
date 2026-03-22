"use client";

import { motion } from "motion/react";
import { Mail, MessageSquare, Send, Github, Phone } from "lucide-react";
import { useState } from "react";
import { useLangStore } from "@/store/languageStore";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLangStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <div className="container mx-auto px-6 py-32 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 text-gradient">
            {t('contact.title')}
          </h1>
          <p className="text-text-secondary text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle') || "Let's collaborate on something amazing. I'm always open to new ideas and opportunities."}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          {/* Contact Info */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass p-8 rounded-[2rem] border-border/50 flex-grow">
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3 text-text-primary">
                <MessageSquare className="text-primary" />
                Channels
              </h3>
              
              <div className="space-y-8">
                <a href="mailto:agen.salva@gmail.com" className="flex items-center gap-5 text-text-secondary hover:text-primary transition-all group">
                  <div className="p-4 bg-surface rounded-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all border border-border/50">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1">Email</p>
                    <p className="font-bold text-text-primary group-hover:text-primary transition-colors">agen.salva@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://github.com/Abelion512" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-text-secondary hover:text-primary transition-all group">
                  <div className="p-4 bg-surface rounded-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all border border-border/50">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1">GitHub</p>
                    <p className="font-bold text-text-primary group-hover:text-primary transition-colors">@Abelion512</p>
                  </div>
                </a>

                <div className="flex items-center gap-5 text-text-secondary opacity-80">
                  <div className="p-4 bg-surface rounded-2xl border border-border/50">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1">Phone</p>
                    <p className="font-bold text-text-primary">Available on request</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl">
              <p className="text-xs font-mono text-primary leading-relaxed">
                {t('contact.available')}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-[2rem] border-border/50 space-y-8 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest ml-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-base/50 border border-border/50 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-muted"
                    placeholder="E.g. Elon Musk"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest ml-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-base/50 border border-border/50 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-muted"
                    placeholder="elon@mars.com"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="subject" className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  className="w-full bg-base/50 border border-border/50 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-muted"
                  placeholder="Inquiry about Abelink"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="text-xs font-mono font-bold text-text-secondary uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  required
                  className="w-full bg-base/50 border border-border/50 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-primary transition-all resize-none placeholder:text-text-muted"
                  placeholder="How can I help you today?"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className="w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Send size={24} />
                  </motion.div>
                ) : isSuccess ? (
                  "Message Sent Successfully!"
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
