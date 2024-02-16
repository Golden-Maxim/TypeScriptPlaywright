import { Locator, Page } from "playwright/test";
import SettingsPage from "./SettingsPage";

export default class BurgerMenu {
  private readonly settingLink: Locator;

  constructor(public page: Page) {
    this.settingLink = page.locator('//a[@id = "burger-menu__settings"]');
  }

  async openSettingsPage() {
    await this.settingLink.click();
    return SettingsPage;
  }
}
