const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true,
        },
        groupMembers: [
            {
                type: String,    
            }
        ],
        settlement: [
            {
                from: {
                    type: String,
                },
                to: {
                    type: String,
                },
                amount: {
                    type: Number,
                    default: 0,
                },
            }
        ],
        bills: [                  // recent 10 bills
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bills'
            }
        ],
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    }
)

module.exports = mongoose.model("Group", GroupSchema);