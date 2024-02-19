import {expect} from "@playwright/test";
import {test} from "./fixtures/basePage"
import TimeZoneUtils from "../utils/TimeZoneUtils";

test.beforeEach(async ({page}) => {
    await page.goto("https://www.livescore.com/en/");
    const cookies = await page.locator("#simpleCookieBarCloseButton");
    if (await cookies.isVisible()) {
        await cookies.click();
    }
    // Extend timeout for all tests running this hook by 30 seconds.
    //testInfo.setTimeout(testInfo.timeout + 30000);
});

test("Time zone test", async ({page, mainPage, eventPage, burgerMenu, settingsPage, dataPicker}) => {

    await test.step('Open data picker and verify its opened', async () => {
        await mainPage.clickToDatePicker();
        await mainPage.verifyDatePickerIsOpened();
    });

    const myData = await test.step('Get data in needed format yyyy-MM-dd', async () => {
        const [tomorrowData] = await Promise.all([TimeZoneUtils.addDays(new Date(), 1)]);
        return TimeZoneUtils.getDateFormatForLiveScore(tomorrowData);
    });

    await test.step('Select day in month', async () => {
        await dataPicker.selectDayInThisMonth(myData);
    });

    await test.step('Open first event', async () => {
        await mainPage.openFirstEvent();
    });

    //await page.waitForTimeout(3000);

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


    // const expectedTimeZone = await test.step('Convert time zone and delete whitespaces', async () => {
    //     const whiteSpaceLessTimeZone: string =  targetTimeZone.replace(/\s+/g, "");
    //     return  TimeZoneUtils.convertTimeZone(
    //         time,
    //         day,
    //         originalTimeZone,
    //         whiteSpaceLessTimeZone
    //     );
    // });
    const whiteSpaceLessTimeZone: string = await targetTimeZone.replace(/\s+/g, "");
    //timeout needs to be fixed
    await page.waitForTimeout(3000);
    const expectedTimeZone: string = await TimeZoneUtils.convertTimeZone(
        time,
        day,
        originalTimeZone,
        whiteSpaceLessTimeZone
    );

     await expect(timeZoneFromApp).toEqual(expectedTimeZone);
});
