const express = require("express");
const cors = require("cors");
const dbconnect = require('./config/database');
const {userController} = require("./controllers/user");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));

// it is used to import data from .env file
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cors());

// to parse the data
app.use(express.json());

// importing routes
const router = require('./routes/userroute');

// mounting routes with different versions
app.use("/api/v1", router);

// start server on Port
app.listen(PORT, () => {
    console.log(`Server successfully started at ${PORT}`);
});

// connnecting database
dbconnect();

// default route
app.use("/", (req, res) => {
    res.send('<h1> This is homepage baby</h1>');
});



