import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X, ArrowLeft, ArrowRight, Upload, Calendar, Clock, Check, Phone, Mail, MessageCircle, Shield, User, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PLACEMENT_OPTIONS, SIZE_OPTIONS, TIME_SLOTS, BUDGET_OPTIONS, FormData } from "./booking-constants";
import { useLanguage } from "../contexts/LanguageContext";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  artists: Array<{ id: string; name: string; specialties: string[]; image: string; profileImage: string }>;
  preSelectedArtist?: string | null;
}



export function BookingForm({ isOpen, onClose, artists, preSelectedArtist }: BookingFormProps) {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(preSelectedArtist ? 2 : 1);
  const [formData, setFormData] = useState<FormData>({
    artistId: preSelectedArtist || "",
    description: "",
    placement: "",
    size: "",
    date: "",
    time: "",
    selectedDate: undefined,
    budget: "",
    email: "",
    name: "",
    phone: "",
    instagram: "",
    telegram: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSelectingArtist, setIsSelectingArtist] = useState(false);
  const [isSelectingPlacement, setIsSelectingPlacement] = useState(false);
  const [isSelectingSize, setIsSelectingSize] = useState(false);
  const [isSelectingTime, setIsSelectingTime] = useState(false);
  const [isSelectingBudget, setIsSelectingBudget] = useState(false);

  const selectedArtist = artists.find(a => a.id === formData.artistId);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const timesSectionRef = useRef<HTMLDivElement>(null);

  // Scroll to top function with smooth animation
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to times section function
  const scrollToTimesSection = () => {
    if (timesSectionRef.current && scrollContainerRef.current) {
      const timesSectionTop = timesSectionRef.current.offsetTop - 100; // Offset for better positioning
      scrollContainerRef.current.scrollTo({
        top: timesSectionTop,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll to top when step changes
  useEffect(() => {
    scrollToTop();
  }, [currentStep]);

  // Auto-focus on vision textarea when reaching step 2 (desktop only)
  useEffect(() => {
    if (currentStep === 2) {
      // Check if device is desktop (not mobile/tablet)
      const isDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window);
      
      if (isDesktop) {
      // Longer delay to ensure the component is fully rendered and animations are complete
      const focusTimeout = setTimeout(() => {
        if (visionTextareaRef.current) {
          visionTextareaRef.current.focus();
          // Also scroll the textarea into view
          visionTextareaRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 800); // Increased delay to account for animations

      return () => clearTimeout(focusTimeout);
      }
    }
  }, [currentStep]);

  // Handle pre-selected artist
  useEffect(() => {
    if (preSelectedArtist) {
      setFormData(prev => ({ ...prev, artistId: preSelectedArtist }));
      setCurrentStep(2);
    }
  }, [preSelectedArtist]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < 11) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => scrollToTop(), 100);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1: return formData.artistId !== "";
      case 2: return formData.description !== "";
      case 3: return formData.placement !== "";
      case 4: return formData.size !== "";
      case 5: return formData.selectedDate !== undefined && formData.time !== "";
      case 6: return formData.budget !== "";
      case 7: return formData.name !== "" && formData.email !== "";
      case 8: return formData.phone !== "" || formData.instagram !== "" || formData.telegram !== "";
      case 9: return true;
      default: return false;
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setTimeout(() => scrollToTop(), 100);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Play submission sound effect
    const playSubmissionSound = () => {
      // Create a simple audio context for sound effects
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a pleasant "sent" sound effect
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a rising tone that sounds like "sent"
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };
    
    // Play sound immediately
    try {
      playSubmissionSound();
    } catch (error) {
    }
    
    // Enhanced animation sequence
    setTimeout(() => {
      setCurrentStep(10);
    }, 1500);
  };

  const updateFormData = (field: keyof FormData, value: string | File | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      artistId: "",
      description: "",
      placement: "",
      size: "",
      date: "",
      time: "",
      selectedDate: undefined,
      budget: "",
      email: "",
      name: "",
      phone: "",
      instagram: "",
      telegram: "",
      notes: "",
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    scrollToTop();
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      setFormData(prev => ({ 
        ...prev, 
        selectedDate: date, 
        date: dateString 
      }));
      // Scroll to times section after date selection
      setTimeout(() => {
        scrollToTimesSection();
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`bg-black border border-white/20 w-full max-w-2xl h-[90vh] flex flex-col rounded-lg overflow-hidden`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Fixed Header */}
        <div ref={headerRef} className="flex-shrink-0 p-6 border-b border-white/20 flex items-center justify-between bg-black/95 backdrop-blur-sm booking-form-header">
          {language === 'he' ? (
            <>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
                <X className="h-6 w-6" />
              </Button>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-white">{t('booking.title')}</h2>
                <p className="text-white/60">{t('booking.step')} {currentStep} {t('booking.of')} 10</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">{t('booking.title')}</h2>
                <p className="text-white/60">{t('booking.step')} {currentStep} {t('booking.of')} 10</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
                <X className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Fixed Progress Bar */}
        <div className="flex-shrink-0 h-1 bg-white/10">
                  <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / 10) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
        </div>

        {/* Scrollable Form Steps Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Top fade effect */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
          
          
          {/* Form Steps */}
          <div className="p-6 pb-8 min-h-full flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Choose Artist */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">{t('booking.choose-artist')}</h3>
                  

                  
                  {isSelectingArtist && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      {t('booking.selecting-artist')}
                    </motion.div>
                  )}
                  <div className="grid gap-4">
                    {artists.map((artist) => (
                      <Card
                        key={artist.id}
                        className={`p-4 cursor-pointer transition-all border-2 ${
                          formData.artistId === artist.id 
                            ? 'border-white bg-white/10' 
                            : 'border-white/20 hover:border-white/40'
                        } ${isSelectingArtist ? 'pointer-events-none' : ''}`}
                        onClick={() => {
                          if (isSelectingArtist) return;
                          setIsSelectingArtist(true);
                          updateFormData('artistId', artist.id);
                          setTimeout(() => {
                            nextStep();
                            setIsSelectingArtist(false);
                          }, 600);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                            <ImageWithFallback src={artist.profileImage} alt={`${artist.name} profile`} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white">{artist.name}</h4>
                            <p className="text-white/60">{artist.specialties.join(', ')}</p>
                          </div>
                          {formData.artistId === artist.id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                            >
                              <Check className="h-4 w-4 text-black" />
                            </motion.div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                  

                </motion.div>
              )}

              {/* Step 2: Artist Details & Describe Your Vision */}
              {currentStep === 2 && selectedArtist && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-6">{t('booking.artist-vision')}</h3>
                  
                  <div className="flex-1 flex flex-col space-y-6">
                    {/* Top Row: Artist Details & Reference Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Artist Details - Small Box */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Card className="relative bg-gradient-to-br from-black via-zinc-900 to-black border border-white/20 overflow-hidden rounded-xl shadow-lg h-full">
                          <div className="relative overflow-hidden">
                            {selectedArtist.image.endsWith('.mp4') ? (
                              <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-24 object-cover transition-transform duration-700 ease-out"
                              >
                                <source src={selectedArtist.image} type="video/mp4" />
                                {selectedArtist.name}
                              </video>
                            ) : (
                              <ImageWithFallback 
                                src={selectedArtist.image} 
                                alt={selectedArtist.name}
                                className="w-full h-24 object-cover transition-transform duration-700 ease-out"
                              />
                            )}
                            
                            {/* Optimized Artist Video Overlay System */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 sm:from-black/80 md:from-black/90 via-black/40 sm:via-black/45 md:via-black/50 via-black/15 sm:via-black/20 md:via-black/25 to-black/15 transition-all duration-300" />
                            {/* Seamless edge coverage */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                                <ImageWithFallback 
                                  src={selectedArtist.profileImage} 
                                  alt={`${selectedArtist.name} profile`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                              <h3 className="text-lg font-black text-white mb-1 transition-colors duration-300">
                                {selectedArtist.name}
                              </h3>
                              <p className="text-sm text-white/80 transition-colors duration-300">
                                {selectedArtist.specialties.join(' • ')}
                              </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-green-400 text-xs">
                              <Check className="h-3 w-3" />
                              <span>{t('booking.selected-artist')}</span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>

                      {/* Reference Image Upload - Small Box */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Card className="border border-white/20 bg-white/5 rounded-xl h-full">
                          <div className="p-4 h-full flex flex-col">
                            <Label className="text-white mb-3 block flex items-center text-sm">
                              <Upload className="h-4 w-4 mr-2" />
                              {t('booking.reference-images')}
                            </Label>
                            
                            <motion.div 
                              whileHover={{ scale: 1.01 }}
                              className="border-2 border-dashed border-white/20 p-4 text-center hover:border-white/40 transition-all duration-300 rounded-lg bg-gradient-to-br from-white/5 to-transparent flex-1 flex flex-col justify-center"
                            >
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                <Upload className="h-8 w-8 text-white/40 mx-auto mb-2" />
                                <p className="text-white/60 text-xs mb-3">
                                  {t('booking.share-inspiration')}
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => e.target.files?.[0] && updateFormData('referenceImage', e.target.files[0])}
                                  className="hidden"
                                  id="reference-upload"
                                />
                                <Label htmlFor="reference-upload" className="cursor-pointer">
                                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 hover:border-white text-xs" type="button">
                                    {t('booking.browse-files')}
                                  </Button>
                                </Label>
                                {formData.referenceImage && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 p-2 bg-white/10 rounded-lg"
                                  >
                                    <div className="flex items-center justify-center">
                                      <Check className="h-3 w-3 text-green-400 mr-2" />
                                      <p className="text-white/80 text-xs">
                                        {(formData.referenceImage as File).name}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </motion.div>
                            </motion.div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Bottom Section: Vision Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div>
                        <Label className="text-white mb-4 block flex items-center">
                          <Zap className="h-5 w-5 mr-2" />
                          {t('booking.describe-vision')}
                        </Label>
                        <Textarea
                          ref={visionTextareaRef}
                          placeholder={t('booking.vision-placeholder')}
                          value={formData.description}
                          onChange={(e) => updateFormData('description', e.target.value)}
                          className="min-h-40 bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Placement */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">{t('booking.choose-placement')}</h3>
                  {isSelectingPlacement && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      {t('booking.selecting-placement')}
                    </motion.div>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PLACEMENT_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isSelected = formData.placement === option.name;
                      return (
                        <motion.div
                          key={option.name}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'transform scale-105' 
                              : ''
                          } ${isSelectingPlacement ? 'pointer-events-none' : ''}`}
                          onClick={() => {
                            if (isSelectingPlacement) return;
                            setIsSelectingPlacement(true);
                            updateFormData('placement', option.name);
                            setTimeout(() => {
                              nextStep();
                              setIsSelectingPlacement(false);
                            }, 600);
                          }}
                        >
                          <Card className={`p-4 h-full border-2 transition-all duration-300 ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg shadow-white/20' 
                              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                          }`}>
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div className={`p-3 rounded-full transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-white text-black' 
                                  : 'bg-white/10 text-white group-hover:bg-white/20'
                              }`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className={`text-sm font-bold transition-colors ${
                                  isSelected ? 'text-white' : 'text-white/90'
                                }`}>
                                  {t(`placement.${option.name}`)}
                                </h4>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                                >
                                  <Check className="h-3 w-3 text-black" />
                                </motion.div>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Size */}
              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">{t('booking.choose-size')}</h3>
                  {isSelectingSize && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      {t('booking.selecting-size')}
                    </motion.div>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SIZE_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isSelected = formData.size === option.name;
                      return (
                        <motion.div
                          key={option.name}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'transform scale-105' 
                              : ''
                          } ${isSelectingSize ? 'pointer-events-none' : ''}`}
                          onClick={() => {
                            if (isSelectingSize) return;
                            setIsSelectingSize(true);
                            updateFormData('size', option.name);
                            setTimeout(() => {
                              nextStep();
                              setIsSelectingSize(false);
                            }, 600);
                          }}
                        >
                          <Card className={`p-6 h-full border-2 transition-all duration-300 ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg shadow-white/20' 
                              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                          }`}>
                            <div className="flex flex-col items-center text-center space-y-3">
                              <div className={`p-4 rounded-full transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-white text-black' 
                                  : 'bg-white/10 text-white group-hover:bg-white/20'
                              }`}>
                                <Icon className="h-7 w-7" />
                              </div>
                              <div>
                                <h4 className={`text-base font-bold transition-colors ${
                                  isSelected ? 'text-white' : 'text-white/90'
                                }`}>
                                  {t(`size.${option.name}`)}
                                </h4>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                >
                                  <Check className="h-4 w-4 text-black" />
                                </motion.div>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Date & Time */}
              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">{t('booking.choose-datetime')}</h3>
                  
                  {/* Calendar Section */}
                  <div className="mb-8">
                    <Label className="text-white mb-4 block flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      {t('booking.select-date')}
                    </Label>
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                      <DatePicker
                        selected={formData.selectedDate}
                        onChange={handleDateSelect}
                        minDate={new Date()}
                        inline
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  {/* Times Section - Only show after date is selected */}
                  {formData.selectedDate && (
                    <motion.div
                      ref={timesSectionRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <Label className="text-white mb-4 block flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        {t('booking.available-times')}
                      </Label>
                      {isSelectingTime && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center mb-4 text-white/60"
                        >
                          Selecting time...
                        </motion.div>
                      )}
                      <div className="space-y-3 max-h-64 overflow-y-auto overflow-x-hidden custom-scrollbar">
                        {TIME_SLOTS.map((slot) => (
                          <motion.div
                            key={slot.time}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              !slot.available 
                                ? 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed' 
                                : formData.time === slot.time
                                  ? 'border-white bg-white/10'
                                  : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                            } ${isSelectingTime ? 'pointer-events-none' : ''}`}
                            onClick={() => {
                              if (!slot.available || isSelectingTime) return;
                              setIsSelectingTime(true);
                              updateFormData('time', slot.time);
                              if (formData.selectedDate) {
                                setTimeout(() => {
                                  nextStep();
                                  setIsSelectingTime(false);
                                }, 600);
                              } else {
                                setIsSelectingTime(false);
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-white font-bold">{slot.time}</div>
                                <div className="text-white/60 text-sm">{t(`time.${slot.period}`)}</div>
                              </div>
                              <div>
                                {!slot.available ? (
                                  <span className="text-white/40 text-sm">{t('availability.unavailable')}</span>
                                ) : formData.time === slot.time ? (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                  >
                                    <Check className="h-4 w-4 text-black" />
                                  </motion.div>
                                ) : (
                                  <span className="text-white/60 text-sm">{t('availability.available')}</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 6: Budget */}
              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">{t('booking.choose-budget')}</h3>
                  {isSelectingBudget && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      {t('booking.selecting-budget')}
                    </motion.div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BUDGET_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isSelected = formData.budget === option.range;
                      return (
                        <motion.div
                          key={option.range}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'transform scale-105' 
                              : ''
                          } ${isSelectingBudget ? 'pointer-events-none' : ''}`}
                          onClick={() => {
                            if (isSelectingBudget) return;
                            setIsSelectingBudget(true);
                            updateFormData('budget', option.range);
                            setTimeout(() => {
                              nextStep();
                              setIsSelectingBudget(false);
                            }, 600);
                          }}
                        >
                          <Card className={`p-6 h-full border-2 transition-all duration-300 ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg shadow-white/20' 
                              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                          }`}>
                            <div className="flex flex-col items-center text-center space-y-4">
                              <div className={`p-4 rounded-full transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-white text-black' 
                                  : 'bg-white/10 text-white group-hover:bg-white/20'
                              }`}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <div>
                                <div className={`text-xs uppercase tracking-wide mb-1 ${
                                  isSelected ? 'text-white/80' : 'text-white/60'
                                }`}>
                                  {t(`budget.${option.tier}`)}
                                </div>
                                <h4 className={`font-bold mb-2 transition-colors ${
                                  isSelected ? 'text-white' : 'text-white/90'
                                }`}>
                                  {option.range}
                                </h4>
                                <p className={`text-sm transition-colors ${
                                  isSelected ? 'text-white/80' : 'text-white/60'
                                }`}>
                                  {t(`budget.${option.description}`)}
                                </p>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                >
                                  <Check className="h-4 w-4 text-black" />
                                </motion.div>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 7: Name & Email */}
              {currentStep === 7 && (
                <motion.div 
                  key="step7" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Header Section */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center space-y-4"
                  >
                    <p className="text-white/70 text-lg">
                      {t('booking.lets-start')}
                    </p>
                  </motion.div>

                  {/* Contact Form */}
                  <div className="space-y-8">
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <Label className="text-white/90 text-base font-bold uppercase tracking-wide flex items-center">
                        <User className="h-5 w-5 mr-3" />
                        {t('booking.full-name')}
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          placeholder={t('booking.name-placeholder')}
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          className="bg-gradient-to-r from-white/5 to-white/10 border-white/30 text-white placeholder:text-white/50 h-14 text-lg font-medium focus:border-white/60 focus:bg-white/10 transition-all duration-300 contact-input-focus relative z-10"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: formData.name ? 1 : 0 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-20"
                        >
                          <Check className="h-5 w-5 text-green-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Email Address */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-4"
                    >
                      <Label className="text-white/90 text-base font-bold uppercase tracking-wide flex items-center">
                        <Mail className="h-5 w-5 mr-3" />
                        {t('booking.email')}
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          type="email"
                          placeholder={t('booking.email-placeholder')}
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="bg-gradient-to-r from-white/5 to-white/10 border-white/30 text-white placeholder:text-white/50 h-14 text-lg font-medium focus:border-white/60 focus:bg-white/10 transition-all duration-300 contact-input-focus relative z-10"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: formData.email ? 1 : 0 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-20"
                        >
                          <Check className="h-5 w-5 text-green-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                  </div>

                  {/* Contact Info Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 p-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/20 rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <Shield className="h-6 w-6 text-white/70 mt-1 flex-shrink-0" />
                      <div>
                        <h6 className="text-white font-bold mb-2 uppercase tracking-wide">{t('common.privacy-communication')}</h6>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {t('booking.privacy-text')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 8: Phone or Instagram */}
              {currentStep === 8 && (
                <motion.div 
                  key="step8" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Header Section */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center space-y-4"
                  >
                    <p className="text-white/70 text-lg">
                      {t('booking.choose-preferred')}
                    </p>
                  </motion.div>

                  {/* Contact Method Options */}
                  <div className="space-y-8">
                    {/* Phone Number Option */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <Label className="text-white/90 text-base font-bold uppercase tracking-wide flex items-center">
                        <Phone className="h-5 w-5 mr-3" />
                        {t('booking.phone')}
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          type="tel"
                          placeholder={t('booking.phone-placeholder')}
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="bg-gradient-to-r from-white/5 to-white/10 border-white/30 text-white placeholder:text-white/50 h-14 text-lg font-medium focus:border-white/60 focus:bg-white/10 transition-all duration-300 contact-input-focus relative z-10"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: formData.phone ? 1 : 0 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-20"
                        >
                          <Check className="h-5 w-5 text-green-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Artistic Separator */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.8 }}
                      className="flex items-center justify-center py-4"
                    >
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      <div className="px-6">
                        <span className="text-white/40 text-sm uppercase tracking-wider">{t('common.or')}</span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </motion.div>

                    {/* Instagram Option */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4"
                    >
                      <Label className="text-white/90 text-base font-bold uppercase tracking-wide flex items-center">
                        <MessageCircle className="h-5 w-5 mr-3" />
                        {t('booking.instagram')}
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          type="text"
                          placeholder={t('booking.instagram-placeholder')}
                          value={formData.instagram}
                          onChange={(e) => updateFormData('instagram', e.target.value)}
                          className="bg-gradient-to-r from-white/5 to-white/10 border-white/30 text-white placeholder:text-white/50 h-14 text-lg font-medium focus:border-white/60 focus:bg-white/10 transition-all duration-300 contact-input-focus relative z-10"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: formData.instagram ? 1 : 0 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-20"
                        >
                          <Check className="h-5 w-5 text-green-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Artistic Separator */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="flex items-center justify-center py-4"
                    >
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      <div className="px-6">
                        <span className="text-white/40 text-sm uppercase tracking-wider">{t('common.or')}</span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </motion.div>

                    {/* Telegram Option */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4"
                    >
                      <Label className="text-white/90 text-base font-bold uppercase tracking-wide flex items-center">
                        <MessageCircle className="h-5 w-5 mr-3" />
                        {t('booking.telegram')}
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          type="text"
                          placeholder={t('booking.telegram-placeholder')}
                          value={formData.telegram}
                          onChange={(e) => updateFormData('telegram', e.target.value)}
                          className="bg-gradient-to-r from-white/5 to-white/10 border-white/30 text-white placeholder:text-white/50 h-14 text-lg font-medium focus:border-white/60 focus:bg-white/10 transition-all duration-300 contact-input-focus relative z-10"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: formData.telegram ? 1 : 0 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-20"
                        >
                          <Check className="h-5 w-5 text-green-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                  </div>

                  {/* Contact Info Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 p-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/20 rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <Shield className="h-6 w-6 text-white/70 mt-1 flex-shrink-0" />
                      <div>
                        <h6 className="text-white font-bold mb-2 uppercase tracking-wide">{t('common.privacy-communication')}</h6>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {t('booking.privacy-text')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 9: Review */}
              {currentStep === 9 && (
                <motion.div key="step9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">{t('booking.review')}</h3>
                  <div className="space-y-6">
                    <Card className="p-6 border-white/20 bg-white/5">
                      <h4 className="text-white font-bold mb-4">{t('booking.booking-summary')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">{t('booking.artist')}:</span>
                          <span className="text-white ml-2">{selectedArtist?.name}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.placement')}:</span>
                          <span className="text-white ml-2">{t(`placement.${formData.placement}`)}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.size')}:</span>
                          <span className="text-white ml-2">{t(`size.${formData.size}`)}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.budget')}:</span>
                          <span className="text-white ml-2">{formData.budget === 'consultation' ? t('budget.need-consultation') : formData.budget}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.date')}:</span>
                          <span className="text-white ml-2">{formData.selectedDate?.toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.time')}:</span>
                          <span className="text-white ml-2">{formData.time}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.name')}:</span>
                          <span className="text-white ml-2">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.phone-field')}:</span>
                          <span className="text-white ml-2">{formData.phone || t('booking.not-provided')}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.instagram-field')}:</span>
                          <span className="text-white ml-2">{formData.instagram || t('booking.not-provided')}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('booking.telegram-field')}:</span>
                          <span className="text-white ml-2">{formData.telegram || t('booking.not-provided')}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-white/60">{t('booking.email-field')}:</span>
                          <span className="text-white ml-2">{formData.email}</span>
                        </div>
                        {formData.description && (
                          <div className="md:col-span-2">
                            <span className="text-white/60">{t('booking.vision')}:</span>
                            <p className="text-white mt-2">{formData.description}</p>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Additional Notes Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <Label className="text-white/90 text-base font-bold uppercase tracking-wide flex items-center">
                        <MessageCircle className="h-5 w-5 mr-3" />
                        {t('booking.additional-notes')}
                        <span className="text-white/50 font-normal normal-case text-sm ml-2">{t('booking.optional')}</span>
                      </Label>
                      <div className="relative tattoo-border">
                        <Textarea
                          placeholder={t('booking.notes-placeholder')}
                          value={formData.notes}
                          onChange={(e) => updateFormData('notes', e.target.value)}
                          className="bg-gradient-to-br from-white/5 to-white/10 border-white/30 text-white placeholder:text-white/50 min-h-32 text-lg font-medium focus:border-white/60 focus:bg-white/10 transition-all duration-300 resize-none contact-input-focus relative z-10"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: formData.notes ? 1 : 0 }}
                          className="absolute right-4 top-4 pointer-events-none z-20"
                        >
                          <Check className="h-5 w-5 text-green-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 10: Success */}
              {currentStep === 10 && (
                <div key="step10" className="w-full flex flex-col justify-center items-center">
                  <div className="text-center py-12 w-full max-w-2xl mx-auto">
                    {/* Animated success icon */}
                    <div className="relative mx-auto mb-8 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center" style={{ contain: 'layout style paint' }}>
                      {/* Pulsing rings */}
                <motion.div 
                        className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-full"
                          animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0, 0.3]
                          }}
                          transition={{ 
                          duration: 2.5,
                            repeat: Infinity,
                          ease: "easeInOut"
                          }}
                        style={{ willChange: 'transform, opacity' }}
                        />
                    <motion.div
                        className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gradient-to-r from-green-500/15 to-emerald-400/15 rounded-full"
                        animate={{ 
                          scale: [1, 1.15, 1],
                          opacity: [0.25, 0, 0.25]
                        }}
                      transition={{ 
                          duration: 2.5,
                          delay: 0.4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ willChange: 'transform, opacity' }}
                      />
                      <motion.div
                        className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-full"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0, 0.2]
                        }}
                        transition={{ 
                          duration: 2.5,
                          delay: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ willChange: 'transform, opacity' }}
                      />
                      
                      {/* Floating sparkles */}
                      {[...Array(6)].map((_, i) => {
                        const angle = (i * 60) * (Math.PI / 180);
                        const radius = 60;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        return (
                      <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: `translate(${x}px, ${y}px)`,
                              willChange: 'transform, opacity'
                            }}
                        animate={{ 
                              scale: [0, 1, 0],
                              opacity: [0, 0.8, 0],
                              rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2,
                              delay: i * 0.2,
                          repeat: Infinity,
                              repeatDelay: 1,
                          ease: "easeInOut"
                        }}
                      />
                        );
                      })}
                      
                      {/* Main icon */}
                        <motion.div
                        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-green-500 via-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 border-4 border-white/20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ 
                          scale: 1, 
                          rotate: 0,
                          boxShadow: [
                            "0 0 0 0 rgba(34, 197, 94, 0.4)",
                            "0 0 0 20px rgba(34, 197, 94, 0)",
                            "0 0 0 0 rgba(34, 197, 94, 0)"
                          ]
                        }}
                        transition={{ 
                          delay: 0.3, 
                          type: "spring", 
                          stiffness: 200,
                          damping: 15,
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                          }
                        }}
                        style={{ willChange: 'transform, box-shadow' }}
                      >
                    <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
                          style={{ willChange: 'transform' }}
                        >
                          <Check className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-white drop-shadow-lg" />
                    </motion.div>
                      </motion.div>
                    </div>


                    <div className="mb-8">
                      <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-sm sm:max-w-md md:max-w-lg mx-auto px-4">
{t('booking.success-message')}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      {/* Book Again Button */}
                      <Button 
                        onClick={resetForm} 
                        className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-gray-800 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-sm sm:text-base md:text-lg font-bold rounded-full border-2 border-gray-400/60 hover:border-gray-300/80 relative overflow-hidden group"
                      >
                        <span className="relative z-10">{t('booking.book-again')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </Button>

                      {/* Close Button */}
                      <Button 
                        onClick={onClose} 
                        className="bg-gradient-to-r from-white via-gray-50 to-white text-black hover:from-gray-100 hover:via-white hover:to-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 text-base sm:text-lg font-bold rounded-full border-2 border-white/20 hover:border-white/40"
                      >
                        {t('booking.close')}
                      </Button>
                  </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed Navigation */}
        {currentStep <= 9 && (
          <div className="flex-shrink-0 p-6 border-t border-white/20 flex items-center justify-between bg-black/95 backdrop-blur-sm booking-navigation">
            {language === 'he' ? (
              <>
                <div className="flex items-center space-x-4">
                  {canProceedToNextStep() && currentStep < 9 && (
                    <Button onClick={nextStep} className="bg-white text-black hover:bg-white/90">
                      {t('booking.next')}
                      <ArrowRight className="h-4 w-4 ml-2 rtl-arrow" />
                    </Button>
                  )}
                  
                  {currentStep === 9 && (
                    <Button 
                      onClick={() => {
                        handleSubmit();
                        setTimeout(() => scrollToTop(), 100);
                      }} 
                      disabled={isSubmitted}
                      className={`relative overflow-hidden transition-all duration-300 ${
                        isSubmitted 
                          ? 'bg-green-500 text-white cursor-not-allowed' 
                          : 'bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/20'
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          <span>{t('booking.submitting')}</span>
                        </>
                      ) : (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="mr-2"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                          <span className="font-semibold">{t('booking.confirm-booking')}</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                {currentStep > 1 && currentStep <= 9 && (
                  <Button variant="ghost" onClick={prevStep} className="text-white hover:bg-white/10">
                    <ArrowLeft className="h-4 w-4 mr-2 rtl-arrow" />
                    {t('booking.back')}
                  </Button>
                )}
              </>
            ) : (
              <>
                {currentStep > 1 && currentStep <= 9 && (
                  <Button variant="ghost" onClick={prevStep} className="text-white hover:bg-white/10">
                    <ArrowLeft className="h-4 w-4 mr-2 rtl-arrow" />
                    {t('booking.back')}
                  </Button>
                )}
                
                <div className="flex items-center space-x-4">
                  {canProceedToNextStep() && currentStep < 9 && (
                    <Button onClick={nextStep} className="bg-white text-black hover:bg-white/90">
                      {t('booking.next')}
                      <ArrowRight className="h-4 w-4 ml-2 rtl-arrow" />
                    </Button>
                  )}
                  
                  {currentStep === 9 && (
                    <Button 
                      onClick={() => {
                        handleSubmit();
                        setTimeout(() => scrollToTop(), 100);
                      }} 
                      disabled={isSubmitted}
                      className={`relative overflow-hidden transition-all duration-300 ${
                        isSubmitted 
                          ? 'bg-green-500 text-white cursor-not-allowed' 
                          : 'bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/20'
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          <span>{t('booking.submitting')}</span>
                        </>
                      ) : (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="mr-2"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                          <span className="font-semibold">{t('booking.confirm-booking')}</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}