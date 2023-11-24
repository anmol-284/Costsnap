const Group = require("../models/groupmodel");
const groupBill = require("../models/groupbillsmodel");
const user = require("../models/usermodel");

let validUsers = [];

exports.createGroup = async (req, res) => {
    try {
        let groupName = req.body.groupName;

        let grpMembers = req.body.grpMembers;

        // for (const grpMember of grpMembers) {
        //     const userid = await user.findOne({username:grpMember});

        //     if (userid) {
        //         validUsers.push(grpMember);
        //     }
        // }

        validUsers = grpMembers;

        // grpMembers = validUsers;
        let splits = [];
        for (let i = 0; i < validUsers.length; i++) {
            let username;
            let settlement = [];
            for (let j = 0; j < validUsers.length; j++) {
                username = validUsers[j];
                settlement.push(username);

            }
            username = validUsers[i];
            splits.push([username, settlement]);
        }

        //converting the data into js array
        grpMembers = splits.map(user => {
            return {
                username: user[0],
                settlement: user[1].map(username => ({ username })),
            };
        });


        const group = await Group.create({ groupName, grpMembers });

        grpMembers = [];

        res.status(200).json(
            {
                success: true,
                group: group,
                message: "Group Created Successfully."
            }
        );
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error while Creating Group.",
        })
    }
}

exports.addusers = async (req, res) => {
    try {
        let groupName = req.body.groupName;
        let addusers = req.body.addusers;

        let userobj = addusers.map(user => {
            return {
                username: user,
            };
        });

        const grp = await Group.findOne({ groupName: groupName }).populate().exec();

        for (let i = 0; i < grp.grpMembers.length; i++) {
            for (let j = 0; j < userobj.length; j++) {
                grp.grpMembers[i].settlement.push(userobj[j]);
            }
        }

        for (let i = 0; i < userobj.length; i++) {
            grp.grpMembers.push(userobj[i]);
        }

        for (let i = grp.grpMembers.length - userobj.length; i < grp.grpMembers.length; i++) {
            for (let j = 0; j < grp.grpMembers.length; j++) {

                grp.grpMembers[i].settlement.push(grp.grpMembers[j]);

            }
        }

        await grp.save();

        return res.status(200).json({
            success: true,
            data: grp,
            message: "Users have been added."
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error while adding users to Group.",
        })
    }
}

exports.addbill = async (req, res) => {
    try {
        const { groupName, billname, totalExpenditure, category, paidby, share } = req.body;

        const bill = await groupBill.create({ groupName, billname, totalExpenditure, category, paidby, share });

        const grp = await Group.findOne({ groupName: groupName }).populate().exec();
        // const paidby = "pramod1";
        // const share = 1000;

        for (let i = 0; i < grp.grpMembers.length; i++) {                  // row-wise
            if (grp.grpMembers[i].username !== paidby) {
                grp.grpMembers[i].settlement[i].share += share[i].shareamount;
            } else {
                for (let j = 0; j < grp.grpMembers[i].settlement.length; j++) {      // column-wise
                    grp.grpMembers[i].settlement[j].share -= share[j].shareamount;
                }
            }
        }

        await grp.save();

        return res.status(200).json({
            success: true,
            data: grp,
            message: "Bill successfully added",
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error while adding bill.",
        })
    }
}


exports.deletebill = async (req, res) => {
    try {
        const id = req.params.id;

        const bill = await groupBill.findbyIdandDelete(id);

        const grp = await Group.findOne({ groupName: groupName }).populate().exec();
        // const paidby = "pramod1";
        // const share = 1000;

        for (let i = 0; i < grp.grpMembers.length; i++) {                  // row-wise
            if (grp.grpMembers[i].username !== paidby) {
                grp.grpMembers[i].settlement[i].share -= bill.share[i].shareamount;
            } else {
                for (let j = 0; j < grp.grpMembers[i].settlement.length; j++) {      // column-wise
                    grp.grpMembers[i].settlement[j].share += bill.share[j].shareamount;
                }
            }
        }

        await grp.save();

        return res.status(200).json({
            success: true,
            data: grp,
            message: "Bill deleted successfully",
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error while deleting bill.",
        })
    }
}