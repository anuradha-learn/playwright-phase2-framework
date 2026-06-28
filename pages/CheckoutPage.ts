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

    private get couponInput() {
        return this.page.getByPlaceholder('Coupon code');
    }

    private get applyCouponButton() {
        return this.page.getByRole('button', {
            name: /apply coupon/i
        });
    }

    private escapeRegExp(value: string) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    private getRemoveCouponButton(couponCode: string) {
        const escapedCouponCode = this.escapeRegExp(couponCode);

        return this.page.getByRole('button', {
            name: new RegExp(`remove.*${escapedCouponCode}`, 'i')
        });
    }


    
//Actions

    async proceedToCheckout(){
        await expect(this.checkoutButton).toBeEnabled();
                    await Promise.all([
                        this.page.waitForURL(/checkout/),
                        this.checkoutButton.click()
                    ]);
    }


    async placeOrder() {

   await expect(this.placeOrderButton).toBeVisible();
    
   await expect(this.placeOrderButton).toBeEnabled();

    await Promise.all([
         this.page.waitForURL(/order-received/),
         this.placeOrderButton.click()
    ]);


        //  this.page.waitForURL(/order-received/),
        //  this.placeOrderButton.click()


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

    async applyCoupon(couponCode: string) {
        await expect(this.couponInput).toBeVisible();
        await this.couponInput.fill(couponCode);
        await expect(this.applyCouponButton).toBeEnabled();
        await this.applyCouponButton.click();
    }

    async verifyCouponApplied(couponCode: string,discountPercent: number,originalTotal: number) {
        const discount = (originalTotal * discountPercent / 100).toFixed(2);
        const total = (originalTotal - parseFloat(discount)).toFixed(2);
        const removeCouponButton = this.getRemoveCouponButton(couponCode);

        await expect(removeCouponButton).toBeVisible();
        await expect(this.page.getByText(couponCode)).toBeVisible();
        // await expect(this.page.getByText(`-${discount}`)).toBeVisible();
        await expect(this.page.getByText(`-$${discount}`)).toBeVisible();

        await expect(this.page.getByText(`$${total}`)).toBeVisible();

    }  

    async removeCoupon(couponCode: string) {
        const removeCouponButton = this.getRemoveCouponButton(couponCode);

        await expect(removeCouponButton).toBeVisible();
        await removeCouponButton.click();
        await expect(removeCouponButton).not.toBeVisible();
    }

    
}

// import { Page, expect } from '@playwright/test';

// export class CheckoutPage {

//     constructor(private page: Page) {}

//     // ─────────────────────────────────────────────
//     // Locators
//     // ─────────────────────────────────────────────
//     private get checkoutButton() {
//         return this.page.getByRole('link', {
//             name: /proceed to checkout/i
//         });
//     }

//     private get placeOrderButton() {
//         return this.page.getByRole('button', {
//             name: /place order/i
//         });
//     }

//     private get confirmationMessage() {
//         return this.page.getByText('Thank you. Your order has');
//     }

//     private get orderIdLocator() {
//         return this.page.getByRole('listitem')
//             .filter({ hasText: 'Order number:' })
//             .locator('strong');
//     }

//     // ─────────────────────────────────────────────
//     // Actions
//     // ─────────────────────────────────────────────
//     async proceedToCheckout() {
//         await expect(this.checkoutButton).toBeEnabled();
//         await Promise.all([
//             this.page.waitForURL(/checkout/),
//             this.checkoutButton.click()
//         ]);
//     }

//     async placeOrder() {
//         await expect(this.placeOrderButton).toBeVisible();
//         await expect(this.placeOrderButton).toBeEnabled();
//         await Promise.all([
//             this.page.waitForURL(/order-received/),
//             this.placeOrderButton.click()
//         ]);
//         await expect(this.confirmationMessage).toBeVisible();
//     }

//     async captureOrderId():Promise<string> {
//         const orderId = await this.orderIdLocator.textContent();
//         expect(
//             orderId,
//             'Order ID could not be read from the confirmation page'
//         ).toBeTruthy();
//         console.log(`Order placed: ${orderId}`);
//         return orderId!;
//     }

// }