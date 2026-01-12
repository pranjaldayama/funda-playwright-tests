import { test, expect } from '../../src/fixtures/test-fixtures';
import citiesData from '../../src/data/cities.data.json';

const AMSTERDAM = citiesData[0].searchTerm;
const ROTTERDAM = citiesData[1].searchTerm;
const UTRECHT = citiesData[2].searchTerm;
const EINDHOVEN = citiesData[4].searchTerm;

test.describe('Search Functionality', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should return results when searching for Amsterdam', async ({ page, homePage, searchResultsPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(AMSTERDAM);

    // Verify we're on the search results page (URL may or may not contain city name)
    await expect(page).toHaveURL(/zoeken\/koop/i);

    const propertyCount = await searchResultsPage.getPropertyCount();
    expect(propertyCount).toBeGreaterThan(0);
  });

  test('should work for multiple popular cities', async ({ page, homePage, searchResultsPage }) => {
    const cities = [ROTTERDAM, UTRECHT, EINDHOVEN];

    for (const city of cities) {
      await homePage.goto();
      await homePage.searchForLocation(city);

      // Verify we're on search results page
      await expect(page).toHaveURL(/zoeken\/koop/i);

      const propertyCount = await searchResultsPage.getPropertyCount();
      expect(propertyCount).toBeGreaterThan(0);
    }
  });

  test('should display property cards with basic information', async ({ homePage, searchResultsPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(EINDHOVEN);

    // Wait for search results to load completely
    await searchResultsPage.waitForResults();
    
    // Verify first property is visible with increased timeout for Firefox
    await expect(searchResultsPage.firstProperty).toBeVisible({ timeout: 15000 });
  });
});
