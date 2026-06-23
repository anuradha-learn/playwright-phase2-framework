

async function deleteTestOrders(apiContext: any) {
  const response = await apiContext.get('/wp-json/wc/v3/orders', { params: { per_page: 5 }, });
  const orders = await response.json();
  //   const testOrders = orders.filter(
  //   (order: any) => order.billing.email === process.env.TEST_USER_EMAIL
  // );
  console.log(orders.length)
  console.log(`Found ${orders.length} orders to delete`);


  for (const order of orders) {
    console.log(`Deleting Order ${order.id}`);
    await apiContext.delete(`/wp-json/wc/v3/orders/${order.id}`, {
      params: {
        force: true
      }
    })
  }
}

// async function deleteTestCustomers(apiContext: any) {
//   // GET, filter, DELETE pattern — same shape
// }

// import { chromium } from "@playwright/test";
// async function clearCartViaUI() {
//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto(`${process.env.BASE_URL}/cart`);
//   // clear cart actions

//   await browser.close();
// }

import { createWooCommerceContext } from "./helpers/api_helper";

export default async function globalTeardown() {

  // Small delay before cleanup.
// WooCommerce occasionally continues processing order-related operations
// immediately after test execution. Waiting briefly helps avoid intermittent
// connection reset / socket hang up errors during teardown cleanup.
    await new Promise(resolve => setTimeout(resolve, 10000));


  const apiContext = await createWooCommerceContext()
  try {
    await deleteTestOrders(apiContext);
    // await deleteTestCustomers(apiContext);


  }
  finally {
    await apiContext.dispose()
  }

}



