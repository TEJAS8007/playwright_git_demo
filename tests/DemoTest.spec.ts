import {test,expect} from '@playwright/test';

test('Validating title of web Page',async({page})=> {

    await page.goto('https://wwww.saucedemo.com/');

    await expect(page).toHaveTitle('Swag Labs');
})
