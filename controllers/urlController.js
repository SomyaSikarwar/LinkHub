const express = require('express');
const router = express.Router();
const { addUrlMapping, getUrlByShortUrl } = require('../models/urlMapping');
const { v4: uuidv4 } = require('uuid');

// Helper function to generate a random short URL
const generateShortUrl = () => {
  return uuidv4().slice(0, 8); // Generate an 8-character short URL
};

// Route to shorten a URL
router.post('/shorten-url', (req, res) => {
  const { url } = req.body;
  const shortUrl = generateShortUrl();

  addUrlMapping(url, shortUrl, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ shortUrl });
  });
});

// Route to handle URL redirection
router.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  console.log(`Received request for short URL: ${shortUrl}`);

  getUrlByShortUrl(shortUrl, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      console.log('Short URL not found:', shortUrl);
      return res.status(404).json({ error: 'Short URL not found' });
    }
    console.log('Redirecting to URL:', results[0].url);
    res.redirect(results[0].url);
  });
});
module.exports = router;
