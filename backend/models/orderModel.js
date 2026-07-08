// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        
    },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
        default: null // Initially, no delivery partner is assigned
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed','delivery_rejected'],
        default: 'pending' // Default status is pending when the order is created
    },
    totalAmount: {
        type: Number,
        required: true // Total amount of the order
    },
    refund: {
        type: Boolean,
        default: false // Track if a refund has been issued
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt
});

module.exports = mongoose.model('Order', orderSchema);
