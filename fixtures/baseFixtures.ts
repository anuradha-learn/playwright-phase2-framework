import { test as base, expect, Page, BrowserContext } from '@playwright/test'
import path from 'path'

//path of auth file
const authFile = path.join(__dirname, '..', 'auth', 'storageState.json')

//declare the fixture type

type AuthFixtures = {
    loggedInPage: Page
}

//build the fixture

export const test = base.extend<AuthFixtures>({

    loggedInPage: async ({ browser }, use) => {
        // ── Setup ─────────────────────────────
        // Create a new context with saved auth state

        const context: BrowserContext = await browser.newContext({
            storageState: authFile
        })

        //Hand authenticated page to test
        const page: Page = await context.newPage()
        await use(page)

        // ── Teardown ─────────────────────────────
        // Close the manually created context
        await context.close()

    }

})

export { expect };