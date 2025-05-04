const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base User Schema
const baseUserSchema = new Schema({
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
        enum: ['customer', 'restaurant', 'deliveryPartner', 'admin'], // Defining roles
        required: true
    }
}, { 
    timestamps: true, 
    discriminatorKey: 'role' 
});

// Create Base User model
const BaseUser = mongoose.model('BaseUser', baseUserSchema);

module.exports = BaseUser;
