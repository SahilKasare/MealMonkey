const customer = require("../models/customerModel");
const restaurant = require("../models/restaurantModel");
const deliveryPartner = require("../models/deliveryPartnerModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcrypt");
class CRUD{
    getCustomers = async function(req, res){
        try{
            const users = await customer.find({role: "customer"})
            if(users.length === 0){
                return {message: "No Users Found for this role"}
            }
            return res.status(200).json(users);
        }catch(err){
            throw new Error(err)
        }
    }
    getRestaurants = async function(req, res){
        try{
            const users = await restaurant.find({role: "restaurant"})

            if(users.length === 0){
                return {message: "No Users Found for this role"}
            }
            return res.status(200).json(users);
        }catch(err){
            throw new Error(err)
        }
    }

    getDailyAndWeeklyAnalytics = async function(req, res) {
        try {
            const restaurantId = req.params.restaurantId; // Assuming restaurantId is passed as a URL parameter
            const restaurants = await restaurant.findById(restaurantId);
    
            if (!restaurants) {
                return res.status(404).send("Restaurant not found.");
            }
    
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
            console.log(restaurantId)
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
                dailyBalance: dailyBalance * 0.1,
                dailyOrders: dailyOrders.length,
                maxDailyProfit: maxDailyProfit * 0.1, // Maximum profit from a single order today
                weeklyBalance: weeklyBalance * 0.1,
                weeklyOrders: weeklyOrders.length,
                restaurantDetails: {
                    image: restaurants.photos[0] || '',
                    name: restaurants.hotelName || 'N/A',
                    address: restaurants.address.fullAddress || 'N/A',
                    email: restaurants.email || 'N/A',
                    contact: restaurants.contact || 'N/A',
                    pincode: restaurants.address.pincode || 'N/A',
                }
            };
    
            res.status(200).json(analytics);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error fetching admin analytics.");
        }
    };


    getDeliveryPartner = async function(req, res){
        try{
            const users = await deliveryPartner.find({role: "deliveryPartner"})

            if(users.length === 0){
                return {message: "No Users Found for this role"}
            }
            return res.status(200).json(users);
        }catch(err){
            throw new Error(err)
        }
    }

    addCustomer = async function(req, res){
        try{

            let { username, email, password, contact, fullAdress, pincode } = req.body
            const user = await customer.findOne({email: email})

            if(user){
                return res.status(400).send("User already exists")
            }
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
                    // Create new user
                    let newUser = new customer({
                    username: username,
                    email: email,
                    password: hash,
                    role: "customer",
                    contact: contact,
                    address: {
                        fullAddress: fullAdress,
                        pincode: pincode
                    }
                    });
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true, message: "User registered successfully", user: savedUser });
                });
            });

        }catch(err){
            throw new Error(err)
        }
    }

    addRestaurant = async function(req, res){
        try{
            let { username, email, password, contact, fullAdress, pincode, hotelName, averageCost, knownFor, rating } = req.body    
            const user = await restaurant.findOne({email: email})

            if(user){
                return res.status(400).send("User already exists")
            }
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
                    // Create new user  
                    let newUser = new restaurant({
                    username: username, 
                    email: email,
                    password: hash,
                    role: "restaurant",
                    contact: contact,
                    address: {
                        fullAddress: fullAdress,
                        pincode: pincode
                    },
                    hotelName: hotelName,
                    averageCost: averageCost,
                    knownFor: knownFor,
                    rating: rating
                    });
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true, message: "User registered successfully", user: savedUser });
                });
            });
        }catch(err){
            throw new Error(err)
        }
    }

    addDeliveryPartner = async function(req, res){
        try{
            let { username, email, password, contact, fullAdress, pincode, license, vehicleNumber } = req.body
            const user = await deliveryPartner.findOne({email: email})

            if(user){
                return res.status(400).send("User already exists")
            }
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
                    // Create new user
                    let newUser = new deliveryPartner({ 
                    username: username,
                    email: email,
                    password: hash,
                    role: "deliveryPartner",
                    contact: contact,
                    address: {
                        fullAddress: fullAdress,
                        pincode: pincode
                    },
                    license: license,
                    vehicleNumber: vehicleNumber
                    });
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true, message: "User registered successfully", user: savedUser });
                });
            });
        }catch(err){
            throw new Error(err)
        }
    }   

    addAdmin = async function(req, res){
        try{
            let { username, email, password, contact, fullAdress, pincode } = req.body
            const user = await customer.findOne({email: email})

            if(user){
                return res.status(400).send("User already exists")
            }
            // Hash the password        
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
                    // Create new user
                    let newUser = new customer({   
                    username: username,
                    email: email,
                    password: hash,
                    role: "admin",
                    contact: contact,
                    address: {
                        fullAddress: fullAdress,
                        pincode: pincode
                    },
                    isAdmin: true
                    });
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true, message: "User registered successfully", user: savedUser });
                });
            });
        }catch(err){
            throw new Error(err)
        }
    }


    getUser = async function(req, res){
        try{

            let { email } = req.body
            let user = await customer.findOne({ email: email }) ||
                   await deliveryPartner.findOne({ email: email }) ||
                   await restaurant.findOne({ email: email });

             // If no user is found
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Extract user data based on the role
            let userData = {
                username: user.username,
                email: user.email,
                address: user.address,
                contact: user.contact,
                role: user.role
            };

            if (user.role === 'deliveryPartner') {
                userData.license = user.license;
                userData.vehicleNumber = user.vehicleNumber;
            } else if (user.role === 'restaurant') {
                userData.hotelName = user.hotelName;
                userData.averageCost = user.averageCost;
                userData.knownFor = user.knownFor;
                userData.type = user.type;
                userData.rating = user.rating;
            }

            // Return the user data based on the role
            return res.status(200).json(userData);
        }catch(err){
            throw new Error(err)
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { email } = req.body;
    
            // Attempt to delete from each model
            const deletedCustomer = await customer.findOneAndDelete({ email: email });
            const deletedRestaurant = await restaurant.findOneAndDelete({ email: email });
            const deletedDeliveryPartner = await deliveryPartner.findOneAndDelete({ email: email });
            console.log(deletedCustomer)
            // Check if any deletion was successful
            if (deletedCustomer || deletedRestaurant || deletedDeliveryPartner) {
                return res.status(200).json({ message: "User deleted successfully" });
            }
    
            return res.status(404).json({ message: "User not found" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    // changeUserRole = async (req, res) => {
    //     const { userEmail, newRole } = req.body;
      
    //     try {
    //       // Find the user in all schemas in parallel
    //       const [foundCustomer, foundRestaurant, foundDeliveryPartner] = await Promise.all([
    //         customer.findOne({ email: userEmail }),
    //         restaurant.findOne({ email: userEmail }),
    //         deliveryPartner.findOne({ email: userEmail }),
    //       ]);
    //     // const foundCustomer = await customer.findOne({ email: userEmail });
    //     // const foundRestaurant = await restaurant.findOne({ email: userEmail });
    //     // const foundDeliveryPartner = await deliveryPartner.findOne({ email: userEmail });
      
    //       let existingUser = foundCustomer || foundRestaurant || foundDeliveryPartner;
    //       let currentModel;
    //       console.log(existingUser)
    //       // Determine which model the user belongs to
    //       if (foundCustomer) {
    //         currentModel = customer;
    //       } else if (foundRestaurant) {
    //         currentModel = restaurant;
    //       } else if (foundDeliveryPartner) {
    //         currentModel = deliveryPartner;
    //       }
      
    //       // If user is found, proceed to delete and create new user
    //       if (existingUser) {
    //         // Prepare user data
    //         const userData = {
    //           name: existingUser.name,
    //           email: existingUser.email,
    //           address: existingUser.address,
    //           contact: existingUser.contact,
    //           role: newRole,
    //         };
      
    //         // Delete the user from the old schema
    //         await currentModel.deleteOne({ email: userEmail });
      
    //         // Create a new user in the new schema
    //         let newUser;
    //         if (newRole === 'customer') {
    //           newUser = new customer(userData);
    //         } else if (newRole === 'restaurant') {
    //           newUser = new restaurant(userData);
    //         } else if (newRole === 'deliveryPartner') {
    //           newUser = new deliveryPartner(userData);
    //         } else if(newRole === 'admin') {
    //             newUser = new customer({ ...userData, isAdmin: true });
    //         }else {
    //           return res.status(400).json({ success: false, message: 'Invalid role' });
    //         }
      
    //         await newUser.save();
      
    //         return res.status(200).json({ success: true, user: newUser });
    //       } else {
    //         return res.status(404).json({ success: false, message: 'User not found in any schema' });
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       return res.status(500).json({ success: false, message: error.message });
    //     }
    //   };
      
    
    // getAllOrders = async function(model){
    //     try{
            
    //     }catch(err){
    //         throw new Error(err)
    //     }
    // }
    changeUserRole = async (req, res) => {
        const { userEmail, newRole } = req.body; // Ensure this matches with your front end
    
        try {
            // Find the user in all schemas in parallel
            const [foundCustomer, foundRestaurant, foundDeliveryPartner] = await Promise.all([
                customer.findOne({ email: userEmail }),
                restaurant.findOne({ email: userEmail }),
                deliveryPartner.findOne({ email: userEmail }),
            ]);
    
            let existingUser = foundCustomer || foundRestaurant || foundDeliveryPartner;
            let currentModel;
            console.log(existingUser)
            // Determine which model the user belongs to
            if (foundCustomer) {
                currentModel = customer;
            } else if (foundRestaurant) {
                currentModel = restaurant;
            } else if (foundDeliveryPartner) {
                currentModel = deliveryPartner;
            }
    
            // If user is found, proceed to delete and create new user
            if (existingUser) {
                // Prepare user data
                const userData = {
                    name: existingUser.name,
                    email: existingUser.email,
                    address: existingUser.address,
                    contact: existingUser.contact,
                    role: newRole,
                };
                
                // Create a new user in the new schema
                let newUser;
                if (newRole === 'customer') {
                    newUser = new customer(userData);
                } else if (newRole === 'restaurant') {
                    newUser = new restaurant(userData);
                } else if (newRole === 'deliveryPartner') {
                    newUser = new deliveryPartner(userData);
                } else if (newRole === 'admin') {
                    newUser = new customer(userData);
                } else {
                    return res.status(400).json({ success: false, message: 'Invalid role' });
                }
                
                // Delete the user from the old schema
                await currentModel.deleteOne({ email: userEmail });
    
    
                // Try saving the new user and catch any errors
                try {
                    await newUser.save();
                } catch (saveError) {
                    console.error("Error saving new user:", saveError);
                    return res.status(500).json({ success: false, message: "Failed to create new user." });
                }
    
                return res.status(200).json({ success: true, user: newUser });
            } else {
                return res.status(404).json({ success: false, message: 'User not found in any schema' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    };      
}


module.exports = new CRUD()


//get all customers
// get all managers
// add customer
// add admin
// add manager
// delete customer
// delete admin
// delete manager
//chnage role
//get user with id / email 