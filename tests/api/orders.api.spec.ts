// tests/api/orders.api.spec.ts

import { expect, test } from '@playwright/test';
import { createWooCommerceContext } from '../../helpers/api_helper';

test.describe(
  'Orders API —  @api @orders',
  () => {

    // test.skip(
    //   'GET /orders returns authenticated user orders @api @orders',
    //   async () => {}
    // );

    // test.skip(
    //   'POST /orders creates order with correct line items @api @orders',
    //   async () => {}
    // );

    test('GET orders returns a valid list', async () => {
      const apiContext=await createWooCommerceContext()
      try{
        const response=await apiContext.get('/wp-json/wc/v3/orders')
        // console.log(response.status());
        // console.log(await response.text());
        expect(response.status()).toBe(200)

        const orders=await response.json()
        // console.log(orders)
        expect(Array.isArray(orders)).toBe(true)
        expect(orders.length).toBeGreaterThan(0)
        const firstOrder=orders[0]
        expect(firstOrder).toHaveProperty('id');
        expect(firstOrder).toHaveProperty('status'); 
        expect(firstOrder).toHaveProperty('total'); 
        expect(firstOrder).toHaveProperty('line_items');
      }
      finally{

        await apiContext.dispose();

      }

    })

});