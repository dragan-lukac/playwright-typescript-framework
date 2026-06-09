import { test as teardown } from '@playwright/test';

teardown('global teardown', async ({ request }) => {

    await teardown.step('clear test data created during the run', async () => {
        // Mirror of the cleanup in global-setup — ensures no leftovers survive
        // into the next run regardless of how tests ended (pass, fail, or crash).
        //
        // Examples:
        //   await request.delete('/api/orders?createdBy=test-user')
        //   await request.delete('/api/users?email=testuser%40example.com')
    });

    await teardown.step('stop external services', async () => {
        // Shut down anything that was started in global-setup.
        //
        // Examples:
        //   process.kill(Number(process.env.SERVER_PID))
        //   await stopMockServer()
    });

    await teardown.step('archive artefacts', async () => {
        // Move reports, screenshots, or trace files to a shared location.
        //
        // Examples:
        //   await uploadToS3('./playwright-report', 'my-bucket/reports')
        //   fs.cpSync('./test-results', `/archive/${Date.now()}`, { recursive: true })
    });

    await teardown.step('send notifications', async () => {
        // Post a run summary to Slack, Teams, email, etc.
        //
        // Examples:
        //   await slack.postMessage(`Run finished`)
    });
});
