// Importing jwt 
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try {
        // extracting jwt token using two ways
        const token = req.body.token || req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Your Token is Missing. Please Try Again."
            });
        }

        // Verifying Token
        try {
            const decode = jwt.verify(token, process.env.SUPER_SECRET);
            console.log(decode);

            req.body.username = decode.username;
            console.log(req.body);
        }
        catch(error) {
            return res.status(401).json({
                success:false,
                message:"Token is InValid."
            });
        }
        next();               // used to move to next middleware
    }
    catch(error) {
        res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the token."
        })
    }
}