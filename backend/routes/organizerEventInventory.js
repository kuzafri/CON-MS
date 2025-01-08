const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/organizerEventInventory');

router.get('/events/:eventId/inventory', inventoryController.getEventInventory);
router.post('/events/:eventId/inventory', inventoryController.createInventoryItem);
router.put('/events/:eventId/inventory/:itemId', inventoryController.updateInventoryItem);
router.delete('/events/:eventId/inventory/:itemId', inventoryController.deleteInventoryItem);
router.post('/events/:eventId/inventory/delete-multiple', inventoryController.deleteMultipleItems);

module.exports = router;
