import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getArtistImages, type GalleryImage } from '../utils/galleryUtils';

interface DynamicGalleryProps {
  className?: string;
}

// Loading Spinner Component
function LoadingSpinner({ className }: { className: string }) {
  return (
    <div className={`flex items-center justify-center h-32 ${className}`}>
      <div className="relative">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        <div 
          className="absolute inset-0 w-12 h-12 border-2 border-transparent border-r-white/40 rounded-full animate-spin" 
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Gallery Image Component
function GalleryImage({ image, index }: { 
  image: GalleryImage; 
  index: number;
}) {
  return (
    <motion.div
      key={`${image.artist}-${index}`}
      className="relative group flex-shrink-0 cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.1,
        z: 20
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Image Container - Made smaller */}
      <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 overflow-hidden rounded-lg md:rounded-xl transition-all duration-500">
        <a
          href={image.src}
          data-fancybox="dynamic-gallery"
          data-caption={`${image.artist} - ${image.category}`}
          className="block w-full h-full relative z-10"
        >
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </a>
        
        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Artist Label - Made smaller */}
        <div className="absolute bottom-1 left-1 right-1 bg-black/70 backdrop-blur-md px-2 py-1 rounded border border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
          <span className="text-white/90 text-xs font-medium tracking-wide">
            {image.artist}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Main DynamicGallery Component
export function DynamicGallery({ className = "" }: DynamicGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Fancybox - Fixed to wait for images to load
  useEffect(() => {
    if (images.length > 0) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        Fancybox.bind("[data-fancybox='dynamic-gallery']");
      }, 100);

      return () => {
        clearTimeout(timer);
        Fancybox.destroy();
      };
    }

    return () => {
      Fancybox.destroy();
    };
  }, [images.length]);

  useEffect(() => {
    const baseImages = getArtistImages();
    if (baseImages.length > 0) {
      // Create infinite loop by duplicating images multiple times
      const infiniteImages = [
        ...baseImages, 
        ...baseImages, 
        ...baseImages, 
        ...baseImages, 
        ...baseImages, 
        ...baseImages
      ];
      setImages(infiniteImages);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner className={className} />;
  }

  const baseImages = getArtistImages();

  return (
    <div className={`relative overflow-hidden p-0 ${className}`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 120px 120px'
          }} 
        />
      </div>

      {/* Infinite Scrolling Gallery Container */}
      <div className="relative">
        {/* Gallery Track with True Infinity */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex gap-1 md:gap-1.5 lg:gap-2"
            animate={{ 
              x: [-100 * baseImages.length, 0]
            }}
            transition={{ 
              duration: 80,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {images.map((image, index) => (
              <GalleryImage 
                key={`${image.artist}-${index}`} 
                image={image} 
                index={index} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
