const mongoose = require('mongoose');

const grpBillSchema = new mongoose.Schema(
    {
        grpName: {
            type: String,
            required: true,
        },
        totalInitialExp: {
            type: Number,
            required: true,
        },
        expPoint: {
            type:String,
            required:true,
        },
        exptype: {
            type: String,
            required: true,
        },
        username: [{
            type: String,
            required:true,
        }],
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

module.exports = mongoose.model("grpBill", grpBillSchema);