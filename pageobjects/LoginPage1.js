export class LoginPage {

    constructor(page){
        this.page = page;

        // Sign Up objects
        this.signupLink = "#signin2";
        this.signupUsername = "#sign-username";
        this.signupPassword = "#sign-password";
        this.signupBtn = "button[onclick='register()']";

        // Login objects
        this.loginLink = "#login2";
        this.loginUsername = "#loginusername";
        this.loginPassword = "#loginpassword";
        this.loginBtn = "button[onclick='logIn()']";

        this.logoutLink = "#logout2";
    }

    async goToApp() {
        await this.page.goto("https://www.demoblaze.com/");
    }

    async signUp(user, pass) {
        await this.page.click(this.signupLink);
        await this.page.fill(this.signupUsername, user);
        await this.page.fill(this.signupPassword, pass);
        this.page.on("dialog", dialog => dialog.accept());
        await this.page.click(this.signupBtn);
        await this.page.waitForTimeout(2000);
    }

    async login(user, pass) {
        await this.page.click(this.loginLink);
        await this.page.fill(this.loginUsername, user);
        await this.page.fill(this.loginPassword, pass);
        await this.page.click(this.loginBtn);
        await this.page.waitForSelector(this.logoutLink, { timeout: 5000 });
    }
}
