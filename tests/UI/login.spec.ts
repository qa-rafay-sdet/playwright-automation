import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../data/users.data';

test.describe('Login', () => {
    test('standard user can log in', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
    });
    test('locked out user cannot log in', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);

        await expect(loginPage.errorMessage).toContainText('locked out');
        await expect(page).not.toHaveURL(/inventory/);
    });
});