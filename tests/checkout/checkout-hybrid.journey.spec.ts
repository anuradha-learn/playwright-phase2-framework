import { test, expect } from '../../fixtures/baseFixtures';
import searchData from '../../data/search.json'
import { ShopPage } from '../../pages/ShopPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { OrdersPage } from '../../pages/OrdersPage';
import { createWooCommerceContext } from '../../helpers/api_helper';



test.describe('Checkout — UI purchase with API verification @checkout @journey @api', () => {


  // ======================================================
  // Checkout Journey — Registered User Purchase Flow
  // ======================================================


  searchData.forEach((search) => {
    test(
      `registered user searches for ${search.keyword} and ${search.maxPrice} filters purchases product and verifies order @smoke @regression @critical`,

      async ({ loggedInPage: page }) => {

        test.info().annotations.push({ type: 'Search keyword', description: search.keyword })
        test.info().annotations.push({ type: 'Max price', description: search.maxPrice });
        test.info().annotations.push({ type: 'Environment', description: 'staging' });




        let orderId: string | undefined;

        const shopPage = new ShopPage(page);
        const checkoutPage = new CheckoutPage(page)
        const orderPage = new OrdersPage(page)



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

          await checkoutPage.proceedToCheckout()

          // Place order

          await checkoutPage.placeOrder()
          // Capture dynamically generated order ID


          orderId = await checkoutPage.captureOrderId()
          await test.info().attach('OrderID', { body: orderId })

        });
        await test.step('Validate order via API', async () => {
              const apiContext = await createWooCommerceContext();
              try{

                const response = await apiContext.get(`/wp-json/wc/v3/orders/${orderId}`);
                expect(response.status()).toBe(200);

                const order = await response.json();
                expect(order.id).toBe(Number(orderId));
                expect(order.status).toBe('processing');
                expect(order.line_items.length).toBeGreaterThan(0);
              }
              finally{
                await apiContext.dispose()
              }


        })

        // // ──────────────────────────────────────────
        // // Step 6 — Verify order in order history
        // // ──────────────────────────────────────────
        // await test.step('Verify order is available in order history', async () => {

        //   await orderPage.navigate()
        //   await orderPage.verifyOrderExists(orderId!)

        // }
        // );



      })

  })
});



