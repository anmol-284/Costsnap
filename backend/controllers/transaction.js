const transaction = require('../models/transactionmodel');
const user = require('../models/usermodel');
const dashboard = require('../models/dashboardmodel');

exports.makeTransaction = async(req, res) => {
    try{
        const {transactionname, transactiontype, amount, category} = req.body;
        const username = req.body.username;
        
        const createdtransaction = await transaction.create({ username, transactionname, transactiontype, amount, category});

        const dashboardid =  await dashboard.findOne({ username:username }).populate().exec();

        if(dashboardid) {

            if(transactiontype === "Spend"){
                dashboardid.expense += amount;
                dashboardid.balance -= amount;
            }else if(transactiontype === "Income"){
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

        const alltransactions =  await transaction.find({ username:username }).sort({createdAt:-1}).populate().exec();

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
            return res.status(200).json({
                success:true,
                message:"Recent transactions fetched successfully."
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Recent transactions cannot be fetched."
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

exports.updateTransaction = async (req, res) => {            // expenses to be updated
    try{

        const {id} = req.params;
        const {transactionname, transactiontype, category, amount} = req.body;

        const updatetransaction = await transaction.findByIdAndUpdate(id,{transactionname, transactiontype, category, amount}, {new: true});

        if(!updatetransaction){
            return res.status(401).json({
                success:false,
                message:"Transaction not found."
            })
        }

        return res.status(200).json({
            success:true,
            data:updatetransaction,
            message:"Transaction updated successfully."
        })



    }catch(err){
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


exports.deleteTransaction = async (req, res) => {
    try{

        const deletetransaction = await transaction.findByIdAndDelete(req.params.id);

        const dashboardid =  await dashboard.findOne({ username:username }).populate().exec();

        if(deletetransaction.transactiontype === "Spend"){
            dashboardid.expense -= amount;
            dashboardid.balance += amount;
        }else if(deletetransaction.transactiontype === "Income"){
            dashboardid.income -= amount;
            dashboardid.balance -= amount;
        }else {
            console.log("Transaction type INvalid");
        }

        await dashboardid.save();

        if(!deletetransaction){
            return res.status(401).json({
                success:false,
                message:"Transaction not found."
            })
        }

        return res.status(200).json({
            success:true,
            data:deletetransaction,
            message:"Transaction deleted successfully."
        })

    }catch(err){
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
