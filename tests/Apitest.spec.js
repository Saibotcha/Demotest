const { test, expect } = require('@playwright/test');

const BASE_URL = "https://api.demoblaze.com";

let username;
let password = "Test@123";
let cookie;
let cartItemId;

test.describe.serial("Demoblaze API Automation Suite", () => {

  test("1. Signup API", async ({ request }) => {
    username = "user" + Date.now();

    const response = await request.post(`${BASE_URL}/signup`, {
      data: { username, password }
    });

    expect(response.status()).toBe(200);
    await new Promise(r => setTimeout(r, 1000)); // wait before login
  });

  test("2. Login API", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: { username, password }
    });

    expect(response.status()).toBe(200);

    let text = (await response.text()).trim();

    if (text.startsWith('"') && text.endsWith('"')) text = text.slice(1, -1);

    const match = text.match(/^Auth_token:\s*(.+)$/);
    if (!match) throw new Error("Login failed, token not returned properly");

    cookie = match[1].trim();
    console.log("Extracted Cookie:", cookie);
    expect(cookie.length).toBeGreaterThan(10);
  });

  test("3. Get Product List", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/entries`);
    expect(response.status()).toBe(200);

    const products = await response.json();
    console.log("Products:", products);

    expect(products.Items.length).toBeGreaterThan(0);
  });

  test("4. Add to Cart", async ({ request }) => {
    expect(cookie).toBeTruthy();

    const response = await request.post(`${BASE_URL}/addtocart`, {
      data: {
        cookie,
        prod_id: 1,
        flag: true
      }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log("Add to Cart Response:", data);

    if (data.errorMessage) {
      throw new Error(`Add to Cart failed: ${data.errorMessage}\nFull Response: ${JSON.stringify(data)}`);
    }

    expect(data).toHaveProperty("id");
    expect(typeof data.id).toBe("number");

    cartItemId = data.id;
  });

  test("5. View Cart", async ({ request }) => {
    expect(cookie).toBeTruthy();

    const response = await request.post(`${BASE_URL}/viewcart`, {
      data: { cookie }
    });

    expect(response.status()).toBe(200);

    const cart = await response.json();
    console.log("Cart Items:", cart);

    expect(cart).toBeTruthy();
  });

  test("6. Delete Cart Item", async ({ request }) => {
    expect(cartItemId).toBeTruthy();

    const response = await request.post(`${BASE_URL}/deletecart`, {
      data: { id: cartItemId, cookie }
    });

    expect(response.status()).toBe(200);
  });

  test("7. Place Order", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/checkout`, {
      data: {
        name: "Saikrishna",
        country: "India",
        city: "Hyderabad",
        card: "123456789012",
        month: "12",
        year: "2025"
      }
    });

    expect(response.status()).toBe(200);

    const result = await response.json();
    console.log("Order Response:", result);
  });

  test("8. Product Details by ID", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/view`, {
      data: { id: "1" }
    });

    expect(response.status()).toBe(200);

    const details = await response.json();
    console.log("Product Details:", details);

    expect(details).toHaveProperty("id");
  });

});