// Language detection utilities

export type Language = 'en' | 'ru' | 'fr' | 'he';

/**
 * Detect browser language and map to supported languages
 */
export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'; // SSR fallback
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Map browser language codes to our supported languages
  const languageMap: Record<string, Language> = {
    'en': 'en',
    'ru': 'ru', 
    'fr': 'fr',
    'he': 'he',
    'iw': 'he', // Hebrew alternative code
    'ar': 'he', // Arabic fallback to Hebrew for RTL
    'uk': 'ru', // Ukrainian fallback to Russian
    'be': 'ru', // Belarusian fallback to Russian
    'bg': 'ru', // Bulgarian fallback to Russian
    'ca': 'fr', // Catalan fallback to French
    'es': 'fr', // Spanish fallback to French (closer than English)
    'it': 'fr', // Italian fallback to French
    'pt': 'fr', // Portuguese fallback to French
  };
  
  return languageMap[langCode] || 'en';
};

/**
 * Get browser language info for debugging
 */
export const getBrowserLanguageInfo = () => {
  if (typeof window === 'undefined') return null;
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const languages = navigator.languages || [];
  const detectedLang = detectBrowserLanguage();
  
  return {
    primary: browserLang,
    all: languages,
    detected: detectedLang,
    userAgent: navigator.userAgent,
  };
};

/**
 * Check if language is RTL
 */
export const isRTL = (lang: Language): boolean => {
  return lang === 'he';
};

/**
 * Get language display name
 */
export const getLanguageDisplayName = (lang: Language): string => {
  const names: Record<Language, string> = {
    'en': 'English',
    'ru': 'Русский',
    'fr': 'Français',
    'he': 'עברית',
  };
  return names[lang];
};

/**
 * Get language flag emoji
 */
export const getLanguageFlag = (lang: Language): string => {
  const flags: Record<Language, string> = {
    'en': '🇺🇸',
    'ru': '🇷🇺',
    'fr': '🇫🇷',
    'he': '🇮🇱',
  };
  return flags[lang];
};
