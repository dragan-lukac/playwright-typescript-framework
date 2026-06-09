import { test } from '../fixtures/fixtures';

test.describe('Checkout Tests', () => {
    test('Complete checkout flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.goto();
        await cartPage.goToCheckout();
        await checkoutPage.assertOnInfoPage();
        await checkoutPage.fillInfo('John', 'Doe', '12345');
        await checkoutPage.continue();
        await checkoutPage.assertOnOverviewPage();
        await checkoutPage.finish();
        await checkoutPage.assertOnCompletePage();
        await checkoutPage.assertOrderComplete();
    });

    test('Cancel checkout returns to cart', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.goto();
        await cartPage.goToCheckout();
        await checkoutPage.cancel();
        await cartPage.assertOnCartPage();
    });

    test('Order total is correct', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await cartPage.goto();
        await cartPage.goToCheckout();
        await checkoutPage.fillInfo('John', 'Doe', '12345');
        await checkoutPage.continue();
        await checkoutPage.assertItemTotal('Item total: $39.98');
    });
});
