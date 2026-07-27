import {test,expect} from '../../fixtures/baseFixtures'

test.describe('Product Review Seed Test', () => {
  test('should seed product reviews successfully', async ({loggedInPage}) => {

    await loggedInPage.goto('https://qa-cart.com/product/assorted-coffee/');
    await expect(loggedInPage.getByRole('heading', { name: 'Assorted Coffee' })
    ).toBeVisible();
  
  });
});