import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

interface FloatingWhatsAppProps {
  onClick: () => void;
}

export function FloatingWhatsApp({ onClick }: FloatingWhatsAppProps) {
  return (
    <motion.div
      className="floating-whatsapp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 200 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Button
          onClick={onClick}
          size="lg"
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-2xl border-0 whatsapp-pulse whatsapp-glow p-0"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
        initial={{ x: 10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
      >
        Chat with us on WhatsApp
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-black/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </motion.div>
    </motion.div>
  );
}