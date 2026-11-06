import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  // One product card, found by its visible name
  item(productName: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: productName });
  }

  // The Remove button inside one product card
  removeButton(productName: string): Locator {
    return this.item(productName).getByRole('button', { name: 'Remove' });
  }

  async addItemToCart(productName: string) {
    await this.item(productName).getByRole('button', { name: 'Add to cart' }).click();
  }
}