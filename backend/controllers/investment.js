const invt = require('../models/investmentmodel');
const user = require('../models/usermodel');

exports.investment = async(req, res) => {
    try{
        const {username, totalinvestment, currentvalue, stocks, watchlist} = req.body;
        const investmentd = await invt.create({username, totalinvestment, currentvalue, stocks, watchlist});

        res.status(200).json(
            {
                success: true,
                data: investmentd,
                message: "Entry Created Successfully"
            }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server issue",
            message: err.message
        })
    }
} 


exports.getinvestment = async(req, res) => {
    try{
        const username  = req.body.username;

        const finduser = await invt.findOne({username:username}).populate().exec();
        // console.log("finduser:",finduser);

        if(!finduser){
            return res.status(401).json({
                success:false,
                message:"User not found."
            })
        }

        return res.status(200).json({
            success:true,
            data:finduser,
            message:"Investment details fetched successfully."
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server issue",
            message: err.message
        })
    }
} 