// tests/cart/cart.validation.spec.ts

import { test } from '../../fixtures/baseFixtures';
import { ShopPage } from '../../pages/ShopPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import coupons from '../../data/coupon.json';

const coupon = coupons[0];

// test.describe(
//   'Cart — item management @cart',
//   () => {

//     test.skip(
//       'adding product to cart updates cart count @regression @cart',
//       async () => {}
//     );

//     test.skip(
//       'removing product from cart updates total correctly @regression @cart',
//       async () => {}
//     );

//     test.skip(
//       'empty cart displays appropriate empty state @regression @cart',
//       async () => {}
//     );

// });

test.describe('Cart — coupon management @cart', () => {

  test.beforeEach(async ({ loggedInPage: page }) => {
    const shopPage = new ShopPage(page);
    // await shopPage.navigate();
    await shopPage.clearCart()
    await shopPage.navigate();
    await shopPage.addFirstProductToCart();
  });

  // Apply valid coupon and verify 10 percent discount applied to cart total

  test(
    'applying valid coupon code applies discount to cart total @regression @cart',
    async ({ loggedInPage: page }) => {
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.applyCoupon(coupon.code);
      await checkoutPage.verifyCouponApplied(
        coupon.code,
        coupon.discountPercent,
        coupon.originalTotal
      );
    })

  // Remove applied coupon and verify cart total is restored to original value
  test.skip('removing applied coupon restores original cart total @regression @cart',
    async ({ loggedInPage: page }) => {}
);


});