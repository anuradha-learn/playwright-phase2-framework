// import { test, expect } from '@playwright/test';
import { test, expect } from '../../fixtures/baseFixtures';
import products from '../../data/product.json';

// ─────────────────────────────────────────────
// Product Test Data
// ─────────────────────────────────────────────
// const testData = {
//     product: {
//         name: 'Assorted Coffee',
//         expectedUrl: /assorted-coffee/
//     }
// };
const product = products[0];

// ─────────────────────────────────────────────
// Test: View Product Details in New Tab
// ─────────────────────────────────────────────
test.describe('Products — product detail new tab @products', () => {
test('registered user views product details in new tab @regression', async ({ loggedInPage:page }) => {

    // Step 1: Navigate to DemoShop page
    await test.step('Navigate to DemoShop', async () => {

        page.goto('/demoshop')

        // await page.getByRole('link', {
        //     name: 'DemoShop'
        // }).click();

        // Verify user reaches Shop page
        await expect(page).toHaveURL(/shop/);
    });

    // page.context().waitForEvent('page')

    // Step 2: Open product in a new tab and validate details
    await test.step('Open product details and validate', async () => {

        // Locate the product link
        const productLink = page
            .getByRole('link', { name: product.name })
            .first();

        // Verify the link is configured to open in a new tab
        await expect(productLink).toHaveAttribute('target', '_blank');

        // Listen for the new page event BEFORE clicking the link
        // Promise.all prevents a race condition where the tab opens
        // before Playwright starts listening for it.
        const [productTab] = await Promise.all([
            page.context().waitForEvent('page'),
            productLink.click()
        ]);

        // console.log(productTab)

        // Wait until the new page finishes loading
        await productTab.waitForLoadState();

        // Verify product heading is displayed
        await expect(
            productTab.getByRole('heading', {
                name: product.name
            })
        ).toBeVisible();

        // Verify correct product page URL
        await expect(productTab)
            .toHaveURL(new RegExp(product.expectedUrl));

        // Close the product tab
        await productTab.close();
    });
})
})