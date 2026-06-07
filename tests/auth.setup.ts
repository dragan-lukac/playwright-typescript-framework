import {test as setup} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { standardUser } from '../data/users';

setup('Authentication', async ({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser);
    await page.context().storageState({path: '.auth/user.json'});
});
