const express = require('express');
const router = express.Router();

// import controller
const {usersignup} = require('../controllers/signup');
const {makeTransaction} = require('../controllers/maketransaction');
const {invest} = require('../controllers/investment');

//define api route
router.post("/usersignup", usersignup);
router.post("/transaction", makeTransaction);
router.post("/investment", invest);


module.exports = router;