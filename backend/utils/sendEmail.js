// importing nodemailer module and enviroment variables
const nodemailer = require("nodemailer");
const userOtpVerification = require("../models/userOtpVerification");
const bcrypt = require('bcrypt');
require("dotenv").config();

// Creating Transporter here
const transporter = nodemailer.createTransport({
    service:process.env.SERVICE,
    post:Number(process.env.EMAIL_PORT),
    secure:Boolean(process.env.SECURE),
    auth: {
        user:process.env.USER,
        pass:process.env.PSWD
    }
});

// Sending Conformation mail to user on its email
exports.sendConfirmationEmail = async ({_id, email}, res) => {
    try {

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`; 

        const mailOptions = {
            from:process.env.USER,
            to:email,
            subject:"Verify Your Email",
            html:`<p>Enter <b>${otp}</b> at CostSnap to verify your Email address and complete your Sign up process now.</p>
            <p>This code <b>expires in 1 hour </b>.</p>`,
        };

        // hash the Otp
        const saltRounds = 10;

        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        const newuserOtpVerification = new userOtpVerification({
            userid: _id,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 5*60*1000,
        });

        // save the otp in database
        await newuserOtpVerification.save();

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error in sending Email:" + error);
                return res.status(401).json({
                    success:false,
                    message:"Error in sending email."
                })
            }
            else {
                console.log("Email sent." + info.response);
            }
        });

        console.log("Email sent successfully.");
    } 
    catch(error) {
        console.log("Something went wrong while sending mail.");
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending email."
        })
    }
}

exports.changePasswordemail = async ({email}, res) => {
    try{
        const mailOptions = {
            from:process.env.USER,
            to:email,
            subject:"Password Changed",
            html:`<p>Your password has been changed.</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error in sending Email:" + error);
                return res.status(401).json({
                    success:false,
                    message:"Error in sending email."
                })
            }
            else {
                console.log("Email sent." + info.response);
            }
        });

        console.log("Password changed email sent successfully.");

    } catch(error) {
        console.log("Something went wrong while sending mail.");
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending email."
        })
    }
}


    