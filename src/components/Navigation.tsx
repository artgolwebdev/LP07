import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, Users, Calendar, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { STUDIO_CONFIG } from "../config/studio-config";

interface NavigationProps {
  onBookingClick: () => void;
}

export function Navigation({ onBookingClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const menuItems = [
    { name: t('nav.home'), icon: Home, action: () => scrollToSection('hero') },
    { name: t('nav.artists'), icon: Users, action: () => scrollToSection('artists') },
    { name: t('nav.contact'), icon: MessageCircle, action: () => scrollToSection('contact') },
  ];

  return (
    <>
      {/* Desktop/Mobile Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wider glow-text">
              {STUDIO_CONFIG.name}
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={item.action}
                className="text-white/70 hover:text-white transition-colors font-medium tracking-wider text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
            
            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <LanguageSwitcher />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={onBookingClick}
                size="sm"
                className="bg-white text-black hover:bg-white/90 font-bold tracking-wider uppercase"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t('nav.book')}
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white p-1.5 sm:p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider glow-text">
                  {STUDIO_CONFIG.name}
                </h1>
                <div className="flex items-center gap-3">
                  <LanguageSwitcher />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white p-1.5 sm:p-2"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 flex flex-col justify-center px-4 sm:px-6">
                <nav className="space-y-6 sm:space-y-8">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={item.action}
                      className="flex items-center gap-3 sm:gap-4 text-white hover:text-white/70 transition-colors text-xl sm:text-2xl font-bold tracking-wider w-full text-left"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      {item.name}
                    </motion.button>
                  ))}
                </nav>

                <motion.div
                  className="mt-8 sm:mt-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={() => {
                      onBookingClick();
                      setIsOpen(false);
                    }}
                    size="lg"
                    className="w-full bg-white text-black hover:bg-white/90 font-black tracking-wider uppercase text-lg sm:text-xl py-4 sm:py-6"
                  >
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                    {t('nav.book-session')}
                  </Button>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="p-4 sm:p-6 border-t border-white/20">
                <div className="text-center text-white/60 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <p>{t('studio.address')}</p>
                  <p>{t('studio.phone')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}