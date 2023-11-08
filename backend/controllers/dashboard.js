// import the model
const dash = require('../models/dashboardmodel');

// route handler
exports.dashboard = async(req, res) => {
    try{
        const {user_name, income, savings} = req.body;
        const response = await dash.create({user_name, income, savings});

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