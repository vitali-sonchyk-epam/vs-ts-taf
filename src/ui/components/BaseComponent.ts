import { Locator } from '@playwright/test';

export class BaseComponent {
  protected constructor(protected readonly rootElement: Locator) {}
}
