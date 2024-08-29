const mysql = require('mysql');
const connection = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// Create a new user account
const createUserAccount = (user, callback) => {
  const query = 'INSERT INTO UserAccount (id, userName, password) VALUES (?, ?, ?)';
  const id = uuidv4();
  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) return callback(err);
    connection.query(query, [id, user.userName, hashedPassword], (err, results) => {
      if (err) return callback(err);
      callback(null, { id });
    });
  });
};

// Find a user account by username and password
const findUserAccountByCredentials = (userName, password, callback) => {
  const query = 'SELECT * FROM UserAccount WHERE userName = ?';
  connection.query(query, [userName], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err);
      if (!isMatch) return callback(null, null);
      callback(null, user);
    });
  });
};

// Update a user account's password
const updateUserAccount = (user, callback) => {
  const query = 'UPDATE UserAccount SET password = ? WHERE id = ?';
  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) return callback(err);
    connection.query(query, [hashedPassword, user.id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  });
};

// Delete a user account
const deleteUserAccount = (id, callback) => {
  const query = 'DELETE FROM UserAccount WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createUserAccount,
  findUserAccountByCredentials,
  updateUserAccount,
  deleteUserAccount
};
