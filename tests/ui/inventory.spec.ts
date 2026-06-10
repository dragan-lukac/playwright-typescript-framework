import { SortType } from "../../data/SortType";
import { test } from "../../fixtures/uiFixtures";

test.describe('Inventory Page Tests', () => {
    test('Navigate authenticated', async ({ inventoryPage }) => {
        await inventoryPage.goto()
        await inventoryPage.assertOnInventoryPage();
    });

    test('Add item to cart', async ({ inventoryPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.assertCartCount(1);
    });

    test('Empty Cart', async ({ inventoryPage }) => {
        await inventoryPage.goto();
        await inventoryPage.assertCartCount(0);
    });

    test.describe('sorting tests', () => {
        test('Sort Items by name A to Z', async ({ inventoryPage }) => {
            await inventoryPage.goto();
            await inventoryPage.sortItemsBy(SortType.NameAZ);
            await inventoryPage.assertItemSorting(SortType.NameAZ);
        });

        test('Sort Items by name Z to A', async ({ inventoryPage }) => {
            await inventoryPage.goto();
            await inventoryPage.sortItemsBy(SortType.NameZA);
            await inventoryPage.assertItemSorting(SortType.NameZA);
        });

        test('Sort Items by price low to high', async ({ inventoryPage }) => {
            await inventoryPage.goto();
            await inventoryPage.sortItemsBy(SortType.PriceLowHigh);
            await inventoryPage.assertItemSorting(SortType.PriceLowHigh);
        });

        test('Sort Items by price high to low', async ({ inventoryPage }) => {
            await inventoryPage.goto();
            await inventoryPage.sortItemsBy(SortType.PriceHighLow);
            await inventoryPage.assertItemSorting(SortType.PriceHighLow);
        });
    });

});
