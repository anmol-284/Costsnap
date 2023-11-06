const invt = require('../models/stock');
const user = require('../models/user');

exports.invest = async(req, res) => {
    try{
        const {user_name, stockname, quantity, initialprice} = req.body;
        const investmentd = await invt.create({user_name, stockname, quantity, initialprice});

        // adding to the array
        const userid = await user.findOne({ username: user_name });
        userid.investments.push(investmentd);
        await userid.save();
        console.log(userid);

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