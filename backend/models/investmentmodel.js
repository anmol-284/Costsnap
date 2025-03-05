const mongoose = require('mongoose');

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

investSchema.index({username : 1, "holdings.stockname" : 1, "holdings.units" : 1, "holdings.averageprice" : 1, "holdings.amount" : 1});

module.exports = mongoose.model("Investment", investSchema);