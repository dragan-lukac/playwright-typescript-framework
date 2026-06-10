import { test, expect } from '../../fixtures/apiFixtures';
import { Activity } from '../../data/apiTypes';

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
    const payload: Omit<Activity, 'id'> = {
      title: 'Test Activity',
      dueDate: '2025-01-01T00:00:00.000Z',
      completed: false,
    };

    const response = await activityClient.createActivity(payload);

    expect(response.status()).toBe(200);
    const body: Activity = await response.json();
    expect(body).toMatchObject({
      id: expect.any(Number),
      title: payload.title,
      completed: payload.completed,
    });
  });

  test('PUT /activities/:id updates an activity', async ({ activityClient }) => {
    const updated: Activity = {
      id: 1,
      title: 'Updated Activity',
      dueDate: '2025-06-01T00:00:00.000Z',
      completed: true,
    };

    const response = await activityClient.updateActivity(1, updated);

    expect(response.status()).toBe(200);
    const body: Activity = await response.json();
    expect(body).toMatchObject({
      id: 1,
      title: 'Updated Activity',
      completed: true,
    });
  });

  test('DELETE /activities/:id returns 200', async ({ activityClient }) => {
    const response = await activityClient.deleteActivity(1);

    expect(response.status()).toBe(200);
  });
});
