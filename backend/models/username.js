const mongoose = require('mongoose');
const uniqueuser = require('mongoose-unique-validator');

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
        username:{
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
        password:{
            type: String,
            required: true,
            minLenth: 8,
        },
    }
)

userSchema.plugin(uniqueuser);
module.exports = mongoose.model("userSchema", userSchema);