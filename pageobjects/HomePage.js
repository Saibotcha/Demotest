import { expect } from "@playwright/test";

export class HomePage {
    constructor(page) {
        this.page = page;
        this.productLink = (name) => `a:has-text('${name}')`;
        this.addToCartBtn = "a:has-text('Add to cart')";
        this.cartLink = "#cartur";
        this.placeOrderBtn = "button:has-text('Place Order')";
        this.orderModal = "#orderModal";
        this.orderForm = {
            name: "#name",
            country: "#country",
            city: "#city",
            card: "#card",
            month: "#month",
            year: "#year",
            purchase: "button:has-text('Purchase')"
        };
    }

    async selectProduct(name) {
        await this.page.click(this.productLink(name));
        await this.page.waitForSelector(this.addToCartBtn);
    }

    async addToCart() {
        try {
            const [dialog] = await Promise.all([
                this.page.waitForEvent('dialog', { timeout: 2000 }),
                this.page.click(this.addToCartBtn)
            ]);
        
        } catch {
            console.log("No dialog appeared, continuing...");
        }
        await this.page.waitForTimeout(500);
    }

    async goToCart() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(this.cartLink)
        ]);
    }

    async verifyProductInCart(productName) {
        await expect(this.page.locator(`td:has-text('${productName}')`)).toBeVisible({ timeout: 5000 });
    }

   async placeOrder(details) {
    // 1. Open Place Order modal
    await this.page.click(this.placeOrderBtn);

    // 2. Wait for the modal to be visible
    await this.page.waitForSelector(this.orderModal, { state: "visible" });

    // 3. Fill the form fields
    await this.page.fill(this.orderForm.name, details.name);
    await this.page.fill(this.orderForm.country, details.country);
    await this.page.fill(this.orderForm.city, details.city);
    await this.page.fill(this.orderForm.card, details.card);
    await this.page.fill(this.orderForm.month, details.month);
    await this.page.fill(this.orderForm.year, details.year);

    // 4. Click Purchase (remove dialog listener)
await this.page.click(this.orderForm.purchase);

// 5. Wait for the "Thank you" confirmation modal
const okButton = 'button:has-text("OK")';
await this.page.waitForSelector(okButton, { state: "visible" });

// 6. Click OK to close the confirmation
await this.page.click(okButton);

// 7. Close the order modal explicitly
const closeModalBtn = '#orderModal button:has-text("Close")';
await this.page.click(closeModalBtn);

// 8. Ensure the order modal is hidden
await this.page.waitForSelector(this.orderModal, { state: "hidden" });


   }}
