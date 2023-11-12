const user = require("../models/usermodel");
const bcrypt = require("bcrypt");
const userOtpVerification = require("../models/userOtpVerification");

//  verify otp email
exports.verifyOTP = async(req, res) => {
    try {
        
        let {userid, otp} = req.body;

        if (!userid || !otp) {
            throw Error("Empty Otp details are not allowed");
        }
        else {
            const userOtpVerificationRecords = await userOtpVerification.find({
                userid,
            });
            if (userOtpVerificationRecords.length <= 0) {
                // no record found
                throw new Error("Account record does'nt exist or has been verified already. Please sign up or login");
            }

            else {
                // user otp record exists
                const { expiresAt } = userOtpVerificationRecords[0];
                const hashedOtp = userOtpVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    // user otp has been expired
                    await userOtpVerification.deleteMany({ userid });
                    throw new Error("Code has expired. please try again.");
                }

                else {
                    const validOTP = await bcrypt.compare(otp, hashedOtp);

                    if (!validOTP) {
                        // wrong otp entered
                        throw new Error("Invalid Code Passed. Please check your Inbox again.");
                    }

                    else {
                        // success -> both the otp got matched up
                        await user.updateOne( {_id: userid}, {verified: true});
                        userOtpVerification.deleteMany({ userid });
                        res.json({
                            status:"VERIFIED",
                            message: "User Email is verified Successfully.",
                        });
                    }
                }
            }
        }
    }  
    
    catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
}