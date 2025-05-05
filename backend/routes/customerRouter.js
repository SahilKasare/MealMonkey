const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Auth = require("../middlewares/Auth")
const Restaurant = require("../models/restaurantModel")
const Product = require('../models/productModel');

// router.get("/profileDetails", isLoggedIn,  customerController.profileDetailsCustomer);
// router.post("/profileDetails",isLoggedIn, customerController.updateDetailsCustomer);
router.get("/", isLoggedIn, Auth.authorizeCustomer, function(req, res){
    res.status(200).send("Customer Dashboard");
})
// router.get('/categories/:foodType', isLoggedIn, Auth.authorizeCustomer, customerController.getCategories)
router.get("/popularRestaurants", customerController.getTopRestaurant)
// router.post("/address_update", Address_Update);
router.get("/restaurantDetails/:restaurantId", customerController.getRestaurant);
router.get('/menu/:restaurantId', customerController.listMenu);

router.get('/restaurants/by-food-type/:foodType', async (req, res) => {
    try {
        const { foodType } = req.params;

        // Find restaurants that have menu items of the specified food type
        const products = await Product.find({ foodType: foodType }).distinct('_id');
        const restaurants = await Restaurant.find({
            menu: { $in: products }
        }).populate('menu');

        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching restaurants.");
    }
});


router.post("/cart/add", isLoggedIn, customerController.addToCart);

router.get('/cart', isLoggedIn, customerController.getCart); // Get cart items
router.put('/cart/:itemId', isLoggedIn, customerController.updateCartQuantity); // Update cart item quantity
router.post('/checkout', isLoggedIn, customerController.checkout); // Checkout
router.get('/wallet', isLoggedIn, customerController.getWalletBalance); // Update cart item quantity
router.post('/addMoney', isLoggedIn, customerController.addMoneyToWallet); // Checkout
router.get('/orders', isLoggedIn, Auth.authorizeCustomer, customerController.getOrders);
router.post('/review',isLoggedIn,Auth.authorizeCustomer, customerController.writeReview);
router.get('/restaurantReview/:restaurantId',isLoggedIn,Auth.authorizeCustomer, customerController.getReviewsByTargetId)
module.exports = router;



/**
 * @openapi
 * /customer/popularRestaurants:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get top restaurants
 *     description: Fetches the top 8 restaurants sorted by rating.
 *     responses:
 *       200:
 *         description: Top restaurants retrieved successfully.
 *       500:
 *         description: Server error while fetching restaurants.
 * 
 * /customer/restaurantDetails/{restaurantId}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get restaurant details
 *     description: Fetches details of a specific restaurant by its ID.
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant.
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully.
 *       404:
 *         description: Restaurant not found.
 *       500:
 *         description: Error fetching restaurant details.
 * 
 * /customer/menu/{restaurantId}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get restaurant menu
 *     description: Fetches the menu of a specific restaurant.
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant.
 *     responses:
 *       200:
 *         description: Menu retrieved successfully.
 *       404:
 *         description: Restaurant not found.
 *       500:
 *         description: Error fetching menu.
 * 
 * /customer/cart:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get cart items
 *     description: Fetches the items in the customer's cart along with product details.
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Error fetching cart.
 * 
 * /customer/cart/add:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Add item to cart
 *     description: Adds a product to the customer's cart or updates the quantity if it already exists.
 *     requestBody:
 *       description: Product ID and quantity to add to the cart.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60d5ec49f9a1b23b8c8e4a1a"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully.
 *       400:
 *         description: Please provide product ID and quantity.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Error adding item to cart.
 * 
 * /customer/cart/{itemId}:
 *   put:
 *     tags:
 *       - Customer
 *     summary: Update cart item quantity
 *     description: Updates the quantity of a specific cart item.
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart item.
 *     requestBody:
 *       description: New quantity for the cart item.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully.
 *       404:
 *         description: Customer or cart item not found.
 *       500:
 *         description: Error updating cart quantity.
 * 
 * /customer/checkout:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Checkout
 *     description: Handles customer checkout, creates an order, and deducts wallet balance.
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: Cart is empty or insufficient wallet balance.
 *       404:
 *         description: Customer or admin inactive.
 *       500:
 *         description: Error during checkout.
 * 
 * /customer/orders:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get customer orders
 *     description: Fetches all orders made by the customer.
 *     responses:
 *       200:
 *         description: Customer orders retrieved successfully.
 *       500:
 *         description: Error fetching orders.
 * 
 * /customer/wallet:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get wallet balance
 *     description: Fetches the current wallet balance of the customer.
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Error fetching wallet balance.
 * 
 * /customer/addMoney:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Add money to wallet
 *     description: Allows customers to add money to their wallet.
 *     requestBody:
 *       description: Amount to add to the wallet.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Money added successfully.
 *       400:
 *         description: Amount must be greater than zero.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Error adding money to wallet.
 * 
 * /customer/review:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Write a review
 *     description: Allows a customer to write a review for a restaurant or delivery partner.
 *     requestBody:
 *       description: Review details including target type, target ID, review type, rating, and comment.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - targetType
 *               - targetId
 *               - reviewType
 *               - rating
 *               - comment
 *             properties:
 *               targetType:
 *                 type: string
 *                 example: "restaurant"
 *               targetId:
 *                 type: string
 *                 example: "60d5ec49f9a1b23b8c8e4a1a"
 *               reviewType:
 *                 type: string
 *                 example: "Service"
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Great food and service!"
 *     responses:
 *       201:
 *         description: Review submitted successfully.
 *       400:
 *         description: Missing required fields or invalid rating.
 *       404:
 *         description: Target entity not found.
 *       500:
 *         description: Internal server error.
 * 
 * /customer/restaurantReview/{restaurantId}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get reviews by restaurant ID
 *     description: Fetches all reviews for a specific restaurant.
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant.
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully.
 *       404:
 *         description: No reviews found for the given target ID.
 *       500:
 *         description: Internal server error.
 */