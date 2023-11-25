const mongoose = require('mongoose');

const grpBillSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true,
        },
        billname: {
            type:String,
            required:true,
        },
        totalExpenditure: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        paidby:{
            type:String,
            required: true,
        },
        share: [{
            username:{
                type:String,
                required: true,
            },
            shareamount:{
                type:Number,
                required:true,
            },
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

module.exports = mongoose.model("groupBill", grpBillSchema);