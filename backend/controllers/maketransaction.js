const mktransaction = require('../models/transaction');
const user = require('../models/user');

exports.makeTransaction = async(req, res) => {
    try{
        const {amount, transactionname, category, user_name} = req.body;
        const response = await mktransaction.create({amount, transactionname, category, user_name});

        const userid = await user.findOne({ username:user_name });

        console.log(userid);

        // add the transaction to user collection
        userid.transactions.push(response);
        await userid.save();

        // send a json response and success flag
        res.status(200).json(
            {
                success: true,
                data: response,
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