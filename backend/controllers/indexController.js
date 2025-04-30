const customer = require("../models/customerModel");
const restaurant = require("../models/restaurantModel");
const deliveryPartner = require("../models/deliveryPartnerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const validator = require('validator');
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$/;
// const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailRegex = /^[\w-.]+@gmail\.com$/;
function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports.register = async function(req, res) {
    try {
        let { username, email, password, role, isAdmin = false, contact, fullAddress, pincode } = req.body;
        
        // Validate input
        if (!username || !email || !password || !role || !contact || !fullAddress || !pincode) {
            return res.status(400).send("Please provide all details.");
        }
        // Checks if email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).send("Please provide a valid email address.");
        }

        if (!emailRegex.test(email)) {
            return res.status(400).send(`Provide valid email address`);
        }
        email = email.toLowerCase();
        // Checks if password is valid
        if (!passwordRegex.test(password)) {
            return res.status(400).send(`
            Password must meet the following criteria:\n
            • At least 6 characters long\n
            • At least one uppercase letter
            • At least one lowercase letter 
            • At least one number
            • At least one special character (!@#$%^&*())
            `);
        }
        let user1 = await deliveryPartner.findOne({ email: email });
        let user2 = await restaurant.findOne({ email: email });
        let user3 = await customer.findOne({ email: email });
        if (user1 || user2 || user3) return res.status(400).send("You already have an account. Please login.");
        
        if(role==="customer" || role==="admin"){
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
    
                    // Create new user
                    let newUser = new customer({
                    username: username,
                    email: email,
                    password: hash,
                    role: role,
                    isAdmin: isAdmin,
                    contact: contact,
                    address: {
                        fullAddress: fullAddress,
                        pincode: pincode
                    }
                    });
    
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: savedUser
                    });
                });
            });
        }
        else if(role==="restaurant"){
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
    
                    // Create new user
                    let newUser = new restaurant({
                    username: username,
                    email: email,
                    password: hash,
                    role: role,
                    isAdmin: isAdmin,
                    contact: contact,
                    address: {
                        fullAddress: fullAddress,
                        pincode: pincode
                    },
                    });
    
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: savedUser
                    });
                });
            });
        }else if(role==="deliveryPartner"){
            
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
    
                    // Create new user
                    let newUser = new deliveryPartner({
                    username: username,
                    email: email,
                    password: hash,
                    role: role,
                    isAdmin: isAdmin,
                    contact: contact,
                    address: {
                        fullAddress: fullAddress,
                        pincode: pincode
                    }
                    });
    
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: savedUser
                    });
                });
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error in registering user");
    }
};


module.exports.login = async function(req, res) {
    try {
        let { email, password } = req.body;
        
        // First check in customer, then deliveryPartner, and lastly restaurant
        let user = await customer.findOne({ email: email }) ||
                   await deliveryPartner.findOne({ email: email }) ||
                   await restaurant.findOne({ email: email });

        // If no user is found, return the incorrect credentials message
        if (!user) {
            return res.status(400).send("Incorrect Username or Password.");
        }

        
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                let token = generateToken(user);
                // res.cookie("token", token);
                // res.cookie("role", user.role);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,  // Set to true for HTTPS
                    sameSite: 'None'  // For cross-origin requests
                });
                res.cookie('role', user.role, {
                    httpOnly: true,
                    secure: true, // Make sure this is set to true if you're using HTTPS
                    sameSite: 'None', // Needed for cross-origin cookies
                });
                  
                res.status(200).json({
                    message: "Login successful",
                    role: user.role
                })
            } else {
                res.status(400).send("Incorrect Password.");
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error during login");
    }
};

module.exports.logout = function(req, res) {
    res.clearCookie('token', token, {
        httpOnly: true,
        secure: true, 
        sameSite: 'None'  
    });
    res.clearCookie('role', user.role, {
        httpOnly: true,
        secure: true, 
        sameSite: 'None', 
    });
    res.status(200).json({ message: "Logged out" });
};

const getStartOfDay = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
};

// Helper function to get the start of the week
const getStartOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) - 6 (Saturday)
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(now.setDate(diff));
};


const Order = require('../models/orderModel');
const Restaurant = require('../models/restaurantModel');
const Customer = require('../models/customerModel');
module.exports.getAdminDashboardStats = async (req, res) => {
    try {
        const startOfDay = getStartOfDay();
        const startOfWeek = getStartOfWeek();
        
        // Today's Orders
        const todayOrders = await Order.find({ createdAt: { $gte: startOfDay } });
        const todayOrdersCount = todayOrders.length;

        // Today's Profit (10% of total order amount)
        const todayProfit = todayOrders.reduce((total, order) => total + (order.totalAmount * 0.10), 0);

        // Weekly Orders
        const weeklyOrders = await Order.find({ createdAt: { $gte: startOfWeek } });
        const weeklyOrdersCount = weeklyOrders.length;

        // Weekly Profit (10% of total order amount)
        const weeklyProfit = weeklyOrders.reduce((total, order) => total + (order.totalAmount * 0.10), 0);

        // Customers Joined Today
        const todayCustomersCount = await Customer.countDocuments({ role: 'customer', createdAt: { $gte: startOfDay } });

        // Customers Joined This Week
        const weeklyCustomersCount = await Customer.countDocuments({ role: 'customer', createdAt: { $gte: startOfWeek } });

        // Restaurants Joined Today
        const todayRestaurantsCount = await Restaurant.countDocuments({ createdAt: { $gte: startOfDay } });

        // Restaurants Joined This Week
        const weeklyRestaurantsCount = await Restaurant.countDocuments({ createdAt: { $gte: startOfWeek } });

        // Return the stats
        res.status(200).json({
            today: {
                ordersCount: todayOrdersCount,
                profit: todayProfit.toFixed(2),
                customersJoined: todayCustomersCount,
                restaurantsJoined: todayRestaurantsCount,
            },
            week: {
                ordersCount: weeklyOrdersCount,
                profit: weeklyProfit.toFixed(2),
                customersJoined: weeklyCustomersCount,
                restaurantsJoined: weeklyRestaurantsCount,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching dashboard stats.");
    }
};


