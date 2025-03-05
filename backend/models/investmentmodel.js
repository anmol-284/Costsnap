const mongoose = require('mongoose');
// const {ObjectId} = require('mongodb');
// const Transaction = require('../models/transaction');
// const uniqueuser = require('mongoose-unique-validator');

const investSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
        },
        totalinvestment:{
            type: Number,
            required: true,
            default:0,
        },
        holdings:[
            {
                stockname:{
                    type:String,
                    required:true,
                },
                units:{
                    type:Number,
                    required:true,
                    default:0,
                },
                averageprice:{
                    type:Number,
                    required: true,
                    default:0,
                },
                amount:{
                    type:Number,
                    required:true,
                    default:0,
                },
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

investSchema.index({username : 1});

// userSchema.plugin(uniqueuser);
module.exports = mongoose.model("Investment", investSchema);