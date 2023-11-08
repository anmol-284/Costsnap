const invt = require('../models/investmentmodel');
const user = require('../models/usermodel');

exports.investment = async(req, res) => {
    try{
        const {user_name, totalinvestment, currentvalue, stocks, watchlist} = req.body;
        const investmentd = await invt.create({user_name, totalinvestment, currentvalue, stocks, watchlist});
        
        

        // send a json response and success flag
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