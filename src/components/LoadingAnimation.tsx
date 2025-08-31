import { motion } from "motion/react";

export function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Main logo/text */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-black text-white glow-text tracking-wider">
            INK
          </h1>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Animated dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Address text */}
        <motion.p
          className="text-white/70 text-center mt-6 tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Tel Aviv-Yaffo • Eilat St 22
        </motion.p>
      </div>

      {/* Ink drip effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 ink-drip"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </motion.div>
  );
}