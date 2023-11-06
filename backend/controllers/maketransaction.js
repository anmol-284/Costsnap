const mktransaction = require('../models/transaction');
const user = require('../models/username');

exports.makeTransaction = async(req, res) => {
    try{
        const {name, uname, transtype, amount} = req.body;
        const response = await mktransaction.create({name, uname, transtype, amount});
        const userid = await user.findOne({ username:uname });
        userid.transactions.push(response);
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