import { rimraf } from 'rimraf';

async function globalSetup(){
    await rimraf(['test-results', 'playwright-report', 'allure-results', 'allure-report']);
    console.log('Cleaned old test artifacts');

}
export default globalSetup;

