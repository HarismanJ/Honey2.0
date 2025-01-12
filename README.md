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
   
   git clone <repository-url>
   cd <repository-folder>

2. Install dependencies:
   
   npm install

3. Start the backend server:

   node server.js
   
