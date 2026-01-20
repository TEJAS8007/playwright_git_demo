const {test,expect}= require('@playwright/test')

test('Google_Test',async({page})=> {

    await page.goto('https://www.google.com/',{
        waitUntil:'domcontentloaded'
    });

    await expect(page).toHaveURL('https://www.google.com/');
    await expect(page).toHaveTitle('Google');

    const text_Box= await page.getByRole('combobox');
    await text_Box.fill('playwright');

    await expect(text_Box).toHaveValue('playwright');
    
    await page.waitForSelector("//div[@role='presentation']/following :: div[@role='option']");
    const options= await page.locator("//div[@role='presentation']/following :: div[@role='option']");
    const option_Count= await options.count();
    console.log('Total Options : ',option_Count);

    for(let a=0;a<option_Count;a++) {

        const opt = await options.nth(a).textContent();
        console.log(opt);

        if(opt.match('playwright vs selenium')) {
            await options.nth(a).click();
            break;
        }
    }

    await page.waitForTimeout(2000);

    if(!page.isClosed) {
        await page.close();
    }
})