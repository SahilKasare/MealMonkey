const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require('../middlewares/multerConfig'); // Import multer config
const Auth = require("../middlewares/Auth")
const Restaurant = require('../models/restaurantModel');
const redisClient = require('../index')

//Restaurant dashboard
router.get("/",isLoggedIn, Auth.authorizeManager, restaurantController.getRestaurantDetails)
router.get("/restaurantObject",isLoggedIn, Auth.authorizeManager, restaurantController.getRestaurant)
// Update restaurant profile
router.post("/profile", isLoggedIn, Auth.authorizeManager,upload.single('photos'), restaurantController.updateProfile);

// List menu items
router.get("/menu", isLoggedIn, restaurantController.listMenu);

//  router.get("/menu", async function(req, res){
//      try {
//          const userId = req.headers['userid'];
//          let restaurant = null;
//          const key = `restaurant:${userId}:menu`;
//          const value = await redisClient.get(key);
 
//          if(value){
//              restaurant = JSON.parse(value);
//              console.log("cache hit")
//          }else{
//              restaurant = await Restaurant.findById(userId).populate('menu');
//              await redisClient.setEx(key, 120, JSON.stringify(restaurant));
//              console.log("cache miss");
//          }
 
//          if (!restaurant) {
//              return res.status(404).send("Restaurant not found.");
//          }
//          res.status(200).json(restaurant.menu);
//      } catch (err) {
//          console.log(err);
//          res.status(500).send("Error fetching menu.");
//      }
//  });




// Add a new food item
router.post("/menu/item", isLoggedIn, Auth.authorizeManager, upload.single('image'), restaurantController.addItem);

// Update an existing food item
router.put("/menu/item/:itemId", isLoggedIn, Auth.authorizeManager, restaurantController.updateItem);

// Delete a food item
router.delete("/menu/item/:itemId", isLoggedIn, restaurantController.deleteItem);

// Add discount to all food items
router.post("/menu/discount", isLoggedIn, restaurantController.addDiscountToAll);

// Get wallet amount
router.get("/wallet", isLoggedIn, restaurantController.getWallet);

// Add money to wallet
router.post("/wallet/add", isLoggedIn, restaurantController.addMoney);

// Update restaurant open status
router.post("/status/open", isLoggedIn, restaurantController.updateOpenStatus);

// View order queue
router.get("/orders/queue", isLoggedIn, restaurantController.viewOrderQueue);

// Get pending orders
router.get("/orders/pending", isLoggedIn, restaurantController.getPendingOrders);

// Accept an order
router.post("/orders/accept/:orderId", isLoggedIn, restaurantController.acceptOrder);

// Reject an order
router.post("/orders/reject/:orderId", isLoggedIn, restaurantController.rejectOrder);

// Update order status (generic)
router.put("/orders/:orderId/status", isLoggedIn, restaurantController.updateOrderStatus);

// Get order history
router.get("/orders/history", isLoggedIn, restaurantController.getOrderHistory);

// Get all reviews
router.get( "/readReviews", isLoggedIn,Auth.authorizeManager, restaurantController.getReviewsByTargetId);

// Get daily analytics
router.get("/analytics/daily-weekly", isLoggedIn, restaurantController.getDailyAndWeeklyAnalytics);
//Get all transactions of the restaurant
router.get("/transactions", isLoggedIn, restaurantController.getTransactions);

// Route to write a review
router.post("/writeReview", isLoggedIn, restaurantController.writeReview);

router.get("/getItem/:id", isLoggedIn, restaurantController.getMenuItemDetails);

router.put("/updateItem/:id", isLoggedIn, restaurantController.updateMenuItem);


router.get("/orders",isLoggedIn, restaurantController.getOrdersByRestaurant)

// Test endpoint
router.get("/test", isLoggedIn, restaurantController.testEndpoint)

module.exports = router;

