// controllers/restaurantController.js
const ADMIN_ID = 'yourAdminIdHere';
const Restaurant = require('../models/restaurantModel');
const Transaction=require('../models/transactionModel')
const Order=require('../models/orderModel')
const Customer=require('../models/customerModel')
const Review = require('../models/reviewModel');
const DeliveryPartner=require('../models/deliveryPartnerModel')
module.exports.updateProfile = async function(req, res) {
    try {
        const { license, vehicleNumber, isFree } = req.body;

        // Validate input
        // if (!license || !vehicleNumber) {
        //     return res.status(400).send("Please provide all necessary fields.");
        // }

        // Find the baseUser
        let user = await DeliveryPartner.findById(req.userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Check if the user is already a Delivery Partner
        if (user.role !== 'deliveryPartner') {
            user.role = 'deliveryPartner';
        }

        user.license = license || user.license;
        user.vehicleNumber = vehicleNumber || user.vehicleNumber;
        user.isFree = isFree !== undefined ? isFree : user.isFree;

        // Save the updated user as a Delivery Partner
        await user.save();

        res.status(200).json(user); // Send updated delivery partner details
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating delivery partner profile.");
    }
};

//get todays pending orders
exports.getTodaysPendingOrders = async (req, res) => {
    const deliveryPartnerId = req.userId;
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const orders = await Order.find({
            createdAt: { $gte: startOfDay, $lt: endOfDay },
            status: 'pending'
        }).populate('customer').populate('restaurant').populate('items.product');

        const detailedOrders = await Promise.all(orders.map(async order => {
            const customer = await Customer.findById(order.customer);
            const restaurant = await Restaurant.findById(order.restaurant);

            return {
                ...order.toObject(),
                customerName: customer.username,
                customerContact: customer.contact,
                restaurantName: restaurant.hotelName,
            };
        }));

        // Fetch analytics data for the delivery partner
        const completedOrdersCount = await Order.countDocuments({
            deliveryPartner: deliveryPartnerId,
            status: 'completed'
        });

        const completedOrdersToday = await Order.find({
            deliveryPartner: deliveryPartnerId,
            status: 'completed',
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        const todaysRevenue = completedOrdersToday.reduce((total, order) => total + (order.totalAmount * 0.1), 0);

        const activeOrdersCount = await Order.countDocuments({
            deliveryPartner: deliveryPartnerId,
            status: 'accepted'
        });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const completedOrdersThisMonth = await Order.find({
            deliveryPartner: deliveryPartnerId,
            status: 'completed',
            createdAt: { $gte: startOfMonth, $lt: new Date() }
        });

        const monthlyRevenue = completedOrdersThisMonth.reduce((total, order) => total + (order.totalAmount * 0.1), 0);

        res.status(200).json({
            detailedOrders,
            analytics: {
                completedOrders: completedOrdersCount,
                todaysRevenue: todaysRevenue,
                activeOrders: activeOrdersCount,
                monthlyRevenue: monthlyRevenue
            }
        });
    } catch (error) {
        console.error("Error fetching today's orders:", error);
        res.status(500).json({ message: 'Error fetching today\'s orders', error });
    }
};

//charts and graphs
exports.getDeliveryPartnerStats = async (req, res) => {
    const deliveryPartnerId = req.userId;
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        const orders = await Order.find({
            deliveryPartner: deliveryPartnerId,
            createdAt: { $gte: startOfMonth, $lt: endOfMonth }
        });

        const stats = {
            dailyOrders: [],
            dailyRevenue: [],
            statusDistribution: {
                pending: 0,
                accepted: 0,
                rejected: 0,
                completed: 0,
                delivery_rejected: 0
            }
        };

        orders.forEach(order => {
            const day = order.createdAt.getDate();
            if (!stats.dailyOrders[day]) stats.dailyOrders[day] = 0;
            if (!stats.dailyRevenue[day]) stats.dailyRevenue[day] = 0;

            stats.dailyOrders[day]++;
            stats.dailyRevenue[day] += order.totalAmount * 0.1;
            stats.statusDistribution[order.status]++;
        });

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery partner stats', error });
    }
};

//update order status
// exports.updateOrderStatus = async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'accepted' }, { new: true });
        
//         if (!updatedOrder) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating order status', error });
//     }
// };
exports.updateOrderStatus = async (req, res) => {
    const { id: orderId } = req.params;
    const { deliveryPartnerId } = req.body;
  
    try {
        console.log(orderId);
        console.log(deliveryPartnerId);
      const order = await Order.findByIdAndUpdate(orderId, { status: 'accepted', deliveryPartner: deliveryPartnerId }, { new: true });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error accepting order', error });
    }
  };
  
// exports.getAcceptedOrders = async (req, res) => {
//     const { deliveryPartnerId } = req.body;
//     try {
//       const orders = await Order.find({ status: 'accepted', deliveryPartner: deliveryPartnerId }).populate('customer').populate('restaurant').populate('items');
//       res.status(200).json(orders);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching accepted orders', error });
//     }
//   };
  
exports.getAcceptedOrders = async (req, res) => {
    const deliveryPartnerId  = req.userId;
    try {
        const orders = await Order.find({ status: 'accepted', deliveryPartner: deliveryPartnerId })
                                  .populate('customer')
                                  .populate('restaurant')
                                  .populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accepted orders', error });
    }
};

exports.getOrderDetails = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId)
                                 .populate('customer')
                                 .populate('restaurant')
                                 .populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error });
    }
};

  exports.completeOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findByIdAndUpdate(orderId, { status: 'completed' }, { new: true });
      res.status(200).json(order);
    } catch (error) {
      console.error('Error completing order:', error);
      res.status(500).json({ message: 'Error completing order', error });
    }
  };
  
  exports.getDeliveriesDone = async (req, res) => {
    const deliveryPartnerId = req.userId;
    try {
        const orders = await Order.find({ status: 'completed', deliveryPartner: deliveryPartnerId })
                                  .populate('customer')
                                  .populate('restaurant')
                                  .populate('items.product');

        const totalRevenue = orders.reduce((total, order) => total + (order.totalAmount * 0.1), 0);
        res.status(200).json({ orders, revenue: totalRevenue });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching completed orders', error });
    }
};

