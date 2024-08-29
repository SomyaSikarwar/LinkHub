const express = require('express');
const router = express.Router();
const { createTreeNode, findTreeNodeById, updateTreeNode, deleteTreeNode } = require('../models/treeNode');

// Create a new tree node
router.post('/create-tree-node', (req, res) => {
  const node = req.body;
  createTreeNode(node, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: result.id });
  });
});

// Find a tree node by ID
router.get('/tree-node/:id', (req, res) => {
  const { id } = req.params;
  findTreeNodeById(id, (err, node) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!node) return res.status(404).json({ error: 'Tree node not found' });
    res.json(node);
  });
});

// Update a tree node
router.put('/update-tree-node/:id', (req, res) => {
  const { id } = req.params;
  const node = req.body;
  node.id = id; // Ensure the ID is set for the update
  updateTreeNode(node, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tree node not found' });
    res.json({ message: 'Tree node updated successfully' });
  });
});

// Delete a tree node
router.delete('/delete-tree-node/:id', (req, res) => {
  const { id } = req.params;
  deleteTreeNode(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tree node not found' });
    res.json({ message: 'Tree node deleted successfully' });
  });
});

module.exports = router;
