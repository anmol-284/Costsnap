const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema(
    {
        user_id:{
            type:String,
            required: true,
        },
        balance:{
            type: Int16Array,
            required: true,
        },
        income:{
            type:Int16Array,
            required: true,
        },
        expense:{
            type: Int16Array,
            required: true,
        },
        savings:{
            type:Int16Array,
            required: true,
        },
    }
)

module.exports = mongoose.model("dashboard", dashboardSchema);