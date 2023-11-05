const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// to parse the data
app.use(express.json());

// start server on Port
app.listen(PORT, () => {
    console.log(`Server successfully started at ${PORT}`);
});

// connnecting db
const dbconnect = require('./config/database');
dbconnect();

// default route
app.use("/", (req, res) => {
    res.send('<h1> This is homepage baby</h1>');
});

