import { Locator, Page } from "playwright/test";

export default class EventPage {
    private readonly eventTime: Locator;
    private readonly eventDay: Locator;
  
    constructor(public page: Page) {
      this.eventTime = page.locator('//span[@id = "score-or-time"]');
      this.eventDay = page.locator('//span[@id = "SEV__status"]');
    }
  
    async getTime() {
      return await this.eventTime.innerText();
    }
  
    async getDay() {
      return await this.eventDay.innerText();
    }
  }