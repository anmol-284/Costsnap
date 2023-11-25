// import the model
const user = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const crypto = require("crypto");
const Joi = require("joi");
let {sendConfirmationEmail} = require("../utils/sendEmail");
let changePasswordemail = require("../utils/sendEmail");
const cookieParser = require('cookie-parser');
const express = require('express');
const userOtpVerification = require("../models/userOtpVerification");
const app = express();

require("dotenv").config();

// Using Cookie parser
app.use(cookieParser());

// route handler
exports.usersignup = async(req, res) => {
    try {
        const {firstname, lastname, username, email, password} = req.body;
        console.log(req.body);
        
        if(!firstname || !lastname || !username || !email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }
        
        // finding that user is already registered or not 
        const existingUsername = await user.findOne({username:username});
        const existingEmail = await user.findOne({email:email});
        
        if (existingUsername) {
            return res.status(400).json({
                success:false,
                message:"Username not available"
            })
        }
        if (existingEmail) {
            return res.status(400).json({
                success:false,
                message:"User Already Exist."
            })
        }

        // Hashing of Password
        let hashedPswd;

        try {
            hashedPswd = await bcrypt.hash(password, 10);
        }
        catch(err) {
            console.log(err);
            return res.status(500).json(
                {
                    success: false,
                    message: "Error in Hashing Password",
                }
            )
        }

        // created a response with hashed password to post in database
        // const response = await user.create({firstname, lastname, username, email, password:hashedPswd});

        // Saved User info in Database
        const User = new user({
            firstname, 
            lastname, 
            username, 
            email, 
            password:hashedPswd
        });

        await User.save()
        .then((result) => {
            // Sending a confirmation email to the user.
            sendConfirmationEmail(result,res);
        })

        // send a json response and success flag
        res.status(201).json({
            success:true,
            // data:response,
            message: "An Email sent to your Email Please Verify."
        });
    }

    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                message: "User cannot be registered, Please try again later",
            }
        )
    }
}

exports.resendOTP = async (req,res) => {
    try  {
        let {userid, email} = req.body;

        if (!userid || !email) {
            throw Error("Empty user details are not allowed.");
        }

        else {
            // delete existing records and resend
            await userOtpVerification.deleteMany({ userid });
            sendConfirmationEmail( {_id:userid, email}, res);
        } 

    }
    catch(error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
}


// user login route
exports.userlogin = async(req, res) => {
    try {
    
        // data fetch
        const {email, password} = req.body;
        
        // validation on email and password that are they NULL or not ?
        if (!email) {
            return res.status(400).json({
                success:false,
                message:"Please fill out your Email."
            })
        }
        if (!password) {
            return res.status(400).json({
                success:false,
                message:"Please fill out your Password."
            })
        }

        // check for registered User
        let loginUser = await user.findOne({email:email}).populate().exec();
        console.log(loginUser);
        
        // if not a registered User
        if (!loginUser) {
            return res.status(401).json({
                success:false,
                message:"User is not registered. Please Sign Up first."
            })
        }

        // if email is not verified
        if (loginUser.verified === false) {
            return res.status(400).json({
                success:false,
                message:"User is not Verified, Please verify your Email First."
            })
        }

        // create a payload for jwt token
        const payload = {
            email:loginUser.email,
            id:loginUser._id,
            username:loginUser.username
        }

        // verify password & generate a JWT token
        if (await bcrypt.compare(password,loginUser.password)) {
            // password match
            let token = jwt.sign(payload, process.env.SUPER_SECRET,{expiresIn:"1h"});
            // let token = jwt.sign(payload, process.env.SUPER_SECRET);

            loginUser.token = token;
            loginUser.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            } 

            console.log(token);

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                loginUser,
                message:"User Logged in Successfully."
            })
        }
        else {
            return res.status(403).json({
                success:false,
                message:"Password is Incorrect."
            })
        }
    }

    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                message: "User cannot be logged in, Please try again later",
            }
        )
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
        success:true,
        message:"User logged out."
    })
}


exports.changePassword = async (req, res) => {
    try{
        const {username, oldpassword, newpassword, confirmpassword} = req.body;
        const loginuser = await user.findOne({username:username}).populate().exec();
        
        let oldhashedPswd;
        oldhashedPswd = await bcrypt.hash(oldpassword, 10);

        if(loginuser.password !== oldhashedPswd){
            return res.status(401).json({
                success:false,
                message:"Old Password is wrong. Please try again.",
            })
        }

        if(newpassword !== confirmpassword){
            return res.status(401).json({
                success:false,
                message:"New password and confirm password are not same."
            })
        }

        // Hashing of Password
        let hashedPswd;

        try {
            hashedPswd = await bcrypt.hash(newpassword, 10);
        }
        catch(err) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Error in Hashing Password",
                }
            )
        }
    
        await user.updateOne({username:username},{password:hashedPswd});
        changePasswordemail(loginuser.email);


        } catch(err){
            console.error(err);
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Password cannot be changed.",
            })
        }
}


exports.verify = async (req,res) => {
    
    try {
		// let userid = await user.findOne({ username: req.params.id });

        // const cookie_value = cookieParser().get(req, "token");
        // console.log(cookie_value);

        // let userid = JSON.parse(cookie_value).username;
        // console.log(userid);

        const cookie_value = req.cookie.token;

        const userid = jwt.verify(cookie_value, process.env.SUPER_SECRET);

		if (!userid) return res.status(400).json({
            success:false,
            message: "Invalid username." 
        });

		let token = await Token.findOne({
			userId: userid,
			token: req.params.token,
		});

        // Check if the token is valid or not.
		if (!token) return res.status(400).json({
            success:false,
            message: "Invalid link"
        });

		await userid.updateOne({
            verified: true 
        });

		// await token.deleteOne();

		res.status(200).json({
            success:true,
            message: "Email verified successfully." 
        });
	} 

    catch (error) {
		res.status(500).json({
            success:false,
            message: "Something went wrong while verifying your Email." 
        });
	}
}
