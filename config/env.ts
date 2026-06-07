import dotenv from 'dotenv';
import path from 'path';

export function loadEnv(): void {
    const ENV = process.env.ENV ?? 'dev';
    const envPath = path.resolve(__dirname, `../.env/.env.${ENV}`);
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        console.error(`Missing env file: .env/.env.${ENV}`);
        process.exit(1);
    }
    const required = ['BASE_URL', 'SAUCEDEMO_PASSWORD'];
    const missing = required.filter(key => !process.env[key]);
    if (missing.length) {
        console.error(`Missing env variables: ${missing.join(', ')}`);
        process.exit(1);
    }
}