// 1. Get Wallet Amount
module.exports.getWallet = async function(req, res) {
    try {
        // Find the delivery partner and select the wallet balance
        const deliveryPartner = await DeliveryPartner.findById(req.userId).select('wallet.balance');

        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        res.status(200).json({
            balance: deliveryPartner.wallet.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching wallet balance.");
    }
};

// 2. Add Money to Wallet
module.exports.addMoney = async function(req, res) {
    try {
        const { amount } = req.body;

        // Validate input
        if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).send("Please provide a valid amount greater than 0.");
        }

        // Find the delivery partner and update the wallet balance
        const deliveryPartner = await DeliveryPartner.findById(req.userId);

        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        deliveryPartner.wallet.balance += amount;

        await deliveryPartner.save();

        res.status(200).json({
            message: `Successfully added $${amount} to the wallet.`,
            newBalance: deliveryPartner.wallet.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding money to wallet.");
    }
};

// Get All Reviews for the Delivery Partner
module.exports.getAllReviews = async function(req, res) {
    try {
        // Find the delivery partner ID from the user's profile
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Get all reviews targeting this delivery partner
        const reviews = await Review.find({
            'target.deliveryPartner': deliveryPartnerId
        }).populate('source.user', 'username') // Optionally populate the user details
          .select('reviewType rating comment createdAt likes dislikes');

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching reviews.");
    }
};


// Get Transactions for the Delivery Partner
module.exports.getTransactions = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Fetch transactions where the delivery partner is involved
        const transactions = await Transaction.find({
            $or: [
                { 'from.deliveryPartner': deliveryPartnerId },
                { 'to.deliveryPartner': deliveryPartnerId }
            ]
        });

        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching transactions.");
    }
};


// Get Order History for the Delivery Partner
module.exports.getOrderHistory = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Fetch the delivery partner and populate their delivery history
        const deliveryPartner = await DeliveryPartner.findById(deliveryPartnerId).populate('deliveryHistory');

        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        // Return the order history
        res.status(200).json(deliveryPartner.deliveryHistory);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order history.");
    }
};

// Get Assigned Orders for the Delivery Partner
module.exports.getAssignedOrders = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Fetch orders assigned to the delivery partner
        const assignedOrders = await Order.find({ deliveryPartner: deliveryPartnerId, status: 'pending' })
            .populate('restaurant'); // Optionally populate restaurant details

        res.status(200).json(assignedOrders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching assigned orders.");
    }
};

