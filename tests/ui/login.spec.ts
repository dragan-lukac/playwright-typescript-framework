import { test } from "../../fixtures/uiFixtures";
import { standardUser, lockedOutUser } from "../../data/Users";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {
    test('Successful login', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(standardUser);
        await inventoryPage.assertOnInventoryPage();
    });

    test('Locked out user sees an error', async ({ loginPage }) => {
        await loginPage.login(lockedOutUser);
        await loginPage.assertError('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Wrong password shows an error', async ({ loginPage }) => {
        await loginPage.login({ username: standardUser.username, password: 'wrong_password' });
        await loginPage.assertError('Epic sadface: Username and password do not match any user in this service');
    });

    test('Empty username shows an error', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.clickLoginButton();
        await loginPage.assertError('Epic sadface: Username is required');
    });
});
