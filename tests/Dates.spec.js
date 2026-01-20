const {test,except, chromium, expect}=require('@playwright/test');

test('Date_Handling',async({})=>{

    const browser=await chromium.launch({headless:false});
    const context=await browser.newContext();
    const page= await context.newPage();

    await page.goto('https://jqueryui.com/datepicker/');

    await expect(page).toHaveTitle('Datepicker | jQuery UI');
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/')

    const frame= await page.frameLocator('//iframe');

    const date_Box= await frame.locator('input#datepicker');

    await date_Box.click();

    const month="June";
    const year=2020;

    while(true) {

        const monthelement= await frame.locator('.ui-datepicker-month').textContent();
        const yearelement= await frame.locator('.ui-datepicker-year').textContent();

        if(monthelement.includes(month) && yearelement.includes(year)) {
            break;
        }

        else {
            await frame.getByText('Prev').click();
        }

    }

    const selectDate=26;

    const datesElelment= await frame.locator("a[class='ui-state-default']");
    const dateCount=await datesElelment.count();
    
    for(let a=0;a<dateCount;a++) {

        const dateText= await datesElelment.nth(a).textContent();

        if(dateText.includes(selectDate)) {
            await datesElelment.nth(a).click();
        }
    }

    const displyed_date=await date_Box.inputValue();
    console.log("Displyed Date On Web_Page : "+displyed_date);

    await expect(date_Box).toHaveValue(displyed_date);

    await page.screenshot({path:'Screenshot/Date.png'});
    await date_Box.screenshot({path:'Screenshot/Box.png'})
 
    await page.waitForTimeout(2000);

});
