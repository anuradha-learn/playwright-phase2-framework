import { test, expect } from '@playwright/test';

// test('GET a single post from JSONPlaceholder',async({request})=>{

//     const response=await request.get("https://jsonplaceholder.typicode.com/posts/1")
//     expect(response.status()).toBe(200)
//     const post=await response.json()
//     expect(post.id).toBe(1)

// })

// test('POST a new post to JSONPlaceholder', async ({ request }) => {

//     const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
//     data: {
//       title: 'My first API test',
//       body: 'Learning how POST works in Playwright',
//       userId: 1,
//     },
//   });
//     expect(response.status()).toBe(201);

//     const createdPost=await response.json()
//     expect(createdPost.title).toBe('My first API test')
//     expect(createdPost.id).toBeTruthy();
    
// })

// test('GET  complete verification',async({request})=>{

//     const response=await request.get("https://jsonplaceholder.typicode.com/posts/1")
//     expect(response.status()).toBe(200)
//     const post=await response.json()
//     console.log(post)
//     // expect(post.id).toBe(1)

//     //Field presence
//     expect(post).toHaveProperty('id');
//     expect(post).toHaveProperty('title');
//     expect(post).toHaveProperty('body');

//     //Field Types
//     expect(typeof post.id).toBe('number');
//     expect(typeof post.title).toBe('string');
//     expect(typeof post.userId).toBe('number');

//     // Field isn't just present, it's not empty
//     expect(post.title.length).toBeGreaterThan(0);


// })


// test('GET a single post from JSONPlaceholder',async({request})=>{

//     const response=await request.get("https://jsonplaceholder.typicode.com/posts/99999")
//     expect(response.status()).toBe(404)
//     const post=await response.json()
//     // expect(post.id).toBe(1)

// })


//Authenticated Request
//Step 1: generating token

// test('login to DummyJSON and receive a token', async ({ request }) => {
//   const response = await request.post('https://dummyjson.com/auth/login', {
//     data: {
//       username: 'emilys',
//       password: 'emilyspass',
//     },
//   });

//   expect(response.status()).toBe(200);

//   const loginData = await response.json();
//   expect(loginData).toHaveProperty('accessToken');
// });

//Step two: use that token

test('use the token to access a protected endpoint', async ({ request }) => {
  const loginResponse = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });
  const { accessToken } = await loginResponse.json();

  const response = await request.get('https://dummyjson.com/auth/products', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  expect(response.status()).toBe(200);

  
});

      