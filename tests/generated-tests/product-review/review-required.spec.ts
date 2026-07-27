// spec: specs/product-review-intro.md
// seed: tests/seeds/product-review.seed.spec.ts

import { test, expect } from '../../../fixtures/baseFixtures';

test.describe('Product Review', () => {
  test('Review Required – Submit without entering review text', async ({ loggedInPage: page }) => {
    // 1. Navigate to product page and confirm the Assorted Coffee heading is visible
    await test.step('Navigate to product page and verify heading', async () => {
      await page.goto('https://qa-cart.com/product/assorted-coffee/');
      await expect(page.getByRole('heading', { name: 'Assorted Coffee' })).toBeVisible();
    });

    // 2. Click the Reviews (0) tab to open the review panel
    await test.step('Click the Reviews (0) tab to open the review panel', async () => {
      await page.getByRole('tab', { name: /Reviews/ }).click();
    });

    // 3. Select the 4 of 5 stars rating
    await test.step('Select the 4 of 5 stars rating', async () => {
      await page.locator('.star-4').click();
      await expect(page.getByRole('radio', { name: ' 4 of 5 stars' })).toBeVisible();
    });

    // 4. Leave the review textarea empty and click Submit
    await test.step('Click Submit with empty review text and verify native validation prevents submission', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      // Native HTML5 required-field validation blocks submission; URL must remain unchanged
      await expect(page).toHaveURL('https://qa-cart.com/product/assorted-coffee/');
      // Textarea is still empty and in invalid state (required field not filled)
      await expect(page.locator('textarea#comment:invalid')).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Your review *' })).toHaveValue('');
    });

    // 5. Verify the selected rating is retained
    await test.step('Verify the selected star rating is retained after failed submission', async () => {
      await expect(page.getByRole('radio', { name: ' 4 of 5 stars' })).toBeVisible();
    });
  });
});
