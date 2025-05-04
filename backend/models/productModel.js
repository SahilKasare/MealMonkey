const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    image:{
        type: String
    },
   name: {
        type: String,
        
    },
    price: {
        type: Number,
        
    },
    foodType: {
        type: String,
        
    },
    Discount:{
        type: Number
    },
})
productSchema.index({name : 1});
productSchema.index({ foodType: 1});
module.exports = mongoose.model("Product", productSchema)