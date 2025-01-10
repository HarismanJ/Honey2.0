import puppeteer, { Browser } from "puppeteer";
let browser = null;
let newPage = null;
let newPageURL = null;
const scrape_codes_retailmenot = async (domain) => {
  browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(`https://www.retailmenot.com/view/${domain}`, {
    waitUntil: "domcontentloaded",
  });

      const allElements = await page.$$("body *"); 
      for (const element of allElements) {
        const text = await page.evaluate((el) => el.innerText?.trim(), element);
        
        if(text === "Show Code"){
          const pageTarget = page.target()
          await element.click();
          const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
          const newPage = await newTarget.page();
          newPageURL = await newPage.url();
          break;
        }
      }
      
      const tab= await browser.newPage();

      await tab.goto(newPageURL, {
        waitUntil: "domcontentloaded",
      });
      const closeButtonSelector = "body > dialog > div > div.sticky.top-0.z-10.flex.w-full.justify-end.p-5.pb-3.font-proxima > button > svg";
      await tab.waitForSelector(closeButtonSelector, { visible: true });
      const closeButton = await tab.$(closeButtonSelector);
      await closeButton.click();

    
      
      
      const codeList = await tab.evaluate(() => {
        const selector1 = "body > main > div > section > div.mb-6.mt-2.min-w-0.\\[grid-area\\:offers\\] > div:nth-child(8) > div > a > div.col-start-3.row-span-2.row-start-2.mr-3.hidden.flex-col.md\\:flex > div";
        const selector2 = "body > main > div > section > div.mb-6.mt-2.min-w-0.\\[grid-area\\:offers\\] > div:nth-child(7) > div > a > div.col-start-3.row-span-2.row-start-2.mr-3.hidden.flex-col.md\\:flex > div";
        const elements1 = document.querySelectorAll(selector1);
        const elements2 = document.querySelectorAll(selector2);
        const combinedElements = [...elements1, ...elements2];
        const codeSet = new Set();
        Array.from(combinedElements).forEach(el => {
          const text = el.innerText.trim();
          codeSet.add(text);
        });
        return Array.from(codeSet);
      });
      //console.log(codeList);
      await browser.close();
      return codeList;

      

    }
    export{scrape_codes_retailmenot};
  //scrape_codes_retailmenot2("walmart.com");
      