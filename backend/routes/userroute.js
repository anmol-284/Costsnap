const express = require('express');
const router = express.Router();

// import userModel
const user = require("../models/usermodel");

// import controller
const {makeTransaction, getallTransaction, recentTransactions, updateTransaction, deleteTransaction} = require('../controllers/transaction');
const {stocktransaction, stocktransactionhistory, deletestocktransaction} = require('../controllers/stock');
const {investment, getinvestment} = require('../controllers/investment');
const {usersignup, verify, userlogin, resendOTP, logout} = require('../controllers/user');
const {createGroup, addbill, addusers, groups, groupmembers} = require("../controllers/group");
const {splitBill} = require("../controllers/split");
const {groupBills} = require("../controllers/groupbills");
const {verifyOTP} = require("../controllers/verifyOTP");
const {forgot} = require("../controllers/forgot");
const {expenseByCategory, weeklytransaction, monthlytransaction, yearlytransaction} =  require("../controllers/expense");
 
const {auth} = require('../middlewares/Auth');


router.post("/usersignup", usersignup);
router.post("/verifyOTP", verifyOTP); 
router.post("/resendOTP", resendOTP);
router.post("/userlogin", userlogin);
router.post("/logout",auth, logout);
router.post("/maketransaction", auth, makeTransaction);
router.post("/investment", auth, investment);
router.post("/stock", auth, stocktransaction);
router.post("/creategroup",auth, createGroup);
router.post("/splitbills",auth, splitBill);
router.post("/groups/:id/add-bill",auth, groupBills);
router.post("/addbill",auth, addbill);
router.post("/addusers",auth, addusers);
router.post("/forgot", forgot);

router.get("/expenseByCategory", auth, expenseByCategory);
router.get("/weeklytransaction", auth, weeklytransaction);
router.get("/monthlytransaction", auth, monthlytransaction);
router.get("/yearlytransaction", auth, yearlytransaction);
router.get("/verify/:token/", verify);
router.get("/getalltransactions",auth, getallTransaction);
router.get("/recenttransactions", auth, recentTransactions);
router.get("/getinvestment",auth, getinvestment);
router.get("/stocktransactionhistory", auth, stocktransactionhistory);
router.get("/expensebycategory", auth, expenseByCategory);
router.get("/getgroups", auth, groups);
router.get("/groups/:id/members", auth, groupmembers);


router.put("/updatetransactions/:id",auth, updateTransaction);

router.delete("/deletetransaction/:id", auth, deleteTransaction);
router.delete("/deletestocktransaction/:id", auth, deletestocktransaction);

module.exports = router;