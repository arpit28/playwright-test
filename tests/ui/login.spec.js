import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Read credentials from the data folder
const credentialsPath = path.resolve(__dirname, '../../data/credentials.json');
const { username, password, username_invalid, password_invalid } = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

test.describe('Login Tests', () => {
  
  test('Login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Login with invalid password', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', username);
    await page.fill('#password', password_invalid);
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('Login with invalid username', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', username_invalid);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Login with invalid username and password', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', username_invalid);
    await page.fill('#password', password_invalid);
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Login request blocked', async ({ page }) => {
    await page.route('**/authenticate', (route) => route.abort());
    await page.goto('/login');
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
  
    await page.waitForLoadState('domcontentloaded');
    const pageContent = await page.content();
    expect(pageContent).toContain('This site can’t be reached');
  });


});
