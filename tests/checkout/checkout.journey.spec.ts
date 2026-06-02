import { test, expect } from '@playwright/test';

// ======================================================
// Test Data
// ======================================================

const loginData = {
    baseUrl: 'https://qa-cart.com/',
    username: 'anuradha.learn@gmail.com',
    password: 'Play@1234#$',
};

const testData = {
    search: {
        keyword: 'organic',
        maxPrice: '$25',
    },
};

// Variable to store dynamically generated order ID
let orderId: string | undefined;

// ======================================================
// Common Setup — Login before every test
// ======================================================

test.beforeEach(async ({ page }) => {

    await page.goto(loginData.baseUrl);

    await page.getByRole('textbox', {
        name: 'Username or email address'
    }).fill(loginData.username);

    await page.getByRole('textbox', {
        name: 'Password  Required'
    }).fill(loginData.password);

    await page.getByRole('button', {
        name: 'Log in'
    }).click();

    await expect(
        page.getByLabel('Account pages')
            .getByRole('link', { name: 'Log out' })
    ).toBeVisible();

});

// ======================================================
// Checkout Journey — Registered User Purchase Flow
// ======================================================

test.describe('Checkout — registered user purchase journey @checkout @journey', () => {

    test(
        'registered user searches filters purchases product and verifies order @smoke @regression @critical',
        async ({ page }) => {

            // ──────────────────────────────────────────
            // Step 1 — Open DemoShop
            // ──────────────────────────────────────────
            await test.step('Open DemoShop page', async () => {

                await page.getByRole('link', { name: 'DemoShop' }).click();

                await expect(
                    page.getByRole('heading', { name: 'DemoShop' })
                ).toBeVisible();

                await page.locator('ul.products li')
                    .first()
                    .waitFor({ state: 'visible' });

            });

            // ──────────────────────────────────────────
            // Step 2 — Search for products
            // ──────────────────────────────────────────
            await test.step('Search for products', async () => {

                await page.getByRole('searchbox', { name: 'Search' })
                    .fill(testData.search.keyword);

                await page.getByRole('button', { name: 'Search' }).click();

                await expect(
                    page.getByRole('heading', {
                        name: `Search results: “${testData.search.keyword}”`
                    })
                ).toBeVisible();

                // Verify every result contains the search keyword
                const products = page.locator('ul.products li');
                await products.first().waitFor({ state: 'visible' });
                const count = await products.count();

                for (let i = 0; i < count; i++) {
                    const title = await products.nth(i)
                        .getByRole('heading')
                        .textContent();
                    expect(title?.toLowerCase())
                        .toContain(testData.search.keyword.toLowerCase());
                }

            });

            // ──────────────────────────────────────────
            // Step 3 — Apply maximum price filter
            // ──────────────────────────────────────────
            await test.step('Apply maximum price filter', async () => {

                await page.getByRole('textbox', {
                    name: 'Filter products by maximum'
                }).fill(testData.search.maxPrice);

                // Convert "$25" to numeric 25 for comparison
                const maxPriceNum = Number(
                    testData.search.maxPrice.replace('$', '')
                );

                await page.getByText(`Up to $${maxPriceNum}`)
                    .waitFor({ state: 'visible' });

                // Verify every product is within the price range
                const products = page.locator('ul.products li');
                await products.first().waitFor({ state: 'visible' });
                const count = await products.count();

                for (let i = 0; i < count; i++) {
                    const priceText = await products.nth(i)
                        .locator('.price')
                        .textContent();
                    const price = Number(
                        priceText?.replace(/[^0-9.]/g, '')
                    );
                    expect(price).toBeLessThanOrEqual(maxPriceNum);
                }

            });

            // ──────────────────────────────────────────
            // Step 4 — Add first product to cart
            // ──────────────────────────────────────────
            await test.step('Add product to cart', async () => {

                const products = page.locator('ul.products li');
                await products.first().waitFor({ state: 'visible' });

                const firstProduct = products.first();
                const productName = await firstProduct
                    .getByRole('heading')
                    .textContent();
                expect(productName).toBeTruthy();

                // Click Add to Cart and verify button state changes
                const addToCartButton = firstProduct.getByRole('button', {
                    name: /Add to cart/i
                });
                await addToCartButton.click();
                await expect(addToCartButton).toHaveClass(/added/);

                // Navigate to cart and verify product is present
                const cartLink = page.getByRole('link', {
                    name: /View Shopping Cart/i
                });
                await expect(cartLink).toBeVisible();
                await Promise.all([
                    page.waitForURL(/mycart/),
                    cartLink.click()
                ]);

                await page.waitForLoadState('domcontentloaded');

                await expect(
                    page.getByText(productName!, { exact: true })
                ).toBeVisible();

            });

            // ──────────────────────────────────────────
            // Step 5 — Checkout and place order
            // ──────────────────────────────────────────
            await test.step('Checkout and place order', async () => {

                // Proceed to checkout
                const checkoutButton = page.getByRole('link', {
                    name: /proceed to checkout/i
                });
                await expect(checkoutButton).toBeEnabled();
                await Promise.all([
                    page.waitForURL(/checkout/),
                    checkoutButton.click()
                ]);

                // Place order
                const placeOrderButton = page.getByRole('button', {
                    name: /place order/i
                });
                await expect(placeOrderButton).toBeEnabled();
                await Promise.all([
                    page.waitForURL(/order-received/),
                    placeOrderButton.click()
                ]);

                await page.waitForLoadState('domcontentloaded');

                await expect(
                    page.getByText('Thank you. Your order has')
                ).toBeVisible();

                // Capture dynamically generated order ID
                orderId = await page.getByRole('listitem')
                    .filter({ hasText: 'Order number:' })
                    .locator('strong')
                    .textContent() || undefined;

                expect(
                    orderId,
                    'Order ID could not be read from the confirmation page'
                ).toBeTruthy();

                console.log(`Order placed: ${orderId}`);

            });

            // ──────────────────────────────────────────
            // Step 6 — Verify order in order history
            // ──────────────────────────────────────────
            await test.step('Verify order is available in order history', async () => {

                // Navigate to My Account
                const myAccountLink = page.getByRole('link', {
                    name: /my account/i
                });
                await Promise.all([
                    page.waitForURL(/qa-cart.com/),
                    myAccountLink.click()
                ]);

                // Navigate to Orders
                const ordersLink = page.getByRole('link', {
                    name: 'Orders',
                    exact: true
                });
                await Promise.all([
                    page.waitForURL(/orders/),
                    ordersLink.click()
                ]);

                await page.waitForLoadState('domcontentloaded');

                // Verify orders table is visible
                const ordersTable = page.getByRole('table');
                await expect(ordersTable).toBeVisible();

                // Find the row for the specific order
                const orderRow = ordersTable.getByRole('row')
                    .filter({
                        has: page.getByRole('link', {
                            name: `View order number ${orderId}`
                        })
                    });

                // Verify view order link is visible
                const viewOrderLink = orderRow.getByRole('link', {
                    name: `View order ${orderId}`
                });
                await expect(viewOrderLink).toBeVisible();

                // Open order detail page
                await Promise.all([
                    page.waitForURL(/view-order/),
                    viewOrderLink.click()
                ]);

                await page.waitForLoadState('domcontentloaded');

                // Verify correct order page opened
                await expect(
                    page.getByRole('heading', {
                        name: `Order #${orderId}`
                    })
                ).toBeVisible();

            });

            // ──────────────────────────────────────────
            // Step 7 — Logout
            // ──────────────────────────────────────────
            await test.step('Logout from application', async () => {

                await page.getByRole('link', { name: 'Log out' }).click();

            });

        }
    );

});