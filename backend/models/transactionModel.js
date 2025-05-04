// models/transactionModel.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the user making the payment (Customer, etc.)
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Reference to the recipient (Admin, Restaurant, DeliveryPartner, etc.)
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isRefund: {
        type: Boolean,
        default: false // Indicates if the transaction is a refund
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
