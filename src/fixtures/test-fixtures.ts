import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SearchResultsPage } from '../pages/search-results-page';
import { PropertyDetailPage } from '../pages/property-detail-page';

type FundaFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  propertyDetailPage: PropertyDetailPage;
};

export const test = base.extend<FundaFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  propertyDetailPage: async ({ page }, use) => {
    await use(new PropertyDetailPage(page));
  },
});

export { expect } from '@playwright/test';

