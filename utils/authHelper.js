// src/utils/authHelper.js
var jwt = require('jsonwebtoken');

var SECRET_KEY = 'ITS2SECret';

exports.generateToken = function (user) {
    const token =  jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
    
    return token 
};
