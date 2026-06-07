import {test} from "../fixtures/fixtures";
import {standardUser} from "../data/users"

test('Successful login', async ({loginPage, inventoryPage}) => {
    await loginPage.login(standardUser);
    await inventoryPage.assertOnInventoryPage();
})