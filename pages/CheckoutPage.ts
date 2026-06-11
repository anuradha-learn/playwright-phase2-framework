import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {
    }

    // ─────────────────────────────────────────────
    // Locators
    // ─────────────────────────────────────────────

    private get checkoutButton() {
        return this.page.getByRole('link', {
            name: /proceed to checkout/i
        }
    );
    }

    private get placeOrderButton() {
        return this.page.getByRole('button', {
            name: /place order/i
        });
    }

    private get confirmationMessage() {
        return this.page.getByText('Thank you. Your order has');
    }

     private get orderIdLocator() {
        return this.page.getByRole('listitem')
            .filter({ hasText: 'Order number:' })
            .locator('strong');
    }
    // ─────────────────────────────────────────────
    // Actions
    // ─────────────────────────────────────────────


    async proceedToCheckout(){
        await expect(this.checkoutButton).toBeEnabled();
                    await Promise.all([
                        this.page.waitForURL(/checkout/),
                        this.checkoutButton.click()
                    ]);
    }


    async placeOrder() {
    await expect(this.placeOrderButton).toBeEnabled();
    await Promise.all([
        this.page.waitForURL(/order-received/),
        this.placeOrderButton.click()
    ]);
    await expect(this.confirmationMessage).toBeVisible();
    }

    async captureOrderId(){
        const orderId = await this.orderIdLocator
                        .textContent() || undefined;

                    expect(
                        orderId,
                        'Order ID could not be read from the confirmation page'
                    ).toBeTruthy();

                    console.log(`Order placed: ${orderId}`);
        return orderId
    }

    
}