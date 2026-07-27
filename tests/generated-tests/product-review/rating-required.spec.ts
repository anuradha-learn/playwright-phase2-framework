// spec: specs/product-review-intro.md
// seed: tests/seeds/product-review.seed.spec.ts

import { test, expect } from '../../../fixtures/baseFixtures';

test.describe('Product Review', () => {
  test('Rating Required – Submit without selecting a star rating', async ({ loggedInPage: page }) => {
    // 1. Navigate to product page and confirm the Assorted Coffee heading is visible
    await test.step('Navigate to product page and verify heading', async () => {
      await page.goto('https://qa-cart.com/product/assorted-coffee/');
      await expect(page.getByRole('heading', { name: 'Assorted Coffee' })).toBeVisible();
    });

    // 2. Click the Reviews (0) tab to open the review panel
    await test.step('Click the Reviews (0) tab to open the review panel', async () => {
      await page.getByRole('tab', { name: /Reviews/ }).click();
    });

    // 3. Leave the rating unselected and type review text only
    await test.step('Type a review without selecting a star rating', async () => {
      await page.getByRole('textbox', { name: 'Your review *' }).fill('This product is good.');
      await expect(page.getByRole('textbox', { name: 'Your review *' })).toHaveValue('This product is good.');
    });

    // 4. Click Submit and expect a validation alert for missing rating
    await test.step('Click Submit and verify rating validation alert appears', async () => {
      // WooCommerce fires window.alert() when no star is selected.
      // Use page.once to register an auto-dismiss handler before clicking;
      // this avoids the deadlock that occurs when waitForEvent leaves the
      // browser blocked on an unhandled alert while click() is still pending.
      let dialogMessage = '';
      page.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect.poll(() => dialogMessage).toBe('Please select a rating');
    });

    // 5. Verify the form was NOT submitted
    await test.step('Verify form was not submitted and textarea retains entered text', async () => {
      await expect(page).toHaveURL('https://qa-cart.com/product/assorted-coffee/');
      await expect(page.getByRole('textbox', { name: 'Your review *' })).toHaveValue('This product is good.');
    });
  });
});
