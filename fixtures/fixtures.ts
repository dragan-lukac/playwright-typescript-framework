import {test as base} from '@playwright/test'
import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}

export const test = base.extend<Fixtures>({
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