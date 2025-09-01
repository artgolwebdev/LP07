import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Calendar, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { BookingForm } from "./BookingForm";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { STUDIO_CONFIG, type Artist } from "../config/studio-config";

export function TattooStudio() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
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
        prev === STUDIO_CONFIG.images.hero.length - 1 ? 0 : prev + 1
      );
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppCall = () => {
    const phoneNumber = STUDIO_CONFIG.phone.replace(/\D/g, ''); // Remove non-digits
    const message = encodeURIComponent(STUDIO_CONFIG.whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation onBookingClick={() => setIsBookingOpen(true)} />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slideshow */}
        <motion.div 
          className="absolute inset-0"
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
              src={STUDIO_CONFIG.images.hero[currentHeroIndex]} 
              alt="SAGE Tattoo Studio" 
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          
          {/* Clean Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>

        {/* Hero Content with Epic Text Reveal Animations */}
        <motion.div
          className="relative z-10 text-center max-w-7xl mx-auto px-3 sm:px-4 md:px-6"
          style={{ y: textY, opacity: textOpacity, scale: titleScale }}
        >
          {/* Main Title */}
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 glow-text tracking-wider hero-text cursor-pointer select-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 50px rgba(255,255,255,0.8), 0 0 100px rgba(255,255,255,0.4)",
              filter: "brightness(1.2) contrast(1.1)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ 
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
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 tracking-[0.1em] sm:tracking-[0.2em] uppercase px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {STUDIO_CONFIG.tagline}
          </motion.p>
          

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-0.5 h-2 sm:h-3 bg-white/50 rounded-full mt-1.5 sm:mt-2" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 glow-text">
                WHERE ART<br />MEETS SKIN
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-white mb-6 sm:mb-8" />
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed mb-6 sm:mb-8">
                Located in the heart of Tel Aviv-Yaffo, {STUDIO_CONFIG.name} combines traditional 
                tattoo artistry with modern techniques. Each piece is a collaboration 
                between artist and client, creating timeless works that tell your unique story.
              </p>
              <div className="space-y-3 sm:space-y-4 text-white/60 text-base sm:text-lg md:text-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full flex-shrink-0" />
                  <span>Custom Designs & Consultations</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full flex-shrink-0" />
                  <span>Sterile Environment & Premium Equipment</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full flex-shrink-0" />
                  <span>Experienced Artists Specializing in Multiple Styles</span>
                </div>
              </div>
            </div>
                                    <div className="relative bg-gradient-to-br from-black via-zinc-900 to-black rounded-xl md:rounded-2xl overflow-hidden">
              {/* Enhanced Futuristic Video Grid - Square Layout */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 aspect-square">
                
                {/* Video 1 - GROC Paint (Top Left) */}
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
                    className="w-full h-full object-cover rounded-lg md:rounded-xl border-2 border-white/40 shadow-lg md:shadow-2xl"
                  >
                    <source src="assets/sections/studio/groc-paint.mp4" type="video/mp4" />
                    GROC Paint
                  </video>
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)] md:shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] md:group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
                  {/* Corner Accent with Animation */}
                  <motion.div 
                    className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-white/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Video Label */}
                  <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1 sm:left-2 md:left-3 bg-black/60 backdrop-blur-sm px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1 rounded-md md:rounded-lg border border-white/20">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">GROC Paint</span>
                  </div>
                </motion.div>

                {/* Video 2 - Party Video (Top Right) */}
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
                    className="w-full h-full object-cover rounded-lg md:rounded-xl border-2 border-white/40 shadow-lg md:shadow-2xl"
                  >
                    <source src="assets/sections/studio/party-video.mp4" type="video/mp4" />
                    Party Video
                  </video>
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)] md:shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] md:group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
                  {/* Corner Accent with Animation */}
                  <motion.div 
                    className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-white/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Video Label */}
                  <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1 sm:left-2 md:left-3 bg-black/60 backdrop-blur-sm px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1 rounded-md md:rounded-lg border border-white/20">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">Party Video</span>
                  </div>
                </motion.div>

                {/* Video 3 - Party Video 2 (Bottom Left) */}
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
                    className="w-full h-full object-cover rounded-lg md:rounded-xl border-2 border-white/40 shadow-lg md:shadow-2xl"
                  >
                    <source src="assets/sections/studio/party-video-2.mp4" type="video/mp4" />
                    Party Video 2
                  </video>
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)] md:shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] md:group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
                  {/* Corner Accent with Animation */}
                  <motion.div 
                    className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-white/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Video Label */}
                  <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1 sm:left-2 md:left-3 bg-black/60 backdrop-blur-sm px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1 rounded-md md:rounded-lg border border-white/20">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">Party Video 2</span>
                  </div>
                </motion.div>

                {/* Video 4 - Lady Monstera Video (Bottom Right) */}
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
                    className="w-full h-full object-cover rounded-lg md:rounded-xl border-2 border-white/40 shadow-lg md:shadow-2xl"
                  >
                    <source src="assets/sections/studio/lady-mostera.mp4" type="video/mp4" />
                    Lady Mostera
                  </video>
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)] md:shadow-[0_0_25px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] md:group-hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-500" />
                  {/* Corner Accent with Animation */}
                  <motion.div 
                    className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-white/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Video Label */}
                  <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1 sm:left-2 md:left-3 bg-black/60 backdrop-blur-sm px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1 rounded-md md:rounded-lg border border-white/20">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">Lady Mostera</span>
                  </div>
                  {/* Futuristic Pulse Ring */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{ 
                      scale: [1, 2, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              {/* Enhanced Futuristic Center Element */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 border border-white/20 rounded-full flex items-center justify-center z-30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
              >
                <div className="w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-white/40 rounded-full" />
              </motion.div>

              {/* Enhanced Flowing Lines */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d="M10,50 Q25,25 50,50 T90,50"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                    fill="none"
                    animate={{ 
                      d: [
                        "M10,50 Q25,25 50,50 T90,50",
                        "M10,50 Q25,75 50,50 T90,50",
                        "M10,50 Q25,25 50,50 T90,50"
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>

              {/* Enhanced Corner Accents */}
              <motion.div 
                className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 border-l-2 border-t-2 border-white/20 rounded-tl-lg z-30"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 border-r-2 border-t-2 border-white/20 rounded-tr-lg z-30"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 border-l-2 border-b-2 border-white/20 rounded-bl-lg z-30"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 border-r-2 border-b-2 border-white/20 rounded-br-lg z-30"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />

              {/* Floating Energy Particles */}
              <motion.div 
                className="absolute top-1/4 left-1/4 w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-white/30 rounded-full z-30"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-3/4 right-1/4 w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-white/30 rounded-full z-30"
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="absolute bottom-1/4 left-1/3 w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-white/30 rounded-full z-30"
                animate={{ 
                  x: [0, 8, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>
              </motion.div>
            </div>
          </section>

      {/* Artists Gallery */}
      <section id="artists" className="py-32 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-8 glow-text">OUR ARTISTS</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Meet our talented artists, each with their unique style and expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {STUDIO_CONFIG.artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Card className="relative bg-black border-white/20 overflow-hidden group-hover:border-white/50 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    <div className="relative">
                      {artist.image.endsWith('.mp4') ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        >
                          <source src={artist.image} type="video/mp4" />
                          {artist.name}
                        </video>
                      ) : (
                        <ImageWithFallback 
                          src={artist.image} 
                          alt={artist.name}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      )}
                      
                      {/* Clean Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 group-hover:scale-105" style={{ transformOrigin: 'center' }} />
                      
                      {/* Simple Corner Accent */}
                      <div className="absolute top-3 left-3 w-2 h-2 border-l-2 border-t-2 border-white/70 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
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
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {artist.portfolio.map((img, i) => (
                          <motion.div
                            key={i}
                            className="relative group/portfolio overflow-hidden rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <ImageWithFallback
                              src={img}
                              alt={`${artist.name} work ${i + 1}`}
                              className="w-full h-32 object-cover group-hover/portfolio:scale-110 transition-transform duration-400"
                            />
                            
                            {/* Subtle Hover Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/portfolio:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Clean Button */}
                      <Button
                        onClick={() => {
                          setSelectedArtist(artist.id);
                          setIsBookingOpen(true);
                        }}
                        className="w-full bg-white text-black hover:bg-white/90 transition-colors duration-300 font-bold tracking-wider"
                      >
                        Book with {artist.name.split(' ')[0]}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section id="gallery" className="py-40 px-6 bg-gradient-to-b from-black via-zinc-900/30 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 glow-text">OUR MASTERPIECES</h2>
            <div className="w-32 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of exceptional tattoo artistry. Each piece represents hours of dedication, 
              precision, and creative passion - from bold traditional designs to intricate fine line work.
            </p>
          </motion.div>

          {/* Unified Masterpieces Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              STUDIO_CONFIG.images.groc.main,
              STUDIO_CONFIG.images.sunches.main,
              STUDIO_CONFIG.images.studio,
              ...STUDIO_CONFIG.images.groc.portfolio,
              ...STUDIO_CONFIG.images.sunches.portfolio
            ].map((img, index) => (
              <motion.div
                key={`gallery-${index}`}
                className="relative group cursor-pointer overflow-hidden rounded"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <ImageWithFallback 
                  src={img} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.span 
                    className="text-white font-bold text-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    View Details
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* Contact & Booking Section */}
      <section className="py-32 px-6 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-8 glow-text">
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
                  onClick={() => setIsBookingOpen(true)}
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 text-2xl px-16 py-8 h-auto font-black tracking-wider uppercase transition-all duration-300 transform hover:shadow-2xl hover:shadow-white/20"
                >
                  <Calendar className="mr-4 h-8 w-8" />
                  Start Booking
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  hover: { duration: 0.3 }
                }}
              >
                <Button
                  onClick={handleWhatsAppCall}
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-400 text-2xl px-12 py-8 h-auto font-black tracking-wider uppercase transition-all duration-300 transform hover:shadow-2xl hover:shadow-green-500/30 relative overflow-hidden group whatsapp-pulse whatsapp-glow"
                >
                  {/* Animated background pulse */}
                  <motion.div
                    className="absolute inset-0 bg-green-400"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <MessageCircle className="mr-4 h-8 w-8 relative z-10" />
                  <span className="relative z-10">Talk Now</span>
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: [-100, 300] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer onBookingClick={() => setIsBookingOpen(true)} />

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        artists={STUDIO_CONFIG.artists}
      />

    </div>
  );
}