import { Locator, Page } from "playwright/test";

export default class VerifyUtils{

    private constructor(){}

    static async verifyElementAttribute(element: Locator){
        const elementAttribute = await element.getAttribute('class');
        return elementAttribute !== null && elementAttribute.includes('isActive');
    }


}