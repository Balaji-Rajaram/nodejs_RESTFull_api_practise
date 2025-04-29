// src/controllers/userController.js
var jwt = require('jsonwebtoken');
var generateToken = require('../utils/authHelper.js').generateToken;

// In-memory user store
var users = [];

// Signup route
exports.signup = function (req, res) {
    
    // parse username and password
    const { username , password } = req.body;
    // Check if the user already exists
    var existingUser = users.find(function (u) { return u.username === username; });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    var newUser = { username, password };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully' });
};

// Login route
exports.login = function (req, res) {
    const { username , password } = req.body;

    // Find the user
    var user = users.find(function (u) { return u.username === username && u.password === password; });
    if (user) {
        const token = generateToken(user);
        console.log({token});
        res.status(200).json({token});
        //  generate token and return

    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// Example protected route
exports.protectedRoute = function (req, res) {
    res.status(200).json({ message: 'Protected content accessed' });
     
};
