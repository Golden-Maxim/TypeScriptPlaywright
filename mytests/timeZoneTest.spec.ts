import { test, expect } from "@playwright/test";
import MainPage from "../pages/MainPage";
import EventPage from "../pages/EventPage";
import BurgerMenu from "../pages/BurgerMenu";
import SettingsPage from "../pages/SettingsPage";
import DatePicker from "../utils/DatePicker";
import TimeZoneUtils from "../utils/TimeZoneUtils";

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});

test("Time zone test", async ({ page }) => {
  await page.goto("https://www.livescore.com/en/");

  const cookies = await page.locator("#simpleCookieBarCloseButton");
  if (await cookies.isVisible()) {
    await cookies.click();
  }

  const mainPage = new MainPage(page);
  const eventPage = new EventPage(page);
  const burgerMenu = new BurgerMenu(page);
  const settingsPage = new SettingsPage(page);
  const dataPicker = new DatePicker(page);

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

  const day2 = await eventPage.getDay();
  const time2 = await eventPage.getTime();

  const timeZoneFromApp = day2 + " " + time2;

  const whiteSpaceLessTimeZone: string = targetTimeZone.replace(/\s+/g, "");
  const expectedTimeZone: string = await TimeZoneUtils.convertTimeZone(
    time,
    day,
    originalTimeZone,
    whiteSpaceLessTimeZone
  );

  await expect(timeZoneFromApp).toEqual(expectedTimeZone);
});
