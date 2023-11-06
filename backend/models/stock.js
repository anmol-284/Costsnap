const mongoose = require('mongoose');

const addinvestment = new mongoose.Schema (
    {
        user_name: {
            type: String,
            required : true,
        },
        stockname:{
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        initialprice: {
            type: String,
            required: true,
        },
        createdAt:{
            type: Date,
            required: true,
            default: Date.now(),
        },
    }
)

module.exports = mongoose.model("Investment", addinvestment);