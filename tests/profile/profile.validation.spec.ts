import { test, expect } from '../../fixtures/baseFixtures';

//read from JSON
import addresses from '../../data/addresses.json'
import { AddressPage } from '../../pages/AddressPage';

//read from Excel
// import { readExcel } from '../../utils/excel-reader';
// import { AddressData } from '../../utils/types';
// const addresses=readExcel<AddessData>('addresses.xlsx')

// ============================================================
// Billing Address Update Test
// ============================================================
test.describe('Profile Management  @profile', () => {
  addresses.forEach((billingAddress) => {
    test(
      `registered user for ${billingAddress.firstName} in ${billingAddress.city} successfully updates billing address @regression`,
      async ({ loggedInPage: page }) => {

        // --------------------------------------------------------
        // Step 1 - Navigate to Billing Address Page
        // --------------------------------------------------------
        const addressPage = new AddressPage(page)

        await test.step('Navigate to Billing Address page', async () => {

          await addressPage.navigate()

        });

        // --------------------------------------------------------
        // Step 2 - Open Edit Billing Address Form
        // --------------------------------------------------------

        await test.step('Open Edit Billing Address form', async () => {

          await addressPage.openEditForm()

        });

        // --------------------------------------------------------
        // Step 3 - Update Billing Address
        // --------------------------------------------------------

        await test.step('Update billing address details', async () => {

          await addressPage.fillBillingAddress(billingAddress)

        });

        // --------------------------------------------------------
        // Step 4 - Save Billing Address
        // --------------------------------------------------------

        await test.step('Save updated billing address', async () => {

          await addressPage.save()

        });

        // --------------------------------------------------------
        // Step 5 - Verify Saved Address
        // --------------------------------------------------------

        await test.step('Verify updated billing address is displayed', async () => {

          await addressPage.verifyAddress(billingAddress)

        }
        )
      }
    )

  }
  )

})
