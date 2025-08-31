import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Calendar, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { BookingForm } from "./BookingForm";
import { Navigation } from "./Navigation";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { STUDIO_CONFIG, type Artist } from "../config/studio-config";

export function TattooStudio() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const handleWhatsAppCall = () => {
    const phoneNumber = STUDIO_CONFIG.phone.replace(/\D/g, ''); // Remove non-digits
    const message = encodeURIComponent(STUDIO_CONFIG.whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation onBookingClick={() => setIsBookingOpen(true)} />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback 
            src={STUDIO_CONFIG.images.studio} 
            alt="Tattoo Studio" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center max-w-6xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 glow-text tracking-wider hero-text"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {STUDIO_CONFIG.name}
          </motion.h1>
          
          <motion.div
            className="w-32 h-1 bg-white mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-12 tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Traditional Artistry • Modern Vision
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Eilat Street 22, Tel Aviv-Yaffo</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>+972 50-123-4567</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-5xl font-black mb-8 glow-text">
                WHERE ART<br />MEETS SKIN
              </h2>
              <div className="w-24 h-1 bg-white mb-8" />
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Located in the heart of Tel Aviv-Yaffo, our studio combines traditional 
                tattoo artistry with modern techniques. Each piece is a collaboration 
                between artist and client, creating timeless works that tell your unique story.
              </p>
              <div className="space-y-4 text-white/60">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Custom Designs & Consultations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Sterile Environment & Premium Equipment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Experienced Artists Specializing in Multiple Styles</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <motion.div
                className="relative tattoo-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback 
                  src={TATTOO_IMAGE_1} 
                  alt="Tattoo Artwork" 
                  className="w-full h-[600px] object-cover"
                />
              </motion.div>
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
              Meet our talented team of artists, each bringing their unique style and expertise to every piece.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTISTS.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black border-white/20 overflow-hidden group hover:border-white/40 transition-all duration-300">
                  <div className="relative">
                    <ImageWithFallback 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white mb-2">{artist.name}</h3>
                      <p className="text-white/60">{artist.specialties.join(' • ')}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {artist.portfolio.map((img, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ImageWithFallback
                            src={img}
                            alt={`${artist.name} work ${i + 1}`}
                            className="w-full h-32 object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedArtist(artist.id);
                        setIsBookingOpen(true);
                      }}
                      className="w-full bg-white text-black hover:bg-white/90 transition-colors"
                    >
                      Book with {artist.name.split(' ')[0]}
                    </Button>
                  </div>
                </Card>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[STUDIO_CONFIG.images.tattoo1, STUDIO_CONFIG.images.tattoo2, STUDIO_CONFIG.images.studio, STUDIO_CONFIG.images.tattooMachine, STUDIO_CONFIG.images.tattoo1, STUDIO_CONFIG.images.tattoo2].map((img, index) => (
              <motion.div
                key={index}
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
              READY TO GET<br />INKED?
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

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp onClick={handleWhatsAppCall} />

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        artists={ARTISTS}
      />
    </div>
  );
}