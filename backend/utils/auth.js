const jwt = require("jsonwebtoken");
require("dotenv").config();

function setUser(user) {
    return jwt.sign({
        _id: user.id,
        email: user.email
    },process.env.SUPER_SECRET);
}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(id, process.env.SUPER_SECRET);
    } catch(error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};