import { Page, expect } from '@playwright/test';


export class ProductPage {

    constructor(private page: Page) { }

    // ─────────────────────────────────────────────
    // Actions
    // ─────────────────────────────────────────────

    async verifyProductName(name: string) {

        await expect(
            this.page.getByRole('heading', {
                name: name
            })
        ).toBeVisible();
    }


    async verifyURL(expectedUrl: string) {

        await expect(this.page)
            .toHaveURL(new RegExp(expectedUrl));

    }

}

