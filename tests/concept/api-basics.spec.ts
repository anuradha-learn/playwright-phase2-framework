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

// test('login to DummyJSON and receive a token', async ({ request }) => {
//     const loginResponse = await request.post('https://dummyjson.com/auth/login',
//         {
//             data: {
//                 username: 'emilys', 
//                 password: 'emilyspass', 
//             },
//         }

//     )
//     expect(loginResponse.status()).toBe(200);

//     const loginData = await loginResponse.json();
//     console.log(loginData.accessToken)
// });

//Request Chaining And Authentication
// test('use token to access protected endpoint', async ({ request }) => {
//     const loginResponse = await request.post('https://dummyjson.com/auth/login',
//         {
//             data: {
//                 username: 'emilys',
//                 password: 'emilyspass',
//             },
//         }

//     )
//     expect(loginResponse.status()).toBe(200);

//     const loginData = await loginResponse.json();
//     // console.log(loginData.accessToken)

//     const { accessToken } = loginData

//     const response = await request.get("https://dummyjson.com/auth/me",
//         {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             }

//         }
//     )

//     expect(response.status()).toBe(200);
//     const responseData =await response.json()
//     console.log(responseData)

// });

//CRUD Workflow
// test('complete CRUD workflow', async ({ request }) => {
//     // Step 1: Create a Product
//     const createResponse = await request.post('https://dummyjson.com/products/add',
//         {
//             data: {
//                 title: 'test product',
//                 price: 29.99,
//                 stock: 10,
//             }
//         }
//     )
//     expect(createResponse.status()).toBe(201)
//     const {id}=await createResponse.json();
//     // console.log(responseData)

//     //Read
//     // const readResponse=await request.get(`http://dummyjson.com/products/${id}`)
//     const readResponse=await request.get(`http://dummyjson.com/products/1`)
//     expect(readResponse.status()).toBe(200)

//     //Update
//     const updateResponse=await request.put(`http://dummyjson.com/products/${id}`,
//         {
//             data:{
//                 price:49.99,
//             }
//         }
//     )
//     expect(updateResponse.status()).toBe(200);
//     const updatedProduct = await updateResponse.json();
//     expect(updatedProduct.price).toBe(49.99);

//     //Delete
//     const deleteResponse = await request.delete( `https://dummyjson.com/products/${id}` );
//     expect(deleteResponse.status()).toBe(200);
//     const deletedProduct = await deleteResponse.json();
//     expect(deletedProduct.isDeleted).toBe(true);


// })


import { createApiContext } from '../../helpers/api_helper';

test('Get using reusable API helper',async()=>{

    const apiContext=await createApiContext()
    const response=await apiContext.get('/products/1')
    expect(response.status()).toBe(200)

    const product=await response.json()
    expect(product.id).toBe(1)

    await apiContext.dispose()

})