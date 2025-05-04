const mongoose = require("mongoose");
const baseUser = require('./baseUserModel'); // Adjust the path as necessary

// Define Admin Schema
const adminSchema = new mongoose.Schema({
    permissions: {
        type: [String], // Array of strings to specify different admin permissions
        default: ['manage_users', 'view_reports', 'manage_orders', 'manage_restaurants']
    },
    managedRCustomers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer' // Reference to the Customer model
        }
    ],
    managedRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant' // Reference to the Restaurant model
        }
    ],
    managedDeliveryPartners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DeliveryPartner' // Reference to the DeliveryPartner model
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {
    timestamps: true
});

// Create Admin model using Discriminator(oop)
const Admin = baseUser.discriminator('Admin', adminSchema);

module.exports = Admin;
