const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
        },
        transactionname:{
            type:String,
            required: true,
        },
        transactiontype:{      // Expense or Income
            type: String,   
            required: true,
        },
        category:{
            type:String,
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

transactionSchema.index({username : 1, createdAt : -1, category : 1, transactiontype : 1});

module.exports = mongoose.model("Transaction", transactionSchema);