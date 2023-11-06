const mongoose = require('mongoose');
const username = require('./username');

const transactionSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref:'username',
        },
        name:{
            type:String,
            required: true,
        },
        transtype:{
            type:String,
            required: true,
        },
        amount:{
            type: Int16Array,
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