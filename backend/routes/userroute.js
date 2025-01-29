const user = require("../models/usermodel");
const express = require('express');
const router = express.Router();


const {makeTransaction, getallTransaction, filteredTransactions, recentTransactions, updateTransaction, deleteTransaction} = require('../controllers/transaction');
const {stocktransaction, stocktransactionhistory, deletestocktransaction} = require('../controllers/stock');
const {investment, getinvestment} = require('../controllers/investment');
const {usersignup, userlogin, logout} = require('../controllers/user');
const {createGroup, addbill, addusers, groups, groupmembers} = require("../controllers/group");
const {splitBill} = require("../controllers/split");
const {groupBills} = require("../controllers/groupbills");
const {verifyemail} = require("../controllers/verifyemail");
const {forgot} = require("../controllers/forgot");
const {expenseByCategory, weeklytransaction, monthlytransaction, yearlytransaction} =  require("../controllers/expense");
 
const {auth} = require('../middlewares/Auth');


router.post("/usersignup", usersignup);
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

router.get("/recenttransactions", auth, recentTransactions);
router.get("/expenseByCategory", auth, expenseByCategory);
router.get("/weeklytransaction", auth, weeklytransaction);
router.get("/monthlytransaction", auth, monthlytransaction);
router.get("/yearlytransaction", auth, yearlytransaction);
router.get("/getalltransactions",auth, getallTransaction);
router.get("/filteredtransactions",auth, filteredTransactions);
router.get("/getinvestment",auth, getinvestment);
router.get("/stocktransactionhistory", auth, stocktransactionhistory);
router.get("/expensebycategory", auth, expenseByCategory);
router.get("/getgroups", auth, groups);
router.get("/verifyemail/:vtoken/", verifyemail);
router.get("/groups/:id/members", auth, groupmembers);


router.put("/updatetransactions/:id",auth, updateTransaction);

router.delete("/deletetransaction/:transactionId", auth, deleteTransaction);
router.delete("/deletestocktransaction/:transactionId", auth, deletestocktransaction);

module.exports = router;