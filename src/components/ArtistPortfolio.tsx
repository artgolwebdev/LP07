import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getArtistImagesById } from "../utils/galleryUtils";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface ArtistPortfolioProps {
  artistId: string;
  className?: string;
}

export function ArtistPortfolio({ artistId, className = "" }: ArtistPortfolioProps) {
  const images = getArtistImagesById(artistId);
  
  // Initialize Fancybox for this artist's portfolio
  useEffect(() => {
    Fancybox.bind(`[data-fancybox='artist-${artistId}']`);

    return () => {
      Fancybox.destroy();
    };
  }, [artistId]);
  
  // Always show the portfolio section, even if no images
  return (
    <div className={`${className}`}>
      <div className="relative">
        {/* Horizontal Scrolling Gallery */}
        <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-4 pr-1 custom-scrollbar">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <motion.div
                key={index}
                className="relative group/portfolio flex-shrink-0 overflow-hidden rounded-lg cursor-pointer"
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 2,
                  boxShadow: "0 0 20px rgba(255,255,255,0.2)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <a
                  href={image.src}
                  data-fancybox={`artist-${artistId}`}
                  data-caption={`${image.artist} - ${image.alt}`}
                  className="block w-full h-full"
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-20 h-16 object-cover group-hover/portfolio:scale-110 transition-transform duration-400"
                  />
                </a>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover/portfolio:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white/90 font-medium">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Fallback placeholder when no images are available
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="w-20 h-16 bg-zinc-800/50 border border-white/20 rounded-lg flex items-center justify-center"
                >
                  <div className="text-white/40 text-xs text-center">
                    <div className="w-6 h-6 border border-white/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-white/30 text-sm">+</span>
                    </div>
                    <span>Add</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Simple Scroll Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-black/40 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
