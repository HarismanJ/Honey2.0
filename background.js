// Background script to scrape coupons
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScraping") {
    const domain = request.domain;
    
    // Scrape coupons (this is your logic)
    fetch("http://localhost:3000/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    })
    .then(response => response.json())
    .then(data => {
      // Send the scraped coupons to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "scrapeCoupons",
          coupons: data.coupons
        });
      });
    })
    .catch(error => {
      console.error("Error scraping coupons:", error);
    });
  }
});
