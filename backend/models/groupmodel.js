const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true,
        },
        grpMembers: [{
            type:String,
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

module.exports = mongoose.model("Group", GroupSchema);