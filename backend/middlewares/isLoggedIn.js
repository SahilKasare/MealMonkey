// const UserModel = require ("../models/baseUserModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;


module.exports = function(req, res, next) {
    const token = req.cookies.token; // Adjust the cookie name as needed
    if (!token) return res.status(401).send("Access denied.");

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // req.userId = decoded.id; // Store the user ID in the request object to update 
        // req.userRole = decoded.role; //Store the user Role for the authorization
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(400).send(err);
    }
};
