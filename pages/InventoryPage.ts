import { expect, Locator, Page } from "@playwright/test";
import { SortType } from "../data/SortType";
export class InventoryPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async addToCart(itemName: string) {
        const inventoryItem: Locator = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await inventoryItem.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeFromCart(itemName: string) {
        const inventoryItem: Locator = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await inventoryItem.getByRole('button', { name: 'Remove' }).click();
    }

    async getCartCount(): Promise<number> {
        const cartCount = this.page.locator('.shopping_cart_badge');
        if (await cartCount.count() === 0) {
            return 0;
        }
        return parseInt(await cartCount.innerText());
    }

    async sortItemsBy(sortType: SortType) {
        await this.page.getByTestId('product-sort-container').selectOption(sortType);
    }

    async assertOnInventoryPage() {
        const inventoryContainer = this.page.locator('.inventory_container')
        await expect(this.page).toHaveURL('/inventory.html');
        await expect(inventoryContainer).toBeVisible();
    }

    async assertCartCount(expectedCartCount: number) {
        const actualtCartCount = await this.getCartCount();
        expect(actualtCartCount).toBe(expectedCartCount);
    }

    async assertItemSorting(sortType: SortType) {
        const ascending = sortType === SortType.PriceLowHigh || sortType === SortType.NameAZ;

        if (sortType === SortType.PriceLowHigh || sortType === SortType.PriceHighLow) {
            const priceTexts = await this.page.getByTestId('inventory-item-price').allInnerTexts();
            const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
            const expected = [...prices].sort((a, b) => ascending ? a - b : b - a);
            expect(prices).toEqual(expected);
        } else {
            const names = await this.page.getByTestId('inventory-item-name').allInnerTexts();
            const expected = [...names].sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a));
            expect(names).toEqual(expected);
        }
    }

}