/**
  * @openapi
  * /restaurant/:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: Get restaurant details
  *      description: Fetch details of the logged-in restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched restaurant details
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *          404:
  *              description: Restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/updateProfile:
  *  put:
  *      tags:
  *          - Restaurant
  *      summary: Update restaurant profile
  *      description: Update the logged-in restaurant's profile details.
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      required:
  *                          - hotelName
  *                          - averageCost
  *                          - type
  *                          - timingFrom
  *                          - timingTo
  *                      properties:
  *                          hotelName:
  *                              type: string
  *                          averageCost:
  *                              type: number
  *                          type:
  *                              type: string
  *                          timingFrom:
  *                              type: string
  *                          timingTo:
  *                              type: string
  *      responses:
  *          200:
  *              description: Successfully updated profile
  *          400:
  *              description: Invalid request data
  *          404:
  *              description: Restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/listMenu:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: List menu items
  *      description: Fetch the menu items of the logged-in restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched menu
  *          404:
  *              description: Restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/addItem:
  *  post:
  *      tags:
  *          - Restaurant
  *      summary: Add a new food item
  *      description: Add a new food item to the restaurant's menu.
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      required:
  *                          - name
  *                          - price
  *                          - foodType
  *                      properties:
  *                          name:
  *                              type: string
  *                          price:
  *                              type: number
  *                          foodType:
  *                              type: string
  *                          discount:
  *                              type: number
  *      responses:
  *          201:
  *              description: Successfully added item
  *          400:
  *              description: Invalid request data
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/updateItem/{itemId}:
  *  put:
  *      tags:
  *          - Restaurant
  *      summary: Update a food item
  *      description: Update the details of an existing food item.
  *      parameters:
  *          - name: itemId
  *            in: path
  *            required: true
  *            schema:
  *                type: string
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          name:
  *                              type: string
  *                          price:
  *                              type: number
  *                          foodType:
  *                              type: string
  *      responses:
  *          200:
  *              description: Successfully updated item
  *          404:
  *              description: Item not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/deleteItem/{itemId}:
  *  delete:
  *      tags:
  *          - Restaurant
  *      summary: Delete a food item
  *      description: Remove a food item from the restaurant's menu.
  *      parameters:
  *          - name: itemId
  *            in: path
  *            required: true
  *            schema:
  *                type: string
  *      responses:
  *          200:
  *              description: Successfully deleted item
  *          404:
  *              description: Item not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/addDiscountToAll:
  *  post:
  *      tags:
  *          - Restaurant
  *      summary: Add discount to all food items
  *      description: Apply a discount to all menu items.
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          discount:
  *                              type: number
  *      responses:
  *          200:
  *              description: Successfully applied discount to all items.
  *          400:
  *              description: Invalid discount value
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/wallet:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: Get wallet balance
  *      description: Fetch the wallet balance of the logged-in restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched wallet balance
  *          404:
  *              description: Restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /wallet/add:
  *  post:
  *      tags:
  *          - Restaurant
  *      summary: Add money to wallet
  *      description: Add funds to the restaurant's wallet.
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          amount:
  *                              type: number
  *      responses:
  *          200:
  *              description: Successfully added money to wallet
  *          400:
  *              description: Invalid amount
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/updateOpenStatus:
  *  put:
  *      tags:
  *          - Restaurant
  *      summary: Update restaurant open status
  *      description: Update the open/closed status of the restaurant.
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          isOpen:
  *                              type: boolean
  *      responses:
  *          200:
  *              description: Successfully updated open status
  *          400:
  *              description: Invalid isOpen value
  *          404:
  *              description: Restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/viewOrderQueue:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: View order queue
  *      description: Fetch the order queue of the logged-in restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched order queue
  *          404:
  *              description: Restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/rejectOrder/{orderId}:
  *  put:
  *      tags:
  *          - Restaurant
  *      summary: Reject an order
  *      description: Reject an order and process refunds.
  *      parameters:
  *          - name: orderId
  *            in: path
  *            required: true
  *            schema:
  *                type: string
  *      responses:
  *          200:
  *              description: Successfully rejected order
  *          404:
  *              description: Order or restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/getOrderHistory:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: Get order history
  *      description: Fetch the order history of the restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched order history
  *          404:
  *              description: Restaurant not found
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/getAllReviews:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: Get all reviews
  *      description: Fetch all reviews for the restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched reviews
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/getDailyAndWeeklyAnalytics:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: Get daily and weekly analytics
  *      description: Fetch daily and weekly analytics for the restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched analytics
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/getTransactions:
  *  get:
  *      tags:
  *          - Restaurant
  *      summary: Get restaurant transactions
  *      description: Fetch all transactions related to the restaurant.
  *      responses:
  *          200:
  *              description: Successfully fetched transactions
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /restaurant/writeReview:
  *  post:
  *      tags:
  *          - Restaurant
  *      summary: Write a review
  *      description: Write a review for a delivery partner or customer.
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      required:
  *                          - targetType
  *                          - targetId
  *                          - reviewType
  *                          - rating
  *                          - comment
  *                      properties:
  *                          targetType:
  *                              type: string
  *                          targetId:
  *                              type: string
  *                          reviewType:
  *                              type: string
  *                          rating:
  *                              type: number
  *                          comment:
  *                              type: string
  *      responses:
  *          201:
  *              description: Successfully created review
  *          400:
  *              description: Invalid request data
  *          500:
  *              description: Internal Server Error
  */