# INK Tattoo Studio - Design Guidelines

## General Code Guidelines

* **DRY Principle**: Don't Repeat Yourself - extract common constants and components
* **Component Organization**: Keep related constants in separate files (e.g., booking-constants.ts)
* **Responsive Design**: Use flexbox and grid by default, avoid absolute positioning unless necessary
* **File Structure**: Small, focused files with single responsibilities
* **Clean Code**: Refactor as you go, remove unused code and comments

## Design System

### Color Palette
* **Primary**: White (#ffffff) on black (#000000) background
* **Secondary**: Various shades of white/grey transparency (white/10, white/20, etc.)
* **Accent**: Green for WhatsApp/success (#22c55e), Red for required fields (#ff4444)

### Typography
* **Font**: Inter font family
* **Hierarchy**: 
  - H1: 4rem, uppercase, bold (hero text)
  - H2: 3rem, uppercase, bold (section headings)
  - H3: 2rem, medium weight
  - H4: 1.5rem, medium weight
* **Special Effects**: .glow-text class for artistic lighting effects

### Animation & Effects
* **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for enhanced feel
* **Hover Effects**: Scale 1.02-1.05, subtle transforms
* **Loading States**: Smooth fade-ins with staggered delays
* **Artistic Effects**: 
  - .tattoo-border for animated borders
  - .ink-flow for flowing backgrounds
  - .whatsapp-pulse for floating button

### Components
* **Cards**: Dark backgrounds with white/20 borders, subtle hover effects
* **Buttons**: Uppercase text, letter-spacing, bold weights
* **Forms**: Dark themes, artistic border effects, clear validation states
* **Navigation**: Fixed positioning, backdrop blur, smooth scrolling

### Mobile Responsiveness
* **Breakpoints**: Follow Tailwind defaults (768px for md)
* **Typography**: Reduced font sizes on mobile (.hero-text, .section-heading)
* **Layout**: Stack columns on mobile, maintain spacing

### Booking Form Guidelines
* **Multi-step**: 9 clear steps with progress indication
* **Visual Selection**: Card-based selection with check marks
* **Animations**: Smooth transitions between steps, loading states
* **Required Fields**: Clear artistic indicators (red asterisk, pulsing dots)
* **Validation**: Immediate feedback with color changes

### WhatsApp Integration
* **Floating Button**: Bottom-right fixed position with pulse animation
* **Call-to-Action**: Prominent green buttons with glow effects
* **Message Templates**: Pre-filled professional messages