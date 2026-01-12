import { test, expect } from '../../src/fixtures/test-fixtures';
import citiesData from '../../src/data/cities.data.json';

const AMSTERDAM = citiesData[0].searchTerm;
const UTRECHT = citiesData[2].searchTerm;
const DEN_HAAG = citiesData[3].searchTerm;
const LEIDEN = citiesData[7].searchTerm;

test.describe('Property Details', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should load property detail page successfully', async ({ homePage, searchResultsPage, propertyDetailPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(AMSTERDAM);
    await searchResultsPage.clickFirstProperty();

    await propertyDetailPage.waitForPageLoad();
    await expect(propertyDetailPage.address).toBeVisible();
  });

  test('should display essential property information', async ({ homePage, searchResultsPage, propertyDetailPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(UTRECHT);
    await searchResultsPage.clickFirstProperty();
    await propertyDetailPage.waitForPageLoad();

    await expect(propertyDetailPage.address).toBeVisible();
    
    const addressText = await propertyDetailPage.address.textContent();
    expect(addressText).toBeTruthy();
    
    await expect(propertyDetailPage.price).toBeVisible();
  });

  test('should display property images', async ({ homePage, searchResultsPage, propertyDetailPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(DEN_HAAG);
    await searchResultsPage.clickFirstProperty();
    await propertyDetailPage.waitForPageLoad();

    await expect(propertyDetailPage.mainImage).toBeVisible();
  });

  test('should allow navigation back to search results', async ({ page, homePage, searchResultsPage, propertyDetailPage }) => {
    await homePage.goto();
    await homePage.searchForLocation(LEIDEN);

    // Verify we're on search results
    await expect(page).toHaveURL(/zoeken\/koop/);
    
    await searchResultsPage.clickFirstProperty();
    await propertyDetailPage.waitForPageLoad();

    // Verify we're on property detail page
    await expect(page).toHaveURL(/detail\/koop/);

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for search results to be fully restored (especially for WebKit)
    await searchResultsPage.waitForResults();
    
    // Wait for property cards to be visible to ensure page is fully loaded
    await expect(searchResultsPage.firstProperty).toBeVisible({ timeout: 10000 });

    // Verify we're back on search results
    await expect(page).toHaveURL(/zoeken\/koop/);
  });
});
