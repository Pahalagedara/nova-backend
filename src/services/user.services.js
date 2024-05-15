const db = require("../models/index.models");
const User = db.user;

// Create and Save a new Tutorial
exports.saveUserData = async (authId, name, type) => {
        const user = new User({    
            authId: authId,
            name: name,
            type: type,
        });

    return  await user.save();
};

exports.findUserDataByEmail = async (email) => {
    return await User.findOne({authId: email})
}

exports.updateUserToAdmin = async(_id) => {
    return await User.updateOne({_id:_id},{ $set: { type: 'admin' } })
}

exports.deleteUserData = async (document) => {
    return await User.deleteOne(document)
}