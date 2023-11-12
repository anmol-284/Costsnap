const mongoose = require('mongoose');

const userOtpVerificationSchema = new mongoose.Schema(
    {
        userid:{
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
        },
        expiresAt: {
            type: Date,
        }
    }
)

module.exports = mongoose.model("userOtpVerification", userOtpVerificationSchema);