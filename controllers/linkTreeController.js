const express = require('express');
const router = express.Router();
const { createLinkTree, findLinkTreeByUrl, updateLinkTree, deleteLinkTree } = require('../models/linkTree');
const authenticate = require('../middleware/auth');

// Create a new link tree
router.post('/create-linktree', authenticate, (req, res) => {
  const linkTree = { ...req.body, userAccountId: req.userId };
  createLinkTree(linkTree, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: result.insertId });
  });
});

// Get a link tree by URL
router.get('/linktree/:url', authenticate, (req, res) => {
  const url = req.params.url;
  const userId = req.userId;
  findLinkTreeByUrl(url, userId, (err, linkTree) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!linkTree) return res.status(404).json({ error: 'LinkTree not found' });
    res.json(linkTree);
  });
});

// Update a link tree
router.put('/update-linktree', authenticate, (req, res) => {
  const linkTree = { ...req.body, userAccountId: req.userId };
  updateLinkTree(linkTree, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'LinkTree not found or unauthorized' });
    res.json({ message: 'LinkTree updated successfully' });
  });
});

// Delete a link tree
router.delete('/delete-linktree', authenticate, (req, res) => {
  const { id } = req.body;
  const userId = req.userId;
  deleteLinkTree(id, userId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'LinkTree not found or unauthorized' });
    res.json({ message: 'LinkTree deleted successfully' });
  });
});

module.exports = router;
