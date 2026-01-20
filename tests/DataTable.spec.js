const {test,expect}=require('@playwright/test')

test('Pagination_test',async ({page})=> {

    await page.goto('https://datatables.net/examples/basic_init/alt_pagination.html');

    await expect(page).toHaveURL('https://datatables.net/examples/basic_init/alt_pagination.html');

    await expect(page).toHaveTitle('DataTables example - Alternative pagination');

    const pages= await page.locator("//div[@class='dt-paging']/nav/button[text()=normalize-space() and not(contains(@class,'previous')) and  not(contains(@class,'next'))]");
    const page_Count= await pages.count();
    console.log('Total Pages : ',page_Count);

    for(let a=0;a<page_Count;a++) {

        const page_text= await pages.nth(a).textContent();
        console.log('Navigating to page : ',page_text);
        await pages.nth(a).click();

        await page.waitForTimeout(200);
    }


})