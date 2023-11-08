const stock = require('../models/stockmodel');
const user = require('../models/usermodel');
const investment = require('../models/investmentmodel');

exports.addstock = async(req, res) => {
    try{
        const {user_name, stockname, quantity, purchaseprice} = req.body;
        const addedstock = await stock.create({user_name, stockname, quantity, purchaseprice});


        const userid = await user.findOne({ username:user_name }).populate().exec();
        const investid = await investment.findOne({ user_name:user_name }).populate().exec();
        // const {totali, curvalue, sts, wlist} = investmentd;
        
        if(userid){
            // const data = {totali, curvalue, sts, wlist};
            userid.holdings.push(addedstock); 
            await userid.save();
            console.log(userid);
        }

        if(investid){
            investid.stocks.push(addedstock);

            // updating totalinvestment value 
            investid.totalinvestment += quantity*purchaseprice;

            // saving the stock in investmentmodel
            await investid.save();
        }else{
            console.log("Error occured while finding investment db or user in investdb");
        }

        // send a json response and success flag
        res.status(200).json(
            {
                success: true,
                data: addedstock,
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


exports.update = async(req, res) => {
    
}