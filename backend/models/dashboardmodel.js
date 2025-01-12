const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
        },
        balance:{
            type: Number,
            required: true,
        },
        income:{
            type: Number,
            required: true,
        },
        expense:{
            type: Number,
            required: true,
            default: 0,
        }
    }
)

module.exports = mongoose.model("Dashboard", dashboardSchema);