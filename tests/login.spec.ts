import { test } from "../fixtures/fixtures";
import { standardUser } from "../data/Users"

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {
    test('Successful login', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(standardUser);
        await inventoryPage.assertOnInventoryPage();
    });
});


