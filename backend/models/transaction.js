const mongoose = require('mongoose');
const username = require('./username');

const transactionSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        myname: {
            type:String,
            required: true,
        },
        transtype:{
            type:String,
            required: true,
        },
        amount:{
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

module.exports = mongoose.model("transaction", transactionSchema);