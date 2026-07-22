export class BasePage {
  constructor(private readonly url: any) {}

  // @ts-ignore
  open(url: any) {
    return browser.url(this.url);
  }
}
