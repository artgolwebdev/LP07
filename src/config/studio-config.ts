// Studio Configuration - Centralized constants and data
export const STUDIO_CONFIG: {
  name: string;
  tagline: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  addressSubtext: string;
  whatsappMessage: string;
  social: {
    instagram: string;
    facebook: string;
  };
  openingHours: Array<{ day: string; hours: string }>;
  heroImages: string[];
  artists: Array<{
    id: string;
    name: string;
    image: string;
    profileImage: string;
    specialties: string[];
  }>;
  navigation: Array<{ name: string; section: string }>;
} = {
  // Basic Info
  name: "SAGE",
  tagline: "Tattoo Shop & Gallery",
  subtitle: "Professional tattoo shop",
  
  // Contact Info
  phone: "+972 50-123-4567",
  email: "hello@sagetattoo.co.il",
  address: "Eilat Street 22, Tel Aviv-Yaffo",
  addressSubtext: "Powered by Groc&Sunches",
  whatsappMessage: "Hi! I want to book a tattoo session at SAGE Tattoo. Can we schedule a consultation?",
  
  // Social Media
  social: {
    instagram: "#",
    facebook: "#"
  },
  
  // Opening Hours
  openingHours: [
    { day: "Monday - Thursday", hours: "10:00 - 20:00" },
    { day: "Friday", hours: "10:00 - 16:00" },
    { day: "Saturday", hours: "20:00 - 24:00" },
    { day: "Sunday", hours: "10:00 - 18:00" }
  ],
  
  // Hero Images (for background slideshow)
  heroImages: [
    "assets/heros-section.jpg",
    "assets/hero-section-2.jpg"
  ],
  
  // Artists
  artists: [
    {
      id: "groc",
      name: "GROC 08",
      image: "assets/artists/groc/LAFLARE.mp4",
      profileImage: "assets/artists/groc/profile/profile-groc.jpg",
      specialties: ["Lettering", "Calligraphy"]
    },
    {
      id: "sunches", 
      name: "SUNCHES",
      specialties: ["Black & Grey"],
      image: "assets/artists/sunches/sunches.jpg",
      profileImage: "assets/artists/sunches/sunches.jpg" // Using existing image as profile
    },
    {
      id: "derk",
      name: "DERK",
      specialties: ["NeoJapanese", "Color Illustration"],
      image: "assets/artists/groc/LAFLARE.mp4", // Placeholder - using GROC video for now
      profileImage: "assets/artists/groc/profile/profile-groc.jpg" // Placeholder - using GROC profile for now
    },
    {
      id: "jenya",
      name: "JENYA NINTENDO",
      specialties: ["Japanese & Floral", "Color"],
      image: "assets/artists/groc/LAFLARE.mp4", // Placeholder - using GROC video for now
      profileImage: "assets/artists/groc/profile/profile-groc.jpg" // Placeholder - using GROC profile for now
    },
    {
      id: "gosha",
      name: "GOSHA IMAS",
      specialties: ["Traditional", "Bold"],
      image: "assets/artists/groc/LAFLARE.mp4", // Placeholder - using GROC video for now
      profileImage: "assets/artists/groc/profile/profile-groc.jpg" // Placeholder - using GROC profile for now
    },
    {
      id: "tactink",
      name: "TACT INK",
      specialties: ["Traditional"],
      image: "assets/artists/groc/LAFLARE.mp4", // Placeholder - using GROC video for now
      profileImage: "assets/artists/groc/profile/profile-groc.jpg" // Placeholder - using GROC profile for now
    },
    {
      id: "danilitt",
      name: "DANI LITT",
      specialties: ["Neo Traditional", "Illustrative"],
      image: "assets/artists/groc/LAFLARE.mp4", // Placeholder - using GROC video for now
      profileImage: "assets/artists/groc/profile/profile-groc.jpg" // Placeholder - using GROC profile for now
    }
  ],
  
  // Navigation
  navigation: [
    { name: "HOME", section: "hero" },
    { name: "ARTISTS", section: "artists" },
    { name: "CONTACT", section: "contact" }
  ]
};

// Export types for better type safety
export type Artist = typeof STUDIO_CONFIG.artists[0];
export type NavigationItem = typeof STUDIO_CONFIG.navigation[0];
