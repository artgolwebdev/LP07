import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { BookingForm } from "./BookingForm";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { STUDIO_CONFIG } from "../config/studio-config";
import { ArtistPortfolio } from "./ArtistPortfolio";

// Hero Section Component with Background Video
function HeroSection() {
  const { t } = useLanguage();
  // Smooth Parallax scroll effect
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -150]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const textY = useTransform(scrollY, [0, 400], [0, 80]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const titleScale = useTransform(scrollY, [0, 200], [1, 0.95]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: heroY, scale: heroScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="assets/dark-calli.mp4" type="video/mp4" />
          SAGE Tattoo Studio Background
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
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
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 tracking-[0.1em] sm:tracking-[0.2em] uppercase px-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {t('hero.tagline')}
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


// About Section Component
function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center py-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-6 md:mb-8 text-white tracking-tight py-1 leading-tight">
              <div className="space-y-0.5 sm:space-y-1">
                <div className="block leading-tight">{t('about.title.line1')}</div>
                <div className="block leading-tight">
                  {t('about.title.line2')}
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"> </span>
                  {t('about.title.line3')}
                </div>
              </div>
            </h2>
            <div className="w-24 h-1.5 bg-white mb-8" />
            <p className="text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed">
              {t('about.description')}
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
  const { t } = useLanguage();
  return (
    <section id="artists" className="py-20 px-6 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 relative">
          {/* Futuristic Background Grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-cyan-400/30"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.1, 
                    delay: i * 0.01,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </motion.div>

          {/* Glitch Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              opacity: [0, 1, 0, 1, 0],
              x: [0, -2, 2, -1, 0],
              y: [0, 1, -1, 0.5, 0]
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
              repeat: 2,
              repeatDelay: 0.1
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform -skew-x-12" />
          </motion.div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 text-white tracking-tight relative z-10">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('artists.title').split(' ').map((word, wordIndex) => (
                <motion.span
                  key={word}
                  className="inline-block mr-4 relative"
                  initial={{ 
                    opacity: 0, 
                    y: 200,
                    rotateX: -90,
                    scale: 0.1,
                    filter: "blur(20px)"
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 1.5,
                    delay: wordIndex * 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                    times: [0, 0.3, 0.7, 1]
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 5,
                    textShadow: "0 0 30px #00ffff, 0 0 60px #0080ff, 0 0 90px #8000ff",
                    filter: "drop-shadow(0 0 20px #00ffff)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Holographic Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1.1 }}
                    viewport={{ once: true }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1.1, 1.2, 1.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${word}-${letterIndex}`}
                      className="inline-block relative"
                      initial={{ 
                        opacity: 0, 
                        y: 150,
                        rotateZ: -180,
                        scale: 0.1,
                        skewY: 45,
                        x: Math.random() * 200 - 100,
                        filter: "blur(15px) brightness(0)"
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        rotateZ: 0,
                        scale: 1,
                        skewY: 0,
                        x: 0,
                        filter: "blur(0px) brightness(1)"
                      }}
                      transition={{
                        duration: 1.2,
                        delay: wordIndex * 0.6 + letterIndex * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                        times: [0, 0.2, 0.8, 1]
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      whileHover={{
                        scale: 1.2,
                        rotateZ: 10,
                        skewY: 5,
                        y: -5,
                        color: "#00ffff",
                        textShadow: "0 0 20px #00ffff, 0 0 40px #0080ff, 0 0 60px #8000ff",
                        filter: "drop-shadow(0 0 15px #00ffff) brightness(1.5)",
                        transition: { 
                          duration: 0.2, 
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }
                      }}
                      whileTap={{
                        scale: 0.95,
                        rotateZ: -3,
                        transition: { duration: 0.1 }
                      }}
                      style={{ 
                        display: "inline-block",
                        transformOrigin: "center center",
                        fontFamily: "inherit"
                      }}
                    >
                      {/* Matrix-style Digital Rain Effect */}
                      <motion.div
                        className="absolute inset-0 overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: wordIndex * 0.6 + letterIndex * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                          initial={{ y: "-100%" }}
                          whileInView={{ y: "100%" }}
                          transition={{ 
                            duration: 0.8, 
                            delay: wordIndex * 0.6 + letterIndex * 0.1 + 0.5,
                            ease: "easeInOut"
                          }}
                          viewport={{ once: true }}
                        />
                      </motion.div>
                      
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </span>
          </h2>

          {/* Cyberpunk Scan Line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
          
          {/* Bottom Scan Line */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            initial={{ x: "100%" }}
            whileInView={{ x: "-100%" }}
            transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {STUDIO_CONFIG.artists.map((artist, index) => (
            <div key={artist.id}>
              <div className="relative group">
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
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      >
                        <source src={artist.image} type="video/mp4" />
                        {artist.name}
                      </video>
                    ) : (
                      <ImageWithFallback 
                        src={artist.image} 
                        alt={artist.name}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />
                  </div>
                  
                  <div className="pb-4 px-3 md:px-4">
                    <div className="mb-3">
                      <h3 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-white/90 transition-colors duration-300">
                        {artist.name}
                      </h3>
                      <p className="text-sm md:text-base text-white/80 group-hover:text-white/90 transition-colors duration-300">
                        {artist.specialties.join(' • ')}
                      </p>
                    </div>
                    
                    <ArtistPortfolio 
                      artistId={artist.id} 
                      className="mb-3"
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative z-10"
                    >
                      <Button
                        onClick={() => onArtistSelect(artist.id)}
                                                 className={`w-full transition-all duration-300 font-bold tracking-wider py-2 md:py-3 text-sm md:text-base ${
                           artist.id === "groc" 
                             ? "font-['UnifrakturMaguntia'] tracking-[0.1em] text-lg bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white shadow-lg hover:shadow-xl hover:shadow-white/20" 
                             : artist.id === "sunches"
                             ? "artist-button-sunches"
                             : artist.id === "derk"
                             ? "artist-button-derk"
                             : artist.id === "jenya"
                             ? "artist-button-jenya"
                             : artist.id === "gosha"
                             ? "artist-button-gosha"
                             : artist.id === "tact"
                             ? "artist-button-tact"
                             : artist.id === "dani"
                             ? "artist-button-dani"
                             : "bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white shadow-lg hover:shadow-xl hover:shadow-white/20"
                         }`}
                        style={artist.id === "groc" ? { fontFamily: "'UnifrakturMaguntia', cursive" } : {}}
                      >
                        <span className="artist-book-text">{t('artists.book-with')}</span> {artist.name.split(' ')[0]}
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection({ onBookingClick }: { onBookingClick: () => void }) {
  const { t } = useLanguage();
  const handleWhatsAppCall = () => {
    const phoneNumber = STUDIO_CONFIG.phone.replace(/\D/g, '');
    const message = encodeURIComponent(t('studio.whatsapp-message'));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 px-6 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Title with Artistic Animation */}
          <div className="relative mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
              <div className="space-y-2 sm:space-y-3">
                {/* First Line */}
                <motion.div
                  className="block"
                  initial={{ opacity: 0, y: 100, rotateX: -90, scale: 0.5 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0, 
                    scale: 1 
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.2, 
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    {t('contact.title.line1')}
                  </span>
                </motion.div>

                {/* Second Line */}
                <motion.div
                  className="block"
                  initial={{ opacity: 0, y: 100, rotateX: -90, scale: 0.5 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0, 
                    scale: 1 
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.6, 
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    {t('contact.title.line2')}
                  </span>
                </motion.div>
              </div>
            </h2>

            {/* Animated Decorative Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-8 h-8 border-2 border-white/30 rounded-full"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0 
              }}
              transition={{ 
                duration: 1, 
                delay: 1.2,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-white/30 rounded-full"
              initial={{ opacity: 0, scale: 0, rotate: 180 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0 
              }}
              transition={{ 
                duration: 1, 
                delay: 1.4,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.div>

            {/* Animated Divider */}
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-8"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: 1.8,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            />
          </div>
          

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
                {t('contact.start-booking')}
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
                {t('contact.talk-now')}
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