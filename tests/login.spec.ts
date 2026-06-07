import {test} from "../fixture/fixtures";
import { LoginPage } from "../page/LoginPage";
import { InventoryPage } from "../page/InventoryPage";
import {standardUser} from "../data/users"

test('Successful login', async ({loginPage, inventoryPage}) => {
    await loginPage.login(standardUser);
    await inventoryPage.assertOnInventoryPage();
})