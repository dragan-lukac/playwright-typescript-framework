import {test} from "../fixtures/fixtures";
import {standardUser} from "../data/users"

test.use({storageState: {cookies: [], origins: []}});

test('Successful login', async ({loginPage, inventoryPage}) => {
    await loginPage.login(standardUser);
    await inventoryPage.assertOnInventoryPage();
});

