import { test as base } from '@playwright/test';
import { ActivityRequest } from '../api/requests/ActivityRequest';
import { ActivityService } from '../api/services/ActivityService';
import { Activity, newActivity } from '../data/Activity';

type ActivityFixtures = {
  activityService: ActivityService;
  createdActivity: Activity;
};

export const test = base.extend<ActivityFixtures>({
  activityService: async ({ request }, use) => {
    await use(new ActivityService(new ActivityRequest(request)));
  },
  createdActivity: async ({ activityService }, use) => {
    const activity = await activityService.createActivity(newActivity);
    await use(activity);
    try { await activityService.deleteActivity(activity.id); } catch {}
  },
});
