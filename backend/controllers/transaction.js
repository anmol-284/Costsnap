const transaction = require('../models/transactionmodel');
const user = require('../models/usermodel');
const dashboard = require('../models/dashboardmodel');

exports.makeTransaction = async(req, res) => {
    try{
        const {transactionname, transactiontype, amount, category} = req.body;
        const username = req.body.username;
        const createdtransaction = await transaction.create({ username, transactionname, transactiontype, amount, category});

        const dashboardid =  await dashboard.findOne({ username:username }).populate().exec();

        if(dashboardid){

            if(type === "Spend"){
                dashboardid.expense += amount;
                dashboardid.balance -= amount;
            }else if(type === "Income"){
                dashboardid.income += amount;
                dashboardid.balance += amount;
            }else {
                console.log("Transaction type InValid");
            }
            await dashboardid.save();
        }

        // send a json response and success flag
        res.status(200).json(
            {
                success: true,
                data: createdtransaction,
                message: "Entry Created Successfully"
            }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}


exports.getallTransaction = async(req, res) => {
    try{
        const username = req.body.username;

        const alltransactions =  await transaction.find({ username:username }).populate().exec();

        // send a json response and success flag
        res.status(200).json(
            {
                success: true,
                data: alltransactions,
                message: "All transactions fetched successfully."
            }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}

exports.recentTransactions = async (req, res) => {
    try{
        const username = req.body.username;
        const finduser = await investment.find({username:username}).sort({createdAt:-1}).limit(10).populate().exec();
        
        if(finduser){

        }else{
            return res.status(401).json({
                
            })
        }

    } catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server issue",
                message: err.message
            }
        )
    }
}