import { test, expect } from '../../fixtures/baseApiFixtures';
import { Activity, newActivity, updatedActivity } from '../../data/Activity';

test.describe('Activities API', () => {
  test('GET /activities returns a non-empty list', async ({ activityService }) => {
    const activities: Activity[] = await activityService.getActivities();
    expect(Array.isArray(activities)).toBe(true);
    expect(activities.length).toBeGreaterThan(0);
  });

  test('GET /activities/:id returns correct shape', async ({ activityService }) => {
    const activity: Activity = await activityService.getActivity(1);
    expect(activity).toMatchObject({
      id: 1,
      title: expect.any(String),
      dueDate: expect.any(String),
      completed: expect.any(Boolean),
    });
  });

  test('POST /activities creates a new activity', async ({ activityService }) => {
    const activity: Activity = await activityService.createActivity(newActivity);
    expect(activity).toMatchObject({
      id: expect.any(Number),
      title: newActivity.title,
      completed: newActivity.completed,
    });
  });

  test('PUT /activities/:id updates an activity', async ({ activityService, createdActivity }) => {
    const activity: Activity = await activityService.updateActivity(createdActivity.id, { ...updatedActivity, id: createdActivity.id });
    expect(activity).toMatchObject({
      id: createdActivity.id,
      title: updatedActivity.title,
      completed: updatedActivity.completed,
    });
  });

  test('DELETE /activities/:id deletes successfully', async ({ activityService, createdActivity }) => {
    await activityService.deleteActivity(createdActivity.id);
  });
});
