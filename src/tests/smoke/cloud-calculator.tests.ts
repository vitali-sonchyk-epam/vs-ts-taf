import "dotenv/config";
import { CalculatorPage } from "../../pageObject/calculator_page";
const chai = require('chai');

const calculatorPage = new CalculatorPage();

const okCookieButton = process.env['LOCALE'] === 'en' ? 'OK, got it' : 'OK';

describe('Cloud Calculator', () => {
  before(async () => {
    // @ts-ignore
    await calculatorPage.open();
    const okButton = await $(`//*[text()="${okCookieButton}"]`);
    await okButton.click();
  });

  it('Should be able to add new entities into the calculator', async () => {
    console.log('First test');

    // @ts-ignore
    await calculatorPage.open();

    const url = await browser.getUrl();
    chai.expect(url).to.be.equal(browser.config.baseUrl + '/products/calculator');

    await expect(calculatorPage.addEstimateButton()).toBeDisplayed();

    const addEstimateButton = await calculatorPage.addEstimateButton();
    addEstimateButton.click();

    const addEstimationModalWindow = await calculatorPage.addEstimationModalWindow();

    await browser.pause(150);
    chai.expect(await addEstimationModalWindow.isDisplayed()).to.be.true;

    const computeEngineElement = await $('//h2[text()="Compute Engine"]');
    await computeEngineElement.click();

    await expect(calculatorPage.configurationBlock()).toBeDisplayed();
  });

  it("Should be able to add two new instances", async () => {
    console.log(`Second test`);

    $('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb').then(addNewInstanceButton => {
      for (let i = 0; i <= 2; i++) {
        addNewInstanceButton.click();
      }
    });

    const threeInstancesCostUSD = '$417.30';
    await expect($('.egBpsb .MyvX5d.D0aEmf')).toHaveText(threeInstancesCostUSD);
  });
});
