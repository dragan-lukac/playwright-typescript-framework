import {test as setup} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { standardUser } from '../data/Users';

setup('Authentication', async ({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.login(standardUser);
    await page.context().storageState({path: '.auth/user.json'});
});
