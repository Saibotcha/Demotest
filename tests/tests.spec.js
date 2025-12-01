import { test } from "@playwright/test";
import { HomePage } from "../pageobjects/HomePage.js";
import { LoginPage } from "../pageobjects/LoginPage1.js";
import { ContactPage } from "../pageobjects/ContactPage.js";

test.describe('Add Mobile and Laptop to Cart and Place Order', () => {
    let page;
    let home;
    let login;
    let contact;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        login = new LoginPage(page);
        home = new HomePage(page);
        contact = new ContactPage(page);

        const username = "user" + Date.now();
        const password = "Test@123";

        // Sign up and login
        await login.goToApp();
        await login.signUp(username, password);
        await login.login(username, password);
    });

    test('Place order and submit contact form', async () => {
        // Add Nokia Mobile
        await home.selectProduct("Nokia lumia 1520");
        await home.addToCart();

        // Go back to Home
        await page.click("a:has-text('Home')");

        // Add Laptop
        await home.selectProduct("Sony vaio i5");
        await home.addToCart();

        // Go to Cart
        await home.goToCart();

        // Verify both products
        await home.verifyProductInCart("Nokia lumia 1520");
        await home.verifyProductInCart("Sony vaio i5");

        // Place Order
        await home.placeOrder({
            name: "John Doe",
            country: "USA",
            city: "New York",
            card: "1234567890123456",
            month: "12",
            year: "2025"
        });

        // Submit Contact form
        await contact.goToContact();
        await contact.fillContactForm("John Doe", "john@example.com", "Hello, this is a test message.");
        await contact.submitForm();
    });

    test.afterAll(async () => {
        // Logout after all tests
        const logoutLink = "a:has-text('Log out')";
        if (await page.locator(logoutLink).count() > 0) {
            await page.click(logoutLink);
        }
        await page.close();
    });
});
