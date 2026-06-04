import { test, expect } from '../../fixtures/baseFixtures';

// ============================================================
// Test Data
// ============================================================

const loginData = {
  user: 'anuradha.learn@gmail.com',
  password: 'Play@1234#$',
  baseUrl: 'https://qa-cart.com/',
};

const billingAddress = {
  firstName: 'Anuradha',
  lastName: 'Agarwal',
  street: '123 Test Street',
  city: 'Dubai',
  country: 'AE',
};


// ============================================================
// Billing Address Update Test
// ============================================================
test.describe('Profile Management  @profile', () => {
  test(
    'registered user successfully updates billing address @regression',
    async ({ loggedInPage:page }) => {

      // --------------------------------------------------------
      // Step 1 - Navigate to Billing Address Page
      // --------------------------------------------------------

      await test.step('Navigate to Billing Address page', async () => {

        await page.goto('/edit-address');

        await expect(
          page.getByRole('heading', {
            name: 'Billing address'
          })
        ).toBeVisible();

      });

      // --------------------------------------------------------
      // Step 2 - Open Edit Billing Address Form
      // --------------------------------------------------------

      await test.step('Open Edit Billing Address form', async () => {

        const editBillingLink = page.getByRole(
          'link',
          { name: 'Edit Billing address' }
        );

        await expect(editBillingLink).toBeEnabled();

        await Promise.all([
          page.waitForURL(/edit-billing-address|edit-address/),
          editBillingLink.click()
        ]);

        await page.waitForLoadState('domcontentloaded');

        await expect(
          page.getByRole('heading', {
            name: 'Billing address'
          })
        ).toBeVisible();

      });

      // --------------------------------------------------------
      // Step 3 - Update Billing Address
      // --------------------------------------------------------

      await test.step('Update billing address details', async () => {

        await page
          .getByLabel('First name')
          .fill(billingAddress.firstName);

        await page
          .getByLabel('Last name')
          .fill(billingAddress.lastName);

        await page
          .getByLabel('Street address')
          .fill(billingAddress.street);

        await page
          .getByLabel('Town / City')
          .fill(billingAddress.city);

        await page
          .locator('#billing_country')
          .selectOption({
            value: billingAddress.country
          });

        // Verify entered values before saving

        await expect(
          page.getByLabel('First name')
        ).toHaveValue(
          billingAddress.firstName
        );

        await expect(
          page.getByLabel('Last name')
        ).toHaveValue(
          billingAddress.lastName
        );

        await expect(
          page.getByLabel('Town / City')
        ).toHaveValue(
          billingAddress.city
        );

      });

      // --------------------------------------------------------
      // Step 4 - Save Billing Address
      // --------------------------------------------------------

      await test.step('Save updated billing address', async () => {

        const saveButton = page.getByRole(
          'button',
          { name: 'SAVE ADDRESS' }
        );

        await expect(saveButton).toBeEnabled();

        await saveButton.click();

        await expect(
          page.getByText(
            'Address changed successfully.'
          )
        ).toBeVisible();

      });

      // --------------------------------------------------------
      // Step 5 - Verify Saved Address
      // --------------------------------------------------------

      await test.step('Verify updated billing address is displayed', async () => {

        const billingSection = page.locator(
          '[class*="woocommerce-Address"]'
        );

        const addressBlock =
          billingSection.locator('address');

        await expect(addressBlock)
          .toContainText(
            billingAddress.firstName
          );

        await expect(addressBlock)
          .toContainText(
            billingAddress.lastName
          );

        await expect(addressBlock)
          .toContainText(
            billingAddress.street
          );

        await expect(addressBlock)
          .toContainText(
            billingAddress.city
          );

      });

      
    }
  )
}
)