let selectedInput = null; 
let coupons = [];
let counter = 0;


document.addEventListener("mousedown", (event) => { //Detects when mouse is pushed down
  // Check if the clicked element is an input or textarea field
  if (event.target.type==='text' &&  (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'textarea')) { //Checks if clicked element is a textbox
    selectedInput = event.target;  // Store the clicked input field
    if(coupons.length<=0){ //If coupons are not yet available, it will output a prompt message telling the user to keep waiting
      selectedInput.setAttribute("value", "Please Wait...");
    }
    if(counter<coupons.length && coupons.length>0) { //Each click would put the next value into the input field
      selectedInput.setAttribute("value",coupons[counter++]); 
    }  
    else if(coupons.length>0){ //If end of coupons list is reached
      selectedInput.setAttribute("value","No more coupons :(");
      counter=0;
    }
  }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { //Listens for scrapeCoupons requests
  if (request.action === "scrapeCoupons" && request.coupons) {
    coupons = request.coupons;  // Store the coupons received from the background script
    console.log("Coupons received:", coupons);

  }
});

// Optionally: Add functionality for scraping coupons
let domain = window.location.hostname.replace(/^www\./, ''); //Extracts domain from current URL

//Send a message to start scraping when the content script loads
chrome.runtime.sendMessage({
  action: "startScraping",
  domain: domain
});
