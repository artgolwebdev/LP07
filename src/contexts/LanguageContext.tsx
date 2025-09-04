import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('sage-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('sage-language', language);
    // Update document language attribute
    const htmlElement = document.documentElement;
    if (htmlElement) {
      htmlElement.lang = language;
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translations = getTranslations(language);
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation data
function getTranslations(language: Language): Record<string, string> {
  const translations = {
    en: {
      // Navigation
      'nav.home': 'HOME',
      'nav.artists': 'ARTISTS',
      'nav.contact': 'CONTACT',
      'nav.book': 'Book Now',
      'nav.book-session': 'Book Your Session',

      // Hero Section
      'hero.title': 'SAGE',
      'hero.tagline': 'Tattoo Shop & Gallery',
      'hero.subtitle': 'Professional tattoo shop',

      // About Section
      'about.title': 'PROFESSIONAL TATTOO & PIERCING',
      'about.title.line1': 'PROFESSIONAL',
      'about.title.line2': 'TATTOO &',
      'about.title.line3': 'PIERCING',
      'about.description': 'Based in Tel Aviv–Yafo, SAGE designs professional tattoos with a personal touch.',

      // Artists Section
      'artists.title': 'OUR ARTISTS',
      'artists.book-with': 'Book with',

      // Contact Section
      'contact.title': 'READY TO GET SAGED?',
      'contact.title.line1': 'READY TO GET',
      'contact.title.line2': 'SAGED?',
      'contact.start-booking': 'Start Booking',
      'contact.talk-now': 'Talk Now',

      // Footer
      'footer.studio-hours': 'Studio Hours',
      'footer.find-us': 'Find Us',
      'footer.open-maps': 'Open in Maps',
      'footer.navigate-waze': 'Navigate with Waze',
      'footer.made-with': 'Made with',
      'footer.for-enthusiasts': 'for SAGE enthusiasts',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',

      // Booking Form
      'booking.title': 'Book Your Session',
      'booking.step': 'Step',
      'booking.of': 'of',
      'booking.choose-artist': 'Choose Your Artist',
      'booking.artist-vision': 'Your Artist & Vision',
      'booking.reference-images': 'Reference Images',
      'booking.share-inspiration': 'Share inspiration images',
      'booking.browse-files': 'Browse Files',
      'booking.describe-vision': 'Describe Your Vision',
      'booking.vision-placeholder': 'Share your tattoo vision...',
      'booking.choose-placement': 'Choose Placement',
      'booking.choose-size': 'Choose Size',
      'booking.choose-datetime': 'Choose Date & Time',
      'booking.select-date': 'Select Date',
      'booking.available-times': 'Available Times',
      'booking.choose-budget': 'Choose Budget Range',
      'booking.basic-contact': 'Basic Contact Information',
      'booking.lets-start': "Let's start with your name and email",
      'booking.full-name': 'Full Name',
      'booking.name-placeholder': 'Your full name',
      'booking.email': 'Email Address',
      'booking.email-placeholder': 'your.email@example.com',
      'booking.contact-method': 'Contact Method',
      'booking.choose-preferred': 'Choose your preferred way to stay in touch',
      'booking.phone': 'Phone Number',
      'booking.phone-placeholder': 'Your phone number',
      'booking.instagram': 'Instagram Handle',
      'booking.instagram-placeholder': '@yourusername',
      'booking.review': 'Review Your Booking',
      'booking.booking-summary': 'Booking Summary',
      'booking.additional-notes': 'Additional Notes',
      'booking.notes-placeholder': 'Share any special requests, allergies, or additional information that will help us prepare for your session...',
      'booking.confirmed': 'Booking Confirmed!',
      'booking.success-message': 'Your booking has been successfully submitted! We\'ll contact you within 24 hours to confirm your session details.',
      'booking.artist': 'Artist',
      'booking.placement': 'Placement',
      'booking.size': 'Size',
      'booking.budget': 'Budget',
      'booking.date': 'Date',
      'booking.time': 'Time',
      'booking.name': 'Name',
      'booking.phone-field': 'Phone',
      'booking.instagram-field': 'Instagram',
      'booking.email-field': 'Email',
      'booking.vision': 'Vision',
      'booking.not-provided': 'Not provided',
      'booking.optional': '(Optional)',
      'booking.back': 'Back',
      'booking.next': 'Next',
      'booking.confirm-booking': 'Confirm Booking',
      'booking.submitting': 'Submitting...',
      'booking.close': 'Close',
      'booking.selected-artist': 'Selected Artist',
      'booking.selecting-artist': 'Selecting artist...',
      'booking.selecting-placement': 'Selecting placement...',
      'booking.selecting-size': 'Selecting size...',
      'booking.selecting-time': 'Selecting time...',
      'booking.selecting-budget': 'Selecting budget...',
      'booking.available': 'Available',
      'booking.unavailable': 'Unavailable',

      // Common
      'common.or': 'OR',
      'common.privacy-communication': 'Privacy & Communication',
      'booking.privacy-text': 'Your contact information is securely protected and will only be used to coordinate your tattoo session. We\'ll reach out within 24 hours to confirm your booking and discuss any details.',

      // Studio Info
      'studio.address': 'Eilat Street 22, Tel Aviv-Yaffo',
      'studio.phone': '+972 50-123-4567',
      'studio.email': 'hello@sagetattoo.co.il',
      'studio.powered-by': 'Powered by Groc&Sunches',
      'studio.whatsapp-message': 'Hi! I want to book a tattoo session at SAGE Tattoo. Can we schedule a consultation?',
    },
    ru: {
      // Navigation
      'nav.home': 'ГЛАВНАЯ',
      'nav.artists': 'ХУДОЖНИКИ',
      'nav.contact': 'КОНТАКТЫ',
      'nav.book': 'Записаться',
      'nav.book-session': 'Записаться на сеанс',

      // Hero Section
      'hero.title': 'SAGE',
      'hero.tagline': 'Тату-салон и галерея',
      'hero.subtitle': 'Профессиональный тату-салон',

      // About Section
      'about.title': 'ПРОФЕССИОНАЛЬНЫЕ ТАТУ И ПИРСИНГ',
      'about.title.line1': 'ПРОФЕССИОНАЛЬНЫЕ',
      'about.title.line2': 'ТАТУ',
      'about.title.line3': 'И ПИРСИНГ',
      'about.description': 'Расположенный в Тель-Авиве–Яффо, SAGE создает профессиональные татуировки с личным подходом.',

      // Artists Section
      'artists.title': 'НАШИ ХУДОЖНИКИ',
      'artists.book-with': 'Записаться к',

      // Contact Section
      'contact.title': 'ГОТОВЫ СТАТЬ SAGED?',
      'contact.title.line1': 'ГОТОВЫ',
      'contact.title.line2': 'СТАТЬ SAGED?',
      'contact.start-booking': 'Начать запись',
      'contact.talk-now': 'Поговорить сейчас',

      // Footer
      'footer.studio-hours': 'Часы работы',
      'footer.find-us': 'Найти нас',
      'footer.open-maps': 'Открыть в картах',
      'footer.navigate-waze': 'Навигация через Waze',
      'footer.made-with': 'Сделано с',
      'footer.for-enthusiasts': 'для поклонников SAGE',
      'footer.privacy': 'Политика конфиденциальности',
      'footer.terms': 'Условия использования',

      // Booking Form
      'booking.title': 'Записаться на сеанс',
      'booking.step': 'Шаг',
      'booking.of': 'из',
      'booking.choose-artist': 'Выберите художника',
      'booking.artist-vision': 'Ваш художник и видение',
      'booking.reference-images': 'Референсные изображения',
      'booking.share-inspiration': 'Поделитесь вдохновляющими изображениями',
      'booking.browse-files': 'Выбрать файлы',
      'booking.describe-vision': 'Опишите ваше видение',
      'booking.vision-placeholder': 'Поделитесь вашим видением татуировки...',
      'booking.choose-placement': 'Выберите место',
      'booking.choose-size': 'Выберите размер',
      'booking.choose-datetime': 'Выберите дату и время',
      'booking.select-date': 'Выберите дату',
      'booking.available-times': 'Доступное время',
      'booking.choose-budget': 'Выберите бюджет',
      'booking.basic-contact': 'Основная контактная информация',
      'booking.lets-start': 'Начнем с вашего имени и email',
      'booking.full-name': 'Полное имя',
      'booking.name-placeholder': 'Ваше полное имя',
      'booking.email': 'Email адрес',
      'booking.email-placeholder': 'ваш.email@example.com',
      'booking.contact-method': 'Способ связи',
      'booking.choose-preferred': 'Выберите предпочтительный способ связи',
      'booking.phone': 'Номер телефона',
      'booking.phone-placeholder': 'Ваш номер телефона',
      'booking.instagram': 'Instagram',
      'booking.instagram-placeholder': '@вашusername',
      'booking.review': 'Проверьте вашу запись',
      'booking.booking-summary': 'Сводка записи',
      'booking.additional-notes': 'Дополнительные заметки',
      'booking.notes-placeholder': 'Поделитесь любыми особыми пожеланиями, аллергиями или дополнительной информацией, которая поможет нам подготовиться к вашему сеансу...',
      'booking.confirmed': 'Запись подтверждена!',
      'booking.success-message': 'Ваша запись успешно отправлена! Мы свяжемся с вами в течение 24 часов для подтверждения деталей сеанса.',
      'booking.artist': 'Художник',
      'booking.placement': 'Место',
      'booking.size': 'Размер',
      'booking.budget': 'Бюджет',
      'booking.date': 'Дата',
      'booking.time': 'Время',
      'booking.name': 'Имя',
      'booking.phone-field': 'Телефон',
      'booking.instagram-field': 'Instagram',
      'booking.email-field': 'Email',
      'booking.vision': 'Видение',
      'booking.not-provided': 'Не указано',
      'booking.optional': '(Необязательно)',
      'booking.back': 'Назад',
      'booking.next': 'Далее',
      'booking.confirm-booking': 'Подтвердить запись',
      'booking.submitting': 'Отправка...',
      'booking.close': 'Закрыть',
      'booking.selected-artist': 'Выбранный художник',
      'booking.selecting-artist': 'Выбор художника...',
      'booking.selecting-placement': 'Выбор места...',
      'booking.selecting-size': 'Выбор размера...',
      'booking.selecting-time': 'Выбор времени...',
      'booking.selecting-budget': 'Выбор бюджета...',
      'booking.available': 'Доступно',
      'booking.unavailable': 'Недоступно',

      // Common
      'common.or': 'ИЛИ',
      'common.privacy-communication': 'Конфиденциальность и связь',
      'booking.privacy-text': 'Ваша контактная информация надежно защищена и будет использоваться только для координации вашего тату-сеанса. Мы свяжемся с вами в течение 24 часов для подтверждения записи и обсуждения деталей.',

      // Studio Info
      'studio.address': 'Улица Эйлат 22, Тель-Авив-Яффо',
      'studio.phone': '+972 50-123-4567',
      'studio.email': 'hello@sagetattoo.co.il',
      'studio.powered-by': 'При поддержке Groc&Sunches',
      'studio.whatsapp-message': 'Привет! Я хочу записаться на тату-сеанс в SAGE Tattoo. Можем ли мы назначить консультацию?',
    }
  };

  return translations[language] || translations.en;
}
