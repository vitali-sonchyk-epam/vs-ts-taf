import { Locator } from '@playwright/test';
import { BaseElement } from '../BaseElement';

export class BaseComponent extends BaseElement {
  protected constructor(rootElement: Locator) {
    super(rootElement);
  }
}
