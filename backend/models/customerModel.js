const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
        enum: ['customer', 'admin'],
        default:"customer"
    },

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            default: []
        }
    ],
    savedAddresses:[
        {
          fullAddress:{
              type:String,
          },
          pincode:{
              type:String
          }
        }
    ],  
    favoriteRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            default: []
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    wallet: {
        balance: {
            type: Number,
            default: 0,
            min: 0,
        }
    },

    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product' // Reference to the Product model
            },
            quantity: {
                type: Number,
                default: 1, // Default quantity
                min: 1 // Minimum quantity
            }
        }
    ]

}, {
    timestamps: true
});

// Create Customer Model using Discriminator(oop)
const Customer =mongoose.model('Customer', customerSchema);

module.exports = Customer;
