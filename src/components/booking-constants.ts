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
  instagram: string;
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
  { name: "arm", icon: Hand, description: "arm-desc" },
  { name: "leg", icon: Footprints, description: "leg-desc" },
  { name: "back", icon: User, description: "back-desc" },
  { name: "chest", icon: Heart, description: "chest-desc" },
  { name: "shoulder", icon: Zap, description: "shoulder-desc" },
  { name: "forearm", icon: Hand, description: "forearm-desc" },
  { name: "wrist", icon: Watch, description: "wrist-desc" },
  { name: "ankle", icon: Footprints, description: "ankle-desc" },
  { name: "neck", icon: User, description: "neck-desc" },
  { name: "other", icon: Shuffle, description: "other-desc" }
];

// Size Options
export const SIZE_OPTIONS: BookingOption[] = [
  { name: "small", icon: Circle, description: "small-desc" },
  { name: "medium", icon: Square, description: "medium-desc" },
  { name: "large", icon: Hexagon, description: "large-desc" },
  { name: "extra-large", icon: Maximize2, description: "extra-large-desc" }
];

// Time Slots
export const TIME_SLOTS: TimeSlot[] = [
  { time: "10:00", period: "morning", available: true },
  { time: "11:00", period: "morning", available: true },
  { time: "12:00", period: "afternoon", available: true },
  { time: "13:00", period: "afternoon", available: false },
  { time: "14:00", period: "afternoon", available: true },
  { time: "15:00", period: "afternoon", available: true },
  { time: "16:00", period: "afternoon", available: true },
  { time: "17:00", period: "evening", available: true },
  { time: "18:00", period: "evening", available: true }
];

// Budget Options  
export const BUDGET_OPTIONS: BudgetOption[] = [
  { name: "300-500₪", range: "300-500₪", icon: DollarSign, description: "small-pieces", tier: "basic" },
  { name: "500-1000₪", range: "500-1000₪", icon: CreditCard, description: "medium-artwork", tier: "standard" },
  { name: "1000-2000₪", range: "1000-2000₪", icon: Banknote, description: "large-designs", tier: "premium" },
  { name: "2000₪+", range: "2000₪+", icon: Crown, description: "full-sessions", tier: "luxury" },
  { name: "consultation", range: "consultation", icon: HelpCircle, description: "custom-quote", tier: "consultation" }
];