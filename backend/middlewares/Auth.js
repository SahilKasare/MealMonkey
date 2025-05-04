const customer = require("../models/customerModel");
const restaurant = require("../models/restaurantModel");
const deliveryPartner = require("../models/deliveryPartnerModel");
class Auth{
    async authorizeCustomer(req, res, next) {
        try{
            const user = await customer.findById(req.userId)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.role === "customer"){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }

    async authorizeManager(req, res, next) {
        try{
            const user = await restaurant.findById(req.userId)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.role === "restaurant"){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }

    async authorizeDeliveryPartner(req, res, next) {
        try{
            const user = await deliveryPartner.findById(req.userId)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.role === "deliveryPartner"){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }

    async authorizeAdmin(req, res, next) {
        try{
            const user = await customer.findById(req.userId)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.isAdmin===true){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }
    
}


module.exports = new Auth();