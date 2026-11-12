import { test, expect } from '../../fixtures/pages.fixture';
import { users } from '../../data/users.data';


test.describe('Login', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('SD-01 standard user can log in', async ({ page, loginPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
    });
    test('SD-02 locked out user cannot log in', async ({ page, loginPage }) => {
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);

        await expect(loginPage.errorMessage).toContainText('locked out');
        await expect(page).not.toHaveURL(/inventory/);
    });

    test('SD-03 user cannot log in with empty credentials', async ({ page, loginPage }) => {

        await loginPage.loginButton.click();

        await expect(loginPage.errorMessage).toContainText('Username is required');
        await expect(page).not.toHaveURL(/inventory/);
    })
});