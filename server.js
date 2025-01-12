import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { scrape_codes_retailmenot } from "./webscrape.js"; //Imports function for webscrape.js

const app = express(); //Initializes app
const PORT = 3000; //Port is set to 3000

// Middleware
app.use(cors()); //This applies the CORS middleware, allowing the server to accept requests from different domains
app.use(bodyParser.json()); //This middleware parses JSON data in the body of incoming HTTP requests and makes it available in req.body

// API Endpoint for scraping
app.post("/scrape", async (req, res) => { //Sets up POST request handler for /scrape route
  const { domain } = req.body; //Domain is extracted from body of reqest

  if (!domain) { //Returns an error if no domain
    return res.status(400).json({ error: "Domain is required!" });
  }

  console.log(`Scraping domain: ${domain}`);
  try {
    const coupons = await scrape_codes_retailmenot(domain); //Calls on the scrape_codes_retailmenot
    console.log("Scraped coupons:", coupons); 
    res.json({ success: true, coupons }); //If scraping is successful, the server responds with a JSON object containing success: true and coupons array
  } catch (error) {
    res.status(500).json({ success: false, error: error.message }); //Otherwise success iss false and an error message is returned
  }
});

// Start the server
app.listen(PORT, () => { //Starts the server at port
  console.log(`Server is running on http://localhost:${PORT}`);
});

