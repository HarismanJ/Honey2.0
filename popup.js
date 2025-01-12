
document.addEventListener("DOMContentLoaded", () => { //Fired when HTML is fully loaded
    // Function to display the coupon codes in the popup
    function displayCoupons(coupons) {
      const couponListElement = document.getElementById('couponList'); //Selects the element in popup.html with the id couponList
      couponListElement.innerHTML = '';  // Clear the list first
    
      if (coupons.length === 0) { //If coupons array is empty
        couponListElement.innerHTML = '<li>No coupons available.</li>';
        return;
      }
    
      // Create a list item for each coupon code and append it to the list
      coupons.forEach(coupon => {
        const li = document.createElement('li');
        li.textContent = coupon;  // Add the coupon code to the list item
        couponListElement.appendChild(li);
      });
    }

     // Add an event listener to the "Find Coupons" button
  const findCouponButton = document.getElementById('findCouponButton');
  findCouponButton.addEventListener('click', () => {  // Listen for a click event on the button
    // Send a message to the background script to start scraping
    const couponListElement = document.getElementById('couponList');
    couponListElement.innerHTML = '<li>Scraping.</li>';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const domain = new URL(tabs[0].url).hostname.replace(/^www\./, ''); // Extract domain from URL
      console.log("Active tab domain:", domain);

      // Send the domain to the background script to start scraping
      chrome.runtime.sendMessage({ action: "startScraping", domain: domain });
    });
  });

    // Request the coupons from the background script when the popup is opened
    chrome.runtime.sendMessage({ action: "getCoupons" }, (response) => {
      if (response && response.coupons) {
        displayCoupons(response.coupons);  // Display the coupons if they are available
      } else {
        console.log("No coupons found.");
      }
    });
    
});
  
  
  

  