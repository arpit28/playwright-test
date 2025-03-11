import { test, expect } from '@playwright/test';
import { performLogin, credentials } from '../utils/loginUtils';

const { username, password, username_invalid, password_invalid } = credentials;

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    await performLogin(page, username, password);
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Login with invalid password', async ({ page }) => {
    await performLogin(page, username, password_invalid);
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('Login with invalid username', async ({ page }) => {
    await performLogin(page, username_invalid, password);
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Login with invalid username and password', async ({ page }) => {
    await performLogin(page, username_invalid, password_invalid);
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Login request blocked', async ({ page }) => {
    await page.route('**/authenticate', (route) => route.abort());
    await performLogin(page, username, password);
  
    // Wait for a potential error state or timeout
    await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
  
    const pageContent = await page.content();
  
    // Handle both cases: error page or minimal content
    if (pageContent.includes('This site can’t be reached')) {
      expect(pageContent).toContain('This site can’t be reached');
    } else {
      expect(pageContent).toMatch(/<html><head><\/head><body><\/body><\/html>/);
    }
  });
});