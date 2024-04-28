const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cart: {
        type: [
            {
                dish_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                dish_name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
            }
        ],
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "ready"] 
    },
    created_on: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('order', orderSchema)