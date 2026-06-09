import { test as setup, expect } from '@playwright/test'
import path from 'path';
import { LoginPage } from '../pages/LoginPage';



// ─────────────────────────────────────────────
// Auth state output path
// ─────────────────────────────────────────────
const authFile = path.join(__dirname, '..', 'auth', 'storageState.json');

//Login Credentials

const loginData = {
    user: process.env.DEMO_USER!,
    password: process.env.DEMO_PASS!,
    baseUrl:process.env.BASE_URL!
};


// ─────────────────────────────────────────────
// Setup: authenticate once and save session
// ─────────────────────────────────────────────

setup('authenticate and save session', async ({ page, context }) => {

    const loginPage=new LoginPage(page)

    // Navigate to application
    await loginPage.navigate(loginData.baseUrl)

    //Login
    await loginPage.login(loginData.user,loginData.password)

    // Verify successful login
    await loginPage.verifyLoggedIn()

    await context.storageState({path:authFile})
    console.log(`Auth state saved to ${authFile}`);

}
)
