        const {test,expect} = require('@playwright/test')

        test.skip('Table_Test',async({page})=> {


        await page.goto('https://datatables.net/examples/basic_init/alt_pagination.html');

        await expect(page).toHaveTitle('DataTables example - Alternative pagination');
        await expect(page).toHaveURL('https://datatables.net/examples/basic_init/alt_pagination.html');


        const pages = await page.locator("//div[@class='dt-paging']/child ::nav/button[not(contains(@class,'previous')) and not(contains(@class,'next'))]");

        const page_Count = await pages.count();
        console.log('Total Pages : ',page_Count);

        for(let a=0 ; a<page_Count;a++) {

        const page_Text = await pages.nth(a).textContent();
        console.log('Navigating To Page : '+page_Text);
        await pages.nth(a).click();

        await page.waitForTimeout(200);

        const names = await page.locator("table#example  tbody td[class='sorting_1']");
        const name_Count = await names.count();

        const ages = await page.locator("//table[@id='example']//td[@class='dt-type-numeric'][1]");

        for(let b=0;b<name_Count;b++) {
        const name = await names.nth(b).textContent();
        const age = await ages.nth(b).textContent();
        console.log(`${b+1} -`,name,' ',age);
        }
        console.log('----------------------------------------------------------------------------------');
        }

        if(!page.isClosed) {
        await page.close();
        }
        });


        test('All_Table_Test',async({page})=> {


        await page.goto('https://datatables.net/examples/basic_init/alt_pagination.html');

        await expect(page).toHaveTitle('DataTables example - Alternative pagination');
        await expect(page).toHaveURL('https://datatables.net/examples/basic_init/alt_pagination.html');


        const rows = await page.locator('#example tbody tr');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
        const rowText = await rows.nth(i).innerText();
        console.log(`Row ${i + 1}:`, rowText);
        }


        });