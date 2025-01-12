// importing nodemailer module and enviroment variables
const nodemailer = require("nodemailer");
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
exports.sendConfirmationEmail = async ({email, verificationToken}, res) => {
    try {
        const verificationLink = `${process.env.BASE_URL}/verifyemail?vtoken=${verificationToken}`;
        const mailOptions = {
            from:process.env.USER,
            to:email,
            subject:"Verify Your Email",
            html:`<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
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


    