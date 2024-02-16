import { Locator, Page } from "playwright/test";
import VerifyUtils from "../utils/VerifyUtils";

export default class MainPage {
  private readonly datePicker: Locator;
  private readonly burgerMenu: Locator;
  private readonly burgerMenuBody: Locator;
  private readonly events: Locator;

  constructor(public page: Page) {
    this.datePicker = page.locator('//div[@id = "match-calendar-dp-trigger"]');
    this.burgerMenu = page.locator('//span[@id = "burger-menu-open"]');
    this.burgerMenuBody = page.locator('//div[@id = "burger-menu-body"]');
    this.events = page.locator(
      '//div[contains(@id, "match-row-favorite-wrapper")]/ancestor::a'
    );
  }

  async clickToDatePicker() {
    await this.datePicker.click();
    return this;
  }

  async verifyDatePickerIsOpened() {
    await VerifyUtils.verifyElementAttribute(this.datePicker);
    // await this.verifyElementAttribute(this.datePicker);
    return this;
  }

  async openFirstEvent() {
    await this.events.first().click();
  }

  async openBurgerMenu() {
    await this.burgerMenu.click();
  }

  async verifyBurgerMenuIsOpened() {
    //await this.verifyElementAttribute(this.burgerMenuBody);
    await VerifyUtils.verifyElementAttribute(this.burgerMenuBody);
  }

  // async verifyElementAttribute(element: Locator){
  //     const elementAttribute = await element.getAttribute('class');
  //     return elementAttribute !== null && elementAttribute.includes('isActive');
  //   }
}
