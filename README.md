# Playwright + TypeScript Test Framework

[![Playwright Tests](https://github.com/dragan-lukac/playwright-typescript-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/dragan-lukac/playwright-typescript-framework/actions/workflows/ci.yml)

An example test framework, built the way I build them for clients.
It tests a demo shop ([saucedemo.com](https://www.saucedemo.com)) in the browser and a demo REST API
([FakeRESTApi](https://fakerestapi.azurewebsites.net)).

**28 tests** · UI + API · Page Objects · fixtures · Docker · Allure report · GitHub Actions

## What it covers

| Area | Tests |
|---|---|
| Login | success, locked-out user, wrong password, empty username |
| Inventory | add / remove items, sort by name and price |
| Cart | open cart, item added, remove item, continue shopping |
| Checkout | full order, cancel, order total |
| Books API | GET list, GET by id, POST, PUT, DELETE |
| Activities API | GET list, GET by id, POST, PUT, DELETE |

## Quick start

```bash
npm ci
npx playwright install chromium
cp .env/.env.dev.example .env/.env.dev   # set SAUCEDEMO_PASSWORD=secret_sauce (public demo password)
npm test
```

| Command | What it does |
|---|---|
| `npm test` | all tests |
| `npm run test:ui` | browser tests only |
| `npm run test:api` | API tests only |
| `ENV=qa npm test` | run against another environment |
| `npm run report` | build and open the Allure report |
| `npm run docker` | run everything in Docker |

## Project structure

```
api/
  requests/     raw HTTP calls (one class per resource)
  services/     business-level API steps + response checks
config/
  env.ts        loads .env/.env.<ENV> and stops early if a variable is missing
  auth.setup.ts logs in once and saves the session
  global-setup.ts / global-teardown.ts / logger.ts
data/           typed test data (users, books, activities, sort types)
fixtures/       Playwright fixtures: page objects, API services, test data setup and cleanup
pages/          Page Objects: Login, Inventory, Cart, Checkout
tests/
  ui/           browser tests
  api/          API tests
.github/workflows/ci.yml   runs on every push and pull request
```

## Design choices

- **Page Objects.** Tests never touch locators. A UI change means one file to update.
- **Fixtures instead of `beforeEach`.** Setup and cleanup are reusable and always run, even when a test fails.
- **Log in once.** `auth.setup.ts` saves the session. UI tests start already logged in, so they are fast.
- **Request / service layers for API.** Raw HTTP stays in `requests/`. Tests read like business steps.
- **Typed test data.** No magic strings in tests.
- **Fail fast on config.** Missing env variables stop the run with a clear message, not a stack trace.
- **CI ready.** GitHub Actions runs the suite, keeps the Allure report, and keeps traces when a test fails.

## Need something like this for your app?

I build Playwright frameworks, API test suites and k6 load tests, and I fix flaky tests.
Find me on Upwork: **Dragan L.**, Playwright & API Test Automation Architect.
