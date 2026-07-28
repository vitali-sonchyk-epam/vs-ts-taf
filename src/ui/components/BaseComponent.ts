import { ChainablePromiseElement } from 'webdriverio';

export class BaseComponent {
  constructor(private readonly rootElementLocator: () => ChainablePromiseElement) {}

  protected get rootElement(): ChainablePromiseElement {
    return this.rootElementLocator();
  }
}