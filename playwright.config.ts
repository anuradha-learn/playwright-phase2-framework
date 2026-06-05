import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv'

// Load environment variables 
dotenv.config({ quiet: true })


// Validate required variables at startup
if (!process.env.BASE_URL) throw new Error('BASE_URL is not set in .env');
if (!process.env.DEMO_USER) throw new Error('DEMO_USER is not set in .env');
if (!process.env.DEMO_PASS) throw new Error('DEMO_PASS is not set in .env');


export default defineConfig({
    timeout: 40 * 1000,
    expect: { timeout: 40 * 1000 },
    reporter: 'html',

    projects: [
        {
            name: 'setup',
            testDir: './helpers',
            testMatch: 'auth.setup.ts',
            use: {
                browserName: 'chromium',
                headless: false,
            },
        },
        {
            name: 'chromium',
            testDir: './tests',
            use: {
                browserName: 'chromium',
                headless: false,
                baseURL:process.env.BASE_URL
            },
            dependencies: ['setup'],
        },
    ],
});