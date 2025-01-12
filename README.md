# Couponify

Couponify is a Chrome extension and backend service that scrapes coupon codes from websites like RetailMeNot, helping users find and apply discounts effortlessly.

## Features

* 🏷️ Automatic Coupon Scraping: Fetches coupons for the current domain when visiting checkout pages or when "Find Coupon" button is pressed
* 🛒 Popup Interface: View scraped coupons directly in the extension popup.
* ✍️ Input Autofill: Click on a text input field to insert coupons one by one.
* 🔗 Backend Integration: Uses a Node.js server with Puppeteer for web scraping.

## Installation

### Prerequisites
1. Node.js and npm installed on your system.
2. Google Chrome browser.
   
### Steps
1. Clone this repository:
   
   git clone "repository-url"

2. Install dependencies:
   
   npm install

3. Start the backend server:

   node server.js

4. Load the Chrome extension:

   1. Open Chrome and navigate to chrome://extensions/.
   2. Enable Developer Mode (toggle in the top-right corner).
   3. Click Load unpacked and select the extension folder.

## Usage

   1. Visit a checkout page (e.g., https://example.com/checkout).
   2. Click on a text input field on the checkout page to autofill coupon codes.

   Alternatively...

   1. Visit any page
   2. Click the Couponify browser action icon to open the popup.
   3. Click Find Coupons to start scraping. Coupons will be displayed in the popup.

## Website

* retailmenot.com is used for scraping the codes


   
