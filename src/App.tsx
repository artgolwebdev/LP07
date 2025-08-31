import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { LoadingAnimation } from "./components/LoadingAnimation";
import { TattooStudio } from "./components/TattooStudio";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingAnimation key="loading" />
      ) : (
        <TattooStudio key="studio" />
      )}
    </AnimatePresence>
  );
}