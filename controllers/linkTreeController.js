const express = require('express');
const router = express.Router();
const { createLinkTree, findLinkTreeByUrl, updateLinkTree, deleteLinkTree } = require('../models/linkTree');

// Create a new LinkTree
router.post('/create-link-tree', (req, res) => {
  const { url, tree, userAccountId } = req.body;
  createLinkTree({ url, tree, userAccountId }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: result.id });
  });
});

// Find a LinkTree by URL
router.get('/link-tree/:url', (req, res) => {
  const { url } = req.params;
  findLinkTreeByUrl(url, (err, linkTree) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!linkTree) return res.status(404).json({ error: 'LinkTree not found' });
    res.json(linkTree);
  });
});

// Update a LinkTree
router.put('/update-link-tree/:id', (req, res) => {
  const { id } = req.params;
  const { url, tree } = req.body;
  updateLinkTree({ id, url, tree }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'LinkTree not found' });
    res.json({ message: 'LinkTree updated successfully' });
  });
});

// Delete a LinkTree
router.delete('/delete-link-tree/:id', (req, res) => {
  const { id } = req.params;
  deleteLinkTree(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'LinkTree not found' });
    res.json({ message: 'LinkTree deleted successfully' });
  });
});

module.exports = router;
