const mongoose = require('mongoose');
// Ensure the casing matches exactly

// Define Restaurant Schema
const restaurantSchema = new mongoose.Schema({
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
        type: String,
        default:"restaurant"
    },

    hotelName: {
        type: String,
        default: ""
    },
    averageCost: {
        type: Number, // Changed to Number for better numerical operations
        min: 0
    },
    paymentMethods: {
        cash: {
            type: Boolean,
            default: true
        },
        cards: {
            type: Boolean,
            default: true
        },
        digitalPayments: {
            type: Boolean,
            default: true
        }
    },
    knownFor: [
        {
            type: String,
            trim: true
        }
    ],
    // More info: Available services
    moreInfo: {
        breakfast: { type: Boolean, default: false },
        takeaway: { type: Boolean, default: false },
        homeDelivery: { type: Boolean, default: false },
        valetParking: { type: Boolean, default: false },
        luxuryDining: { type: Boolean, default: false },
        tableBooking: { type: Boolean, default: false },
        brunch: { type: Boolean, default: false },
        buffet: { type: Boolean, default: false },
        indoorSeating: { type: Boolean, default: false },
        outdoorSeating: { type: Boolean, default: false }
    },
    // Restaurant type (pure veg, oriental, Indian, mixed, etc.)
    type: {
        type: String,
        enum: ['Pure Veg', 'Oriental', 'Indian', 'Mixed', 'Continental', 'Italian', 'Mexican', 'Fast Food'],
    },
    // Photos for restaurant
    photos:{
        type: [String]
    },
    // Restaurant rating (out of 5)
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    menu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    // Operating hours
    timingFrom: {
        type: String,
        trim: true
    },
    timingTo: {
        type: String,
        trim: true
    },
    // Boolean to indicate if the restaurant is open
    isOpen: {
        type: Boolean,
        default: true
    },
    // Wallet Information
    wallet: {
        balance: {
            type: Number,
            default: 0,
            min: 0
        }
    },

    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],

    orderQueue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
}, {
    timestamps: true
});

// Create Restaurant Model using Discriminator
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
restaurantSchema.index({ username: 1 });
restaurantSchema.index({ hotelName: 1 });
module.exports = Restaurant;




