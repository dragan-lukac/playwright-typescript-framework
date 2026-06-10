import { test as base } from '@playwright/test';
import { ActivityRequest } from '../api/requests/ActivityRequest';
import { BookRequest } from '../api/requests/BookRequest';
import { ActivityService } from '../api/services/ActivityService';
import { BookService } from '../api/services/BookService';

type ApiFixtures = {
  activityService: ActivityService;
  bookService: BookService;
};

export const test = base.extend<ApiFixtures>({
  activityService: async ({ request }, use) => {
    await use(new ActivityService(new ActivityRequest(request)));
  },
  bookService: async ({ request }, use) => {
    await use(new BookService(new BookRequest(request)));
  },
});

export { expect } from '@playwright/test';
