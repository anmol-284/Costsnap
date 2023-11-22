// const Split = require("../models/split");
const user = require("../models/usermodel");
const Group = require("../models/groupmodel");

exports.splitBill = async(req,res) => {
    try {
        const {username,grpName,expedPoint,type,myContri,initialAmt,youGet} = req.body;

        const grpid = await Group.findOne({groupName:grpName});

        const userid = await user.findOne({username:username});

        if ((!userid) || (!grpid)) {
            res.status(500).json({
                success:false,
                message:"Invalid Username or Invalid Group Name."
            })
        }
        else {
            const bill = await Split.create({username,grpName,expedPoint,type,myContri,initialAmt,youGet});

            res.status(200).json(
                {
                    success:true,
                    bill:bill,
                    message:"Splitted Bill Successfully."
                }
            );
        }
        
    }
    catch(error) {
        console.log(error);
        res.status(500).json( {
            error: "Error while Splitting.",
        })
    }
}