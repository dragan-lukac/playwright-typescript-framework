import { test as base } from '@playwright/test';
import { ActivityClient } from '../api/ActivityClient';
import { BookClient } from '../api/BookClient';

type ApiFixtures = {
  activityClient: ActivityClient;
  bookClient: BookClient;
};

export const test = base.extend<ApiFixtures>({
  activityClient: async ({ request }, use) => {
    await use(new ActivityClient(request));
  },
  bookClient: async ({ request }, use) => {
    await use(new BookClient(request));
  },
});

export { expect } from '@playwright/test';
