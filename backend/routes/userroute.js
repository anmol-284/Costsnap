const express = require('express');
const router = express.Router();

// import controller
const {usersignup} = require('../controllers/signup');
const {makeTransaction} = require('../controllers/maketransaction');
const {invest} = require('../controllers/investment');
const {createGroup} = require("../controllers/group");

//define api route
router.post("/usersignup", usersignup);
router.post("/transaction", makeTransaction);
router.post("/investment", invest);
router.post("/CreateGroup", createGroup);


module.exports = router;