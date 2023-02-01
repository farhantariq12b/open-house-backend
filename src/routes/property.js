const express = require('express');
const PropertyController = require('../controllers/PropertyController');

const router = express.Router();

router.get('/properties', PropertyController.getAllProperties);
router.get('/property/:id', PropertyController.getPropertyById);
router.post('/property', PropertyController.createNewProperty);
router.put('/property/:id', PropertyController.updateProperty);
router.delete('/property/:id', PropertyController.deleteProperty);

module.exports = router;
