import { test, expect } from '@playwright/test'

test.describe("Login", () => {

    test('standard user can log in', async ({ page }) => {
        // Step 1: open login page
        await page.goto('/');

        // Step 2: enter credentials and submit
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Expected result: inventory page is shown
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
    });
});