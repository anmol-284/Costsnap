const express = require('express');
const router = express.Router();

// import controller
const {usersignup, verify, userlogin} = require('../controllers/signup');
const {makeTransaction} = require('../controllers/maketransaction');
const {invest} = require('../controllers/investment');
const {createGroup} = require("../controllers/group");
const {splitBill} = require("../controllers/split");
const {groupBills} = require("../controllers/groupbills");

//define api route
router.post("/usersignup", usersignup);
router.post("/userlogin", userlogin);
router.post("/transaction", makeTransaction);
router.post("/investment", invest);
router.post("/CreateGroup", createGroup);
router.post("/splitbills", splitBill);
router.post("/groupbills", groupBills);
router.get("/:id/verify/:token/", verify);

module.exports = router;