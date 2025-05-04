const mongoose = require("mongoose");
// Adjust the path as necessary

// Define Delivery Partner Schema
const deliveryPartnerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        fullAddress: {
            type: String, 
            required: false
        },
        pincode: {
            type: String, 
            required: false
        },
    },
    contact: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type:String,
        default:"deliveryPartner"
    },

    license: {
        type: String,
    },
    vehicleNumber: {
        type: String,

    },
    isFree: {
        type: Boolean,
        default: false
    },
    orderQueue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order' 
        }
    ],

    deliveryHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order' 
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    wallet: {
        balance: {
            type: Number,
            default: 0,
            min: 0
        }
    }
}, {
    timestamps: true
});


// Create DeliveryPartner model using Discriminator(oop)
const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);

module.exports = DeliveryPartner;
