import { test as setup } from '@playwright/test';

setup('global setup', async ({ request }) => {

    await setup.step('clear leftover test data', async () => {
        // Delete anything a previous crashed run may have left behind.
        // Having this in setup AND teardown guarantees a clean slate even if
        // the last run never reached teardown.
        //
        // Examples:
        //   await request.delete('/api/orders?createdBy=test-user')
        //   await request.delete('/api/users?email=testuser%40example.com')
    });

    await setup.step('seed required test data', async () => {
        // Create records that must exist before any test runs
        // (lookup tables, product catalogue, default accounts, etc.)
        //
        // Examples:
        //   await request.post('/api/products', { data: { name: 'Test Product', price: 9.99 } })
    });

    await setup.step('validate environment', async () => {
        // Fail fast if the app is unreachable or required config is missing.
        //
        // Examples:
        //   const res = await request.get(process.env.BASE_URL!)
        //   expect(res.ok()).toBeTruthy()
    });
});
