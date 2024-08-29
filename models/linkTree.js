const connection = require('../config/database');

// Create a new link tree
const createLinkTree = (linkTree, callback) => {
  const query = 'INSERT INTO LinkTree (url, tree, userAccountId) VALUES (?, ?, ?)';
  connection.query(query, [linkTree.url, JSON.stringify(linkTree.tree), linkTree.userAccountId], (err, results) => {
    if (err) {
      console.error('Error creating link tree:', err);
      return callback(err);
    }
    callback(null, { id: results.insertId });
  });
};

// Find a link tree by URL
const findLinkTreeByUrl = (url, callback) => {
  const query = 'SELECT * FROM LinkTree WHERE url = ?';
  connection.query(query, [url], (err, results) => {
    if (err) {
      console.error('Error finding link tree by URL:', err);
      return callback(err);
    }
    callback(null, results[0]);
  });
};

// Update a link tree
const updateLinkTree = (linkTree, callback) => {
  const query = 'UPDATE LinkTree SET url = ?, tree = ? WHERE id = ?';
  connection.query(query, [linkTree.url, JSON.stringify(linkTree.tree), linkTree.id], (err, results) => {
    if (err) {
      console.error('Error updating link tree:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Delete a link tree
const deleteLinkTree = (id, callback) => {
  const query = 'DELETE FROM LinkTree WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting link tree:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createLinkTree,
  findLinkTreeByUrl,
  updateLinkTree,
  deleteLinkTree
};
