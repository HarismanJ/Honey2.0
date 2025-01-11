let selectedInput = null;  // Store the selected input field
let coupons = [];
let counter = 0;


document.addEventListener("mousedown", (event) => {
  // Check if the clicked element is an input or textarea field
  if (event.target.type==='text' &&  (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'textarea')) {
    selectedInput = event.target;  // Store the clicked input field
    if(coupons.length<=0){
      selectedInput.setAttribute("value", "Please Wait...");
    }
    if(counter<coupons.length && coupons.length>0) {
      selectedInput.setAttribute("value",coupons[counter++]); 
    }  // Dispatch event to notify change
    else if(coupons.length>0){
      selectedInput.setAttribute("value","No more coupons :("); 
      counter=0;
    }
      console.log("Selected input field:", selectedInput);
  }
});

// Listen for messages from the popup to insert the coupon
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCoupons") {
    sendResponse({ coupons });  // Send the stored coupons to the popup
  }
  if (request.action === "startScraping") {
    let domain = window.location.hostname.replace(/^www\./, '');
    console.log(`Starting scraping for domain: ${domain}`);

    // Send a message to the background script to start scraping
    chrome.runtime.sendMessage({ action: "startScraping", domain: domain });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeCoupons" && request.coupons) {
    coupons = request.coupons;  // Store the coupons received from the background script
    console.log("Coupons received:", coupons);
    chrome.action.openPopup();

  }
});

// Optionally: Add functionality for scraping coupons
let domain = window.location.hostname.replace(/^www\./, '');

// Send a message to start scraping when the content script loads
chrome.runtime.sendMessage({
  action: "startScraping",
  domain: domain
});
