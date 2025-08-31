// Studio Configuration - Centralized constants and data
export const STUDIO_CONFIG = {
  name: "SAGE",
  tagline: "Tattoo Shop & Gallery",
  subtitle: "Professional tattoo shop and gallery",
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
  
  // Images - Using local assets organized by artists and sections
  images: {
    studio: "/src/assets/sections/studio/studio-1.jpg",
    hero: [
      "/src/assets/heros-section.jpg",
      "/src/assets/hero-section-2.jpg"
    ],
    // Artist-specific images
    groc: {
      main: "/src/assets/artists/groc/LAFLARE.mp4",
      portfolio: [
        "/src/assets/artists/groc/groc-tattoo-1.jpg",
        "/src/assets/artists/groc/groc-tattoo-2.jpg",
        "/src/assets/artists/groc/groc-tattoo-3.jpg",
        "/src/assets/artists/groc/groc-tattoo-4.jpg"
      ]
    },
    sunches: {
      main: "/src/assets/artists/sunches/sunches-tattoo-1.jpg",
      portfolio: [
        "/src/assets/artists/sunches/sunches-tattoo-monstera-plant.jpg",
        "/src/assets/artists/sunches/sunches-tattoo-2.jpg",
        "/src/assets/artists/sunches/sunches-tattoo-3.jpg",
        "/src/assets/artists/sunches/sunches-tattoo-4.jpg"
      ]
    }
  },
  
  // Artists
  artists: [
    {
      id: "groc",
      name: "GROC",
      image: "/src/assets/artists/groc/LAFLARE.mp4",
      specialties: ["Traditional", "Neo-Traditional", "Japanese"],
      portfolio: [
        "/src/assets/artists/groc/groc-tattoo-1.jpg",
        "/src/assets/artists/groc/groc-tattoo-2.jpg",
        "/src/assets/artists/groc/groc-tattoo-3.jpg",
        "/src/assets/artists/groc/groc-tattoo-4.jpg"
      ]
    },
    {
      id: "2", 
      name: "SUNCHES",
      specialties: ["Fine Line", "Minimalist", "Botanical"],
      image: "/src/assets/artists/sunches/sunches.jpg",
      portfolio: [
        "/src/assets/artists/sunches/sunches-tattoo-monstera-plant.jpg"
      ]
    }
  ],
  
  // Navigation
  navigation: [
    { name: "HOME", section: "hero" },
    { name: "ARTISTS", section: "artists" },
    { name: "GALLERY", section: "gallery" }
  ]
} as const;

// Export types for better type safety
export type Artist = typeof STUDIO_CONFIG.artists[0];
export type NavigationItem = typeof STUDIO_CONFIG.navigation[0];
