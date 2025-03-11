import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Resolve credentials path
const credentialsPath = path.resolve(__dirname, '../../data/credentials.json');
const { username, password, username_invalid, password_invalid } = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));


export async function performLogin(page, user, pass) {
  await page.goto('/login');
  await page.fill('#username', user);
  await page.fill('#password', pass);
  await page.click('button[type="submit"]');
  await page.waitForLoadState('domcontentloaded'); // Ensures the page has loaded after submission
}


export const credentials = { username, password, username_invalid, password_invalid };