const db = require("../models/index.models");
const Auth = db.auth;

exports.saveAuthData = async (email, password) => {
    const auth = new Auth({
        _id: email,
        password: password
    });

    return  await auth.save();
}

exports.findAuthDataByEmail = async (email) => {
    return Auth.findOne({_id:email})
}

exports.deleteAuthData = async (document) => {
    return  await Auth.deleteOne(document);
}