import {Locator, Page} from "playwright/test";
import {test} from "../mytests/fixtures/basePage";


export default class DatePicker {
    private readonly datePickerLocator: Locator;
    private readonly calendarBody: Locator;

    constructor(public page: Page) {
        this.datePickerLocator = page.locator('//div[@id="match-calendar-date-picker"]');
        this.calendarBody = page.locator('//div[@id="match-calendar-dp-trigger"]');
    }


    public async selectDayInThisMonth(localDate: string) {
        await test.step('Select day in month', async () => {
            console.log(localDate);
            const dayLocator = `//a[@dataid = '${localDate}']`;
            await this.datePickerLocator.locator(dayLocator).click();
        });
    }
}