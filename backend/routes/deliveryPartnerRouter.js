const express = require("express");
const router = express.Router();
const deliveryPartnerController = require("../controllers/deliveryPartnerController");
const isLoggedIn = require("../middlewares/isLoggedIn");
//Update profile
router.post("/updateProfile", isLoggedIn, deliveryPartnerController.updateProfile);
//Get wallet
router.get("/wallet", isLoggedIn, deliveryPartnerController.getWallet);

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