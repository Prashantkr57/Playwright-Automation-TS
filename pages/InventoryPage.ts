import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(productName: string) {
    const formattedName = productName.toLowerCase().replaceAll(' ', '-');
    const locatorString = `[data-test=add-to-cart-${formattedName}]`;
    await this.page.locator(locatorString).click();
  }
}