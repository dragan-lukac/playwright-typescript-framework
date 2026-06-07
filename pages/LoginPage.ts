import { Page } from '@playwright/test';
import { User } from '../data/users';

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(process.env.BASE_URL!);
    }

    async fillUsername(username: string) {
        await this.page.getByRole('textbox', {name: 'Username'}).fill(username);
    }

    async fillPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'Password'}).fill(password);
    }

    async clickLoginButton() {
        await this.page.getByRole('button', {name: 'Login'}).click();
    }

    async login(user: User) {
        await this.goto();
        await this.fillUsername(user.username);
        await this.fillPassword(user.password);
        await this.clickLoginButton();
    }
}