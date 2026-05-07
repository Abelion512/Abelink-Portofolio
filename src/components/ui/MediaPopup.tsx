"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

interface MediaPopupProps {
  isOpen: boolean;
  onCloseAction: () => void;
  src: string;
  alt: string;
  isVideo?: boolean;
}

export default function MediaPopup({
  isOpen,
  onCloseAction,
  src,
  alt,
  isVideo = false,
}: MediaPopupProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAction}
            className="absolute inset-0 bg-base/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-transparent rounded-4xl overflow-hidden shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              {isVideo && (
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-base/50 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-text-primary transition-colors border border-border/50"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              )}
              <button
                onClick={onCloseAction}
                className="w-10 h-10 rounded-full bg-base/50 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-text-primary transition-colors border border-border/50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full aspect-video bg-surface/40 rounded-3xl overflow-hidden">
              {isVideo ? (
                <video
                  ref={videoRef}
                  src={src}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  controlsList="nocontrols"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
                  <Image
                    src={src}
                    alt={alt}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
              )}
            </div>

            {alt && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-base/80 backdrop-blur-md rounded-full border border-border/50 max-w-[90%]">
                <p className="text-xs sm:text-sm font-medium text-text-primary truncate">
                  {alt}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
