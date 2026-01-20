const { link } = require('fs');
import {test} from '@playwright/test';

test('Multiple_Window_Test',async() => {


    const browser= await chromium.launch({headless:false});
    const context= await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const links= await page.locator("//table[@class='gf-t']//td[1]//ul//a");
    const links_Count= await links.count();

    for(let a=0;a<links_Count ; a++) { 
        
        await Promise.all([
         context.waitForEvent('page'),
         links.nth(a).click({modifiers:['Control']}),
         page.waitForTimeout(200)
        ]);
    }

    const newPages = await context.pages();

    for(let pg of newPages) {

       const title = await pg.title();
        console.log(title);
    }
});