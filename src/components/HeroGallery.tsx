import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export function HeroGallery() {
  const featuredImages = [
    "assets/artists/groc/groc-artwork-1.jpg",
    "assets/artists/groc/groc-artwork-2.jpg",
    "assets/artists/groc/groc-artwork-3.jpg",
    "assets/artists/groc/groc-artwork-4.jpg",
    "assets/artists/groc/groc-artwork-5.jpg",
    "assets/artists/groc/groc-artwork-6.jpg"
  ];

  // Initialize Fancybox
  useEffect(() => {
    Fancybox.bind("[data-fancybox='hero-gallery']");

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <section className="py-16 px-6 bg-black relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            FEATURED ARTWORK
          </h2>
          <div className="w-24 h-1 bg-white mx-auto" />
        </motion.div>

        {/* Autoscrolling Gallery */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-4 md:gap-6"
            animate={{ 
              x: [0, -100 * featuredImages.length]
            }}
            transition={{ 
              duration: 20 * featuredImages.length,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Duplicate images for seamless loop */}
            {[...featuredImages, ...featuredImages].map((image, index) => (
              <motion.div
                key={index}
                className="group relative flex-shrink-0 w-64 md:w-80 aspect-square overflow-hidden rounded-xl cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  z: 10
                }}
              >
                <a
                  href={image}
                  data-fancybox="hero-gallery"
                  data-caption={`Featured artwork ${index + 1}`}
                  className="block w-full h-full"
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Featured artwork ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </a>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
                
                {/* Corner accent on hover */}
                <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/0 group-hover:border-white/60 transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
