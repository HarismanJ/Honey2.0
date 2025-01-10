let selectedInput = null;
document.addEventListener("DOMContentLoaded", () => {
    // Function to display the coupon codes in the popup
    function displayCoupons(coupons) {
      const couponListElement = document.getElementById('couponList');
      couponListElement.innerHTML = '';  // Clear the list first
    
      if (coupons.length === 0) {
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
    
    
    // Request the coupons from the background script when the popup is opened
    chrome.runtime.sendMessage({ action: "getCoupons" }, (response) => {
      if (response && response.coupons) {
        displayCoupons(response.coupons);  // Display the coupons if they are available
      } else {
        console.log("No coupons found.");
      }
    });
    /*

    const insertCouponButton = document.getElementById("insertCouponButton");
  insertCouponButton.addEventListener("click", () => {
    if (coupons.length > 0) {
      // Send a message to the content script to insert the first coupon into the selected text box
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "insertCoupon",
          coupon: coupons[0],
        }, (response) => {
          if (response.success) {
            console.log("Coupon inserted:", coupons[0]);
          } else {
            console.log("Error:", response.message);
          }
        });
      });
    } else {
      console.log("No coupon available.");
    }
  });
  */
});
  
  
  

  