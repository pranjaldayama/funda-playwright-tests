import { test, expect } from '../../src/fixtures/test-fixtures';
import citiesData from '../../src/data/cities.data.json';

const ROTTERDAM = citiesData[1].searchTerm;
const GRONINGEN = citiesData[5].searchTerm;
const HAARLEM = citiesData[6].searchTerm;

test.describe('Property Listings', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should display multiple property listings', async ({ homePage, searchResultsPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(ROTTERDAM);

    const propertyCount = await searchResultsPage.getPropertyCount();
    expect(propertyCount).toBeGreaterThanOrEqual(5);
  });

  test('should maintain correct URL structure for searches', async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.searchForLocation(GRONINGEN);

    // Verify we're on the search results page
    const url = page.url();
    expect(url.toLowerCase()).toContain('zoeken/koop');
  });

  test('should work across different viewport sizes', async ({ page, homePage, searchResultsPage }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await homePage.goto();
    await homePage.searchForLocation(HAARLEM);
    
    const desktopCount = await searchResultsPage.getPropertyCount();
    expect(desktopCount).toBeGreaterThan(0);

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    
    const mobileCount = await searchResultsPage.getPropertyCount();
    expect(mobileCount).toBeGreaterThan(0);
  });
});
