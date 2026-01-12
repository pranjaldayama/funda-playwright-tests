import { Locator } from '@playwright/test';

/**
 * Property Card Fragment - Represents a single property card
 */
export class PropertyCard {
  readonly address: Locator;
  readonly price: Locator;
  readonly rooms: Locator;
  readonly size: Locator;
  readonly image: Locator;
  readonly favoriteButton: Locator;

  constructor(private readonly container: Locator) {
    this.address = container.locator('[data-role="property-address"], .property-address, h3, h4').first();
    this.price = container.locator('[data-role="property-price"], .price, [class*="price"]').first();
    this.rooms = container.locator('[data-role="rooms"], [title*="kamer"]').first();
    this.size = container.locator('[data-role="size"], [title*="m²"]').first();
    this.image = container.locator('img').first();
    this.favoriteButton = container.locator('button[aria-label*="favoriet"], button[aria-label*="favorite"]').first();
  }

  async click(): Promise<void> {
    await this.container.click();
  }

  async getAddress(): Promise<string> {
    return (await this.address.textContent()) ?? '';
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent()) ?? '';
  }

  async toggleFavorite(): Promise<void> {
    if (await this.favoriteButton.isVisible().catch(() => false)) {
      await this.favoriteButton.click();
    }
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }
}

