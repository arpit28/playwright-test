import { test, expect } from '@playwright/test';
import { sendApiRequest } from '../utils/apiUtils';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

test('GET /posts', async () => {
  const response = await sendApiRequest('get', BASE_URL);
  expect(response.status()).toBe(200);
  expect(await response.json()).toHaveLength(100);
});

test('GET /posts/{id}', async () => {
  const response = await sendApiRequest('get', `${BASE_URL}/1`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.id).toBe(1);
});

test('POST /posts', async () => {
  const response = await sendApiRequest('post', BASE_URL, {
    data: { title: 'QA Role', body: 'Testing', userId: 1 },
  });
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody.title).toBe('QA Role');
});

test('PUT /posts/{id}', async () => {
  const response = await sendApiRequest('put', `${BASE_URL}/1`, {
    data: { id: 1, title: 'updated', body: 'updated body', userId: 1 },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.title).toBe('updated');
});

test('DELETE /posts/{id}', async () => {
  const response = await sendApiRequest('delete', `${BASE_URL}/1`);
  expect(response.status()).toBe(200);
});