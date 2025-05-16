import { test, expect } from '@playwright/test';
import { performLogin, credentials } from '../utils/loginUtilsOrange';

import fs from 'fs';
import path from 'path';

const authFile = path.resolve(__dirname, '../../data/auth.json');


test.describe('second Tests', () => {
  test('Login with cookie stored', async ({ browser }) => {
  // Skip this test if the auth file doesn't exist
  if (!fs.existsSync(authFile)) {
    console.log('Auth file not found. Run the login test first.');
    test.skip();
    return;
  }
  
  // Create a new browser context with the saved authentication state
  const context = await browser.newContext({
    storageState: authFile
  });
  
  // Create a new page in this context
  const page = await context.newPage();
  
  // Navigate directly to the dashboard
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  
  // Verify we're on the dashboard page without having to log in again
  const dashboardHeader = await page.locator('.oxd-topbar-header-title');
  await expect(dashboardHeader).toBeVisible();

  await page.pause();
  
  console.log('Successfully navigated to dashboard using saved authentication!');
  
  // Close the context
  await context.close();
  });

});