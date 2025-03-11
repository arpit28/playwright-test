import { request, test, expect } from '@playwright/test';

test('GET /posts', async () => {
  const apiRequest = await request.newContext();
  const response = await apiRequest.get('https://jsonplaceholder.typicode.com/posts');
  expect(response.status()).toBe(200);
  expect(await response.json()).toHaveLength(100);
});

test('GET /posts/{id}', async () => {
  const apiRequest = await request.newContext();
  const response = await apiRequest.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.id).toBe(1);
});

test('POST /posts', async () => {
  const apiRequest = await request.newContext();
  const response = await apiRequest.post('https://jsonplaceholder.typicode.com/posts', {
    data: { title: 'foo', body: 'bar', userId: 1 },
  });
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody.title).toBe('foo');
});

test('PUT /posts/{id}', async () => {
  const apiRequest = await request.newContext();
  const response = await apiRequest.put('https://jsonplaceholder.typicode.com/posts/1', {
    data: { id: 1, title: 'updated', body: 'updated body', userId: 1 },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.title).toBe('updated');
});

test('DELETE /posts/{id}', async () => {
  const apiRequest = await request.newContext();
  const response = await apiRequest.delete('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
});
