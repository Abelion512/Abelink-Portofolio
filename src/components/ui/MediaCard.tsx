"use client";

import React from 'react';
import Image from 'next/image';
import { Play, Eye, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface MediaCardProps {
  title: string;
  category: string;
  coverImage: string;
  views?: string | number;
  likes?: string | number;
  url: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ 
  title, 
  category, 
  coverImage, 
  views, 
  likes, 
  url 
}) => {
  // Format numbers to K/M
  const formatNumber = (num?: string | number) => {
    if (!num) return null;
    const n = Number(num);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-[#0a0a0c] border border-white/5 shadow-2xl flex flex-col"
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        <Image 
          src={coverImage || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"} 
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      </div>

      {/* Play Icon / Center Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center shadow-2xl bg-white/10 backdrop-blur-xl">
          <Play size={24} className="text-white fill-white ml-1" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="mt-auto p-8 relative z-10 w-full">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
            {category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Stats Row */}
        {(views || likes) && (
          <div className="flex items-center gap-5 text-white/40 font-mono text-[10px] tracking-widest uppercase border-t border-white/5 pt-4">
            {views && (
              <span className="flex items-center gap-2 group-hover:text-white/70 transition-colors">
                <Eye size={12} className="text-primary" /> {formatNumber(views)}
              </span>
            )}
            {likes && (
              <span className="flex items-center gap-2 group-hover:text-white/70 transition-colors">
                <Heart size={12} className="text-primary" /> {formatNumber(likes)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Premium Highlight Border */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none group-hover:border-primary/30 transition-colors duration-500" />
      
      {/* Glossy Reflection Effect */}
      <div className="absolute -inset-full top-0 h-[100%] w-[100%] z-20 pointer-events-none transition-all duration-1000 group-hover:left-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg]" />
    </motion.a>
  );
};

export default MediaCard;
