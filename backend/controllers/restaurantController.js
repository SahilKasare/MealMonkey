// controllers/restaurantController.js
const ADMIN_ID = 'yourAdminIdHere';

const Restaurant = require('../models/restaurantModel');
const Transaction=require('../models/transactionModel')
const Order=require('../models/orderModel')

const Customer=require('../models/customerModel')
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
//Get restaurant details
// controllers/restaurantController.js

module.exports.getRestaurantDetails = async function(req, res) {
    try {
        // Find the restaurant by the user's ID
        const restaurant = await Restaurant.findById(req.userId)
            .select('-password','menu'); // Exclude sensitive fields like 'password'

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Return the restaurant's details
        res.status(200).json(restaurant);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching restaurant details.");
    }
};

module.exports.getRestaurant = async function(req, res) {
    try {
        // Find the restaurant by the user's ID
        const restaurant = await Restaurant.findById(req.userId)
             // Exclude sensitive fields like 'password'

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Return the restaurant's details
        res.status(200).json(restaurant);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching restaurant details.");
    }
};

// Update and transform baseUser to Restaurant
module.exports.updateProfile = async function(req, res) {
    try {
        let {
            hotelName,
            averageCost,
            paymentMethods,
            knownFor,
            moreInfo,
            type,
            timingFrom,
            timingTo,
            photos
        } = req.body;
       console.log(type)
        // Validate input
        if (
            !hotelName ||
            !averageCost ||
            !type ||
            !timingFrom ||
            !timingTo
        ) {
            return res.status(400).send("Please provide all necessary fields.");
        }
        if (typeof paymentMethods === 'string') {
           paymentMethods = JSON.parse(paymentMethods);
        }

        // Parse moreInfo if it's a string
        if (typeof moreInfo === 'string') {
            moreInfo = JSON.parse(moreInfo);
        }
        // Find the baseUser
        let user = await Restaurant.findById(req.userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Check if the user is already a Restaurant
        if (user.role !== 'restaurant') {
            user.role = 'restaurant';
        }

        // Add Restaurant-specific fields
        user.hotelName = hotelName;
        user.averageCost = averageCost;
        user.paymentMethods = paymentMethods || { cash: true, cards: true, digitalPayments: true };
        user.knownFor = knownFor || [];
        user.moreInfo = moreInfo || {};
        user.type = type;
        user.timingFrom = timingFrom;
        user.timingTo = timingTo;

        // Handle single uploaded photo
        if (req.file) {
            user.photos = `/public/Images/${req.file.filename}`; // Store the path as a string
        }
        
        // Save the updated user as a Restaurant
        await user.save();

        res.status(200).json(user); // Send updated restaurant details
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating restaurant profile");
    }
};
//Send restaurant
module.exports.getRestaurant = async function(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.userId);
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }
        res.status(200).json(restaurant);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching menu.");
    }
};
// 1. List All Food Items
module.exports.listMenu = async function(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.userId).populate('menu');

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }
        res.status(200).json(restaurant.menu);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching menu.");
    }
};

// 2. Add a New Food Item
// module.exports.addItem = async function(req, res) {
//     try {
//         const { image, name, price, foodType, discount } = req.body;

//         // Validate input
//         if (!name || !price || !foodType) {
//             return res.status(400).send("Please provide name, price, and foodType.");
//         }

//         // Create new product
//         const newProduct = new Product({
//             image,
//             name,
//             price,
//             foodType,
//             discount,
//             restaurant: req.userId
//         });

//         await newProduct.save();

//         // Add product to restaurant's menu
//         const restaurant = await Restaurant.findById(req.userId);
//         restaurant.menu.push(newProduct._id);
//         await restaurant.save();

//         res.status(201).json(newProduct);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error adding new item.");
//     }
// };
module.exports.addItem = async function (req, res) {
    try {
        const { name, price, foodType, discount } = req.body;

        // Validate input
        if (!name || !price || !foodType) {
            return res.status(400).send("Please provide name, price, and foodType.");
        }

        // Check if an image is uploaded via Multer
        let imagePath;
        if (req.file) {
            imagePath = `/public/Images/${req.file.filename}`; // Correct relative path
        }

        // Create new product
        const newProduct = new Product({
            image: imagePath,  // Save image path in the product
            name,
            price,
            foodType,
            discount,
            restaurant: req.userId
        });

        await newProduct.save();

        // Add product to the restaurant's menu
        const restaurant = await Restaurant.findById(req.userId);
        restaurant.menu.push(newProduct._id);
        await restaurant.save();

        res.status(201).json(newProduct); // Return the newly created product
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding new item.");
    }
};

