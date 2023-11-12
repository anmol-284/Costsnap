// Creating Transporter here

// importing nodemailer module and enviroment variables
const nodemailer = require("nodemailer");
const userOtpVerification = require("../models/userOtpVerification");
const bcrypt = require('bcrypt');
require("dotenv").config();

// Sending Conformation mail to user on its email
<<<<<<< HEAD
const sendConfirmationEmail = async (username, email,token) => {
=======
const sendConfirmationEmail = async ({_id, email}, res) => {
>>>>>>> ec5566e3aabd82c8d7b4a88a7a91842118bc9ea0
    try {

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`; 

        const transporter = nodemailer.createTransport({
            service:process.env.SERVICE,
            post:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth: {
                user:process.env.USER,
                pass:process.env.PSWD
            }
        });

        const mailOptions = {
            from:process.env.USER,
            to:email,
<<<<<<< HEAD
            subject:"Confirm Your Email address.",
            text:`Please click on the following link to confirm your email address: https://CostSnap.netlify.io/${username}/verify-mail/${token}
            otp: t7t347t`
=======
            subject:"Verify Your Email",
            html:`<p>Enter <b>${otp}</b> at CostSnap to verify your Email address and complete your Sign up process now.</p>
            <p>This code <b>expires in 1 hour </b>.</p>`,
>>>>>>> ec5566e3aabd82c8d7b4a88a7a91842118bc9ea0
        };

        // hash the Otp
        const saltRounds = 10;

        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        const newuserOtpVerification = await new userOtpVerification({
            userid: _id,
            otp:hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        // save the otp in database
        await newuserOtpVerification.save();

        await transporter.sendMail(mailOptions, (error,info) => {
            if (error) {
                console.error("Error in sending Email:" + error);
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
    }
}

module.exports = sendConfirmationEmail;

    