const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Review Schema
const reviewSchema = new Schema({
    // Source: who gives the review (User, Restaurant, or Delivery Partner)
    source: {
       customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false },
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: false },
        deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner', required: false }
    },
    // Target: the entity being reviewed (User, Restaurant, Delivery Partner, or Admin)
    target: {
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: false },
        deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner', required: false },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false }
    },
    // Review Type: general review categories (service, delivery, food quality, etc.)
    reviewType: {
        type: String,
      
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0 // Count of likes
    },
    dislikes: {
        type: Number,
        default: 0 // Count of dislikes
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Review model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
