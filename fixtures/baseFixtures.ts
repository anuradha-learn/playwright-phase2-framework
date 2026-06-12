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

    loggedInPage: async ({ browser }, use,testInfo) => {
        // ── Setup ─────────────────────────────
        // Create a new context with saved auth state

        const context: BrowserContext = await browser.newContext({
            storageState: authFile,
            recordVideo:{
                dir:testInfo.outputDir
            }
        })

        //Hand authenticated page to test
        const page: Page = await context.newPage()
        await use(page)

        // ── Teardown ─────────────────────────────
        // Close the manually created context
        await context.close()
        if (testInfo.status!='passed'){

            const videoPath=await page.video()?.path()
            if (videoPath)
            {
                await testInfo.attach('video',{path:videoPath,
                    contentType:'video/webm'})
            }

        }
        else{

            await page.video()?.delete()
        }

    }

})

export { expect };