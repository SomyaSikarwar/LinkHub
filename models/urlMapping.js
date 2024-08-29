const mysql = require('mysql');
const connection = require('../config/database'); // Adjust the path as needed

// Define the URL Mapping Model
const createUrlMappingTable = `
CREATE TABLE IF NOT EXISTS UrlMapping (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url TEXT NOT NULL,
  shortUrl VARCHAR(255) UNIQUE NOT NULL
);
`;

connection.query(createUrlMappingTable, (err) => {
  if (err) {
    console.error('Error creating UrlMapping table:', err);
  } else {
    console.log('UrlMapping table created or already exists.');
  }
});

module.exports = {
  addUrlMapping: (url, shortUrl, callback) => {
    const query = 'INSERT INTO UrlMapping (url, shortUrl) VALUES (?, ?)';
    connection.query(query, [url, shortUrl], callback);
  },
  getUrlByShortUrl: (shortUrl, callback) => {
    const query = 'SELECT url FROM UrlMapping WHERE shortUrl = ?';
    connection.query(query, [shortUrl], callback);
  },
};
