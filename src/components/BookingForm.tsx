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

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  artists: Array<{ id: string; name: string; specialties: string[]; image: string }>;
  preSelectedArtist?: string | null;
}



export function BookingForm({ isOpen, onClose, artists, preSelectedArtist }: BookingFormProps) {
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

  // Auto-focus on vision textarea when reaching step 2
  useEffect(() => {
    if (currentStep === 2) {
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
      case 8: return formData.phone !== "" || formData.instagram !== "";
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
      console.log('Audio not available');
    }
    
    // Enhanced animation sequence
    setTimeout(() => {
      setCurrentStep(10);
    }, 1500);
  };

  const updateFormData = (field: keyof FormData, value: string | File | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <div ref={headerRef} className="flex-shrink-0 p-6 border-b border-white/20 flex items-center justify-between bg-black/95 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-bold text-white">Book Your Session</h2>
            <p className="text-white/60">Step {currentStep} of 10</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="h-6 w-6" />
          </Button>
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
          <div className="p-6 pb-6 h-full flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Choose Artist */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">Choose Your Artist</h3>
                  

                  
                  {isSelectingArtist && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      Selecting artist...
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
                          <ImageWithFallback src={artist.image} alt={artist.name} className="w-16 h-16 object-cover rounded" />
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
                  <h3 className="text-xl font-bold text-white mb-6">Your Artist & Vision</h3>
                  
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
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-300" />
                          </div>
                          
                          <div className="p-4">
                            <div className="mb-2">
                              <h3 className="text-lg font-black text-white mb-1 transition-colors duration-300">
                                {selectedArtist.name}
                              </h3>
                              <p className="text-sm text-white/80 transition-colors duration-300">
                                {selectedArtist.specialties.join(' • ')}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2 text-green-400 text-xs">
                              <Check className="h-3 w-3" />
                              <span>Selected Artist</span>
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
                              Reference Images
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
                                  Share inspiration images
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
                                    Browse Files
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
                          Describe Your Vision
                        </Label>
                        <Textarea
                          ref={visionTextareaRef}
                          placeholder="Share your tattoo vision..."
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
                  <h3 className="text-xl font-bold text-white mb-6">Choose Placement</h3>
                  {isSelectingPlacement && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      Selecting placement...
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
                                  {option.name}
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
                  <h3 className="text-xl font-bold text-white mb-6">Choose Size</h3>
                  {isSelectingSize && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      Selecting size...
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
                                  {option.name}
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
                  <h3 className="text-xl font-bold text-white mb-6">Choose Date & Time</h3>
                  
                  {/* Calendar Section */}
                  <div className="mb-8">
                    <Label className="text-white mb-4 block flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Select Date
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
                        Available Times
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
                                <div className="text-white/60 text-sm">{slot.period}</div>
                              </div>
                              <div>
                                {!slot.available ? (
                                  <span className="text-white/40 text-sm">Unavailable</span>
                                ) : formData.time === slot.time ? (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                  >
                                    <Check className="h-4 w-4 text-black" />
                                  </motion.div>
                                ) : (
                                  <span className="text-white/60 text-sm">Available</span>
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
                  <h3 className="text-xl font-bold text-white mb-6">Choose Budget Range</h3>
                  {isSelectingBudget && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4 text-white/60"
                    >
                      Selecting budget...
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
                                  {option.tier}
                                </div>
                                <h4 className={`font-bold mb-2 transition-colors ${
                                  isSelected ? 'text-white' : 'text-white/90'
                                }`}>
                                  {option.range}
                                </h4>
                                <p className={`text-sm transition-colors ${
                                  isSelected ? 'text-white/80' : 'text-white/60'
                                }`}>
                                  {option.description}
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
                    <h3 className="text-3xl font-bold text-white glow-text uppercase tracking-wider">
                      Basic Contact Information
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
                    <p className="text-white/70 text-lg">
                      Let's start with your name and email
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
                        Full Name
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          placeholder="Your full name"
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
                        Email Address
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
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

                    {/* Artistic Separator */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.8 }}
                      className="flex items-center justify-center py-4"
                    >
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      <div className="px-6">
                        <div className="w-3 h-3 rotate-45 bg-white/20 border border-white/40"></div>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
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
                        <h6 className="text-white font-bold mb-2 uppercase tracking-wide">Privacy & Communication</h6>
                        <p className="text-white/70 text-sm leading-relaxed">
                          Your contact information is securely protected and will only be used to coordinate your tattoo session. 
                          We'll reach out within 24 hours to confirm your booking and discuss any details.
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
                    <h3 className="text-3xl font-bold text-white glow-text uppercase tracking-wider">
                      Contact Method
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
                    <p className="text-white/70 text-lg">
                      Choose your preferred way to stay in touch
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
                        Phone Number
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          type="tel"
                          placeholder="Your phone number"
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
                        <span className="text-white/40 text-sm uppercase tracking-wider">OR</span>
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
                        Instagram Handle
                      </Label>
                      <div className="relative tattoo-border">
                        <Input
                          type="text"
                          placeholder="@yourusername"
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
                        <h6 className="text-white font-bold mb-2 uppercase tracking-wide">Privacy & Communication</h6>
                        <p className="text-white/70 text-sm leading-relaxed">
                          Your contact information is securely protected and will only be used to coordinate your tattoo session. 
                          We'll reach out within 24 hours to confirm your booking and discuss any details.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 9: Review */}
              {currentStep === 9 && (
                <motion.div key="step9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-white mb-6">Review Your Booking</h3>
                  <div className="space-y-6">
                    <Card className="p-6 border-white/20 bg-white/5">
                      <h4 className="text-white font-bold mb-4">Booking Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Artist:</span>
                          <span className="text-white ml-2">{selectedArtist?.name}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Placement:</span>
                          <span className="text-white ml-2">{formData.placement}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Size:</span>
                          <span className="text-white ml-2">{formData.size}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Budget:</span>
                          <span className="text-white ml-2">{formData.budget}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Date:</span>
                          <span className="text-white ml-2">{formData.selectedDate?.toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Time:</span>
                          <span className="text-white ml-2">{formData.time}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Name:</span>
                          <span className="text-white ml-2">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Phone:</span>
                          <span className="text-white ml-2">{formData.phone || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Instagram:</span>
                          <span className="text-white ml-2">{formData.instagram || 'Not provided'}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-white/60">Email:</span>
                          <span className="text-white ml-2">{formData.email}</span>
                        </div>
                        {formData.description && (
                          <div className="md:col-span-2">
                            <span className="text-white/60">Vision:</span>
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
                        Additional Notes
                        <span className="text-white/50 font-normal normal-case text-sm ml-2">(Optional)</span>
                      </Label>
                      <div className="relative tattoo-border">
                        <Textarea
                          placeholder="Share any special requests, allergies, or additional information that will help us prepare for your session..."
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
                <motion.div 
                  key="step10" 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="text-center py-12 relative">
                    {/* Animated background particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-green-400 rounded-full"
                          initial={{ 
                            x: Math.random() * 400 - 200, 
                            y: Math.random() * 300 - 150,
                            opacity: 0,
                            scale: 0
                          }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [Math.random() * 300 - 150, Math.random() * 300 - 150]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </div>

                    {/* Main success icon with enhanced animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.3, 
                        type: "spring", 
                        stiffness: 200,
                        damping: 15
                      }}
                      className="relative mx-auto mb-8"
                    >
                      {/* Pulsing ring effect */}
                      <motion.div
                        className="absolute inset-0 w-32 h-32 bg-green-500/20 rounded-full mx-auto"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 w-28 h-28 bg-green-500/10 rounded-full mx-auto"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: 0.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Main icon */}
                      <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                        >
                          <Check className="h-12 w-12 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Success text with staggered animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                        Booking Confirmed!
                      </h3>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="mb-8"
                    >
                      <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
                        🎉 Your booking has been successfully submitted! 
                        <br />
                        We'll contact you within 24 hours to confirm your session details.
                      </p>
                    </motion.div>

                    {/* Animated close button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                    >
                      <Button 
                        onClick={onClose} 
                        className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold"
                      >
                        Close
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed Navigation */}
        {currentStep <= 9 && (
                      <div className="flex-shrink-0 p-6 border-t border-white/20 flex items-center justify-between bg-black/95 backdrop-blur-sm">
              {currentStep > 1 && currentStep <= 9 && (
                <Button variant="ghost" onClick={prevStep} className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              
              <div className="flex items-center space-x-4">
                {canProceedToNextStep() && currentStep < 9 && (
                  <Button onClick={nextStep} className="bg-white text-black hover:bg-white/90">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
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
                        <span>Submitting...</span>
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
                        <span className="font-semibold">Confirm Booking</span>
                    
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
        )}
      </motion.div>
    </motion.div>
  );
}