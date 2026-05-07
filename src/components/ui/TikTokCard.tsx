'use client';

import React, { useEffect } from 'react';

interface TikTokCardProps {
  url: string;
}

const TikTokCard: React.FC<TikTokCardProps> = ({ url }) => {
  useEffect(() => {
    // Reload TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  // Extract video ID for a cleaner look or just use blockquote
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-all p-4">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={url.split('/').pop()}
        style={{ maxWidth: '605px', minWidth: '325px' }}
      >
        <section>
          <a target="_blank" title="TikTok Favorite" href={url}>
            Loading TikTok...
          </a>
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokCard;
