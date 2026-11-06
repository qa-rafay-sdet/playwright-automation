import { test, expect } from '../../fixtures/pages.fixture';
import { users } from '../../data/users.data';
import { products } from '../../data/product.data'

test.describe('Cart', () => {
  // Precondition: logged in
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('user can add an item to the cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(products.backpack);

    // Expected result: badge shows 1, button changes to Remove
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeButton(products.backpack)).toBeVisible();
  });
});