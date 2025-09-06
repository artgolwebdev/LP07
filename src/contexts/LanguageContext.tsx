import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectBrowserLanguage, isRTL } from '../utils/languageUtils';

export type Language = 'en' | 'ru' | 'fr' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  detectBrowserLanguage: () => Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');


  // Load language from localStorage on mount, fallback to browser language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('sage-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru' || savedLanguage === 'fr' || savedLanguage === 'he')) {
      setLanguage(savedLanguage);
    } else {
      // No saved language found, detect browser language
      const browserLanguage = detectBrowserLanguage();
      const browserLang = navigator.language || (navigator as any).userLanguage;
      setLanguage(browserLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('sage-language', language);
    // Update document language and direction attributes
    const htmlElement = document.documentElement;
    if (htmlElement) {
      htmlElement.lang = language;
      htmlElement.dir = isRTL(language) ? 'rtl' : 'ltr';
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translations = getTranslations(language);
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, detectBrowserLanguage }}>
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

      // Placement Options
      'placement.arm': 'Arm',
      'placement.arm-desc': 'Upper arm canvas',
      'placement.leg': 'Leg',
      'placement.leg-desc': 'Thigh or calf area',
      'placement.back': 'Back',
      'placement.back-desc': 'Full back canvas',
      'placement.chest': 'Chest',
      'placement.chest-desc': 'Upper chest area',
      'placement.shoulder': 'Shoulder',
      'placement.shoulder-desc': 'Shoulder blade',
      'placement.forearm': 'Forearm',
      'placement.forearm-desc': 'Lower arm',
      'placement.wrist': 'Wrist',
      'placement.wrist-desc': 'Wrist area',
      'placement.ankle': 'Ankle',
      'placement.ankle-desc': 'Ankle placement',
      'placement.neck': 'Neck',
      'placement.neck-desc': 'Neck area',
      'placement.other': 'Other',
      'placement.other-desc': 'Custom location',

      // Size Options
      'size.small': 'Small (5-10cm)',
      'size.small-desc': 'Delicate details',
      'size.medium': 'Medium (10-15cm)',
      'size.medium-desc': 'Perfect balance',
      'size.large': 'Large (15-25cm)',
      'size.large-desc': 'Bold statement',
      'size.extra-large': 'Extra Large (25cm+)',
      'size.extra-large-desc': 'Full canvas',

      // Time Periods
      'time.morning': 'Morning',
      'time.afternoon': 'Afternoon',
      'time.evening': 'Evening',

      // Budget Options
      'budget.basic': 'Basic',
      'budget.standard': 'Standard',
      'budget.premium': 'Premium',
      'budget.luxury': 'Luxury',
      'budget.consultation': 'Consultation',
      'budget.small-pieces': 'Small pieces',
      'budget.medium-artwork': 'Medium artwork',
      'budget.large-designs': 'Large designs',
      'budget.full-sessions': 'Full sessions',
      'budget.custom-quote': 'Custom quote',
      'budget.need-consultation': 'Need consultation',

      // Availability Status
      'availability.available': 'Available',
      'availability.unavailable': 'Unavailable',
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

      // Placement Options
      'placement.arm': 'Рука',
      'placement.arm-desc': 'Верхняя часть руки',
      'placement.leg': 'Нога',
      'placement.leg-desc': 'Бедро или голень',
      'placement.back': 'Спина',
      'placement.back-desc': 'Вся спина',
      'placement.chest': 'Грудь',
      'placement.chest-desc': 'Верхняя часть груди',
      'placement.shoulder': 'Плечо',
      'placement.shoulder-desc': 'Лопатка',
      'placement.forearm': 'Предплечье',
      'placement.forearm-desc': 'Нижняя часть руки',
      'placement.wrist': 'Запястье',
      'placement.wrist-desc': 'Область запястья',
      'placement.ankle': 'Лодыжка',
      'placement.ankle-desc': 'Область лодыжки',
      'placement.neck': 'Шея',
      'placement.neck-desc': 'Область шеи',
      'placement.other': 'Другое',
      'placement.other-desc': 'Другое место',

      // Size Options
      'size.small': 'Маленький (5-10см)',
      'size.small-desc': 'Тонкие детали',
      'size.medium': 'Средний (10-15см)',
      'size.medium-desc': 'Идеальный баланс',
      'size.large': 'Большой (15-25см)',
      'size.large-desc': 'Смелое заявление',
      'size.extra-large': 'Очень большой (25см+)',
      'size.extra-large-desc': 'Полное полотно',

      // Time Periods
      'time.morning': 'Утро',
      'time.afternoon': 'День',
      'time.evening': 'Вечер',

      // Budget Options
      'budget.basic': 'Базовый',
      'budget.standard': 'Стандартный',
      'budget.premium': 'Премиум',
      'budget.luxury': 'Люкс',
      'budget.consultation': 'Консультация',
      'budget.small-pieces': 'Маленькие работы',
      'budget.medium-artwork': 'Средние работы',
      'budget.large-designs': 'Большие дизайны',
      'budget.full-sessions': 'Полные сеансы',
      'budget.custom-quote': 'Индивидуальная цена',
      'budget.need-consultation': 'Нужна консультация',

      // Availability Status
      'availability.available': 'Доступно',
      'availability.unavailable': 'Недоступно',
    },
    fr: {
      // Navigation
      'nav.home': 'ACCUEIL',
      'nav.artists': 'ARTISTES',
      'nav.contact': 'CONTACT',
      'nav.book': 'Réserver',
      'nav.book-session': 'Réserver votre séance',

      // Hero Section
      'hero.title': 'SAGE',
      'hero.tagline': 'Salon de tatouage et galerie',
      'hero.subtitle': 'Salon de tatouage professionnel',

      // About Section
      'about.title': 'TATOUAGE ET PIERCING PROFESSIONNELS',
      'about.title.line1': 'TATOUAGE',
      'about.title.line2': 'ET PIERCING',
      'about.title.line3': 'PROFESSIONNELS',
      'about.description': 'Basé à Tel Aviv–Yafo, SAGE conçoit des tatouages professionnels avec une touche personnelle.',

      // Artists Section
      'artists.title': 'NOS ARTISTES',
      'artists.book-with': 'Réserver avec',

      // Contact Section
      'contact.title': 'PRÊT À ÊTRE SAGED?',
      'contact.title.line1': 'PRÊT À',
      'contact.title.line2': 'ÊTRE SAGED?',
      'contact.start-booking': 'Commencer la réservation',
      'contact.talk-now': 'Parler maintenant',

      // Footer
      'footer.studio-hours': 'Heures d\'ouverture',
      'footer.find-us': 'Nous trouver',
      'footer.open-maps': 'Ouvrir dans Maps',
      'footer.navigate-waze': 'Naviguer avec Waze',
      'footer.made-with': 'Fait avec',
      'footer.for-enthusiasts': 'pour les passionnés de SAGE',
      'footer.privacy': 'Politique de confidentialité',
      'footer.terms': 'Conditions d\'utilisation',

      // Booking Form
      'booking.title': 'Réserver votre séance',
      'booking.step': 'Étape',
      'booking.of': 'de',
      'booking.choose-artist': 'Choisissez votre artiste',
      'booking.artist-vision': 'Votre artiste et vision',
      'booking.reference-images': 'Images de référence',
      'booking.share-inspiration': 'Partagez des images d\'inspiration',
      'booking.browse-files': 'Parcourir les fichiers',
      'booking.describe-vision': 'Décrivez votre vision',
      'booking.vision-placeholder': 'Partagez votre vision de tatouage...',
      'booking.choose-placement': 'Choisissez l\'emplacement',
      'booking.choose-size': 'Choisissez la taille',
      'booking.choose-datetime': 'Choisissez la date et l\'heure',
      'booking.select-date': 'Sélectionner la date',
      'booking.available-times': 'Heures disponibles',
      'booking.choose-budget': 'Choisissez la gamme de prix',
      'booking.basic-contact': 'Informations de contact de base',
      'booking.lets-start': 'Commençons par votre nom et email',
      'booking.full-name': 'Nom complet',
      'booking.name-placeholder': 'Votre nom complet',
      'booking.email': 'Adresse email',
      'booking.email-placeholder': 'votre.email@example.com',
      'booking.contact-method': 'Méthode de contact',
      'booking.choose-preferred': 'Choisissez votre méthode préférée pour rester en contact',
      'booking.phone': 'Numéro de téléphone',
      'booking.phone-placeholder': 'Votre numéro de téléphone',
      'booking.instagram': 'Nom d\'utilisateur Instagram',
      'booking.instagram-placeholder': '@votrenom',
      'booking.review': 'Vérifiez votre réservation',
      'booking.booking-summary': 'Résumé de la réservation',
      'booking.additional-notes': 'Notes supplémentaires',
      'booking.notes-placeholder': 'Partagez toute demande spéciale, allergie ou information supplémentaire qui nous aidera à préparer votre séance...',
      'booking.confirmed': 'Réservation confirmée!',
      'booking.success-message': 'Votre réservation a été soumise avec succès! Nous vous contacterons dans les 24 heures pour confirmer les détails de votre séance.',
      'booking.artist': 'Artiste',
      'booking.placement': 'Emplacement',
      'booking.size': 'Taille',
      'booking.budget': 'Budget',
      'booking.date': 'Date',
      'booking.time': 'Heure',
      'booking.name': 'Nom',
      'booking.phone-field': 'Téléphone',
      'booking.instagram-field': 'Instagram',
      'booking.email-field': 'Email',
      'booking.vision': 'Vision',
      'booking.not-provided': 'Non fourni',
      'booking.optional': '(Optionnel)',
      'booking.back': 'Retour',
      'booking.next': 'Suivant',
      'booking.confirm-booking': 'Confirmer la réservation',
      'booking.submitting': 'Soumission...',
      'booking.close': 'Fermer',
      'booking.selected-artist': 'Artiste sélectionné',
      'booking.selecting-artist': 'Sélection de l\'artiste...',
      'booking.selecting-placement': 'Sélection de l\'emplacement...',
      'booking.selecting-size': 'Sélection de la taille...',
      'booking.selecting-time': 'Sélection de l\'heure...',
      'booking.selecting-budget': 'Sélection du budget...',
      'booking.available': 'Disponible',
      'booking.unavailable': 'Indisponible',

      // Common
      'common.or': 'OU',
      'common.privacy-communication': 'Confidentialité et communication',
      'booking.privacy-text': 'Vos informations de contact sont sécurisées et ne seront utilisées que pour coordonner votre séance de tatouage. Nous vous contacterons dans les 24 heures pour confirmer votre réservation et discuter des détails.',

      // Studio Info
      'studio.address': 'Rue Eilat 22, Tel Aviv-Yaffo',
      'studio.phone': '+972 50-123-4567',
      'studio.email': 'hello@sagetattoo.co.il',
      'studio.powered-by': 'Propulsé par Groc&Sunches',
      'studio.whatsapp-message': 'Salut! Je veux réserver une séance de tatouage chez SAGE Tattoo. Pouvons-nous planifier une consultation?',

      // Placement Options
      'placement.arm': 'Bras',
      'placement.arm-desc': 'Partie supérieure du bras',
      'placement.leg': 'Jambe',
      'placement.leg-desc': 'Cuisse ou mollet',
      'placement.back': 'Dos',
      'placement.back-desc': 'Tout le dos',
      'placement.chest': 'Poitrine',
      'placement.chest-desc': 'Partie supérieure de la poitrine',
      'placement.shoulder': 'Épaule',
      'placement.shoulder-desc': 'Omoplate',
      'placement.forearm': 'Avant-bras',
      'placement.forearm-desc': 'Partie inférieure du bras',
      'placement.wrist': 'Poignet',
      'placement.wrist-desc': 'Zone du poignet',
      'placement.ankle': 'Cheville',
      'placement.ankle-desc': 'Zone de la cheville',
      'placement.neck': 'Cou',
      'placement.neck-desc': 'Zone du cou',
      'placement.other': 'Autre',
      'placement.other-desc': 'Emplacement personnalisé',

      // Size Options
      'size.small': 'Petit (5-10cm)',
      'size.small-desc': 'Détails délicats',
      'size.medium': 'Moyen (10-15cm)',
      'size.medium-desc': 'Équilibre parfait',
      'size.large': 'Grand (15-25cm)',
      'size.large-desc': 'Déclaration audacieuse',
      'size.extra-large': 'Très grand (25cm+)',
      'size.extra-large-desc': 'Toile complète',

      // Time Periods
      'time.morning': 'Matin',
      'time.afternoon': 'Après-midi',
      'time.evening': 'Soir',

      // Budget Options
      'budget.basic': 'Basique',
      'budget.standard': 'Standard',
      'budget.premium': 'Premium',
      'budget.luxury': 'Luxe',
      'budget.consultation': 'Consultation',
      'budget.small-pieces': 'Petites pièces',
      'budget.medium-artwork': 'Œuvres moyennes',
      'budget.large-designs': 'Grands designs',
      'budget.full-sessions': 'Séances complètes',
      'budget.custom-quote': 'Devis personnalisé',
      'budget.need-consultation': 'Besoin de consultation',

      // Availability Status
      'availability.available': 'Disponible',
      'availability.unavailable': 'Indisponible',
    },
    he: {
      // Navigation
      'nav.home': 'בית',
      'nav.artists': 'אמנים',
      'nav.contact': 'צור קשר',
      'nav.book': 'הזמן',
      'nav.book-session': 'הזמן את הפגישה שלך',

      // Hero Section
      'hero.title': 'SAGE',
      'hero.tagline': 'סטודיו קעקועים וגלריה',
      'hero.subtitle': 'סטודיו קעקועים מקצועי',

      // About Section
      'about.title': 'קעקועים ופירסינג מקצועיים',
      'about.title.line1': 'קעקועים',
      'about.title.line2': 'ופירסינג',
      'about.title.line3': 'מקצועיים',
      'about.description': 'ממוקם בתל אביב-יפו, SAGE מעצב קעקועים מקצועיים עם מגע אישי.',

      // Artists Section
      'artists.title': 'האמנים שלנו',
      'artists.book-with': 'הזמן עם',

      // Contact Section
      'contact.title': 'מוכנים להיות SAGED?',
      'contact.title.line1': 'מוכנים',
      'contact.title.line2': 'להיות SAGED?',
      'contact.start-booking': 'התחל הזמנה',
      'contact.talk-now': 'דבר עכשיו',

      // Footer
      'footer.studio-hours': 'שעות הסטודיו',
      'footer.find-us': 'מצא אותנו',
      'footer.open-maps': 'פתח במפות',
      'footer.navigate-waze': 'נווט עם Waze',
      'footer.made-with': 'נוצר עם',
      'footer.for-enthusiasts': 'לחובבי SAGE',
      'footer.privacy': 'מדיניות פרטיות',
      'footer.terms': 'תנאי שירות',

      // Booking Form
      'booking.title': 'הזמן את הפגישה שלך',
      'booking.step': 'שלב',
      'booking.of': 'מתוך',
      'booking.choose-artist': 'בחר את האמן שלך',
      'booking.artist-vision': 'האמן והחזון שלך',
      'booking.reference-images': 'תמונות התייחסות',
      'booking.share-inspiration': 'שתף תמונות השראה',
      'booking.browse-files': 'עיין בקבצים',
      'booking.describe-vision': 'תאר את החזון שלך',
      'booking.vision-placeholder': 'שתף את החזון שלך לקעקוע...',
      'booking.choose-placement': 'בחר מיקום',
      'booking.choose-size': 'בחר גודל',
      'booking.choose-datetime': 'בחר תאריך ושעה',
      'booking.select-date': 'בחר תאריך',
      'booking.available-times': 'זמנים זמינים',
      'booking.choose-budget': 'בחר טווח תקציב',
      'booking.basic-contact': 'מידע קשר בסיסי',
      'booking.lets-start': 'בואו נתחיל עם השם והאימייל שלך',
      'booking.full-name': 'שם מלא',
      'booking.name-placeholder': 'השם המלא שלך',
      'booking.email': 'כתובת אימייל',
      'booking.email-placeholder': 'your.email@example.com',
      'booking.contact-method': 'שיטת קשר',
      'booking.choose-preferred': 'בחר את הדרך המועדפת שלך לשמור על קשר',
      'booking.phone': 'מספר טלפון',
      'booking.phone-placeholder': 'מספר הטלפון שלך',
      'booking.instagram': 'שם משתמש באינסטגרם',
      'booking.instagram-placeholder': '@yourusername',
      'booking.review': 'סקור את ההזמנה שלך',
      'booking.booking-summary': 'סיכום הזמנה',
      'booking.additional-notes': 'הערות נוספות',
      'booking.notes-placeholder': 'שתף כל בקשה מיוחדת, אלרגיות או מידע נוסף שיעזור לנו להתכונן לפגישה שלך...',
      'booking.confirmed': 'ההזמנה אושרה!',
      'booking.success-message': 'ההזמנה שלך נשלחה בהצלחה! נצור איתך קשר תוך 24 שעות לאישור פרטי הפגישה.',
      'booking.artist': 'אמן',
      'booking.placement': 'מיקום',
      'booking.size': 'גודל',
      'booking.budget': 'תקציב',
      'booking.date': 'תאריך',
      'booking.time': 'שעה',
      'booking.name': 'שם',
      'booking.phone-field': 'טלפון',
      'booking.instagram-field': 'אינסטגרם',
      'booking.email-field': 'אימייל',
      'booking.vision': 'חזון',
      'booking.not-provided': 'לא סופק',
      'booking.optional': '(אופציונלי)',
      'booking.back': 'חזור',
      'booking.next': 'הבא',
      'booking.confirm-booking': 'אשר הזמנה',
      'booking.submitting': 'שולח...',
      'booking.close': 'סגור',
      'booking.selected-artist': 'אמן נבחר',
      'booking.selecting-artist': 'בוחר אמן...',
      'booking.selecting-placement': 'בוחר מיקום...',
      'booking.selecting-size': 'בוחר גודל...',
      'booking.selecting-time': 'בוחר שעה...',
      'booking.selecting-budget': 'בוחר תקציב...',
      'booking.available': 'זמין',
      'booking.unavailable': 'לא זמין',

      // Common
      'common.or': 'או',
      'common.privacy-communication': 'פרטיות ותקשורת',
      'booking.privacy-text': 'מידע הקשר שלך מוגן בצורה מאובטחת וישמש רק לתיאום פגישת הקעקוע שלך. נצור איתך קשר תוך 24 שעות לאישור ההזמנה שלך ודיון בפרטים.',

      // Studio Info
      'studio.address': 'רחוב אילת 22, תל אביב-יפו',
      'studio.phone': '+972 50-123-4567',
      'studio.email': 'hello@sagetattoo.co.il',
      'studio.powered-by': 'מופעל על ידי Groc&Sunches',
      'studio.whatsapp-message': 'שלום! אני רוצה להזמין פגישת קעקוע ב-SAGE Tattoo. האם נוכל לקבוע פגישת ייעוץ?',

      // Placement Options
      'placement.arm': 'זרוע',
      'placement.arm-desc': 'חלק עליון של הזרוע',
      'placement.leg': 'רגל',
      'placement.leg-desc': 'ירך או שוק',
      'placement.back': 'גב',
      'placement.back-desc': 'כל הגב',
      'placement.chest': 'חזה',
      'placement.chest-desc': 'חלק עליון של החזה',
      'placement.shoulder': 'כתף',
      'placement.shoulder-desc': 'שכמה',
      'placement.forearm': 'אמה',
      'placement.forearm-desc': 'חלק תחתון של הזרוע',
      'placement.wrist': 'שורש כף היד',
      'placement.wrist-desc': 'אזור שורש כף היד',
      'placement.ankle': 'קרסול',
      'placement.ankle-desc': 'מיקום קרסול',
      'placement.neck': 'צוואר',
      'placement.neck-desc': 'אזור הצוואר',
      'placement.other': 'אחר',
      'placement.other-desc': 'מיקום מותאם אישית',

      // Size Options
      'size.small': 'קטן (5-10ס״מ)',
      'size.small-desc': 'פרטים עדינים',
      'size.medium': 'בינוני (10-15ס״מ)',
      'size.medium-desc': 'איזון מושלם',
      'size.large': 'גדול (15-25ס״מ)',
      'size.large-desc': 'הצהרה נועזת',
      'size.extra-large': 'גדול מאוד (25ס״מ+)',
      'size.extra-large-desc': 'קנבס מלא',

      // Time Periods
      'time.morning': 'בוקר',
      'time.afternoon': 'צהריים',
      'time.evening': 'ערב',

      // Budget Options
      'budget.basic': 'בסיסי',
      'budget.standard': 'סטנדרטי',
      'budget.premium': 'פרימיום',
      'budget.luxury': 'לוקסוס',
      'budget.consultation': 'ייעוץ',
      'budget.small-pieces': 'עבודות קטנות',
      'budget.medium-artwork': 'עבודות בינוניות',
      'budget.large-designs': 'עיצובים גדולים',
      'budget.full-sessions': 'פגישות מלאות',
      'budget.custom-quote': 'מחיר מותאם אישית',
      'budget.need-consultation': 'צריך ייעוץ',

      // Availability Status
      'availability.available': 'זמין',
      'availability.unavailable': 'לא זמין',
    }
  };

  return translations[language] || translations.en;
}
