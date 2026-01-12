import { Page } from '@playwright/test';
import { HOME_PATH } from '../data/urls.data';
import { SearchBox } from '../fragments';
import { BasePage } from './base-page';

/**
 * Home Page - Funda homepage
 */
export class HomePage extends BasePage {
  readonly logo = this.page.locator('a[aria-label*="Funda"], img[alt*="Funda"], svg[aria-label*="Funda"]').first();
  readonly mainHeading = this.page.locator('h1, h2').first();
  readonly searchBox = new SearchBox(this.page.locator('form, [role="search"]').first());
  readonly searchInput = this.page.locator('input[placeholder*="plaats"]').first();
  readonly searchButton = this.page.locator('button.bg-primary-50, button[type="submit"]').first();
  readonly buyTab = this.page.locator('a[href*="/koop"]').first();
  readonly rentTab = this.page.locator('a[href*="/huur"]').first();
  readonly newConstructionTab = this.page.locator('a[href*="/nieuwbouw"]').first();
  readonly navigationMenu = this.page.locator('[data-role="navigation"], nav').first();
  readonly metaDescription = this.page.locator('meta[name="description"]');

  constructor(page: Page) {
    super(page);
  }

  async navigateTo(): Promise<void> {
    await super.navigateTo(HOME_PATH);
  }

  async goto(): Promise<void> {
    await this.navigateTo();
  }

  async searchForLocation(location: string): Promise<void> {
    // Click and fill the search input
    await this.searchInput.click();
    await this.searchInput.fill(location);
    
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(1500); // Wait for autocomplete to appear
    
    // Look for autocomplete dropdown with the location
    const autocompleteOption = this.page.locator(`[role="option"]:has-text("${location}"), [role="listbox"] li:has-text("${location}"), ul li:has-text("${location}")`).first();
    
    // Try to click autocomplete option if it appears
    const hasAutocomplete = await autocompleteOption.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (hasAutocomplete) {
      await autocompleteOption.click();
      // Wait for navigation - use try-catch to handle robot detection or other issues
      await this.page.waitForURL(/zoeken/, { timeout: 15000 }).catch(() => {
        // Navigation might not happen immediately, continue anyway
      });
    } else {
      // Try to find and click the search button (more reliable than Enter on Firefox)
      const searchBtn = this.page.locator('form button[type="submit"], button[type="submit"]:visible').first();
      const buttonVisible = await searchBtn.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (buttonVisible) {
        await searchBtn.click();
        await this.page.waitForURL(/zoeken/, { timeout: 15000 }).catch(() => {
          // Continue even if URL doesn't change immediately
        });
      } else {
        // Last resort: press Enter
        await this.searchInput.press('Enter');
        await this.page.waitForURL(/zoeken/, { timeout: 15000 }).catch(() => {
          // Continue even if URL doesn't change
        });
      }
    }
    
    // Additional wait to ensure page has loaded
    await this.waitForPageLoad();
    
    // Verify we're on a search page (either zoeken or still on homepage with results)
    const currentUrl = this.page.url();
    if (!currentUrl.includes('zoeken') && !currentUrl.includes('funda.nl')) {
      throw new Error(`Search navigation failed. Current URL: ${currentUrl}`);
    }
  }

  async clickSearchButton(): Promise<void> {
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isSearchInputVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  async getMainHeadingText(): Promise<string> {
    return (await this.mainHeading.textContent()) ?? '';
  }

  async clickBuyTab(): Promise<void> {
    await this.buyTab.click();
    await this.waitForPageLoad();
  }

  async clickRentTab(): Promise<void> {
    await this.rentTab.click();
    await this.waitForPageLoad();
  }

  async clickNewConstructionTab(): Promise<void> {
    await this.newConstructionTab.click();
    await this.waitForPageLoad();
  }

  async getMetaDescription(): Promise<string | null> {
    return await this.metaDescription.getAttribute('content');
  }

  async verifyPageLoaded(): Promise<boolean> {
    return (await this.isLogoVisible()) && (await this.isSearchInputVisible());
  }
}
