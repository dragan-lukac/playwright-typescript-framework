import { test } from "../fixtures/fixtures";

test('Navigate authenticated', async({inventoryPage})=> {
    await inventoryPage.goto()
    await inventoryPage.assertOnInventoryPage();
});

test('Add item to cart', async ({inventoryPage})=> {
    await inventoryPage.goto();
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.assertCartCount(1);
});

test('Empty Cart', async ({inventoryPage})=> {
    await inventoryPage.goto();
    await inventoryPage.assertCartCount(0);
})