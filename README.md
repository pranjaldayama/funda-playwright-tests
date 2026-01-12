# Funda Playwright Test Automation

Clean test automation for Funda using Playwright and TypeScript, following industry best practices and enterprise patterns.

## 🎯 What This Is

**5 smoke test suites** covering critical user journeys on Funda.nl:

1. **Homepage** - Basic functionality and page load (2 tests)
2. **Search** - Property search functionality (3 tests)
3. **Property Listings** - Search results and listings (3 tests)
4. **Property Details** - Individual property pages (4 tests)
5. **End-to-End Flows** - Complete user journeys (3 tests)

**Total: 15 focused, high-quality test cases**

## 📦 Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Add your user agent
# Edit playwright.config.ts and replace 'USER_AGENT' with your actual user agent
```

## ▶️ Running Tests

```bash
# Run all smoke tests
npm test

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug

# View test report
npm run report
```

## 🏗️ Project Structure

```
funda-playwright-tests/
├── src/
│   ├── data/                      # Test data (centralized)
│   │   ├── urls.data.ts           # URL path constants
│   │   └── cities.data.json       # Test data in JSON
│   │
│   ├── fixtures/                  # Custom Playwright fixtures
│   │   └── test-fixtures.ts       # Page object injection
│   │
│   └── pages/                     # Page Object Model
│       ├── base-page.ts           # Base functionality
│       ├── home-page.ts           # Homepage
│       ├── search-results-page.ts # Search results
│       ├── property-detail-page.ts# Property details
│       └── index.ts               # Exports
│
├── tests/
│   └── smoke/                     # Smoke test suites
│       ├── 01-homepage.spec.ts
│       ├── 02-search-functionality.spec.ts
│       ├── 03-property-listing.spec.ts
│       ├── 04-property-detail.spec.ts
│       └── 05-end-to-end-flow.spec.ts
│
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies
└── tsconfig.json                  # TypeScript config
```

## 🎯 Key Patterns & Best Practices

### 1. **Test Fixtures for Dependency Injection**

Page objects are injected as test parameters:

```typescript
test('should load property details', async ({ homePage, searchResultsPage, propertyDetailPage }) => {
  await homePage.goto();
  await homePage.searchForLocation(AMSTERDAM);
  await searchResultsPage.clickFirstProperty();
  
  await propertyDetailPage.waitForPageLoad();
  await expect(propertyDetailPage.address).toBeVisible();
});
```

### 2. **Centralized Test Data**

Data extracted to separate files:

```typescript
// src/data/urls.data.ts
export const HOME_PATH = '/';
export const SEARCH_PATH = '/zoeken';

// src/data/cities.data.json
[
  { "name": "Amsterdam", "searchTerm": "Amsterdam" },
  { "name": "Rotterdam", "searchTerm": "Rotterdam" }
]
```

### 3. **Constants at Test Level**

```typescript
import citiesData from '../../src/data/cities.data.json';

const AMSTERDAM = citiesData[0].searchTerm;
const ROTTERDAM = citiesData[1].searchTerm;

test.describe('Search', () => {
  test('searches Amsterdam', async ({ homePage }) => {
    await homePage.searchForLocation(AMSTERDAM);
  });
});
```

### 4. **Parallel Execution**

```typescript
test.describe('Search Functionality', () => {
  test.describe.configure({ mode: 'parallel' });
  
  // tests run in parallel
});
```

## 📊 Test Structure Example

```typescript
import { test, expect } from '../../src/fixtures/test-fixtures';
import citiesData from '../../src/data/cities.data.json';

const AMSTERDAM = citiesData[0].searchTerm;

test.describe('Property Details', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should display essential information', async ({ 
    homePage, 
    searchResultsPage, 
    propertyDetailPage 
  }) => {
    await homePage.goto();
    await homePage.searchForLocation(AMSTERDAM);
    await searchResultsPage.clickFirstProperty();
    await propertyDetailPage.waitForPageLoad();

    await expect(propertyDetailPage.address).toBeVisible();
    await expect(propertyDetailPage.price).toBeVisible();
  });
});
```

## 🎓 Advantages of This Pattern

### **Dependency Injection**
- Page objects injected automatically
- Clean test signatures
- Easy to mock for unit testing

### **Centralized Data**
- Single source of truth
- Easy to maintain
- Reusable across tests

### **Constants Pattern**
- Type-safe data access
- Intellisense support
- Clear test intent

### **Parallel Execution**
- Faster test runs
- Explicit configuration
- Better resource utilization

## 📈 Test Coverage

| Suite | Tests | What It Covers |
|-------|-------|----------------|
| Homepage | 2 | Page load, search input, metadata |
| Search | 3 | Search functionality, multiple cities |
| Listings | 3 | Property cards, responsive design |
| Details | 4 | Property info, images, navigation |
| E2E | 3 | Complete user journeys |

## 🔧 Configuration

### playwright.config.ts

```typescript
// Replace 'USER_AGENT' with your actual user agent
const USER_AGENT = 'USER_AGENT';

{
  baseURL: 'https://www.funda.nl',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
  fullyParallel: true,
  userAgent: USER_AGENT
}
```

⚠️ **Important**: Edit `playwright.config.ts` and replace `'USER_AGENT'` with your actual user agent to bypass robot detection.

## 🚀 Browser Support

- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## Current Test results Screenshot

- **Tests**: 15 passing
- **Browser**: Chromium
- **Last Updated**: January 2026

<img width="871" height="289" alt="image" src="https://github.com/user-attachments/assets/87c65b67-451c-4912-b46c-d94398bb62c0" />
<img width="728" height="835" alt="image" src="https://github.com/user-attachments/assets/ef507187-8532-42fc-aa73-846ab6d4c62c" />



## 📝 Comparing Patterns

### Before (Simple Pattern)
```typescript
test('test name', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchResultsPage(page);
  // ... rest of test
});
```

### After (Fixture Pattern)
```typescript
test('test name', async ({ homePage, searchResultsPage }) => {
  // Page objects auto-injected
  // Cleaner, more focused
});
```

## 🎯 Why This Structure?

1. **Maintainability** - Data separated from logic
2. **Scalability** - Easy to add new tests/data
3. **Testability** - Fixtures enable better testing
4. **Clarity** - Clear separation of concerns

## 🐛 Troubleshooting

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# See what's happening
npm run test:headed

# Debug a test
npm run test:debug
```

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

**Built following enterprise patterns and industry best practices for the Funda**

*Clean. Professional. Scalable.*
