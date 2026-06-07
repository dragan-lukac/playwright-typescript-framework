import {test} from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { InventoryPage } from "../page/InventoryPage";
import {standardUser} from "../data/users"

test('Successful login', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(standardUser);
    await inventoryPage.assertOnInventoryPage();
})