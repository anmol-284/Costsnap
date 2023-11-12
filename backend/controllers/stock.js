const stock = require('../models/stockmodel');
const user = require('../models/usermodel');
const investment = require('../models/investmentmodel');

exports.addstock = async(req, res) => {
    try{
        const {username, stockname, quantity, purchaseprice} = req.body;
        // const addedstock = await stock.create({user_name, stockname, quantity, purchaseprice});

        const addedstock = {stockname, quantity, purchaseprice, Date};
        
        const investid = await investment.findOne({ username:username }).populate().exec();
        

        if(investid){
            investid.stocks.push(addedstock);

            
            investid.totalinvestment += quantity*purchaseprice;            // updating totalinvestment value 

            
            await investid.save();       // saving the stock in investmentmodel
        }else{
            console.log("Error occured while finding investment db or user in investdb");
        }

       
        res.status(200).json(             // send a json response and success flag
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