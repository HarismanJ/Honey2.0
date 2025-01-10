import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { scrape_codes_retailmenot } from "./webscrape.js"; 

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint for scraping
app.post("/scrape", async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required!" });
  }

  console.log(`Scraping domain: ${domain}`);
  try {
    const coupons = await scrape_codes_retailmenot(domain);
    console.log("Scraped coupons:", coupons); 
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
/*
curl -X POST http://localhost:3000/scrape \
  -H "Content-Type: application/json" \
  -d '{"domain": "walmart.ca"}'
*/
