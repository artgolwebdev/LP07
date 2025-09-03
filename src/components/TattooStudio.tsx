import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { BookingForm } from "./BookingForm";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { STUDIO_CONFIG } from "../config/studio-config";
import { DynamicGallery } from "./DynamicGallery";
import { ArtistPortfolio } from "./ArtistPortfolio";
import { HeroGallery } from "./HeroGallery";

// Hero Section Component
function HeroSection() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  // Smooth Parallax scroll effect
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -150]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const textY = useTransform(scrollY, [0, 400], [0, 80]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const titleScale = useTransform(scrollY, [0, 200], [1, 0.95]);

  // Background changing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => 
        prev === STUDIO_CONFIG.heroImages.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Slideshow */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: heroY, scale: heroScale }}
      >
        {/* Current Background Image */}
        <motion.div
          key={currentHeroIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <ImageWithFallback 
            src={STUDIO_CONFIG.heroImages[currentHeroIndex]} 
            alt="SAGE Tattoo Studio" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Subtle gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main Title and Subtitle Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          style={{ y: textY, opacity: textOpacity, scale: titleScale }}
        >
          {/* Main Title */}
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-wider hero-text cursor-pointer select-none"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 25%, #e8e8e8 50%, #f8f8f8 75%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.2)',
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ 
              scale: 1.02,
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5)) brightness(1.1)',
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('gallery')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            {STUDIO_CONFIG.name}
          </motion.h1>
          
          {/* Divider */}
          <motion.div
            className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white mx-auto mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Tagline */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 tracking-[0.1em] sm:tracking-[0.2em] uppercase px-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {STUDIO_CONFIG.tagline}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-0.5 h-2 sm:h-3 bg-white/50 rounded-full mt-1.5 sm:mt-2" />
        </div>
      </motion.div>
    </section>
  );
}