// 3. Update an Existing Food Item
module.exports.updateItem = async function(req, res) {
    try {
        const { itemId } = req.params;
        const { image, name, price, foodType, Discount } = req.body;

        // Find the product and verify it belongs to the restaurant
        const product = await Product.findOne({ _id: itemId});
        if (!product) {
            return res.status(404).send("Product not found in your menu.");
        }
        console.log(product)
        // Update the product fields
        // if (image !== undefined) product.image = image;
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (foodType !== undefined) product.foodType = foodType;
        if (Discount !== undefined) product.Discount = Discount;

        if (req.file) {
            product.photos = `/public/Images/${req.file.filename}`; // Store the path as a string
        }
        
        await product.save();

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating the item.");
    }
};




// 4. Delete a Food Item
module.exports.deleteItem = async function(req, res) {
    try {
        const { itemId } = req.params;

        // Find and delete the product if it belongs to the restaurant
        const product = await Product.findOneAndDelete({ _id: itemId, restaurant: req.userId });
        if (!product) {
            return res.status(404).send("Product not found in your menu.");
        }

        // Remove the product from the restaurant's menu
        const restaurant = await Restaurant.findById(req.userId);
        restaurant.menu.pull(itemId);
        await restaurant.save();

        res.status(200).send("Product deleted successfully.");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting the item.");
    }
};

// 5. Add Discount to All Food Items
module.exports.addDiscountToAll = async function(req, res) {
    try {
        const { discount } = req.body;

        // Validate discount
        if (discount === undefined || typeof discount !== 'number' || discount < 0 || discount > 100) {
            return res.status(400).send("Please provide a valid discount percentage (0-100).");
        }

        // Update all products in the restaurant's menu
        const result = await Product.updateMany(
            { restaurant: req.userId },
            { $set: { discount: discount } }
        );

        res.status(200).json({ message: `Discount of ${discount}% applied to all items.` });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error applying discount to all items.");
    }
};


