import { expect, Page } from '@playwright/test';

export class CheckoutPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByTestId('firstName').fill(firstName);
        await this.page.getByTestId('lastName').fill(lastName);
        await this.page.getByTestId('postalCode').fill(postalCode);
    }

    async continue() {
        await this.page.getByTestId('continue').click();
    }

    async cancel() {
        await this.page.getByTestId('cancel').click();
    }

    async finish() {
        await this.page.getByTestId('finish').click();
    }

    async assertOnInfoPage() {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Your Information');
    }

    async assertOnOverviewPage() {
        await expect(this.page).toHaveURL('/checkout-step-two.html');
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview');
    }

    async assertOnCompletePage() {
        await expect(this.page).toHaveURL('/checkout-complete.html');
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Complete!');
    }

    async assertItemTotal(expected: string) {
        await expect(this.page.getByTestId('subtotal-label')).toHaveText(expected);
    }

    async assertOrderComplete() {
        await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
    }
}
