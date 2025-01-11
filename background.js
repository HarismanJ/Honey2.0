// Background script to scrape coupons
let coupons = []; 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScraping") {
    const domain = request.domain;
    chrome.browserAction.setBadgeText({ text: "0"});
      chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000" });
    // Scrape coupons (this is your logic)
    fetch("http://localhost:3000/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    })
    .then(response => response.json())
    .then(data => {
      coupons = data.coupons;
      // Send the scraped coupons to the c{ntent script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "scrapeCoupons",
          coupons: data.coupons
        });
      });
      chrome.browserAction.setBadgeText({ text: coupons.length.toString() });
      chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000" });
      
    })
    .catch(error => {
      console.error("Error scraping coupons:", error);
    });
  }
  if (request.action === "getCoupons") {
    sendResponse({ coupons });  // Send the stored coupons to the popup
  }
});

