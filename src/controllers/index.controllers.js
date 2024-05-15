const {checkPermission} = require("../middlewares/auth.middlewares");


module.exports = app => {
    var router = require("express").Router();

    //routes
    // router.use("/user",[logger(),checkPermission(['admin','user'])],require('./routes/user.controllers'));
    
    router.use("/user",require('./routes/user.controllers'));


    app.use("",router);
}
