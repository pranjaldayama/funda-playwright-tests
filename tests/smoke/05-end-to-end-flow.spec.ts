import { test, expect } from '../../src/fixtures/test-fixtures';
import citiesData from '../../src/data/cities.data.json';

const AMSTERDAM = citiesData[0].searchTerm;
const ROTTERDAM = citiesData[1].searchTerm;
const UTRECHT = citiesData[2].searchTerm;
const EINDHOVEN = citiesData[4].searchTerm;

test.describe('End-to-End User Flows', () => {
  test.describe.configure({ mode: 'parallel' });

  test('complete journey: homepage → search → property details', async ({ homePage, searchResultsPage, propertyDetailPage }) => {
    await homePage.goto();
    await expect(homePage.logo).toBeVisible();

    await homePage.searchForLocation(AMSTERDAM);
    
    const propertyCount = await searchResultsPage.getPropertyCount();
    expect(propertyCount).toBeGreaterThan(0);

    await searchResultsPage.clickFirstProperty();
    await propertyDetailPage.waitForPageLoad();
    
    await expect(propertyDetailPage.address).toBeVisible();
    await expect(propertyDetailPage.price).toBeVisible();
  });

  test('should handle browsing multiple properties', async ({ page, homePage, searchResultsPage, propertyDetailPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(ROTTERDAM);

    await searchResultsPage.clickFirstProperty();
    await propertyDetailPage.waitForPageLoad();
    
    const firstPropertyAddress = await propertyDetailPage.address.textContent();

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for search results to be fully loaded after going back
    await searchResultsPage.waitForResults();
    
    // Wait for property cards to be visible and stable (especially for Firefox)
    const propertyCards = searchResultsPage.propertyCards;
    await expect(propertyCards.first()).toBeVisible({ timeout: 10000 });
    
    await propertyCards.nth(1).click();
    await propertyDetailPage.waitForPageLoad();
    
    const secondPropertyAddress = await propertyDetailPage.address.textContent();

    expect(firstPropertyAddress).not.toBe(secondPropertyAddress);
  });

  test('should work consistently across multiple searches', async ({ page, homePage, searchResultsPage }) => {
    const cities = [UTRECHT, EINDHOVEN];

    for (const city of cities) {
      await homePage.goto();
      await homePage.searchForLocation(city);

      // Verify we're on search results page (URL may not contain city name)
      await expect(page).toHaveURL(/zoeken\/koop/);
      
      const count = await searchResultsPage.getPropertyCount();
      expect(count).toBeGreaterThan(0);
    }
  });
});
