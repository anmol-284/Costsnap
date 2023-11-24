const mongoose = require('mongoose');
const Bills = require('../models/groupbillsmodel');

const GroupSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true,
        },
        grpMembers: [
            
            {
                username:{
                    type:String,
                },
                settlement:[
                    {
                        username:{
                            type:String,
                        },
                        share:{
                            type:Number,
                            default:0,
                        },
                        smartsettlement:{
                            type:Number,
                            default:0,
                        },
                    }
                ]

            }
            
        ],
        // bills:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Bills'
        // }
        // ],
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

module.exports = mongoose.model("Group", GroupSchema);