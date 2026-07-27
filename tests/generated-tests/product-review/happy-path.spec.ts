// spec: specs/product-review-intro.md
// seed: tests/seeds/product-review.seed.spec.ts

import { test, expect } from '../../../fixtures/baseFixtures';

test.describe('Product Review', () => {
  test('Happy Path – Submit a valid product review', async ({ loggedInPage: page }) => {
    const reviewText = `Great coffee and excellent packaging. ${Date.now()}`;

    // 1. Navigate to product page and confirm the Assorted Coffee heading is visible
    await test.step('Navigate to product page and verify heading', async () => {
      await page.goto('https://qa-cart.com/product/assorted-coffee/');
      await expect(page.getByRole('heading', { name: 'Assorted Coffee' })).toBeVisible();
    });

    // 2. Click the Reviews (0) tab to open the review panel
    await test.step('Click the Reviews (0) tab to open the review panel', async () => {
      await page.getByRole('tab', { name: /Reviews/ }).click();
    });

    // 3. Select the 5 of 5 stars rating
    await test.step('Select the 5 of 5 stars rating', async () => {
      await page.locator('.star-5').click();
      await expect(page.getByRole('radio', { name: ' 5 of 5 stars' })).toBeVisible();
    });

    // 4. Type a non-empty review in the Your review textarea
    await test.step('Enter review text', async () => {
      await page.getByRole('textbox', { name: 'Your review *' }).fill(reviewText);
      await expect(page.getByRole('textbox', { name: 'Your review *' })).toHaveValue(reviewText);
    });

    // 5. Click the Submit button and verify successful submission
    await test.step('Submit the review and verify awaiting approval notice and review text', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      // URL changes to include unapproved parameter confirming submission was accepted
      await expect(page).toHaveURL(/unapproved=\d+/);
      // The newly submitted review is the URL fragment target
      await expect(page.locator(':target')).toContainText('Your review is awaiting approval');
      await expect(page.locator(':target')).toContainText(reviewText);
    });
  });
});
