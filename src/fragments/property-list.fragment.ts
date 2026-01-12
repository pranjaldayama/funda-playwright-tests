import { Locator } from '@playwright/test';
import { PropertyCard } from './property-card.fragment';

/**
 * Property List Fragment - Manages a list of property cards
 */
export class PropertyList {
  readonly items: Locator;
  readonly loadingIndicator: Locator;

  constructor(private readonly container: Locator) {
    this.items = container.locator('div:has(> a[href*="/koop/"]), div:has(> a[href*="/huur/"])');
    this.loadingIndicator = container.locator('[data-role="loading"], .loading-indicator');
  }

  async getPropertyCard(index: number): Promise<PropertyCard> {
    return new PropertyCard(this.items.nth(index));
  }

  async getFirstPropertyCard(): Promise<PropertyCard> {
    return this.getPropertyCard(0);
  }

  async getPropertyCount(): Promise<number> {
    await this.waitForLoading();
    return await this.items.count();
  }

  async clickProperty(index: number): Promise<void> {
    // Get the link directly instead of clicking the card
    const propertyLink = this.items.nth(index).locator('a[href*="/koop/"], a[href*="/huur/"]').first();
    await propertyLink.click({ force: true });
  }

  async clickFirstProperty(): Promise<void> {
    await this.clickProperty(0);
  }

  async getPropertyAddresses(): Promise<string[]> {
    const count = await this.getPropertyCount();
    const addresses: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const card = await this.getPropertyCard(i);
      addresses.push(await card.getAddress());
    }
    
    return addresses;
  }

  private async waitForLoading(): Promise<void> {
    if (await this.loadingIndicator.isVisible().catch(() => false)) {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }
  }

  async isVisible(): Promise<boolean> {
    return await this.items.first().isVisible();
  }
}

