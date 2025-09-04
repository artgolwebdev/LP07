import { TattooStudio } from "./components/TattooStudio";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <TattooStudio />
    </LanguageProvider>
  );
}