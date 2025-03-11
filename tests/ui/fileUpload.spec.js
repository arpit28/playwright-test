import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../../data/sample.txt');

test('File upload test', async ({ page }) => {
  await page.goto('/upload');

  const fileInput = page.locator('#file-upload');
  await fileInput.setInputFiles(filePath);
  await page.click('input[type="submit"]');

  await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
});
