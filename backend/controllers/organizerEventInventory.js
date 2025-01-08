const EventInventory = require('../models/organizerEventInventory');

// Get all inventory items for a specific event
exports.getEventInventory = async (req, res) => {
    try {
        const items = await EventInventory.find({ eventId: req.params.eventId });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new inventory item
exports.createInventoryItem = async (req, res) => {
    try {
        const newItem = new EventInventory({
            eventId: req.params.eventId,
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update inventory item
exports.updateInventoryItem = async (req, res) => {
    try {
        const updatedItem = await EventInventory.findByIdAndUpdate(
            req.params.itemId,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete inventory item
exports.deleteInventoryItem = async (req, res) => {
    try {
        await EventInventory.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete multiple inventory items
exports.deleteMultipleItems = async (req, res) => {
    try {
        await EventInventory.deleteMany({
            _id: { $in: req.body.itemIds }
        });
        res.json({ message: 'Items deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
