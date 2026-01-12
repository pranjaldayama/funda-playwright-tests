import { Page } from '@playwright/test';

/**
 * Base Page - Common functionality for all pages
 */
export abstract class BasePage {
  constructor(readonly page: Page) {}

  get cookieAcceptButton() {
    return this.page.locator('button:has-text("Accepteren"), button:has-text("Accept"), #didomi-notice-agree-button').first();
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Check for error page
    const errorMessage = await this.page.locator('text=/storing|error|probleem/i').first().isVisible().catch(() => false);
    if (errorMessage) {
      throw new Error('Funda website is experiencing issues. Please try again later.');
    }
    
    // Wait for network idle for stability - acceptable for E2E tests
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // Continue if network idle timeout
    });
    await this.handleCookieConsent();
  }

  async handleCookieConsent(): Promise<void> {
    if (await this.cookieAcceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.cookieAcceptButton.click();
      await this.page.waitForLoadState('domcontentloaded');
      // Wait for the cookie popup to disappear
      await this.page.locator('#didomi-host, #didomi-popup').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    }
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
