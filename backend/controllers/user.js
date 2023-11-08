// import the model
const user = require('../models/usermodel');
const investment = require('../models/investmentmodel');
const dashboard = require('../models/dashboardmodel');

// route handler
exports.usersignup = async(req, res) => {
    try{
        const {firstname, lastname, username, email, password} = req.body;
        const response = await user.create({firstname, lastname, username, email, password});

        let user_name = username;
        await investment.create({user_name});
        await dashboard.create({user_name});
        
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