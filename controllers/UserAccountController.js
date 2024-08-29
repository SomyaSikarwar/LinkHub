const express = require('express');
const router = express.Router();
const { createUserAccount, findUserAccountByCredentials, updateUserAccount, deleteUserAccount } = require('../models/userAccount');
const jwt = require('jsonwebtoken');

// Create a new user account
router.post('/create-account', (req, res) => {
  const user = req.body;
  createUserAccount(user, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: result.id });
  });
});

// Login a user account
router.post('/login', (req, res) => {
  const { userName, password } = req.body;
  findUserAccountByCredentials(userName, password, (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
});

// Update a user account's password
router.put('/update-account', (req, res) => {
  const user = req.body;
  updateUserAccount(user, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User account not found' });
    res.json({ message: 'User account updated successfully' });
  });
});

// Delete a user account
router.delete('/delete-account', (req, res) => {
  const { id } = req.body;
  deleteUserAccount(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User account not found' });
    res.json({ message: 'User account deleted successfully' });
  });
});

module.exports = router;
