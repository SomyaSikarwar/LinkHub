const connection = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Create a new tree node
const createTreeNode = (node, callback) => {
  const query = 'INSERT INTO TreeNodeUrl (id, url, name, description, linkTreeId) VALUES (?, ?, ?, ?, ?)';
  const id = uuidv4(); // Generate a UUID for the node
  connection.query(query, [id, node.url, node.name, node.description, node.linkTreeId], (err, results) => {
    if (err) {
      console.error('Error creating tree node:', err);
      return callback(err);
    }
    callback(null, { id });
  });
};

// Find a tree node by ID
const findTreeNodeById = (id, callback) => {
  const query = 'SELECT * FROM TreeNodeUrl WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error finding tree node by ID:', err);
      return callback(err);
    }
    callback(null, results[0]);
  });
};

// Update a tree node
const updateTreeNode = (node, callback) => {
  const query = 'UPDATE TreeNodeUrl SET url = ?, name = ?, description = ? WHERE id = ?';
  connection.query(query, [node.url, node.name, node.description, node.id], (err, results) => {
    if (err) {
      console.error('Error updating tree node:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Delete a tree node
const deleteTreeNode = (id, callback) => {
  const query = 'DELETE FROM TreeNodeUrl WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting tree node:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createTreeNode,
  findTreeNodeById,
  updateTreeNode,
  deleteTreeNode
};
