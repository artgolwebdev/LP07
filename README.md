# INK Studio - Premium Tattoo Studio Landing Page

A modern, responsive landing page for a premium tattoo studio built with React, TypeScript, and Tailwind CSS. Features a sophisticated booking flow, artist showcase, and stunning visual design.

## ✨ Features

* 🎨 **Modern Design** - Cyberpunk-inspired aesthetic with smooth animations
* 📱 **Fully Responsive** - Optimized for all devices and screen sizes
* 🎯 **Multi-Step Booking** - Comprehensive 10-step booking form
* 👨‍🎨 **Artist Showcase** - Professional artist profiles and portfolios
* 🖼️ **Gallery Display** - Beautiful showcase of tattoo artwork
* 📞 **Contact Integration** - WhatsApp integration and contact forms
* ⚡ **Fast Performance** - Built with Vite for optimal speed
* 🎭 **Smooth Animations** - Motion-based interactions and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd LP07

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🏗️ Project Structure

```
LP07/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── figma/          # Figma-specific components
│   │   └── *.tsx           # Main feature components
│   ├── config/              # Configuration and constants
│   ├── styles/              # Global styles and CSS
│   └── main.tsx            # Application entry point
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🎯 Key Components

### Core Components
- **TattooStudio** - Main landing page component
- **Navigation** - Responsive navigation with smooth scrolling
- **BookingForm** - Multi-step booking form with validation
- **Footer** - Contact information and social links
- **LoadingAnimation** - Initial loading screen

### UI Components
- **Button** - Customizable button component
- **Card** - Content container with styling
- **Input** - Form input fields
- **Modal** - Dialog and overlay components

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Zinc (#71717A)
- **Background**: Dark gradients and overlays

### Typography
- **Headings**: Black weight, large sizes
- **Body**: Regular weight, readable sizes
- **Special**: Glow effects and custom styling

### Animations
- **Framer Motion** for smooth transitions
- **Hover effects** on interactive elements
- **Scroll-triggered** animations
- **Loading states** and micro-interactions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Studio Configuration
All studio-related constants are centralized in `src/config/studio-config.ts`:

```typescript
export const STUDIO_CONFIG = {
  name: "INK",
  phone: "+972 50-123-4567",
  email: "hello@inkstudio.co.il",
  address: "Eilat Street 22, Tel Aviv-Yaffo",
  // ... more configuration
}
```

### Customization
- Update studio information in the config file
- Modify colors in Tailwind config
- Add new artists or portfolio items
- Customize booking form steps

## 📦 Dependencies

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Animation & Forms
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **React DatePicker** - Date selection

## 🚀 Deployment

### Build
```bash
npm run build
```

### GitHub Pages (Recommended)

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

#### Setup GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`

2. **Push to main branch** - The workflow will automatically:
   - Build your project
   - Deploy to GitHub Pages
   - Update on every push to main/master

3. **Access your site** at: `https://yourusername.github.io/your-repo-name`

#### Manual Deployment:
```bash
# Build the project
npm run build

# Deploy to GitHub Pages (if you prefer manual deployment)
npm run deploy
```

### Other Deploy Options
- **Vercel** - Recommended for React apps
- **Netlify** - Easy deployment with drag & drop
- **Traditional Hosting** - Upload build folder to any web server

## 🔒 Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your_api_endpoint
VITE_WHATSAPP_NUMBER=your_whatsapp_number
VITE_STUDIO_EMAIL=your_studio_email
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for high-quality images
- **Radix UI** for accessible components
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations

## 📞 Support

For support or questions:
- **Email**: hello@inkstudio.co.il
- **Phone**: +972 50-123-4567
- **WhatsApp**: Available through the floating button

---

**Built with ❤️ for the tattoo community**
  