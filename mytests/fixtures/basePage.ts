import {test as base} from "@playwright/test";
import MainPage from "../../pages/MainPage";
import EventPage from "../../pages/EventPage";
import BurgerMenu from "../../pages/BurgerMenu";
import SettingsPage from "../../pages/SettingsPage";
import DatePicker from "../../utils/DatePicker";

export const test = base.extend<{
    mainPage: MainPage;
    eventPage: EventPage;
    burgerMenu: BurgerMenu;
    settingsPage: SettingsPage;
    dataPicker: DatePicker;
}>({
    //Define a fixtures
    mainPage: async ({page}, use) => {
        await use(new MainPage(page));
    },
    eventPage: async ({page}, use) => {
        await use(new EventPage(page));
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


