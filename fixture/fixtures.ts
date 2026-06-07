import {test as base} from '@playwright/test'
import { InventoryPage } from '../page/InventoryPage'
import { LoginPage } from '../page/LoginPage'

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}

export const test = base.extend<MyFixtures>({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    }
});

export {expect} from '@playwright/test'