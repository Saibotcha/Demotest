import { expect } from "@playwright/test";

export class ContactPage {
    constructor(page) {
        this.page = page;
        this.contactLink = "a:has-text('Contact')";
        this.contactModal = "#exampleModal"; // Blaze demo Contact modal
        this.contactForm = {
            name: "#recipient-name",
            email: "#recipient-email",
            message: "#message-text",
            sendBtn: "button:has-text('Send message')"
        };
    }

    async goToContact() {
        // Ensure any previous modal is gone
        await this.page.waitForSelector('#orderModal', { state: 'hidden' }).catch(() => {});

        // Click Contact
        await this.page.click(this.contactLink);
        await this.page.waitForSelector(this.contactModal, { state: 'visible' });
    }

    async fillContactForm(name, email, message) {
        await this.page.fill(this.contactForm.name, name);
        await this.page.fill(this.contactForm.email, email);
        await this.page.fill(this.contactForm.message, message);
    }

    async submitForm() {
        // Wait for the dialog and click send simultaneously
        const [dialog] = await Promise.all([
            this.page.waitForEvent('dialog'),  // listens for the JS alert
            this.page.click(this.contactForm.sendBtn) // triggers the alert
        ]);

        console.log("Alert message:", dialog.message());
        
        // Wait for the contact modal to disappear
        await this.page.waitForSelector(this.contactModal, { state: 'hidden' });
    }
}
