const connection = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Create a new user account
const createUserAccount = (user, callback) => {
  const query = 'INSERT INTO UserAccount (id, userName, password) VALUES (?, ?, ?)';
  const id = uuidv4(); // Generate a UUID for the user
  connection.query(query, [id, user.userName, user.password], (err, results) => {
    if (err) {
      console.error('Error creating user account:', err);
      return callback(err);
    }
    callback(null, { id });
  });
};

// Find a user account by username and password
const findUserAccountByCredentials = (userName, password, callback) => {
  const query = 'SELECT * FROM UserAccount WHERE userName = ? AND password = ?';
  connection.query(query, [userName, password], (err, results) => {
    if (err) {
      console.error('Error finding user account by credentials:', err);
      return callback(err);
    }
    callback(null, results[0]);
  });
};

// Update a user account's password
const updateUserAccount = (user, callback) => {
  const query = 'UPDATE UserAccount SET password = ? WHERE id = ?';
  connection.query(query, [user.password, user.id], (err, results) => {
    if (err) {
      console.error('Error updating user account:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Delete a user account
const deleteUserAccount = (id, callback) => {
  const query = 'DELETE FROM UserAccount WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user account:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createUserAccount,
  findUserAccountByCredentials,
  updateUserAccount,
  deleteUserAccount
};
