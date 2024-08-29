const connection = require('../config/database');

// Create a new link tree
const createLinkTree = (linkTree, callback) => {
  const query = 'INSERT INTO LinkTree (url, tree, userAccountId) VALUES (?, ?, ?)';
  connection.query(query, [linkTree.url, JSON.stringify(linkTree.tree), linkTree.userAccountId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Find a link tree by URL and user ID
const findLinkTreeByUrl = (url, userId, callback) => {
  const query = 'SELECT * FROM LinkTree WHERE url = ? AND userAccountId = ?';
  connection.query(query, [url, userId], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Update a link tree
const updateLinkTree = (linkTree, callback) => {
  const query = 'UPDATE LinkTree SET tree = ? WHERE id = ? AND userAccountId = ?';
  connection.query(query, [JSON.stringify(linkTree.tree), linkTree.id, linkTree.userAccountId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Delete a link tree
const deleteLinkTree = (id, userId, callback) => {
  const query = 'DELETE FROM LinkTree WHERE id = ? AND userAccountId = ?';
  connection.query(query, [id, userId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createLinkTree,
  findLinkTreeByUrl,
  updateLinkTree,
  deleteLinkTree
};
