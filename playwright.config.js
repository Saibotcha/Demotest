// @ts-check
import { devices, defineConfig } from '@playwright/test';
//import * as dotenv from 'dotenv';

//dotenv.config(); // ✅ Load .env variables

const config = defineConfig({
  testDir: './tests',
  //retries: 1,
  workers: 1,

  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',

  use: {
    // @ts-ignore
    browserName: 'chromium',              // Playwright uses Chromium core for Edge
    //channel: 'msedge',
    ignoreHTTPSErrors: true,
    headless: true,
    screenshot: 'on',
    trace: 'on',
    video: 'off',
    launchOptions: {
      slowMo: 200
    },
    baseURL: process.env.BASE_URL, 
    // ✅ Use .env variable
  },
  
  
});

export default config;
