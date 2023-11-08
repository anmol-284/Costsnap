const mongoose = require('mongoose');

const SplitSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required:true,
        },
        grpName: {
            type: String,
            required: true,
        },
        expedPoint: {
            type:String,
            required:true,
        },
        type: {
            type: String,
            required: true,
        },
        myContri: {
            type: Number,
            required: true,
        },
        youGet: {
            type: Number,
            required:true,
        },
        initialAmt: {
            type: Number,
            required: true,
        },
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

module.exports = mongoose.model("Split", SplitSchema);