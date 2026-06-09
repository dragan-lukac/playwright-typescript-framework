import { expect, Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/cart.html');
    }

    async removeItem(itemName: string) {
        await this.page.getByTestId('inventory-item')
            .filter({ hasText: itemName })
            .getByRole('button', { name: 'Remove' })
            .click();
    }

    async continueShopping() {
        await this.page.getByTestId('continue-shopping').click();
    }

    async goToCheckout() {
        await this.page.getByTestId('checkout').click();
    }

    async assertOnCartPage() {
        await expect(this.page).toHaveURL('/cart.html');
        await expect(this.page.getByTestId('title')).toHaveText('Your Cart');
    }

    async assertItemCount(count: number) {
        await expect(this.page.getByTestId('inventory-item')).toHaveCount(count);
    }

    async assertItemPresent(itemName: string) {
        await expect(
            this.page.getByTestId('inventory-item').filter({ hasText: itemName })
        ).toBeVisible();
    }

    async assertEmpty() {
        await expect(this.page.getByTestId('inventory-item')).toHaveCount(0);
    }
}