// Gallery Section Component with Bold Futuristic Design
function GallerySection() {
  return (
    <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-black via-zinc-900/30 to-black relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} 
          />
        </div>
        
        {/* Floating Geometric Shapes */}
        <motion.div 
          className="absolute top-20 left-10 w-4 h-4 border-2 border-white/20 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-6 h-6 border-2 border-white/15 transform rotate-45"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [45, 225, 405]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-3 h-3 bg-white/20 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Gallery Container - No title/subtitle, just the gallery */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Futuristic Border Frame */}
          <div className="relative bg-gradient-to-br from-zinc-900/50 via-black/30 to-zinc-900/50 rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/40 rounded-tl" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/40 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/40 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/40 rounded-br" />
            
            {/* Gallery Component */}
            <DynamicGallery className="p-8 md:p-12" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 text-white tracking-tight">
              WHERE ART<br />MEETS SKIN
            </h2>
            <div className="w-24 h-1.5 bg-white mb-8" />
            <p className="text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed">
              Located in the heart of Tel Aviv-Yaffo, {STUDIO_CONFIG.name} combines traditional 
              tattoo artistry with modern techniques. Each piece is a collaboration 
              between artist and client, creating timeless works that tell your unique story.
            </p>
          </div>
          
          <div className="relative bg-gradient-to-br from-black via-zinc-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Enhanced Futuristic Video Grid */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 p-3 lg:p-4 aspect-square">
              {/* Video 1 - GROC Paint */}
              <motion.div 
                className="relative group aspect-square"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  boxShadow: "0 0 40px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-xl border border-white/30 shadow-xl"
                >
                  <source src="assets/sections/studio/groc-paint.mp4" type="video/mp4" />
                  GROC Paint
                </video>
                <div className="absolute inset-0 rounded-xl border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
              </motion.div>

              {/* Video 2 - Party Video */}
              <motion.div 
                className="relative group aspect-square"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: -2,
                  boxShadow: "0 0 40px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-xl border border-white/30 shadow-xl"
                >
                  <source src="assets/sections/studio/party-video.mp4" type="video/mp4" />
                  Party Video
                </video>
                <div className="absolute inset-0 rounded-xl border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
              </motion.div>

              {/* Video 3 - Party Video 2 */}
              <motion.div 
                className="relative group aspect-square"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  boxShadow: "0 0 40px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-xl border border-white/30 shadow-xl"
                >
                  <source src="assets/sections/studio/party-video-2.mp4" type="video/mp4" />
                  Party Video 2
                </video>
                <div className="absolute inset-0 rounded-xl border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
              </motion.div>

              {/* Video 4 - Lady Monstera */}
              <motion.div 
                className="relative group aspect-square"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: -2,
                  boxShadow: "0 0 40px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-xl border border-white/30 shadow-xl"
                >
                  <source src="assets/sections/studio/lady-mostera.mp4" type="video/mp4" />
                  Lady Mostera
                </video>
                <div className="absolute inset-0 rounded-xl border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
              </motion.div>
            </div>

            {/* Central Futuristic Element */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center z-30"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className="w-2 h-2 bg-white/40 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Artists Section Component
function ArtistsSection({ onArtistSelect }: { onArtistSelect: (artistId: string) => void }) {
  return (
    <section id="artists" className="py-32 px-6 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 text-white tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              OUR ARTISTS
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {STUDIO_CONFIG.artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Card className="relative bg-gradient-to-br from-black via-zinc-900 to-black border border-white/20 overflow-hidden rounded-2xl shadow-lg group">
                  {/* Artistic Flowing Border Animation */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    {/* Top Border Flow */}
                    <motion.div 
                      className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{ 
                        width: "100%",
                        opacity: 1
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Right Border Flow */}
                    <motion.div 
                      className="absolute top-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent"
                      initial={{ height: 0, opacity: 0 }}
                      whileHover={{ 
                        height: "100%",
                        opacity: 1
                      }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    />
                    
                    {/* Bottom Border Flow */}
                    <motion.div 
                      className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-white to-transparent"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{ 
                        width: "100%",
                        opacity: 1
                      }}
                      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    />
                    
                    {/* Left Border Flow */}
                    <motion.div 
                      className="absolute bottom-0 left-0 w-0.5 bg-gradient-to-t from-transparent via-white to-transparent"
                      initial={{ height: 0, opacity: 0 }}
                      whileHover={{ 
                        height: "100%",
                        opacity: 1
                      }}
                      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Corner Glow Effects */}
                  <motion.div 
                    className="absolute top-0 left-0 w-3 h-3 rounded-tl-2xl border-l border-t border-white/0"
                    whileHover={{ 
                      borderColor: "rgba(255,255,255,0.8)",
                      boxShadow: "0 0 15px rgba(255,255,255,0.6)"
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                  
                  <motion.div 
                    className="absolute top-0 right-0 w-3 h-3 rounded-tr-2xl border-r border-t border-white/0"
                    whileHover={{ 
                      borderColor: "rgba(255,255,255,0.8)",
                      boxShadow: "0 0 15px rgba(255,255,255,0.6)"
                    }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-br-2xl border-r border-b border-white/0"
                    whileHover={{ 
                      borderColor: "rgba(255,255,255,0.8)",
                      boxShadow: "0 0 15px rgba(255,255,255,0.6)"
                    }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 w-3 h-3 rounded-bl-2xl border-l border-b border-white/0"
                    whileHover={{ 
                      borderColor: "rgba(255,255,255,0.8)",
                      boxShadow: "0 0 15px rgba(255,255,255,0.6)"
                    }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  />
                  
                  {/* Inner Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl border border-white/0"
                    whileHover={{ 
                      borderColor: "rgba(255,255,255,0.3)",
                      boxShadow: "inset 0 0 20px rgba(255,255,255,0.1)"
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <div className="relative overflow-hidden">
                    {artist.image.endsWith('.mp4') ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      >
                        <source src={artist.image} type="video/mp4" />
                        {artist.name}
                      </video>
                    ) : (
                      <ImageWithFallback 
                        src={artist.image} 
                        alt={artist.name}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-white/90 transition-colors duration-300">
                        {artist.name}
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        {artist.specialties.join(' • ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ArtistPortfolio 
                      artistId={artist.id} 
                      className="mb-2"
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative z-10"
                    >
                      <Button
                        onClick={() => onArtistSelect(artist.id)}
                        className="w-full bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white transition-all duration-300 font-bold tracking-wider py-3 shadow-lg hover:shadow-xl hover:shadow-white/20"
                      >
                        Book with {artist.name.split(' ')[0]}
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection({ onBookingClick }: { onBookingClick: () => void }) {
  const handleWhatsAppCall = () => {
    const phoneNumber = STUDIO_CONFIG.phone.replace(/\D/g, '');
    const message = encodeURIComponent(STUDIO_CONFIG.whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-32 px-6 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl font-black mb-8 text-white">
            READY TO GET<br />SAGED?
          </h2>
          <div className="w-32 h-1 bg-white mx-auto mb-12" />
          
          <p className="text-2xl text-white/80 mb-16 leading-relaxed">
            Start your tattoo journey today. Book a consultation with our artists 
            and bring your vision to life.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onBookingClick}
                size="lg"
                className="bg-white text-black hover:bg-white/90 text-2xl px-16 py-8 h-auto font-black tracking-wider uppercase transition-all duration-300 transform hover:shadow-2xl hover:shadow-white/20"
              >
                <Calendar className="mr-4 h-8 w-8" />
                Start Booking
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button
                onClick={handleWhatsAppCall}
                size="lg"
                className="bg-green-500 text-white hover:bg-green-400 text-2xl px-12 py-8 h-auto font-black tracking-wider uppercase transition-all duration-300 transform hover:shadow-2xl hover:shadow-green-500/30"
              >
                <MessageCircle className="mr-4 h-8 w-8" />
                Talk Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main TattooStudio Component
export function TattooStudio() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const handleArtistSelect = (artistId: string) => {
    setSelectedArtist(artistId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation onBookingClick={() => setIsBookingOpen(true)} />

      {/* Hero Section */}
      <HeroSection />

      {/* Hero Gallery - Featured artwork below hero */}
      <HeroGallery />

      {/* Gallery Section - Now below hero with bold futuristic design */}
      <GallerySection />

      {/* About Section */}
      <AboutSection />

      {/* Artists Gallery */}
      <ArtistsSection onArtistSelect={handleArtistSelect} />

      {/* Contact & Booking Section */}
      <ContactSection onBookingClick={() => setIsBookingOpen(true)} />

      {/* Footer */}
      <Footer onBookingClick={() => setIsBookingOpen(true)} />

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        artists={STUDIO_CONFIG.artists}
        preSelectedArtist={selectedArtist}
      />
    </div>
  );
}