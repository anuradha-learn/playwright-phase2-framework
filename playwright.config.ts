import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv'

// Load environment variables 
dotenv.config({ quiet: true })


// Validate required variables at startup
if (!process.env.BASE_URL) throw new Error('BASE_URL is not set in .env');
if (!process.env.DEMO_USER) throw new Error('DEMO_USER is not set in .env');
if (!process.env.DEMO_PASS) throw new Error('DEMO_PASS is not set in .env');
if (!process.env.API_BASE_URL) throw new Error('API_BASE_URL is not set in .env');




export default defineConfig({ 
    workers: process.env.CI ? 1 : undefined,
    timeout: 40 * 1000,
    expect: { timeout: 40 * 1000 },
    globalTeardown: './global-teardown.ts',
    reporter: [['html'],['allure-playwright']],
    retries:process.env.CI ? 2 : 1,
   use:{
    screenshot:'only-on-failure',
    video:'retain-on-failure',
    trace:'on-first-retry'
   },
    projects: [
        {
            name: 'setup',
            testDir: './helpers',
            testMatch: 'auth.setup.ts',
            use: {
                browserName: 'chromium',
                headless: true,
            },
        },
        {
            name: 'chromium',
            testDir: './tests',
            use: {
                browserName: 'chromium',
                headless: true,
                baseURL:process.env.BASE_URL
            },
            dependencies: ['setup'],
        },
    ],
});