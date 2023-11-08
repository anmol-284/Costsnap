const transaction = require('../models/transactionmodel');
const user = require('../models/usermodel');
const dashboard = require('../models/dashboardmodel');

exports.makeTransaction = async(req, res) => {
    try{
        const { user_name, transactionname, transactiontype, amount, category} = req.body;
        const createdtransaction = await transaction.create({ user_name, transactionname, transactiontype, amount, category});

        const userid = await user.findOne({ username:user_name }).populate().exec();
        const dashboardid =  await dashboard.findOne({ username:user_name }).populate().exec();

        if(userid){
            userid.transactions.push(createdtransaction);
            await userid.save();

            if(type === "Spend"){
                dashboardid.expense += amount;
                dashboardid.balance -= amount;
            }else if(type === "Income"){
                dashboardid.income += amount;
                dashboardid.balance += amount;
            }else {
                console.log("Transaction type INvalid");
            }

            await dashboardid.save();
            
            console.log(userid);
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