// src/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemsController');

// Define routes and associate them with controllers
router.post('/create', itemController.createItem);
router.get('/getAll', itemController.getItems);
router.get('/getById/:id', itemController.getItemById);
router.put('/UpdateById/:id', itemController.updateItem)
router.delete('/DeleteById/:id', itemController.deleteItem)
//  Add Missing Router



module.exports = router;
