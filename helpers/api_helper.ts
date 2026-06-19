import { request } from '@playwright/test';

export async function createApiContext(){
return await request.newContext({
    baseURL:process.env.API_BASE_URL,
})

}

export async function createWooCommerceContext(){
// console.log(process.env.WC_CONSUMER_KEY);
// console.log(process.env.WC_CONSUMER_SECRET);
  const WC_baseURL = process.env.WC_BASE_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!WC_baseURL||!consumerKey || !consumerSecret) {
    throw new Error("Missing WooCommerce API environment variables.");
  }

const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

return await request.newContext({
    baseURL:WC_baseURL,
    extraHTTPHeaders:{
       Authorization: `Basic ${auth}`
    }
})

}