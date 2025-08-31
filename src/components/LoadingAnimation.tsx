import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Main Content Container */}
      <div className="relative z-10 text-center">
        {/* Minimalistic Loading Indicator */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 3, 
                delay: 0.3, 
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </motion.div>
    </motion.div>
  );
}