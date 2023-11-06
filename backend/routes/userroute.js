const express = require('express');
const router = express.Router();

// import controller
const {usersignup} = require('../controllers/signup');
const {makeTransaction} = require('../controllers/maketransaction');

//define api route
router.post("/usersignup", usersignup);
router.post("/transaction", makeTransaction);


module.exports = router;