import { test as setup, expect } from '@playwright/test'
import path from 'path';


// ─────────────────────────────────────────────
// Auth state output path
// ─────────────────────────────────────────────
const authFile = path.join(__dirname, '..', 'auth', 'storageState.json');

//Login Credentials
const loginData = {
    user: 'anuradha.learn@gmail.com',
    password: 'Play@1234#$',
};

// ─────────────────────────────────────────────
// Setup: authenticate once and save session
// ─────────────────────────────────────────────

setup('authenticate and save session', async ({ page, context }) => {

    // Navigate to application
    await page.goto(loginData.baseUrl);

    // Enter username
    await page.getByRole('textbox', {
        name: 'Username or email address'
    }).fill(loginData.user);

    // Enter password
    await page.getByRole('textbox', {
        name: 'Password'
    }).fill(loginData.password);

    // Click Login button
    await page.getByRole('button', {
        name: 'Log in'
    }).click();

    // Verify successful login
    await expect(
        page.getByLabel('Account pages')
            .getByRole('link', { name: 'Log out' })
    ).toBeVisible();

    await context.storageState({path:authFile})
    console.log(`Auth state saved to ${authFile}`);

}
)
