import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'motion/react';
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
      {/* Image Container */}
      <div className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 group-hover:ring-2 group-hover:ring-white/20">
        <a
          href={image.src}
          data-fancybox="dynamic-gallery"
          data-caption={`${image.artist} - ${image.category}`}
          className="block w-full h-full"
        >
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </a>
        
        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Artist Label */}
        <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-white/90 text-xs font-bold tracking-wider">
            {image.artist}
          </span>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl md:rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500" />
      </div>
    </motion.div>
  );
}

// Main DynamicGallery Component
export function DynamicGallery({ className = "" }: DynamicGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Initialize Fancybox
  useEffect(() => {
    Fancybox.bind("[data-fancybox='dynamic-gallery']");

    return () => {
      Fancybox.destroy();
    };
  }, []);

  // Constants
  const IMAGE_WIDTH = 176; // 160px image + 16px gap

  // Create truly infinite gallery with seamless looping
  const createInfiniteGallery = useCallback(() => {
    const baseImages = getArtistImages();
    if (baseImages.length === 0) return [];
    
    const setsNeeded = Math.ceil(window.innerWidth / IMAGE_WIDTH) + 4;
    const infiniteImages: GalleryImage[] = [];
    
    for (let i = 0; i < setsNeeded; i++) {
      baseImages.forEach((img) => {
        infiniteImages.push({
          ...img,
          src: img.src,
          alt: img.alt,
          artist: img.artist,
          category: img.category
        });
      });
    }
    
    return infiniteImages;
  }, []);

  useEffect(() => {
    const infiniteImages = createInfiniteGallery();
    setImages(infiniteImages);
    setIsLoading(false);
  }, [createInfiniteGallery]);

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      const startInfiniteScroll = async () => {
        const baseImages = getArtistImages();
        const baseSetWidth = baseImages.length * IMAGE_WIDTH;
        
        await controls.start({
          x: -baseSetWidth,
          transition: {
            duration: baseImages.length * 4,
            repeat: Infinity,
            ease: "linear"
          }
        });
      };
      
      startInfiniteScroll();
    }
  }, [isLoading, images.length, controls]);

  // Pause animation on hover for better user experience
  const handleMouseEnter = useCallback(() => {
    controls.stop();
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    if (!isLoading && images.length > 0) {
      const baseImages = getArtistImages();
      const baseSetWidth = baseImages.length * IMAGE_WIDTH;
      
      controls.start({
        x: -baseSetWidth,
        transition: {
          duration: baseImages.length * 4,
          repeat: Infinity,
          ease: "linear"
        }
      });
    }
  }, [controls, isLoading, images.length]);

  if (isLoading) {
    return <LoadingSpinner className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
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
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gallery Track with True Infinity */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex gap-2 md:gap-3 lg:gap-4"
            animate={controls}
            style={{
              width: `${images.length * IMAGE_WIDTH}px`
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
