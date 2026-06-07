import { expect, Page } from "@playwright/test";

export class InventoryPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async assertOnInventoryPage() {
        const inventoryContainer = this.page.locator('.inventory_container')
        await expect(this.page).toHaveURL('/inventory.html');
        await expect(inventoryContainer).toBeVisible();
    }
}