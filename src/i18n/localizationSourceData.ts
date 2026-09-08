import { Language } from '../constants/Enums';

export const languageSelectorLabels: Record<Language, string> = {
  [Language.English]: 'English',
  [Language.German]: 'Deutsch',
  [Language.French]: 'Français',
};

export const headerTranslations: Record<Language, string[]> = {
  [Language.English]: [
    'Overview',
    'Solutions',
    'Products',
    'Pricing',
    'Resources',
    'Contact us',
    'Docs',
    'Support',
    'Sign in',
  ],
  [Language.German]: [
    'Überblick',
    'Lösungen',
    'Produkte',
    'Preise',
    'Ressourcen',
    'Kontakt',
    'Docs',
    'Support',
    'Anmelden',
  ],
  [Language.French]: [
    'Présentation',
    'Solutions',
    'Produits',
    'Tarification',
    'Ressources',
    'Nous contacter',
    'Documentation',
    'Assistance',
    'Se connecter',
  ],
};
