import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Homepage', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should load successfully and display key elements', async ({ homePage, page }) => {
    await homePage.goto();

    // Wait for page to fully load for stability
    // eslint-disable-next-line playwright/no-networkidle
    await homePage.page.waitForLoadState('networkidle').catch(() => {});
    
    // Verify key elements are visible
    await expect(homePage.searchInput).toBeVisible({ timeout: 10000 });
    await expect(homePage.searchInput).toBeEditable();
    
    // Verify we're on the correct page
    await expect(page).toHaveTitle(/Funda/);
  });

  test('should have proper page metadata', async ({ page, homePage }) => {
    await homePage.goto();

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
    await expect(page).toHaveTitle(/funda/i);
  });
});
