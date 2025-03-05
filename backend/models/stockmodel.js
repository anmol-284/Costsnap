const mongoose = require('mongoose');

const stock = new mongoose.Schema (
    {
        username: {
            type: String,
            required : true,
        },
        stockname:{
            type: String,
            required: true,
        },
        transactiontype:{
            type: String,         // Buy or Sell
            required: true,
        },
        unitprice: {
            type: Number,
            required: true,
        },
        amount: {
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

stock.index({username : 1, createdAt : -1});

module.exports = mongoose.model("Stock", stock);