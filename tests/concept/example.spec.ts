import {test, expect} from '@playwright/test'

test ('understanding built-in fixtures',async({page,context,browser})=>{
    console.log('Browser:', browser.browserType().name());
    console.log('Pages in context:', (await context.pages()).length);
    console.log('Page URL:', page.url());
})

test('request fixture — no browser', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
    );
    console.log('Status:', response.status());
});