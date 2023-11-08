// import the model
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const crypto = require("crypto");
const Joi = require("joi");
let sendConfirmationEmail = require("../utils/sendEmail");

require("dotenv").config();

// route handler
exports.usersignup = async(req, res) => {
    try {
        const {firstname, lastname, username, email, password} = req.body;

        // finding that user is already registered or not 
        const existingEmail = await user.findOne({email});
        const existingUsername = await user.findOne({username});
        
        if (existingUsername || existingEmail) {
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
            return res.status(500).json(
                {
                    success: false,
                    message: "Error in Hashing Password",
                }
            )
        }

        // // // created a response with hashed password to post in database
        // const response = await user.create({firstname, lastname, username, email, password:hashedPswd});

        // Generating a unique Token for the User.
        const token = crypto.randomBytes(32).toString('hex');

        await Token.create({
            userId: username,
			token: token,
        });

        // Saved the user 
        const User = await new user({
            firstname, 
            lastname, 
            username, 
            email, 
            password:hashedPswd
        });

        await User.save();

        // Sending a confirmation email to the user.
        sendConfirmationEmail(email,token);

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

exports.verify = async (req,res) => {
    
    try {
		let userid = await user.findOne({ username: req.params.id });

		if (!userid) return res.status(400).json({
            success:false,
            message: "Invalid username." 
        });

		const token = await Token.findOne({
			userId: req.params.id,
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

		await token.deleteOne();

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

        const verified = await user.findOne({email:email});

        if (!verified) {
            return res.status(400).json({
                success:false,
                message:"User is not Verified."
            })
        }

        // check for registered User
        let loginUser = await user.findOne({email});

        // if not a registered User
        if (!loginUser) {
            return res.status(401).json({
                success:false,
                message:"User is not registered. Please Sign Up first."
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

            loginUser.token = token;
            loginUser.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*26*60*60*1000),
                httpOnly:true,
            } 

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