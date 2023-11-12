const express = require('express');
const router = express.Router();

// import controller
const {makeTransaction, getallTransaction, recentTransactions} = require('../controllers/transaction');
const {addstock} = require('../controllers/stock');
const {investment, getinvestment} = require('../controllers/investment');
const {usersignup, verify, userlogin} = require('../controllers/user');
const {createGroup} = require("../controllers/group");
const {splitBill} = require("../controllers/split");
const {groupBills} = require("../controllers/groupbills");
const {auth} = require('../middlewares/Auth');

//define api route
router.post("/usersignup", usersignup);
router.post("/userlogin", userlogin);
router.post("/maketransaction", auth, makeTransaction);
router.post("/investment", auth, investment);
router.post("/investment/addstock",auth, addstock);
router.post("/CreateGroup", createGroup);
router.post("/splitbills", splitBill);
router.post("/groupbills", groupBills);


router.get("/:id/verify/:token/", verify);
router.get("/getalltransactions", auth, getallTransaction);
router.get("/getinvestment", auth, getinvestment);
router.get("/recenttransactions", auth, recentTransactions);

module.exports = router;