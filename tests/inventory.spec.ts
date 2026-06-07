import { test } from "../fixtures/fixtures";

test('Navigate authenticated', async({inventoryPage})=> {
    await inventoryPage.goto()
    await inventoryPage.assertOnInventoryPage();
});