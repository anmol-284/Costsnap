const express = require('express');
const router = express.Router();

// import controller
const {usersignup} = require('../controllers/user');
const {makeTransaction} = require('../controllers/transaction');
const {addstock} = require('../controllers/stock');
const {investment} = require('../controllers/investment');


//define api route
router.post("/usersignup", usersignup);
router.post("/transaction", makeTransaction);
router.post("/investment", investment);
router.post("/investment/stock", addstock);



module.exports = router;