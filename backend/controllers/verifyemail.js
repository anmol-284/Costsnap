const user = require("../models/usermodel");
const transaction = require("../models/transactionmodel");
const investment = require("../models/investmentmodel");

//  verify otp email
exports.verifyemail = async (req, res) => {
    const { vtoken } = req.params;
    console.log(vtoken);
    try {
        const User = await user.findOne({ verificationToken: vtoken }).populate().exec();

        console.log(User);

        if (!User) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        console.log("Email verified.");

        User.verified = true;
        User.verificationToken = "alreadyverified";
        await User.save();

        console.log(User.username);

        const investid = await investment.create({ username: User.username }).populate().exec();

        console.log(investid);
        
        res.status(200).json({
            status: "VERIFIED",
            message: "User Email is verified Successfully.",
        });

    }
    catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
}