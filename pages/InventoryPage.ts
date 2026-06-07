import { expect, Locator, Page } from "@playwright/test";

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
        if (await cartCount.count() === 0) { return 0; }
        else {
            return parseInt(await cartCount.innerText());
        }
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
}