import { Page, expect } from '@playwright/test';
export class LoginPage {

    constructor(private page: Page) {

    }
    // ─────────────────────────────────────────────
    // Locators — private, used only inside this class
    // ─────────────────────────────────────────────
    private get usernameField(){
        return this.page.getByRole('textbox', {
        name: 'Username or email address'
    })
}

private get passwordField() {
        return this.page.getByRole('textbox', {
            name: 'Password'
        });
    }

    private get loginButton() {
        return this.page.getByRole('button', {
            name: 'Log in'
        });
    }

    private get logoutLink() {
        return this.page.getByLabel('Account pages')
            .getByRole('link', { name: 'Log out' });
    }


    // ─────────────────────────────────────────────
    // Actions — public, called by tests and setup
    // ─────────────────────────────────────────────

    async navigate(baseUrl: string) {
        await this.page.goto(baseUrl);
    }

    async login(user: string, password: string) {
        await this.usernameField.fill(user);
        await this.passwordField.fill(password)
        await this.loginButton.click()
       
    }

    async verifyLoggedIn()
    {
        await expect(this.logoutLink).toBeVisible()
    }


}