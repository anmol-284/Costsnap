const mongoose = require('mongoose');

const addstock = new mongoose.Schema (
    {
        username: {
            type: String,
            required : true,
        },
        stockname:{
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        purchaseprice: {
            type: Number,
            required: true,
        },
        createdAt:{
            type: Date,
            required: true,
            default: Date.now(),
        },
    }
)

module.exports = mongoose.model("Stock", addstock);