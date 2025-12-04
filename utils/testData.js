// utils/testData.js

export const userData = {
  generateUser() {
    return {
      username: "sai" + Date.now(),
      password: "Test@123"
    };
  }
};

export const orderData = {
  validOrder: {
    name: "Sai",
    country: "India",
    city: "Hyderabad",
    card: "1234567890123456",
    month: "12",
    year: "2025"
  }
};

export const contactData = {
  validMessage: {
    name: "Saikrishna",
    email: "sai@example.com",
    message: "Hello, this is a test message."
  }
};