// 1. Get Wallet Amount
module.exports.getWallet = async function(req, res) {
    try {
        // Find the restaurant and select the wallet balance
        const restaurant = await Restaurant.findById(req.userId).select('wallet.balance');

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        res.status(200).json({
            balance: restaurant.wallet.balance
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

        // Find the restaurant and update the wallet balance
        const restaurant = await Restaurant.findById(req.userId);

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        restaurant.wallet.balance += amount;

        await restaurant.save();

        res.status(200).json({
            message: `Successfully added $${amount} to the wallet.`,
            newBalance: restaurant.wallet.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding money to wallet.");
    }
};

// Update Restaurant Open Status
module.exports.updateOpenStatus = async function(req, res) {
    try {
        const { isOpen } = req.body; // Get the isOpen value from the request body

        // Validate input
        if (typeof isOpen !== 'boolean') {
            return res.status(400).send("Please provide a valid isOpen status (true or false).");
        }

        // Find the restaurant
        const restaurant = await Restaurant.findById(req.userId);
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Update the isOpen status
        restaurant.isOpen = isOpen;
        await restaurant.save();

        res.status(200).json({
            message: `Restaurant is now ${isOpen ? 'open' : 'closed'}.`,
            isOpen: restaurant.isOpen
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating open status.");
    }
};


module.exports.viewOrderQueue = async function(req, res) {
    try {
        // Find the restaurant using the logged-in user's ID
        const restaurant = await Restaurant.findById(req.userId).populate('orderQueue');

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Return the order queue
        res.status(200).json({
            orderQueue: restaurant.orderQueue
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order queue.");
    }
};


// controllers/restaurantController.js



// Function to reject an order
module.exports.rejectOrder = async function(req, res) {
    try {
        const { orderId } = req.params; // Assume order ID is passed as a URL parameter

        // Find the restaurant and order
        const restaurant = await Restaurant.findById(req.userId);
        const order = await Order.findById(orderId).populate('customer');

        if (!restaurant || !order) {
            return res.status(404).send("Restaurant or order not found.");
        }

        // Update order status to rejected
        order.status = 'rejected';
        order.history.push(order._id); // Move order to history
        await order.save();

        // Calculate amounts
        const refundAmount = order.amount; // Total order amount
        const restaurantDeduction = refundAmount * 0.8; // 80% from restaurant
        const adminDeduction = refundAmount * 0.1; // 10% from admin
        const customerCredit = refundAmount * 0.1; // 10% credited to customer's wallet

        // Update restaurant wallet
        restaurant.wallet.balance -= restaurantDeduction;
        await restaurant.save();

        // Update customer wallet
        const customer = await Customer.findById(order.customer._id);
        customer.wallet.balance += customerCredit;
        await customer.save();
        
        const admin=await Customer.findById(ADMIN_ID);
        // Create transactions
        await Transaction.create([
            {
                amount: restaurantDeduction,
                from: { type: 'Restaurant', id: restaurant._id },
                to: { type: 'Customer', id: customer._id }, 
                isRefund: true
            },
            {
                amount: adminDeduction,
                from: { type: 'Customer', id: admin._Id },
                to: { type: 'Customer', id: customer._id },
                isRefund: true
            }
        ]);

        res.status(200).json({
            message: "Order rejected and amounts refunded.",
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rejecting the order.");
    }
};



//Controller to get order history
module.exports.getOrderHistory = async function(req, res) {
    try {
        // Find the restaurant by the user ID
        const restaurant = await Restaurant.findById(req.userId).populate('orderHistory');

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Return the order history
        res.status(200).json(restaurant.orderHistory);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order history.");
    }
};


//Controller to read the user reviews
// controllers/restaurantController.js

module.exports.getAllReviews = async function(req, res) {
    try {
        // Find the restaurant ID from the user's restaurant profile
        const restaurantId = req.userId; // Assuming req.userId is the restaurant's ID

        // Get all reviews targeting this restaurant
        const reviews = await Review.find({
            'target.restaurant': restaurantId
        }).populate('source.user', 'name') // Optionally populate the user details
          .select('reviewType rating comment createdAt likes dislikes');
     console.log(reviews)
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching reviews.");
    }
};

module.exports.getReviewsByTargetId = async (req, res) => {
    const restaurantId  = req.userId;

    // Validate targetId
    if (!restaurantId) {
    return res.status(400).json({ message: 'targetId is required.' });
    }

    try {
    // Fetch reviews from the database
    const reviews = await Review.find({ 'target.restaurant': restaurantId }).populate({
        path: 'source.customer',
        select: 'username' // Only get the username field
    });

    // If no reviews are found
    if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for the given targetId.' });
    }
    
    // Return reviews
    return res.status(200).json(reviews);
    } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ message: 'Internal server error.' });
    }
};
// module.exports.getDailyAnalytics = async function(req, res) {
//     try {
//         const restaurantId = req.userId; // Assuming req.userId is the restaurant's ID
//         const today = new Date();
//         const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//         const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

//         // Total profit for the day
//         const totalProfit = await Transaction.aggregate([
//             { $match: { 'to.restaurant': restaurantId, createdAt: { $gte: startOfDay, $lt: endOfDay } } },
//             { $group: { _id: null, total: { $sum: '$amount' } } }
//         ]);

//         // Daily average orders
//         const dailyOrders = await Order.countDocuments({
//             restaurant: restaurantId,
//             createdAt: { $gte: startOfDay, $lt: endOfDay }
//         });

//         // Daily profit
//         const dailyProfit = totalProfit.length ? totalProfit[0].total : 0;

//         // Daily average rejected orders
//         const dailyRejectedOrders = await Order.countDocuments({
//             restaurant: restaurantId,
//             status: 'rejected',
//             createdAt: { $gte: startOfDay, $lt: endOfDay }
//         });

//         // Total ratings for the day
//         const totalRatings = await Review.countDocuments({
//             'target.restaurant': restaurantId,
//             createdAt: { $gte: startOfDay, $lt: endOfDay }
//         });

//         // Constructing the analytics data
//         const analytics = {
//             totalProfit: dailyProfit,
//             dailyAverageOrders: dailyOrders,
//             dailyProfit,
//             dailyAverageRejectedOrders: dailyRejectedOrders,
//             totalRatings
//         };

//         res.status(200).json(analytics);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error fetching daily analytics.");
//     }
// };

module.exports.getDailyAndWeeklyAnalytics = async function(req, res) {
    try {
        const restaurantId = req.userId; // Assuming req.userId is the restaurant's ID
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        // Calculate the start of the week (assuming week starts from Sunday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Moves to the start of the week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7); // End of the week (next Sunday)

        // Get daily orders
        const dailyOrders = await Order.find({
            restaurant: restaurantId,
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        // Calculate daily total balance from orders
        const dailyBalance = dailyOrders.reduce((total, order) => total + order.totalAmount, 0);

        // Calculate the maximum profit from a single order for today
        const maxDailyProfit = dailyOrders.length > 0 ? Math.max(...dailyOrders.map(order => order.totalAmount)) : 0;

        // Get weekly orders
        const weeklyOrders = await Order.find({
            restaurant: restaurantId,
            createdAt: { $gte: startOfWeek, $lt: endOfWeek }
        });

        // Calculate weekly total balance from orders
        const weeklyBalance = weeklyOrders.reduce((total, order) => total + order.totalAmount, 0);

        // Constructing the analytics data
        const analytics = {
            dailyBalance: dailyBalance,
            dailyOrders: dailyOrders.length,
            maxDailyProfit: maxDailyProfit, // Maximum profit from a single order today
            weeklyBalance: weeklyBalance,
            weeklyOrders: weeklyOrders.length
        };

        res.status(200).json(analytics);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching daily and weekly analytics.");
    }
};


// Controller to get transactions related to the restaurant
module.exports.getTransactions = async function(req, res) {
    try {
        const restaurantId = req.userId; // Assuming req.userId is the restaurant's ID

        // Fetch transactions related to the restaurant
        const transactions = await Transaction.find({
            $or: [
                { 'from.id': restaurantId },
                { 'to.id': restaurantId }
            ]
        });

        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching transactions.");
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
        const validTargetTypes = [ 'DeliveryPartner', ' Customer'];
        if (!validTargetTypes.includes(targetType)) {
            return res.status(400).send("Invalid target type.");
        }

        // Check if the target exists
        let target;
        if (targetType === 'DeliveryPartner') {
            target = await DeliveryPartner.findById(targetId);
        } else if (targetType === 'Customer') {
            target = await Admin.findById(targetId);
        }

        if (!target) {
            return res.status(404).send(`${targetType} not found.`);
        }

        // Create the review
        const newReview = new Review({
            source: {
                restaurnat: req.userId, // Assuming req.userId is the ID of the user writing the review
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


// controllers/restaurantController.js


// Get Menu Item Details
module.exports.getMenuItemDetails = async function(req, res) {
    try {
        const { id } = req.params; // Get the item ID from the request parameters
        const item = await Product.findById(id);
        
        if (!item) {
            return res.status(404).send("Menu item not found.");
        }

        res.status(200).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching menu item details.");
    }
};

// Update Menu Item
module.exports.updateMenuItem = async function(req, res) {
    try {
        const { id } = req.params; // Get the item ID from the request parameters
        const { name, price, foodType} = req.body;
        // Validate input
        if (!name || !price || !foodType) {
            return res.status(400).send("Please provide all necessary fields.");
        }

        // Find the menu item by ID
        const item = await Product.findById(id);
        if (!item) {
            return res.status(404).send("Menu item not found.");
        }

        // Update item details
        item.name = name;
        item.price = price;
        item.foodType = foodType;
        await item.save();
        res.status(200).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating menu item.");
    }
};



// Fetch all orders for a specific restaurant
module.exports.getOrdersByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.userId; // Assuming req.userId contains the restaurant ID from the auth middleware

        // Find all orders related to the restaurant and populate customer email and product details
        const orders = await Order.find({ restaurant: restaurantId })
            .populate('customer', 'email name') // Populate customer email and name
            .populate('items.product'); // Populate product details in the items

        // Check if orders exist
        if (!orders || orders.length === 0) {
            return res.status(200).json([]); // Return an empty array if no orders are found
        }

        // Format the response
        const formattedOrders = orders.map(order => ({
            customerId: order.customer._id,
            customerEmail: order.customer.email,
            customerName: order.customer.name,
            items: order.items,
            totalAmount: order.totalAmount,
            createdAt: order.createdAt
        }));

        res.status(200).json(formattedOrders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching restaurant orders.");
    }
};


