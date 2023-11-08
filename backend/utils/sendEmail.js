// Creating Transporter here

// importing nodemailer module and enviroment variables
const nodemailer = require("nodemailer");
require("dotenv").config();

// Sending Conformation mail to user on its email
const sendConfirmationEmail = async (email,token) => {
    try {
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
            subject:"Confirm Your Email address.",
            text:`Please click on the following link to confirm your email address: https://CostSnap.netlify.io/verify-mail/${token}`
        };

        await transporter.sendMail(mailOptions, (error,info) => {
            if (error) {
                console.error("Error sending Email:" + error);
            }
            else {
                console.log("Email sent." + info.response);
            }
        });

        console.log("Email sent successfully.");
    } 
    catch(error) {
        console.log("Email not sent.");
        console.log(error);
    }
}

module.exports = sendConfirmationEmail;

    