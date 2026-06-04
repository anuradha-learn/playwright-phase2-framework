import { defineConfig } from '@playwright/test';


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
                baseURL:"http://qa-cart.com"
            },
            dependencies: ['setup'],
        },
    ],
});