// Accept an Order
module.exports.acceptOrder = async function(req, res) {
    try {
        const { orderId } = req.params; // Assume order ID is passed as a URL parameter

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send("Order not found.");
        }

        // Update order status and assign the delivery partner
        order.status = 'accepted';
        order.deliveryPartner = req.userId; // Assign the delivery partner

        // Find the delivery partner and update their orderQueue
        const deliveryPartner = await DeliveryPartner.findById(req.userId);
        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        // Push the order ID to the delivery partner's orderQueue
        deliveryPartner.orderQueue.push(orderId);
        
        await Promise.all([order.save(), deliveryPartner.save()]); // Save both changes

        res.status(200).json({
            message: "Order accepted successfully.",
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error accepting the order.");
    }
};

// Reject an Order
module.exports.rejectOrder = async function(req, res) {
    try {
        const { orderId } = req.params; // Assume order ID is passed as a URL parameter

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send("Order not found.");
        }

        // Update order status to rejected
        order.status = 'delivery_rejected';
        await order.save();
        
        order.deliveryPartner = req.userId; // Assign the delivery partner

        // Find the delivery partner and update their orderQueue
        const deliveryPartner = await DeliveryPartner.findById(req.userId);
        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }
        deliveryPartner.deliveryHistory.push(orderId);


        res.status(200).json({
            message: "Order rejected successfully.",
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rejecting the order.");
    }
};


// controllers/deliveryPartnerController.js

module.exports.viewOrderQueue = async function(req, res) {
    try {
        // Find the delivery partner using the logged-in user's ID
        const deliveryPartner = await DeliveryPartner.findById(req.userId).populate('orderQueue');

        if (!deliveryPartner) {
            return res.status(404).send("Delivery Partner not found.");
        }

        // Return the order queue
        res.status(200).json({
            orderQueue: deliveryPartner.orderQueue
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order queue.");
    }
};


// controllers/deliveryPartnerController.js

// module.exports.completeOrder = async function(req, res) {
//     try {
//         const { orderId } = req.params; // Assume order ID is passed as a URL parameter

//         // Find the order and associated delivery partner
//         const order = await Order.findById(orderId).populate('restaurant customer');
//         const deliveryPartner = await DeliveryPartner.findById(req.userId);

//         if (!order || !deliveryPartner) {
//             return res.status(404).send("Order or delivery partner not found.");
//         }

//         // Change the order status to completed
//         order.status = 'Completed';

//         // Remove from order queue and add to delivery history
//         deliveryPartner.orderQueue.pull(orderId);
//         deliveryPartner.deliveryHistory.push(orderId);
//         await deliveryPartner.save();

//         // Remove from restaurant's order queue and push to order history
//         const restaurant = order.restaurant;
//         restaurant.orderQueue.pull(orderId);
//         restaurant.orderHistory.push(orderId);
//         await restaurant.save();

//         // Create a transaction for 10% of the order amount
//         const transactionAmount = order.amount * 0.1; // 10% of the order amount
//         deliveryPartner.wallet.balance += transactionAmount;
//         await deliveryPartner.save();

//         await Transaction.create({
//             amount: transactionAmount,
//             from: { type: 'Customer', id: order.customer._id },
//             to: { type: 'DeliveryPartner', id: deliveryPartner._id },
//             isRefund: false
//         });

//         await order.save(); // Save the updated order

//         res.status(200).json({
//             message: "Order completed successfully.",
//             order
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error completing the order.");
//     }
// };


// controllers/deliveryPartnerController.js

module.exports.getDailyAnalytics = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        // Total earnings for the day (10% of completed order amounts)
        const totalEarnings = await Transaction.aggregate([
            { $match: { 'to.id': deliveryPartnerId, createdAt: { $gte: startOfDay, $lt: endOfDay } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Average completed orders
        const completedOrdersCount = await Order.countDocuments({
            deliveryPartner: deliveryPartnerId,
            status: 'Completed',
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        // Total ratings and average ratings calculation
        const ratingData = await Review.aggregate([
            { $match: { 'target.deliveryPartner': deliveryPartnerId } },
            { $group: { _id: null, averageRating: { $avg: '$rating' } } }
        ]);

        const averageRating = ratingData.length ? ratingData[0].averageRating.toFixed(1) : 0; // Round to 1 decimal place

        // Constructing the analytics data
        const analytics = {
            totalEarnings: totalEarnings.length ? totalEarnings[0].total : 0,
            averageCompletedOrders: completedOrdersCount,
            averageRating: parseFloat(averageRating) // Ensure it's a float
        };

        res.status(200).json(analytics);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching daily analytics.");
    }
};

module.exports.writeReview = async function(req, res) {
    try {
        const { targetType, targetId, reviewType, rating, comment } = req.body;

        // Validate input
        if (!targetType || !targetId || !reviewType || rating === undefined || !comment) {
            return res.status(400).send("Please provide all necessary fields.");
        }

        // Ensure targetType is valid
        const validTargetTypes = ['Restaurant', 'Customer'];
        if (!validTargetTypes.includes(targetType)) {
            return res.status(400).send("Invalid target type.");
        }

        // Check if the target exists
        let target;
        if (targetType === 'Restaurant') {
            target = await Restaurant.findById(targetId);
        } else if (targetType === 'Customer') {
            target = await Customer.findById(targetId);
        }

        if (!target) {
            return res.status(404).send(`${targetType} not found.`);
        }

        // Create the review
        const newReview = new Review({
            source: {
                deliveryPartner: req.userId, // Assuming req.userId is the ID of the user writing the review
            },
            target: {
                [targetType.toLowerCase()]: targetId, // Dynamically set the target type
            },
            reviewType,
            rating,
            comment
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error writing review.");
    }
};


