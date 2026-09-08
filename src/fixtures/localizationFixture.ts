import { test as base } from './testFixture';
import { Language } from '../constants/Enums';

export type LocalizationOptions = {
  language: Language;
};

export const test = base.extend<LocalizationOptions>({
  language: [Language.English, { option: true }],
});

export { expect } from '@playwright/test';
