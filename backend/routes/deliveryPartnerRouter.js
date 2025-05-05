const express = require("express");
const router = express.Router();
const deliveryPartnerController = require("../controllers/deliveryPartnerController");
const isLoggedIn = require("../middlewares/isLoggedIn");
//Update profile
router.post("/updateProfile", isLoggedIn, deliveryPartnerController.updateProfile);
//Get wallet
router.get("/wallet", isLoggedIn, deliveryPartnerController.getWallet);

//get todays orders
router.get('/ordersToday', isLoggedIn, deliveryPartnerController.getTodaysPendingOrders);
router.put('/orders/:id/status', isLoggedIn, deliveryPartnerController.updateOrderStatus);
router.get('/stats', isLoggedIn, deliveryPartnerController.getDeliveryPartnerStats);
// Fetch accepted orders with complete items and quantity
router.get('/acceptedOrders', isLoggedIn, deliveryPartnerController.getAcceptedOrders);
router.get('/OrderDetails/:orderId', isLoggedIn, deliveryPartnerController.getOrderDetails);

// Complete an order
router.put('/orders/:orderId/complete', isLoggedIn, deliveryPartnerController.completeOrder);

// Fetch completed deliveries and calculate revenue
router.get('/deliveriesDone', isLoggedIn, deliveryPartnerController.getDeliveriesDone);


//add money to wallet
router.post("/wallet/addMoney", isLoggedIn, deliveryPartnerController.addMoney);

//view all reviews
router.get("/reviews", isLoggedIn, deliveryPartnerController.getAllReviews);

//view all transactions
router.get("/transactions", isLoggedIn, deliveryPartnerController.getTransactions);

//View all past orders
router.get("/orderHistory", isLoggedIn, deliveryPartnerController.getOrderHistory);

//View assigned orders
router.get("/assignedOrders", isLoggedIn, deliveryPartnerController.getAssignedOrders);
//Accept order
router.post("/acceptOrder/:orderId", isLoggedIn, deliveryPartnerController.acceptOrder);

//reject order
router.post("/rejectOrder/:orderId", isLoggedIn, deliveryPartnerController.rejectOrder);

//view order queue
router.get("/orderQueue", isLoggedIn, deliveryPartnerController.viewOrderQueue);

// Route to complete an order
router.post("/completeOrder/:orderId", isLoggedIn, deliveryPartnerController.completeOrder);

// Route to get daily analytics
router.get("/dailyAnalytics", isLoggedIn, deliveryPartnerController.getDailyAnalytics);

// Route to write a review
router.post("/writeReview", isLoggedIn, deliveryPartnerController.writeReview);

module.exports = router;


/**
  * @openapi
  * /deliveryPartner/updateProfile:
  *  put:
  *      tags:
  *          - DeliveryPartner
  *      summary: Update delivery partner profile
  *      description: Update the profile of a delivery partner with details like license, vehicle number, and availability status.
  *      requestBody:
  *          description: Updated delivery partner details
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          license:
  *                              type: string
  *                              example: "ABC123456"
  *                          vehicleNumber:
  *                              type: string
  *                              example: "MH12AB1234"
  *                          isFree:
  *                              type: boolean
  *                              example: true
  *      responses:
  *          200:
  *              description: Delivery partner profile updated successfully
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          example:
  *                              license: "ABC123456"
  *                              vehicleNumber: "MH12AB1234"
  *                              isFree: true
  *          404:
  *              description: Delivery partner not found
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              message:
  *                                  type: string
  *                                  example: "User not found"
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /deliveryPartner/ordersToday:
  *  get:
  *      tags:
  *          - DeliveryPartner
  *      summary: Get today's pending orders
  *      description: Retrieve all orders with pending status for the current day.
  *      responses:
  *          200:
  *              description: List of pending orders with analytics
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              detailedOrders:
  *                                  type: array
  *                                  items:
  *                                      type: object
  *                                      example:
  *                                          customerName: "John Doe"
  *                                          customerContact: "1234567890"
  *                                          restaurantName: "Food Paradise"
  *                              analytics:
  *                                  type: object
  *                                  properties:
  *                                      completedOrders:
  *                                          type: integer
  *                                          example: 5
  *                                      todaysRevenue:
  *                                          type: number
  *                                          example: 20.5
  *                                      activeOrders:
  *                                          type: integer
  *                                          example: 2
  *                                      monthlyRevenue:
  *                                          type: number
  *                                          example: 400.75
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /deliveryPartner/orders/{id}/status:
  *  put:
  *      tags:
  *          - DeliveryPartner
  *      summary: Update order status
  *      description: Accept an order by updating its status and assigning it to a delivery partner.
  *      parameters:
  *          - in: path
  *            name: id
  *            schema:
  *                type: string
  *            required: true
  *            description: ID of the order to be updated
  *      requestBody:
  *          description: Delivery partner information
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          deliveryPartnerId:
  *                              type: string
  *                              example: "deliveryPartner123"
  *      responses:
  *          200:
  *              description: Order status updated successfully
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              message:
  *                                  type: string
  *                                  example: "Order accepted successfully"
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /deliveryPartner/wallet:
  *  get:
  *      tags:
  *          - DeliveryPartner
  *      summary: Get wallet balance
  *      description: Retrieve the wallet balance of the delivery partner.
  *      responses:
  *          200:
  *              description: Wallet balance retrieved successfully
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              balance:
  *                                  type: number
  *                                  example: 150.75
  *          404:
  *              description: Delivery partner not found
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              message:
  *                                  type: string
  *                                  example: "Delivery partner not found."
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /deliveryPartner/wallet/addMoney:
  *  post:
  *      tags:
  *          - DeliveryPartner
  *      summary: Add money to wallet
  *      description: Add a specified amount to the wallet of the delivery partner.
  *      requestBody:
  *          description: Amount to be added to the wallet
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          amount:
  *                              type: number
  *                              example: 50
  *      responses:
  *          200:
  *              description: Money added successfully
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              message:
  *                                  type: string
  *                                  example: "Successfully added $50 to the wallet."
  *                              newBalance:
  *                                  type: number
  *                                  example: 200.75
  *          400:
  *              description: Invalid input
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              message:
  *                                  type: string
  *                                  example: "Please provide a valid amount greater than 0."
  *          500:
  *              description: Internal Server Error
  */
 
 /**
  * @openapi
  * /deliveryPartner/orderHistory:
  *  get:
  *      tags:
  *          - DeliveryPartner
  *      summary: Get order history
  *      description: Retrieve the delivery history of the delivery partner.
  *      responses:
  *          200:
  *              description: Delivery history retrieved successfully
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: array
  *                          items:
  *                              type: object
  *                              example:
  *                                  orderId: "order123"
  *                                  status: "completed"
  *          404:
  *              description: Delivery partner not found
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: object
  *                          properties:
  *                              message:
  *                                  type: string
  *                                  example: "Delivery partner not found."
  *          500:
  *              description: Internal Server Error
  */