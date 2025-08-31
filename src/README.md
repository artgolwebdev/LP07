# Tattoo Studio Website

A modern, responsive tattoo studio website built with React, TypeScript, and Tailwind CSS.

## Features

- **Hero Section** with studio branding and contact information
- **Artist Gallery** showcasing talented tattoo artists and their work
- **Booking System** with multi-step form including:
  - Artist selection
  - Tattoo vision description with file upload
  - Placement and size selection
  - Date and time scheduling
  - Budget selection
  - Contact information with international phone validation
  - Booking review and confirmation
- **Responsive Design** optimized for desktop and mobile
- **Smooth Animations** using Framer Motion
- **WhatsApp Integration** for instant communication
- **Dark Theme** with artistic tattoo studio aesthetic

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **React DatePicker** for date selection
- **React Phone Number Input** for international phone validation
- **Lucide React** for icons
- **Shadcn/ui** components

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn/ui components
│   ├── figma/           # Figma integration components
│   ├── BookingForm.tsx  # Multi-step booking form
│   ├── Navigation.tsx   # Main navigation
│   ├── Footer.tsx       # Footer component
│   ├── FloatingWhatsApp.tsx # WhatsApp integration
│   └── TattooStudio.tsx # Main page component
├── styles/
│   └── globals.css      # Global styles and Tailwind config
└── App.tsx              # Root component with loading animation
```

## Features in Detail

### Booking Form
- 9-step multi-step form with validation
- Auto-progression for card-based selections
- Scrollable modal with fixed header and navigation
- International phone number input with country code selection
- Real-time form validation
- Smooth animations and transitions

### Design System
- Dark theme optimized for tattoo studio branding
- Custom typography with Inter font
- Responsive breakpoints
- Custom scrollbar styling
- WhatsApp integration with pulse animations
- Artistic borders and gradient effects

### Performance
- Image optimization with fallbacks
- Lazy loading for components
- Smooth scroll behavior
- Optimized animations with reduced motion support

## Customization

The website can be customized by:
- Updating artist information in `TattooStudio.tsx`
- Modifying color scheme in `globals.css`
- Adjusting booking form steps in `BookingForm.tsx`
- Updating contact information and WhatsApp number

## License

This project is licensed under the MIT License.