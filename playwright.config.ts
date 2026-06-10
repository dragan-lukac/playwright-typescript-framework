import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from './config/env';

loadEnv();

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line'], ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 3000,
    headless: true,
    testIdAttribute: 'data-test'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global setup',
      testDir: './config',
      testMatch: '**/global-setup.ts',
      teardown: 'global teardown',
    },
    {
      name: 'global teardown',
      testDir: './config',
      testMatch: '**/global-teardown.ts',
    },
    {
      name: 'authentication',
      testDir: './config',
      use: { headless: true },
      testMatch: '**/auth.setup.ts',
      dependencies: ['global setup'],
    },
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['authentication'],
    },
    {
      name: 'api',
      testDir: './tests/api',
      dependencies: ['global setup'],
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },
  ],
});
