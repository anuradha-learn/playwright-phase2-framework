import { test, expect } from '../../fixtures/baseFixtures';
import searchData from '../../data/search.json'
import { ShopPage } from '../../pages/ShopPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { OrdersPage } from '../../pages/OrdersPage';

// ======================================================
// Checkout Journey — Registered User Purchase Flow
// ======================================================

test.describe('Checkout — registered user purchase journey @checkout @journey', () => {

    searchData.forEach((search) => {
        test(
            `registered user searches for ${search.keyword} and ${search.maxPrice} filters purchases product and verifies order @smoke @regression @critical`,
            
            async ({ loggedInPage: page }) => {

            test.info().annotations.push({type:'Search keyword', description:search.keyword})
            test.info().annotations.push({ type: 'Max price', description: search.maxPrice });
            test.info().annotations.push({ type: 'Environment', description: 'staging' });




                let orderId: string | undefined;

                const shopPage = new ShopPage(page);
                const checkoutPage=new CheckoutPage(page)
                const orderPage=new OrdersPage(page)



                // ── Step 1: Open DemoShop ─────────────
                await test.step('Open DemoShop page', async () => {
                    await shopPage.navigate();
                });

                // ── Step 2: Search ────────────────────
                await test.step('Search for products', async () => {
                    await shopPage.search(search.keyword);
                });

                // ── Step 3: Price filter ──────────────
                await test.step('Apply maximum price filter', async () => {
                    await shopPage.applyPriceFilter(search.maxPrice);
                });

                // ── Step 4: Add to cart ───────────────
                await test.step('Add filtered product to cart', async () => {
                    await shopPage.addFirstProductToCart();
                });

                // ──────────────────────────────────────────
                // Step 5 — Checkout and place order
                // ──────────────────────────────────────────
                await test.step('Checkout and place order', async () => {

                    // Proceed to checkout
                    // const checkoutButton = page.getByRole('link', {
                    //     name: /proceed to checkout/i
                    // });
                    // await expect(checkoutButton).toBeEnabled();
                    // await Promise.all([
                    //     page.waitForURL(/checkout/),
                    //     checkoutButton.click()
                    // ]);
                    await checkoutPage.proceedToCheckout()

                    // Place order
                    // const placeOrderButton = page.getByRole('button', {
                    //     name: /place order/i
                    // });
                    // await expect(placeOrderButton).toBeEnabled();
                    // await Promise.all([
                    //     page.waitForURL(/order-received/),
                    //     placeOrderButton.click()
                    // ]);

                    // await page.waitForLoadState('domcontentloaded');

                    // await expect(
                    //     page.getByText('Thank you. Your order has')
                    // ).toBeVisible();
                    await checkoutPage.placeOrder()
                    // Capture dynamically generated order ID
                    // orderId = await page.getByRole('listitem')
                    //     .filter({ hasText: 'Order number:' })
                    //     .locator('strong')
                    //     .textContent() || undefined;

                    // expect(
                    //     orderId,
                    //     'Order ID could not be read from the confirmation page'
                    // ).toBeTruthy();

                    // console.log(`Order placed: ${orderId}`);
                    orderId=await checkoutPage.captureOrderId()
                    await test.info().attach ('OrderID',{body:orderId})

                });

                // ──────────────────────────────────────────
                // Step 6 — Verify order in order history
                // ──────────────────────────────────────────
                await test.step('Verify order is available in order history', async () => {

        //     //         // Navigate to My Account
        //     //         const myAccountLink = page.getByRole('link', {
        //     //             name: /my account/i
        //     //         });

        //     //         // Before — flaky
        //     //         // await Promise.all([
        //     //         //     page.waitForURL(/qa-cart.com/),
        //     //         //     myAccountLink.click()
        //     //         // ]);

        //     //         // After — reliable
        //     //         myAccountLink.click()
        //     //         await page.waitForLoadState('domcontentloaded');



        //     //         // Navigate to Orders
        //     //         const ordersLink = page.getByRole('link', {
        //     //             name: 'Orders',
        //     //             exact: true
        //     //         });



        //     //         // Before — flaky  
        //     //         // await Promise.all([
        //     //         //     page.waitForURL(/orders/),
        //     //         //     ordersLink.click()
        //     //         // ]);



        //     //         // After — reliable
        //     //         await ordersLink.click();
        //     //         await page.waitForURL(/orders/);
        //     //         await page.waitForLoadState('domcontentloaded')


        //     //         // Verify orders table is visible
        //     //         const ordersTable = page.getByRole('table');
        //     //         await expect(ordersTable).toBeVisible();

        //     //         // Find the row for the specific order
        //     //         const orderRow = ordersTable.getByRole('row')
        //     //             .filter({
        //     //                 has: page.getByRole('link', {
        //     //                     name: `View order number ${orderId}`
        //     //                 })
        //     //             });

        //     //         // Verify view order link is visible
        //     //         const viewOrderLink = orderRow.getByRole('link', {
        //     //             name: `View order ${orderId}`
        //     //         });
        //     //         await expect(viewOrderLink).toBeVisible();

        //     //         // Open order detail page
        //     //         await Promise.all([
        //     //             page.waitForURL(/view-order/),
        //     //             viewOrderLink.click()
        //     //         ]);

        //     //         await page.waitForLoadState('domcontentloaded');

        //     //         // Verify correct order page opened
        //     //         await expect(
        //     //             page.getByRole('heading', {
        //     //                 name: `Order #${orderId}`
        //     //             })
        //     //         ).toBeVisible();

        //     //     });

                  await orderPage.navigate()
                  await orderPage.verifyOrderExists(orderId!)  

            }
        );

        

    })

})
});