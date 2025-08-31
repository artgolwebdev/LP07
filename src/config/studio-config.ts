// Studio Configuration - Centralized constants and data
export const STUDIO_CONFIG = {
  name: "INK",
  tagline: "Premium Tattoo Studio",
  phone: "+972 50-123-4567",
  email: "hello@inkstudio.co.il",
  address: "Eilat Street 22, Tel Aviv-Yaffo",
  addressSubtext: "Near Carmel Market",
  whatsappMessage: "Hi! I want to book a tattoo session at INK Studio. Can we schedule a consultation?",
  
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
  
  // Images
  images: {
    studio: "https://images.unsplash.com/photo-1635068247786-5de1ce4c0ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBzdHVkaW8lMjBpbnRlcmlvciUyMGRhcmt8ZW58MXx8fHwxNzU2NjQ4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tattoo1: "https://images.unsplash.com/photo-1661558079227-104462171c2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBibGFjayUyMGluayUyMGFydHdvcmt8ZW58MXx8fHwxNzU2NjQ4MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tattoo2: "https://images.unsplash.com/photo-1602755690328-853cda6e4035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRyYWRpdGlvbmFsJTIwdGF0dG9vJTIwZGVzaWdufGVufDF8fHx8MTc1NjY0ODE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    artist: "https://images.unsplash.com/photo-1748200100427-52921dec8597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHlvdW5nJTIwYWR1bHR8ZW58MXx8fHwxNzU2NjQ4MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tattooMachine: "https://images.unsplash.com/photo-1562259954-bf6c7f31bf60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBtYWNoaW5lJTIwbmVlZGxlJTIwaW5rfGVufDF8fHx8MTc1NjY0ODE4OHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  
  // Artists
  artists: [
    {
      id: "1",
      name: "ALEX SHADOW",
      specialties: ["Traditional", "Neo-Traditional", "Black & Grey"],
      image: "https://images.unsplash.com/photo-1748200100427-52921dec8597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHlvdW5nJTIwYWR1bHR8ZW58MXx8fHwxNzU2NjQ4MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      portfolio: [
        "https://images.unsplash.com/photo-1661558079227-104462171c2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBibGFjayUyMGluayUyMGFydHdvcmt8ZW58MXx8fHwxNzU2NjQ4MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1602755690328-853cda6e4035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRyYWRpdGlvbmFsJTIwdGF0dG9vJTIwZGVzaWdufGVufDF8fHx8MTc1NjY0ODE4NXww&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    {
      id: "2", 
      name: "MAYA INK",
      specialties: ["Fine Line", "Minimalist", "Botanical"],
      image: "https://images.unsplash.com/photo-1748200100427-52921dec8597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHlvdW5nJTIwYWR1bHR8ZW58MXx8fHwxNzU2NjQ4MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      portfolio: [
        "https://images.unsplash.com/photo-1602755690328-853cda6e4035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRyYWRpdGlvbmFsJTIwdGF0dG9vJTIwZGVzaWdufGVufDF8fHx8MTc1NjY0ODE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1562259954-bf6c7f31bf60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBtYWNoaW5lJTIwbmVlZGxlJTIwaW5rfGVufDF8fHx8MTc1NjY0ODE4OHww&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    {
      id: "3",
      name: "DAVID STORM",
      specialties: ["Realism", "Portraits", "Biomechanical"],
      image: "https://images.unsplash.com/photo-1748200100427-52921dec8597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHlvdW5nJTIwYWR1bHR8ZW58MXx8fHwxNzU2NjQ4MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      portfolio: [
        "https://images.unsplash.com/photo-1562259954-bf6c7f31bf60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBtYWNoaW5lJTIwbmVlZGxlJTIwaW5rfGVufDF8fHx8MTc1NjY0ODE4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1661558079227-104462171c2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBibGFjayUyMGluayUyMGFydHdvcmt8ZW58MXx8fHwxNzU2NjQ4MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
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
