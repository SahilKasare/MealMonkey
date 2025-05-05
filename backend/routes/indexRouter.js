const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Customer=require("../models/customerModel")
const Restaurant=require("../models/restaurantModel")
const DeliveryPartner=require("../models/deliveryPartnerModel")
router.get("/", function(req, res){
    res.send("Home Page");
});
// Register Route
/**
 * @openapi
 * /register:
 *  post:
 *      tags: 
 *          - Authentication
 *      summary: Register a user
 *      description: Auth user and get token
 *      requestBody:
 *          description: Register credentials
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:  
 *                              type: string    
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          role:
 *                              type: string
 *                              enum: ['customer', 'restaurant', 'deliveryPartner'] 
 *                          isAdmin:
 *                              type: boolean
 *                              default: false
 *                          contact:
 *                              type: string
 *                          fullAddress:
 *                              type: string
 *                          pincode:
 *                              type: string
 *      responses:
 *          201:
 *              description: Registered successfully
 *          400:
 *              description: Bad Request
 */
router.post("/register", indexController.register);

// Login & Logout Routes
/**
 * @openapi
 * /login:
 *  post:
 *      tags: 
 *          - Authentication
 *      summary: Log in a user
 *      description: Auth user and get token
 *      requestBody:
 *          description: Login credentials
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:  
 *                              type: string    
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Login  
 *          400:
 *              description: Bad Request
 */
router.post("/login", indexController.login);

/**
 * @openapi
 * /logout:
 *  get:
 *      tags: 
 *          - Authentication
 *      summary: Logs out a user
 *      description: Logs out the user
 *      responses:
 *          200:
 *              description: Logged out  
 *          400:
 *              description: Bad Request
 *
 */
router.get("/logout", indexController.logout);

// GET routes for profile details

// router.get("/restaurant/profileDetails", isLoggedIn, indexController.profileDetailsRestaurant);
// router.get("/deliveryPartner/profileDetails", isLoggedIn, indexController.profileDetailsDeliveryPartner);

// POST routes for updating profile details

// router.post("/restaurant/profileDetails", indexController.updateDetailsRestaurant);
// router.post("/deliveryPartner/profileDetails", indexController.updateDetailsDeliveryPartner);


router.get("/admin/dashboard", isLoggedIn, (req, res) => {
    res.send("Admin Dashboard");
});

router.get('/get_user', isLoggedIn, async (req, res) => {
    try {
        const userId = req.userId;
        let user = await Customer.findById(userId) ||
                   await DeliveryPartner.findById(userId) ||
                   await Restaurant.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); 
    } catch (error) {
        console.error('Error fetching user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
});


 router.get("/admin_stats",indexController.getAdminDashboardStats)
module.exports = router;