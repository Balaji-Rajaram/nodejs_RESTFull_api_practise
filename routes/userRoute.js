// src/routes/userRoutes.js
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
var authenticateToken = require('../middleware/authMiddleware.js').authenticateToken;
 // Public routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected route
router.get('/protected',authenticateToken , userController.protectedRoute);

module.exports = router;
