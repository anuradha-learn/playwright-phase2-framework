import { Page, expect } from '@playwright/test';
import { AddressData } from '../utils/types';

export class AddressPage {

    constructor(private page: Page) {

    }

    // ─────────────────────────────────────────────
    // Locators
    // ─────────────────────────────────────────────

    private get editBillingLink() {
        return this.page.getByRole('link', {
            name: 'Edit Billing address'
        });
    }

    private get billingAddressHeading() {
        return this.page.getByRole('heading', {
            name: 'Billing address'
        })
    }

    private get firstNameField() {
        return this.page.getByLabel('First name');
    }

    private get lastNameField() {
        return this.page
            .getByLabel('Last name')
    }

    private get streetField() {
        return this.page.getByLabel('Street address');
    }

    private get cityField() {
        return this.page.getByLabel('Town / City');
    }

    private get saveButton() {
        return this.page.getByRole('button', {
            name: 'SAVE ADDRESS'
        });
    }

    private get successMessage() {
        return this.page.getByText(
            'Address changed successfully.'
        )
    }

    private get billingSection() {
        return this.page.locator(
            '[class*="woocommerce-Address"]'
        );

    }

    // ─────────────────────────────────────────────
    // Actions
    // ─────────────────────────────────────────────

    async navigate() {
        await this.page.goto('/edit-address');

        await expect(
            this.billingAddressHeading
        ).toBeVisible();
    }

    async openEditForm() {


        await expect(this.editBillingLink).toBeEnabled();

        await Promise.all([
            this.page.waitForURL(/edit-billing-address|edit-address/),
            this.editBillingLink.click()
        ]);

        await this.page.waitForLoadState('domcontentloaded');

        await expect(
            this.billingAddressHeading
        ).toBeVisible();

    }


    async fillBillingAddress(address:AddressData) {

        await this.firstNameField
          .fill(address.firstName);

        await this.lastNameField
          .fill(address.lastName);

        await this.streetField
          .fill(address.street);

        await this.cityField
          .fill(address.city);

        // await page
        //   .locator('#billing_country')
        //   .selectOption({
        //     value: billingAddress.country
        //   });

        // Verify entered values before saving

        await expect(
          this.firstNameField
        ).toHaveValue(
          address.firstName
        );

        await expect(
          this.lastNameField
        ).toHaveValue(
          address.lastName
        );

        await expect(
          this.cityField
        ).toHaveValue(
          address.city
        );

        
    }

    async save(){
        
        await expect(this.saveButton).toBeEnabled();

        await this.saveButton.click();

        await expect(
          this.successMessage
        ).toBeVisible();

    }

    async verifyAddress(address:AddressData){

        const addressBlock =
          this.billingSection.locator('address');

        await expect(addressBlock)
          .toContainText(
            address.firstName
          );

        await expect(addressBlock)
          .toContainText(
            address.lastName
          );

        await expect(addressBlock)
          .toContainText(
            address.street
          );

        await expect(addressBlock)
          .toContainText(
            address.city
          );

    }
}

