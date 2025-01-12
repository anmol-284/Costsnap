const user = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {sendConfirmationEmail} = require("../utils/sendEmail");
const changePasswordemail = require("../utils/sendEmail");
const cookieParser = require('cookie-parser');
const express = require('express');
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

        const verificationToken = crypto.randomBytes(16).toString('hex');

        // Save User info in Database
        const User = new user({
            firstname, 
            lastname, 
            username, 
            email, 
            password:hashedPswd,
            verificationToken
        });

        await User.save().then((result) => {
            sendConfirmationEmail(result,res);
        })
        
        res.status(200).json({
            success:true,
            // data:response,
            message: "An Email has been sent. Please Verify."
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
            let token = jwt.sign(payload, process.env.SUPER_SECRET,{expiresIn:"2h"});

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