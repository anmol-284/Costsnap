const express = require('express');
const router = express.Router();

// import userModel
const user = require("../models/usermodel");

// import controller
const {makeTransaction, getallTransaction, recentTransactions, updateTransaction, deleteTransaction} = require('../controllers/transaction');
const {stocktransaction, stocktransactionhistory} = require('../controllers/stock');
const {investment, getinvestment} = require('../controllers/investment');
const {usersignup, verify, userlogin, resendOTP, logout} = require('../controllers/user');
const {createGroup, addbill, addusers} = require("../controllers/group");
const {splitBill} = require("../controllers/split");
const {groupBills} = require("../controllers/groupbills");
const {verifyOTP} = require("../controllers/verifyOTP");
const {forgot} = require("../controllers/forgot");
const {currentMonthPreview, expenseByCategory, averageCategories} =  require("../controllers/expense");
 
const {auth} = require('../middlewares/Auth');

//define api route

// // register user 
// router.post("/usersignup", async(req,res) => {

//     console.log('Received a request to /v1/usersignup');
//     console.log('Request Body:', req.body);

//     try {
//         const {signUpData} = req.body
//         if (!signUpData) {
//             return res.status(400).json({ error: 'Invalid data provided' });
//         }
//         const newUser = new user(signUpData);
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     }

//     catch (error) {
//         console.error('Error in user signup:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.post("/usersignup", usersignup);
router.post("/verifyOTP", verifyOTP); 
router.post("/resendOTP", resendOTP);
router.post("/userlogin", userlogin);
router.post("/logout", logout);
router.post("/maketransaction", makeTransaction);
router.post("/investment", auth, investment);
router.post("/stock", stocktransaction);
router.post("/CreateGroup", createGroup);
router.post("/splitbills", splitBill);
router.post("/groupbills", groupBills);
router.post("/addbill", addbill);
router.post("/addusers", addusers);
router.post("/forgot", forgot);

router.get("/averageCategories", auth, averageCategories);
router.get("/expenseByCategory", auth, expenseByCategory);
router.get("/currentMonthPreview", auth, currentMonthPreview);
router.get("/verify/:token/", verify);
router.get("/getalltransactions",auth, getallTransaction);
router.get("/recenttransactions", auth, recentTransactions);
router.get("/getinvestment",auth, getinvestment);
router.get("/stocktransactionhistory", stocktransactionhistory);

router.put("/updatetransactions/:id", updateTransaction);

router.delete("/deletetransaction/:id",deleteTransaction);

module.exports = router;