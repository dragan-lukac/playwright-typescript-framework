import { mergeTests } from '@playwright/test';
import { test as activityTest } from './activityFixtures';
import { test as bookTest } from './bookFixtures';

export const test = mergeTests(activityTest, bookTest);
export { expect } from '@playwright/test';
