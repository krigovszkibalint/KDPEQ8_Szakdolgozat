const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// check if user authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorResponse('Hozzáférés megtagadva', 401));
    } 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Hozzáférés megtagadva', 401));
    }
}

// middleware for admin

exports.isAdmin = (req, res, next) => {
    if(req.user.role === 0) {
        return next(new ErrorResponse('Hozzáférés megtagadva, adminisztrátori jogkör szükséges', 401));
    }
    next();
}