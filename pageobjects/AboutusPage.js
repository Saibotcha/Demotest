import { expect } from "@playwright/test";

export class AboutUsPage {
    constructor(page) {
        this.page = page;
        this.modalTitle = "#videoModalLabel";
        this.playBtn = "button[title='Play Video']";
        this.closeBtn = "button.btn.btn-secondary";
        this.videoElement = "#example-video_html5_api";
    }

    async verifyModalOpened() {
        await expect(this.page.locator(this.modalTitle)).toBeVisible();
        await expect(this.page.locator(this.modalTitle)).toHaveText("About us");
    }

    async playVideo() {
        await this.page.click(this.playBtn);
        await this.page.waitForTimeout(3000); 
    }

    async closeModal() {
    const visibleCloseBtn = this.page.locator("button.btn.btn-secondary:visible").first();
    await visibleCloseBtn.click();
    await expect(visibleCloseBtn).toBeHidden(); // ensures modal is closed
}
}
