const mongoose = require('mongoose');
// const {ObjectId} = require('mongodb');
// const Transaction = require('../models/transaction');
// const uniqueuser = require('mongoose-unique-validator');

const investSchema = new mongoose.Schema(
    {
        user_name:{
            type: String,
            required: true,
            maxLenth: 50,
        },
        totalinvestment:{
            type: Number,
            required: true,
            default:0,
        },
        currentvalue: {
            type: Number,
            required: true,
            default:0,
        },
        stocks:[
            {
                type: Object,
                required: true,
            }
        ],
        watchlist:[
            {
                type: String,
                required: true,
            }
        ],
        createdAt:{
            type: Date,
            required: true,
            default: Date.now(),
        },
        updatedAt:{
            type: Date,
            required: true,
            default: Date.now(),
        },
        
    }
)

// userSchema.plugin(uniqueuser);
module.exports = mongoose.model("Investment", investSchema);