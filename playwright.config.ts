import { defineConfig, devices } from '@playwright/test';

// ⚠️ REPLACE THIS WITH YOUR ACTUAL USER AGENT
// This is provided by Funda for bypassing robot detection during testing
const USER_AGENT = 'xxxx';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry once for flaky tests or server issues
  workers: process.env.CI ? 2 : 4,
  
  reporter: [
    ['html'],
    ['list'],
  ],

  use: {
    baseURL: 'https://www.funda.nl',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    // User agent to bypass robot detection
    userAgent: USER_AGENT,
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        userAgent: USER_AGENT,
      },
    },
    // Note: Firefox and WebKit are disabled due to Funda's stricter robot detection
    // on these browsers. All tests pass reliably on Chromium.
    // Uncomment below if you need to test on these browsers (may be flaky)
    /* {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        userAgent: USER_AGENT,
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        userAgent: USER_AGENT,
      },
    }, */
  ],
});
