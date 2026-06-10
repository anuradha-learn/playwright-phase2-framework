// import { test, expect } from '@playwright/test';
import { test, expect } from '../../fixtures/baseFixtures';
import products from '../../data/product.json';
import { ProductPage } from '../../pages/ProductPage';
import { ShopPage } from '../../pages/ShopPage';

// ─────────────────────────────────────────────
// Product Test Data
// ─────────────────────────────────────────────
const product = products[0];

// ─────────────────────────────────────────────
// Test: View Product Details in New Tab
// ─────────────────────────────────────────────
test.describe('Products — product detail new tab @products', () => {
    test('registered user views product details in new tab @regression', async ({ loggedInPage: page }) => {
        const shopPage = new ShopPage(page)

        // Step 1: Navigate to DemoShop page
        await test.step('Navigate to DemoShop', async () => {
            shopPage.navigate()
        });

        // page.context().waitForEvent('page')

        // Step 2: Open product in a new tab and validate details
        await test.step('Open product details and validate', async () => {

            const productTab = await shopPage.openProductInNewTab(product.name)

            //Product page 
            const productPage = new ProductPage(productTab)

            // Verify product heading is displayed

            await productPage.verifyProductName(product.name)

            // Verify correct product page URL
            await productPage.verifyURL(product.expectedUrl)

            // Close the product tab
            await productTab.close();
        });
    })
})