import { Locator } from '@playwright/test';

/**
 * Search Box Fragment - Reusable search component
 */
export class SearchBox {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;

  constructor(private readonly container: Locator) {
    this.searchInput = container.locator('input[type="text"], input[placeholder*="adres"]');
    this.searchButton = container.locator('button[type="submit"]');
    this.clearButton = container.locator('button[aria-label*="clear"], button[aria-label*="wissen"]');
  }

  async fill(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  async search(text: string): Promise<void> {
    await this.fill(text);
    await this.submit();
  }

  async submit(): Promise<void> {
    await this.searchButton.click();
  }

  async clear(): Promise<void> {
    if (await this.clearButton.isVisible().catch(() => false)) {
      await this.clearButton.click();
    } else {
      await this.searchInput.clear();
    }
  }

  async getValue(): Promise<string> {
    return (await this.searchInput.inputValue()) ?? '';
  }
}

