const jwt = require("jsonwebtoken");

const {SECRETKEY} = require("../config/jwt.config");

exports.decodeJWT =  (token) => {
    return jwt.verify(token, SECRETKEY);
}

exports.encodeJWT =  (tokenData) => {
    return token =  jwt.sign(
        tokenData,
        SECRETKEY,
        { expiresIn: "1h" }
    );;
}
