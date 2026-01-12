import { Page } from '@playwright/test';
import { SEARCH_PATH } from '../data/urls.data';
import { PropertyList, SearchBox } from '../fragments';
import { BasePage } from './base-page';

/**
 * Search Results Page - Property listings and filters
 */
export class SearchResultsPage extends BasePage {
  readonly propertyList = new PropertyList(this.page.locator('body, main, [data-test-id="search-result-list"]').first());
  readonly searchResultsHeader = this.page.locator('[data-role="search-results-header"], h1').first();
  readonly searchBox = new SearchBox(this.page.locator('[data-role="search-box"]').first());
  readonly filterButton = this.page.locator('button:has-text("Filter"), button[aria-label*="filter"]').first();
  readonly sortDropdown = this.page.locator('select[name="sort"], button:has-text("Sorteren")').first();
  readonly priceFilterButton = this.page.locator('button:has-text("Prijs"), [data-role="price-filter"]').first();
  readonly roomsFilterButton = this.page.locator('button:has-text("Kamers"), [data-role="rooms-filter"]').first();
  readonly propertyTypeFilterButton = this.page.locator('button:has-text("Type woning")').first();
  readonly viewToggleListButton = this.page.locator('button[data-role="list-view"], button[aria-label*="lijst"]').first();
  readonly viewToggleMapButton = this.page.locator('button[data-role="map-view"], button[aria-label*="kaart"]').first();
  readonly noResultsMessage = this.page.locator('text="geen resultaten", text="no results", [data-role="no-results"]');
  readonly loadingIndicator = this.page.locator('[data-role="loading"], .loading-spinner');
  readonly paginationNext = this.page.locator('a[rel="next"], button:has-text("Volgende")').first();
  readonly paginationPrevious = this.page.locator('a[rel="prev"], button:has-text("Vorige")').first();
  readonly resultsCount = this.page.locator('[data-role="results-count"], .results-count').first();

  // Direct property card locators for backward compatibility
  readonly propertyCards = this.page.locator('div:has(> a[href*="/koop/"]), div:has(> a[href*="/huur/"])');
  readonly firstProperty = this.propertyCards.first();

  constructor(page: Page) {
    super(page);
  }

  async navigateTo(): Promise<void> {
    await super.navigateTo(SEARCH_PATH);
  }

  async getPropertyCount(): Promise<number> {
    await this.waitForPageLoad();
    await this.waitForResults();
    return await this.propertyList.getPropertyCount();
  }

  async clickFirstProperty(): Promise<void> {
    await this.propertyList.clickFirstProperty();
    await this.waitForPageLoad();
  }

  async clickPropertyByIndex(index: number): Promise<void> {
    await this.propertyList.clickProperty(index);
    await this.waitForPageLoad();
  }

  async getPropertyAddresses(): Promise<string[]> {
    return await this.propertyList.getPropertyAddresses();
  }

  async openFilters(): Promise<void> {
    if (await this.filterButton.isVisible().catch(() => false)) {
      await this.filterButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(500);
    }
  }

  async clickPriceFilter(): Promise<void> {
    await this.priceFilterButton.click();
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(500);
  }

  async clickRoomsFilter(): Promise<void> {
    await this.roomsFilterButton.click();
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(500);
  }

  async getSearchResultsHeaderText(): Promise<string> {
    return (await this.searchResultsHeader.textContent()) ?? '';
  }

  async isNoResultsMessageVisible(): Promise<boolean> {
    return await this.noResultsMessage.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async waitForResults(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    
    // Wait for loading indicator to disappear
    if (await this.loadingIndicator.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }
    
    // Wait for property cards to be present and stable (better than fixed timeout)
    await this.propertyCards.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {
      // If no property cards found, continue (might be no results page)
    });
    
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(500); // Small buffer for UI stability
  }

  async goToNextPage(): Promise<void> {
    if (await this.paginationNext.isVisible().catch(() => false)) {
      await this.paginationNext.click();
      await this.waitForResults();
    }
  }

  async goToPreviousPage(): Promise<void> {
    if (await this.paginationPrevious.isVisible().catch(() => false)) {
      await this.paginationPrevious.click();
      await this.waitForResults();
    }
  }

  async getResultsCount(): Promise<string> {
    if (await this.resultsCount.isVisible().catch(() => false)) {
      return (await this.resultsCount.textContent()) ?? '0';
    }
    return `${await this.getPropertyCount()}`;
  }

  async switchToMapView(): Promise<void> {
    if (await this.viewToggleMapButton.isVisible().catch(() => false)) {
      await this.viewToggleMapButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(1000);
    }
  }

  async switchToListView(): Promise<void> {
    if (await this.viewToggleListButton.isVisible().catch(() => false)) {
      await this.viewToggleListButton.click();
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await this.page.waitForTimeout(1000);
    }
  }

  async verifyUrlContainsLocation(location: string): Promise<boolean> {
    const url = this.getCurrentUrl().toLowerCase();
    return url.includes(location.toLowerCase().replace(/\s+/g, '-'));
  }
}
