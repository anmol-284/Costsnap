const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const Transaction = require('../models/transaction');
// const uniqueuser = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true,
            maxLenth: 50,
        },
        lastname:{
            type: String,
            required: true,
            maxLenth: 50,
        },
        username: {
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
        },
        email:{
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
        },
        token: {
            type:String
        },
        password:{
            type: String,
            required: true,
            minLenth: 8,
        },
        verified: {
            type:Boolean,
            default:false
        },
        createdAt:{
            type: Date,
            required: true,
            default: Date.now(),
        },
        transactions:[
            // {
            //     type: mongoose.Types.ObjectId,
            //     required: true,
            //     ref: 'Transaction',

            // }
            [
                {
                    
                        type: mongoose.Types.ObjectId,
                        required: true,
                        ref: 'Transaction',
                    
                },
                {
                    mytrnas:{
                        // type:String,
                        // required:true,
                        // "tans1":"10",
                        type: mongoose.Schema.Types.String,
                        required:true,
                        ref:'Transaction.amount'
                    }
                }
            ]
        ],
        investments:[
            {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Investment',
            }
        ],
        groups:[
            {
                
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Group',
                
                mycontribution:{
                    type: String,
                    required: true,
                },
            }
        ]
    }
)

// userSchema.plugin(uniqueuser);
module.exports = mongoose.model("User", userSchema);