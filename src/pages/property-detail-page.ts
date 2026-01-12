import { Page } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Property Detail Page - Individual property details
 */
export class PropertyDetailPage extends BasePage {
  readonly address = this.page.locator('h1, span[class*="street"], [data-test-id*="street"]').first();
  readonly price = this.page.locator('strong:has-text("€"), span:has-text("€"), [data-test-id*="price"]').first();
  readonly mainImage = this.page.locator('img[src*="funda"], img[alt*="foto"], picture img, img').first();
  readonly imageGallery = this.page.locator('[data-role="image-gallery"], .photo-gallery');
  readonly nextImageButton = this.page.locator('button[aria-label*="next"], button[aria-label*="volgende"]').first();
  readonly previousImageButton = this.page.locator('button[aria-label*="previous"], button[aria-label*="vorige"]').first();
  readonly description = this.page.locator('[data-role="description"], [class*="description"]').first();
  readonly features = this.page.locator('[data-role="features"], [class*="kenmerken"], dl, table').first();
  readonly contactButton = this.page.locator('button:has-text("Contact"), button:has-text("Vraag"), a:has-text("Contact")').first();
  readonly favoriteButton = this.page.locator('button[aria-label*="favoriet"], button:has-text("Bewaar")').first();
  readonly shareButton = this.page.locator('button[aria-label*="delen"], button:has-text("Delen")').first();
  readonly printButton = this.page.locator('button[aria-label*="print"], button:has-text("Print")').first();
  readonly backButton = this.page.locator('a:has-text("Terug naar"), button:has-text("Terug")').first();
  readonly breadcrumb = this.page.locator('nav[aria-label="breadcrumb"], [class*="breadcrumb"]');
  readonly agentInfo = this.page.locator('[data-role="agent-info"], .agent-details').first();
  readonly propertyType = this.page.locator('[data-role="property-type"]').first();
  readonly livingArea = this.page.locator('[data-role="living-area"], dd:has-text("m²")').first();
  readonly numberOfRooms = this.page.locator('[data-role="rooms"]').first();
  readonly buildYear = this.page.locator('[data-role="build-year"]').first();
  readonly energyLabel = this.page.locator('[data-role="energy-label"]').first();
  readonly availabilityDate = this.page.locator('[data-role="availability"]').first();

  constructor(page: Page) {
    super(page);
  }

  async waitForPageLoad(): Promise<void> {
    await super.waitForPageLoad();
    await this.address.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getAddress(): Promise<string> {
    return (await this.address.textContent()) ?? '';
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent()) ?? '';
  }

  async getDescription(): Promise<string> {
    if (await this.description.isVisible().catch(() => false)) {
      return (await this.description.textContent()) ?? '';
    }
    return '';
  }

  async isMainImageVisible(): Promise<boolean> {
    return await this.mainImage.isVisible();
  }

  async clickNextImage(): Promise<void> {
    if (await this.nextImageButton.isVisible().catch(() => false)) {
      await this.nextImageButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(300);
    }
  }

  async clickPreviousImage(): Promise<void> {
    if (await this.previousImageButton.isVisible().catch(() => false)) {
      await this.previousImageButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(300);
    }
  }

  async browseImages(count: number = 3): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.clickNextImage();
    }
  }

  async clickContactButton(): Promise<void> {
    if (await this.contactButton.isVisible().catch(() => false)) {
      await this.contactButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(500);
    }
  }

  async toggleFavorite(): Promise<void> {
    if (await this.favoriteButton.isVisible().catch(() => false)) {
      await this.favoriteButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(500);
    }
  }

  async clickShare(): Promise<void> {
    if (await this.shareButton.isVisible().catch(() => false)) {
      await this.shareButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(500);
    }
  }

  async goBackToSearchResults(): Promise<void> {
    if (await this.backButton.isVisible().catch(() => false)) {
      await this.backButton.click();
    } else {
      await this.page.goBack();
    }
    await this.waitForPageLoad();
  }

  async getPropertyType(): Promise<string> {
    if (await this.propertyType.isVisible().catch(() => false)) {
      return (await this.propertyType.textContent()) ?? '';
    }
    return '';
  }

  async getLivingArea(): Promise<string> {
    if (await this.livingArea.isVisible().catch(() => false)) {
      return (await this.livingArea.textContent()) ?? '';
    }
    return '';
  }

  async getNumberOfRooms(): Promise<string> {
    if (await this.numberOfRooms.isVisible().catch(() => false)) {
      return (await this.numberOfRooms.textContent()) ?? '';
    }
    return '';
  }

  async isBreadcrumbVisible(): Promise<boolean> {
    return await this.breadcrumb.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async isAgentInfoVisible(): Promise<boolean> {
    return await this.agentInfo.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async verifyPropertyInformationDisplayed(): Promise<boolean> {
    return (
      (await this.address.isVisible()) &&
      (await this.price.isVisible()) &&
      (await this.mainImage.isVisible())
    );
  }
}
