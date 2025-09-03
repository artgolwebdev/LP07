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
    specialties: string[];
  }>;
  navigation: Array<{ name: string; section: string }>;
} = {
  // Basic Info
  name: "SAGE",
  tagline: "Tattoo Shop",
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
      name: "GROC",
      image: "assets/artists/groc/LAFLARE.mp4",
      specialties: ["Traditional", "Neo-Traditional", "Japanese"]
    },
    {
      id: "2", 
      name: "SUNCHES",
      specialties: ["Fine Line", "Minimalist", "Botanical"],
      image: "assets/artists/sunches/sunches.jpg"
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
