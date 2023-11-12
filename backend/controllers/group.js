const Group = require("../models/groupmodel");
const user = require("../models/usermodel");

let validUsers = [];

exports.createGroup = async(req,res) => {
    try {
        let groupName = req.body.groupName;

        let grpMembers = req.body.grpMembers;

        for (const grpMember of grpMembers) {
            const userid = await user.findOne({username:grpMember});

            if (userid) {
                validUsers.push(grpMember);
            }
        }

        grpMembers = validUsers;

        const group = await Group.create({groupName,grpMembers});

        grpMembers = [];

        res.status(200).json(
            {
                success:true,
                group:group,
                message:"Group Created Successfully."
            }
        );
    }
    catch(error) {
        console.log(error);
        res.status(500).json( {
            error: "Error while Creating Group.",
        })
    }
}