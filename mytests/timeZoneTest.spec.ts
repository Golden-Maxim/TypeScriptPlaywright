import {expect} from "@playwright/test";
import {test} from "./fixtures/basePage"
import TimeZoneUtils from "../utils/TimeZoneUtils";

test.beforeEach(async ({page}) => {
    await page.goto("https://www.livescore.com/en/");
    const cookies = page.locator("#simpleCookieBarCloseButton");
    if (await cookies.isVisible()) {
        await cookies.click();
    }
});

test("Time zone test", async ({mainPage, eventPage, burgerMenu, settingsPage, dataPicker}) => {

    //beforeHooks.then(x => x);
    await mainPage.clickToDatePicker();
    await mainPage.verifyDatePickerIsOpened();
    const myData = await test.step('Get data in needed format yyyy-MM-dd', async () => {
        const [tomorrowData] = await Promise.all([TimeZoneUtils.addDays(new Date(), 1)]);
        return TimeZoneUtils.getDateFormatForLiveScore(tomorrowData);
    });
    await dataPicker.selectDayInThisMonth(myData);
    await mainPage.openFirstEvent();
    //  await page.waitForTimeout(3000);
    const day = await test.step('Get Day form page before changing time zone', async () => {
        return await eventPage.getDay();
    })
    const time = await test.step('Get Time from page before changing time zone', async () => {
        return await eventPage.getTime();
    });
    const originalTimeZone: string = "UTC+02:00";
    const targetTimeZone: string = "UTC +05:00";

    await test.step('Select another time zone', async () => {
        await mainPage.openBurgerMenu();
        await burgerMenu.openSettingsPage();
        await settingsPage.selectTimeZone(targetTimeZone);
    });

    const dayAfter = await test.step('Get Day form page AFTER changing time zone', async () => {
        return await eventPage.getDay();
    })
    const timeAfter = await test.step('Get Time from page AFTER changing time zone', async () => {
        return await eventPage.getTime();
    });

    const timeZoneFromApp = dayAfter + " " + timeAfter;
    const whiteSpaceLessTimeZone: string = await targetTimeZone.replace(/\s+/g, "");
    const expectedTimeZone: string = TimeZoneUtils.convertTimeZone(
        time,
        day,
        originalTimeZone,
        whiteSpaceLessTimeZone
    );

    await expect(timeZoneFromApp).toEqual(expectedTimeZone);
});
