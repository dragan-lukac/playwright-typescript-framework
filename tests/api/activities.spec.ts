import { test, expect } from '../../fixtures/apiFixtures';
import { Activity, newActivity, updatedActivity } from '../../data/Activity';

test.describe('Activities API', () => {
  test('GET /activities returns a non-empty list', async ({ activityClient }) => {
    const response = await activityClient.getActivities();

    expect(response.status()).toBe(200);
    const body: Activity[] = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /activities/:id returns correct shape', async ({ activityClient }) => {
    const response = await activityClient.getActivity(1);

    expect(response.status()).toBe(200);
    const body: Activity = await response.json();
    expect(body).toMatchObject({
      id: 1,
      title: expect.any(String),
      dueDate: expect.any(String),
      completed: expect.any(Boolean),
    });
  });

  test('POST /activities creates a new activity', async ({ activityClient }) => {
    const response = await activityClient.createActivity(newActivity);

    expect(response.status()).toBe(200);
    const body: Activity = await response.json();
    expect(body).toMatchObject({
      id: expect.any(Number),
      title: newActivity.title,
      completed: newActivity.completed,
    });
  });

  test('PUT /activities/:id updates an activity', async ({ activityClient }) => {
    const response = await activityClient.updateActivity(updatedActivity.id, updatedActivity);

    expect(response.status()).toBe(200);
    const body: Activity = await response.json();
    expect(body).toMatchObject({
      id: updatedActivity.id,
      title: updatedActivity.title,
      completed: updatedActivity.completed,
    });
  });

  test('DELETE /activities/:id returns 200', async ({ activityClient }) => {
    const response = await activityClient.deleteActivity(1);

    expect(response.status()).toBe(200);
  });
});
