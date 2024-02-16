import { Locator , Page} from "playwright/test";

export default class SettingsPage {
    private readonly timeZoneElement: Locator;
    private readonly dropDown: Locator;
    private readonly applyButton: Locator;
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
      this.timeZoneElement = page.locator('//div[@id="TZ_SELECT"]');
      this.dropDown = page.locator('//div[@id="TZ_SELECT"]//div[contains(@class, "selectItems")]');
      this.applyButton = page.locator('//div[@id="settings-modal-apply-wrapper"]/button');
    }
  
    async clickOnDropDown(): Promise<void> {
      await this.timeZoneElement.click();
    }
  
    // async verifyDropDownIsOpened(): Promise<void> {
    //   await this.dropDown.waitForElementState('visible');
    // }
  
    async selectTimeZone(option: string): Promise<void> {
      await this.clickOnDropDown();
      //await this.verifyDropDownIsOpened();
      const neededTimeZoneLocator = `//div[text() = '${option}']`;
      await this.dropDown.locator(neededTimeZoneLocator).click();
      
      await this.applyButton.click();
    }
  }