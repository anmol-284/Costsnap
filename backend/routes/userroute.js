const express = require('express');
const router = express.Router();

// import controller
const {usersignup} = require('../controllers/signup');

//define api route
router.post("/usersignup", usersignup);


module.exports = router;