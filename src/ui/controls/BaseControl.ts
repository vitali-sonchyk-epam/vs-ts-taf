import { Locator } from '@playwright/test';
import { BaseElement } from '../BaseElement';

export abstract class BaseControl extends BaseElement {
  protected constructor(rootElement: Locator) {
    super(rootElement);
  }
  abstract getValue(): Promise<string>;

  abstract setValue(value: string): Promise<void>;
}
