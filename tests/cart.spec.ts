import { test } from '../fixtures/fixtures';

test.describe('Cart Tests', () => {
    test('Navigate to cart page', async ({ cartPage }) => {
        await cartPage.goto();
        await cartPage.assertOnCartPage();
    });

    test('Cart contains item added from inventory', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.goto();
        await cartPage.assertItemCount(1);
        await cartPage.assertItemPresent('Sauce Labs Backpack');
    });

    test('Remove item from cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.goto();
        await cartPage.removeItem('Sauce Labs Backpack');
        await cartPage.assertEmpty();
    });

    test('Continue Shopping navigates back to inventory', async ({ cartPage, inventoryPage }) => {
        await cartPage.goto();
        await cartPage.continueShopping();
        await inventoryPage.assertOnInventoryPage();
    });
});
