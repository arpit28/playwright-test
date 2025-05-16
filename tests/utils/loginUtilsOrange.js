import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Resolve credentials path
const credentialsPath = path.resolve(__dirname, '../../data/credentialsOrange.json');
const { username, password, url } = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));


export async function performLogin(page, username, password, url) {
  await page.goto(url);
  await page.fill('[name="username"]', username);
  await page.fill('[name="password"]', password);
  await page.click('button[type="submit"]');
}


export const credentials = { username, password, url };