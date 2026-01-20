const {test,expect, chromium}= require('@playwright/test');

test('Handling_Pgination_Test',async({page})=> {

    await page.goto('https://datatables.net/examples/basic_init/alt_pagination.html');
    
    const  pages= await page.locator
    ("//div[@class='dt-paging']/nav/button[text()=normalize-space() and not(contains(@class,'previous')) and not(contains(@class,'next'))]");

    const page_Count= await pages.count();
    console.log('Total Pages : ',page_Count);

   for(let a=0;a<page_Count;a++) {

       const pages_Text= await pages.nth(a).textContent();
       console.log('Navigating to Page : ',pages_Text);
       await pages.nth(a).click();
       
       await page.waitForTimeout(500);

       const Name_Cell= await page.locator("//table[@id='example']/tbody/tr/td[1]");
       const Posiotion_cell= await page.locator("//table[@id='example']/tbody/tr/td[2]");

       const name_Count=await Name_Cell.count();
       const position_Count= await Posiotion_cell.count();

       for(let b=0;b<name_Count;b++) {
         
           const names= await Name_Cell.nth(b).textContent();
           const position=await Posiotion_cell.nth(b).textContent();
           console.log(names,' : ',position);
           
       }
       console.log('--------------------------------------------------------------------------');
   }

   if(!page.isClosed) {
    await page.close();
   }
   
});


