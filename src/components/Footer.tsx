import React from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { STUDIO_CONFIG } from "../config/studio-config";

interface FooterProps {
  onBookingClick: () => void;
}

export function Footer({ onBookingClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: STUDIO_CONFIG.social.instagram, label: "Instagram" },
    { icon: Facebook, href: STUDIO_CONFIG.social.facebook, label: "Facebook" },
  ];

  const contactInfo = [
    { icon: MapPin, text: STUDIO_CONFIG.address, subtext: STUDIO_CONFIG.addressSubtext },
    { icon: Phone, text: STUDIO_CONFIG.phone, subtext: "Call or WhatsApp" },
    { icon: Mail, text: STUDIO_CONFIG.email, subtext: "Quick response guaranteed" },
  ];

  const openingHours = STUDIO_CONFIG.openingHours;

  return (
    <footer className="relative bg-black text-white overflow-hidden footer-bg-animation">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Ink Drops */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-3 h-3 bg-white/15' : 
              i % 3 === 1 ? 'w-2 h-2 bg-white/10' : 'w-1 h-1 bg-white/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ink Splash Effects */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`splash-${i}`}
            className="absolute w-8 h-8 bg-white/5 ink-splash"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 10)}%`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-zinc-900/60 to-black/80"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pulse Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
          {/* Studio Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-4xl font-black mb-6 glow-text tracking-wider"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {STUDIO_CONFIG.name}
            </motion.h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
              {STUDIO_CONFIG.subtitle}. Professional tattoo artists creating timeless pieces 
              with precision, passion, and uncompromising quality since 2018.
            </p>
            
            <motion.div
              className="mb-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onBookingClick}
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-black tracking-wider uppercase px-8 py-6"
              >
                Book Your Session
              </Button>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="h-5 w-5 text-white group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <info.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{info.text}</p>
                    <p className="text-white/60 text-sm">{info.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Location Section */}
        <motion.div
          className="mt-16 border-t border-white/20 pt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Hours Section - Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Clock className="h-7 w-7 text-white" />
                <h3 className="text-2xl font-black text-white uppercase tracking-wider glow-text">
                  Studio Hours
                </h3>
              </div>
              <div className="space-y-4">
                {openingHours.map((schedule, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center py-3 px-4 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <span className="text-white font-medium">
                      {schedule.day}
                    </span>
                    <span className="text-white font-black text-lg">
                      {schedule.hours}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map Section - Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="h-7 w-7 text-white" />
                <h3 className="text-2xl font-black text-white uppercase tracking-wider glow-text">
                  Find Us
                </h3>
              </div>
              
              {/* Map Container */}
              <motion.div
                className="relative bg-white/5 rounded border border-white/20 overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.0998!2d34.7692!3d32.0681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7c947a1c1d%3A0x1c1e1f1e1f1e1f1e!2sEilat%20St%2022%2C%20Tel%20Aviv-Yafo%2C%20Israel!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                {/* Overlay for better integration */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
              </motion.div>

              {/* Navigation Links */}
              <div className="flex gap-4 mt-6">
                <motion.a
                  href="https://maps.google.com/?q=Eilat+Street+22,+Tel+Aviv-Yaffo,+Israel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-black text-sm uppercase tracking-wider py-3 px-4 text-center transition-all duration-300 rounded"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Open in Maps
                </motion.a>
                <motion.a
                  href="https://waze.com/ul?q=Eilat+Street+22,+Tel+Aviv-Yaffo,+Israel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 text-white font-black text-sm uppercase tracking-wider py-3 px-4 text-center transition-all duration-300 rounded"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Navigate with Waze
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/20 mt-16 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <span>&copy; {currentYear} SAGE Studio. All rights reserved.</span>
            </div>
            
            <motion.div
              className="flex items-center gap-2 text-white/60"
              whileHover={{ scale: 1.05 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.div>
              <span>for SAGE enthusiasts</span>
            </motion.div>

            <div className="flex gap-6 text-sm text-white/60">
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
}