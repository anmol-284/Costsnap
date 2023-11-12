const grpBill = require("../models/groupbillsmodel");

exports.groupBills = async(req,res) => {
    try {
        
    }
    catch(error) {
        console.log(error);
        res.status(500).json( {
            error: "Error while Creating grpBill.",
        })
    }
}