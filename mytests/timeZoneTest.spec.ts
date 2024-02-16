import {expect } from "@playwright/test";
import {test} from "./fixtures/basePage"
import TimeZoneUtils from "../utils/TimeZoneUtils";

test.beforeEach(async ({page}, testInfo) => {
  await page.goto("https://www.livescore.com/en/");
  const cookies = await page.locator("#simpleCookieBarCloseButton");
  if (await cookies.isVisible()) {
    await cookies.click();
  }
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});

test("Time zone test", async ({ page, mainPage, eventPage, burgerMenu, settingsPage, dataPicker }) => {

  //click date picker
  await mainPage.clickToDatePicker();
  await mainPage.verifyDatePickerIsOpened();

  //get date
  const tomorrowData = await TimeZoneUtils.addDays(new Date(), 1);
  const myData = await TimeZoneUtils.getDateFormatForLiveScore(tomorrowData);

  //select date
  await dataPicker.selectDayInThisMonth(myData);

  //open first event
  await mainPage.openFirstEvent();

  const day = await eventPage.getDay();
  const time = await eventPage.getTime();

  const originalTimeZone: string = "UTC+02:00";
  const targetTimeZone: string = "UTC +05:00";

  await mainPage.openBurgerMenu();
  await burgerMenu.openSettingsPage();
  await settingsPage.selectTimeZone(targetTimeZone);
 //timeout needs to be fixed
  await page.waitForTimeout(3000);
  const dayAfter = await eventPage.getDay();
  const timeAfter = await eventPage.getTime();

  const timeZoneFromApp = dayAfter + " " + timeAfter;

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
