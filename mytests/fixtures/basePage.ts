import {test as base} from "@playwright/test";
import MainPage from "../../pages/MainPage";
import EventPage from "../../pages/EventPage";
import BurgerMenu from "../../pages/BurgerMenu";
import SettingsPage from "../../pages/SettingsPage";
import DatePicker from "../../utils/DatePicker";


interface PageObjects {
    mainPage: MainPage;
    eventPage: EventPage;
    burgerMenu: BurgerMenu;
    settingsPage: SettingsPage;
    dataPicker: DatePicker;
}

export const test = base.extend<PageObjects>({
    //Define a fixtures
    mainPage: async ({page}, use) => {
        await page.goto("https://www.livescore.com/en/");
        const cookies = page.locator("#simpleCookieBarCloseButton");
        if (await cookies.isVisible()) {
            await cookies.click();
        }
        await use(new MainPage(page));
    },
    eventPage: async ({page}, use) => {
        await use(new EventPage(page));
        await page.close();
    },
    burgerMenu: async ({page}, use) => {
        await use(new BurgerMenu(page));
    },
    settingsPage: async ({page}, use) => {
        await use(new SettingsPage(page));
    },
    dataPicker: async ({page}, use) => {
        await use(new DatePicker(page));
    }
})


