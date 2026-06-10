# Playwright Test Framework

A production-grade Playwright + TypeScript UI test framework for [saucedemo.com](https://www.saucedemo.com), built with interview-ready architecture.

## Tech stack

- [Playwright](https://playwright.dev/) `^1.60`
- TypeScript (strict mode)
- dotenv — multi-environment configuration

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Create your local env file from the example
cp .env/.env.dev.example .env/.env.dev
# Edit .env/.env.dev and fill in SAUCEDEMO_PASSWORD
```

## Running tests

```bash
# Run full suite (clears allure-results, runs all tests)
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run against a different environment
ENV=qa npm test
```

## Allure report

```bash
# Generate and open report from last test run
npm run report
```

Opens a local server — navigate to the printed URL in your browser.

## Docker

```bash
# Run full suite in Docker (defaults to dev environment)
npm run docker

# Run against a different environment
ENV=qa npm run docker
```

After the run, fix file ownership then open the report locally:

```bash
sudo chown -R $USER:$USER allure-results allure-report
npm run report
```

## Project structure

```
├── config/
│   └── env.ts                  # Loads and validates env file on startup
├── data/
│   ├── Users.ts                # Typed user credentials (reads from env)
│   └── SortType.ts             # Enum for inventory sort options
├── fixtures/
│   └── fixtures.ts             # Extends Playwright test with POM instances
├── pages/
│   ├── LoginPage.ts            # Login page interactions
│   └── InventoryPage.ts        # Inventory page interactions and assertions
├── tests/
│   ├── auth.setup.ts           # Runs once: logs in, saves session to .auth/
│   ├── login.spec.ts
│   └── inventory.spec.ts
├── .env/
│   ├── .env.dev                # Gitignored — real credentials
│   ├── .env.dev.example        # Committed — template for dev
│   ├── .env.qa                 # Gitignored — real credentials
│   └── .env.qa.example         # Committed — template for qa
└── playwright.config.ts
```

## Architecture decisions

### Page Object Model (POM)
Each page is a class that owns its locators and raw interactions. Tests never reference locators or `page.*` directly — they call named methods. This means a DOM change only requires updating one file.

### Fixtures
Fixtures replace `beforeEach` for POM setup. They are composable, automatically scoped to the test, and teardown always runs even on failure. Defined in `fixtures/fixtures.ts`, used in every spec.

### Authentication via storage state
`auth.setup.ts` logs in once and saves the session to `.auth/user.json`. All other tests load that session — no repeated login overhead.

### Multi-environment support
Environment is selected via the `ENV` variable: `ENV=qa npx playwright test`. Each environment has its own `.env/.env.<name>` file. `config/env.ts` validates required variables at startup and exits cleanly (no stack trace) if anything is missing.

### Test data as typed exports
All test data lives in `data/` as typed TypeScript exports. No magic strings in tests or page objects.
