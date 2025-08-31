import { Hand, Footprints, User, Heart, Zap, Watch, Shuffle, Circle, Square, Hexagon, Maximize2, DollarSign, CreditCard, Banknote, Crown, HelpCircle } from "lucide-react";

// Form Data Interface
export interface FormData {
  artistId: string;
  description: string;
  placement: string;
  size: string;
  referenceImage?: File;
  date: string;
  time: string;
  selectedDate?: Date;
  budget: string;
  email: string;
  name: string;
  phone: string;
  notes: string;
}

// Booking Form Option Interface
export interface BookingOption {
  name: string;
  icon: any;
  description: string;
}

export interface BudgetOption extends BookingOption {
  range: string;
  tier: string;
}

export interface TimeSlot {
  time: string;
  period: string;
  available: boolean;
}

// Placement Options
export const PLACEMENT_OPTIONS: BookingOption[] = [
  { name: "Arm", icon: Hand, description: "Upper arm canvas" },
  { name: "Leg", icon: Footprints, description: "Thigh or calf area" },
  { name: "Back", icon: User, description: "Full back canvas" },
  { name: "Chest", icon: Heart, description: "Upper chest area" },
  { name: "Shoulder", icon: Zap, description: "Shoulder blade" },
  { name: "Forearm", icon: Hand, description: "Lower arm" },
  { name: "Wrist", icon: Watch, description: "Wrist area" },
  { name: "Ankle", icon: Footprints, description: "Ankle placement" },
  { name: "Neck", icon: User, description: "Neck area" },
  { name: "Other", icon: Shuffle, description: "Custom location" }
];

// Size Options
export const SIZE_OPTIONS: BookingOption[] = [
  { name: "Small (5-10cm)", icon: Circle, description: "Delicate details" },
  { name: "Medium (10-15cm)", icon: Square, description: "Perfect balance" },
  { name: "Large (15-25cm)", icon: Hexagon, description: "Bold statement" },
  { name: "Extra Large (25cm+)", icon: Maximize2, description: "Full canvas" }
];

// Time Slots
export const TIME_SLOTS: TimeSlot[] = [
  { time: "10:00", period: "Morning", available: true },
  { time: "11:00", period: "Morning", available: true },
  { time: "12:00", period: "Afternoon", available: true },
  { time: "13:00", period: "Afternoon", available: false },
  { time: "14:00", period: "Afternoon", available: true },
  { time: "15:00", period: "Afternoon", available: true },
  { time: "16:00", period: "Afternoon", available: true },
  { time: "17:00", period: "Evening", available: true },
  { time: "18:00", period: "Evening", available: true }
];

// Budget Options  
export const BUDGET_OPTIONS: BudgetOption[] = [
  { name: "500-1000₪", range: "500-1000₪", icon: DollarSign, description: "Small pieces", tier: "Basic" },
  { name: "1000-2000₪", range: "1000-2000₪", icon: CreditCard, description: "Medium artwork", tier: "Standard" },
  { name: "2000-3000₪", range: "2000-3000₪", icon: Banknote, description: "Large designs", tier: "Premium" },
  { name: "3000₪+", range: "3000₪+", icon: Crown, description: "Full sessions", tier: "Luxury" },
  { name: "Need consultation", range: "Need consultation", icon: HelpCircle, description: "Custom quote", tier: "Consultation" }
];