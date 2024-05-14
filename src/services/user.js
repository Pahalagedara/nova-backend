const db = require("../models");
const Auth = db.auth;

// Create and Save a new Tutorial
exports.createUser = async (email, password) => {
        const auth = new Auth({    
            _id: email,
            password: password
        });

    return  await auth.save();
};
