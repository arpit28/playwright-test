import { request } from '@playwright/test';


export async function sendApiRequest(method, url, options = {}) {
  const apiRequest = await request.newContext();
  const response = await apiRequest[method](url, options);
  return response;
}