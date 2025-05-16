import { test, expect } from '@playwright/test';
import { performLogin, credentials } from '../utils/loginUtilsOrange';

import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../../data/auth.json');

const { username, password, url } = credentials;

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    await performLogin(page, username, password, url);
   // await page.pause();
   
   // Wait for navigation to complete and verify we're logged in
  await page.waitForURL('**/dashboard/index');

    await expect(page.getByRole('link', { name: 'client brand banner' })).toBeVisible();

    // Save the storage state (cookies, localStorage) to a file
  const storageState = await page.context().storageState();
  fs.writeFileSync(authFile, JSON.stringify(storageState, null, 2));
  
  console.log('Authentication state saved successfully!');

  });

});